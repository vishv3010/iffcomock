// ============================================================
// IFFCO GET Mock Test – Application Logic
// ============================================================

// ==================== STATE ====================
let currentSetIndex = 0;
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];       // -1 = unanswered
let markedForReview = [];   // boolean[]
let visitedQuestions = [];   // boolean[]
let timerInterval = null;
let timeLeft = 0;
let TOTAL_TIME = 0;
let timerStartedAt = 0;     // Date.now() when timer started
let timerPausedRemaining = 0;

// ==================== ACCESS CONTROL ====================
// Secret key used for access code generation (change this to your own random string)
const ACCESS_SECRET = 'IFFCO2026-GET-CS-MOCK';

function isUnlocked() {
    try {
        return localStorage.getItem('iffco_unlocked') === 'true';
    } catch(e) {
        return false;
    }
}

function setUnlocked() {
    try {
        localStorage.setItem('iffco_unlocked', 'true');
        localStorage.setItem('iffco_unlock_time', new Date().toISOString());
    } catch(e) {}
}

function updateLockUI() {
    var unlocked = isUnlocked();
    // Update lock overlays (now 5 tests)
    for (var i = 0; i < 5; i++) {
        var lockEl = document.getElementById('lock-' + i);
        if (lockEl) {
            if (unlocked) {
                lockEl.classList.add('hidden');
            } else {
                lockEl.classList.remove('hidden');
            }
        }
    }
    // Update unlock CTA
    var cta = document.getElementById('unlock-cta');
    if (cta) {
        if (unlocked) {
            cta.classList.add('hidden');
        } else {
            cta.classList.remove('hidden');
        }
    }
}

function handleTestClick(setIndex) {
    if (isUnlocked()) {
        startTest(setIndex);
    } else {
        openPaymentModal();
    }
}

// ==================== PAYMENT MODAL ====================
function openPaymentModal() {
    document.getElementById('payment-modal').classList.add('active');
    showStep1();
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.remove('active');
    updateLockUI();
}

function showStep1() {
    document.getElementById('pay-step-1').style.display = 'block';
    document.getElementById('pay-step-3').style.display = 'none';
}

async function initiateRazorpayPayment() {
    var errorEl = document.getElementById('pay-error');
    // Using a reliable way to get the button
    var btn = document.querySelector('#pay-step-1 .btn-start');
    var nameInput = document.getElementById('pay-name').value.trim();
    var emailInput = document.getElementById('pay-email').value.trim();
    var phoneInput = document.getElementById('pay-phone').value.trim();
    var termsCheck = document.getElementById('terms-check').checked;
    
    errorEl.textContent = '';
    
    if (!nameInput || !emailInput || !phoneInput) {
        errorEl.textContent = 'Please fill in all details (Name, Email, Phone).';
        return;
    }

    if (!termsCheck) {
        errorEl.textContent = 'You must agree to the Terms of Service.';
        return;
    }

    try {
        if (btn) {
            btn.disabled = true;
            btn.textContent = 'Processing...';
        }

        // 1. Create Order via serverless function
        const orderResponse = await fetch('/.netlify/functions/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 5000, currency: 'INR' })
        });
        
        const orderData = await orderResponse.json();
        if (!orderResponse.ok) {
            throw new Error(orderData.error || 'Failed to create order');
        }

        // 2. Initialize Razorpay Checkout
        var options = {
            "key": "rzp_test_T7i1Whwi5LTtOi", // Test Key ID provided by user
            "amount": orderData.amount,
            "currency": orderData.currency,
            "order_id": orderData.order_id,
            "name": "IFFCO GET Prep",
            "description": "Unlock All 5 Mock Tests",
            "handler": async function (response){
                // 3. Verify Payment Signature via serverless function
                try {
                    const verifyResponse = await fetch('/.netlify/functions/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });
                    
                    const verifyData = await verifyResponse.json();
                    if (!verifyResponse.ok) {
                        throw new Error(verifyData.error || 'Payment verification failed');
                    }
                    
                    // Success - Unlock the platform
                    localStorage.setItem('iffco_unlocked', 'true');
                    
                    // Save minimal payment info locally
                    var payments = JSON.parse(localStorage.getItem('iffco_payments') || '[]');
                    payments.push({
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        name: nameInput,
                        email: emailInput,
                        phone: phoneInput,
                        date: new Date().toISOString()
                    });
                    localStorage.setItem('iffco_payments', JSON.stringify(payments));
                    
                    // Show Success Step
                    document.getElementById('pay-step-1').style.display = 'none';
                    document.getElementById('pay-step-3').style.display = 'block';
                    updateLockUI();
                } catch(err) {
                    errorEl.textContent = 'Verification Error: ' + err.message;
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = '💳 Pay ₹50 & Unlock';
                    }
                }
            },
            "prefill": {
                "name": nameInput,
                "email": emailInput,
                "contact": phoneInput
            },
            "theme": {
                "color": "#6366f1"
            },
            "modal": {
                "ondismiss": function() {
                    // Handle user closing the modal manually
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = '💳 Pay ₹50 & Unlock';
                    }
                }
            }
        };
        
        var rzp1 = new Razorpay(options);
        
        rzp1.on('payment.failed', function (response){
            errorEl.textContent = 'Payment Failed: ' + response.error.description;
            if (btn) {
                btn.disabled = false;
                btn.textContent = '💳 Pay ₹50 & Unlock';
            }
        });
        
        rzp1.open();
    } catch (err) {
        errorEl.textContent = 'Error: ' + err.message;
        if (btn) {
            btn.disabled = false;
            btn.textContent = '💳 Pay ₹50 & Unlock';
        }
    }
}

// ==================== ERROR HANDLING ====================
(function checkQuestionsLoaded() {
    if (typeof ALL_MOCK_SETS === 'undefined' || !ALL_MOCK_SETS || ALL_MOCK_SETS.length === 0) {
        var homeMain = document.querySelector('.home-main');
        if (homeMain) {
            var errDiv = document.createElement('div');
            errDiv.style.cssText = 'background:#ef444420;border:1px solid #ef4444;border-radius:12px;padding:20px;text-align:center;margin:20px 0;color:#ef4444;';
            errDiv.innerHTML = '<h3>⚠️ Failed to Load Questions</h3><p style="color:#9ca3af;margin-top:8px;">The question bank could not be loaded. Please check your internet connection and refresh the page.</p>';
            homeMain.insertBefore(errDiv, homeMain.firstChild);
        }
    }
})();

// ==================== SCREENS ====================
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

// ==================== START TEST ====================
function startTest(setIndex) {
    if (typeof ALL_MOCK_SETS === 'undefined' || !ALL_MOCK_SETS[setIndex]) {
        alert('Error: Questions could not be loaded. Please refresh the page.');
        return;
    }

    currentSetIndex = setIndex;
    questions = ALL_MOCK_SETS[setIndex];
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(-1);
    markedForReview = new Array(questions.length).fill(false);
    visitedQuestions = new Array(questions.length).fill(false);
    visitedQuestions[0] = true;

    // Set dynamic timer based on number of questions
    // 100 Qs = 45 mins, 150 Qs = 75 mins
    TOTAL_TIME = (questions.length === 150) ? 75 * 60 : 45 * 60;
    timeLeft = TOTAL_TIME;

    var testNames = ['Mock Test 1', 'Mock Test 2', 'Mock Test 3', 'Mock Test 4 (Easy)', 'Mock Test 5 (Full Length)'];
    document.getElementById('test-title').textContent = testNames[setIndex] || ('Mock Test ' + (setIndex + 1));
    document.getElementById('jump-input').max = questions.length;

    // Build palette
    buildPalette();
    renderQuestion();
    updatePalette();
    updateProgressBar();
    startTimer();
    showScreen('test-screen');

    // Add mobile FAB if not exists
    addMobileFab();
}

// ==================== TIMER (Date.now based for accuracy) ====================
function startTimer() {
    clearInterval(timerInterval);
    timerStartedAt = Date.now();
    timerPausedRemaining = TOTAL_TIME;
    updateTimerDisplay();

    timerInterval = setInterval(function() {
        var elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
        timeLeft = Math.max(0, timerPausedRemaining - elapsed);

        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timerInterval);
            updateTimerDisplay();
            submitTest();
            return;
        }
        updateTimerDisplay();
    }, 500); // Check every 500ms for better accuracy
}

function updateTimerDisplay() {
    var min = Math.floor(timeLeft / 60);
    var sec = timeLeft % 60;
    var display = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
    document.getElementById('timer-display').textContent = display;

    var timerBox = document.getElementById('timer-box');
    timerBox.classList.remove('warning', 'danger');
    if (timeLeft <= 120) {
        timerBox.classList.add('danger');
    } else if (timeLeft <= 300) {
        timerBox.classList.add('warning');
    }
}

// ==================== RENDER QUESTION ====================
function renderQuestion() {
    var q = questions[currentQuestionIndex];
    document.getElementById('q-number').textContent = 'Question ' + (currentQuestionIndex + 1) + ' of ' + questions.length;
    document.getElementById('q-section').textContent = q.s;
    document.getElementById('question-text').textContent = q.q;

    var optList = document.getElementById('options-list');
    optList.innerHTML = '';

    var letters = ['A', 'B', 'C', 'D'];
    for (var i = 0; i < q.o.length; i++) {
        var btn = document.createElement('button');
        btn.className = 'option-btn';
        if (userAnswers[currentQuestionIndex] === i) {
            btn.classList.add('selected');
        }
        btn.setAttribute('data-index', i);
        btn.setAttribute('aria-label', 'Option ' + letters[i] + ': ' + q.o[i]);
        btn.innerHTML = '<span class="option-letter">' + letters[i] + '</span><span class="option-text">' + q.o[i] + '</span>';
        btn.addEventListener('click', selectOption);
        optList.appendChild(btn);
    }

    // Update review button state
    var reviewBtn = document.getElementById('btn-review');
    if (markedForReview[currentQuestionIndex]) {
        reviewBtn.textContent = '📌 Unmark Review';
        reviewBtn.style.borderColor = '#f59e0b';
    } else {
        reviewBtn.textContent = '📌 Mark for Review';
        reviewBtn.style.borderColor = '';
    }

    // Disable/enable nav buttons
    document.getElementById('btn-prev').style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
    document.getElementById('btn-first').style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
    document.getElementById('btn-next').textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next →';
    document.getElementById('btn-last').style.visibility = currentQuestionIndex === questions.length - 1 ? 'hidden' : 'visible';
}

// ==================== SELECT OPTION ====================
function selectOption(e) {
    var btn = e.currentTarget;
    var idx = parseInt(btn.getAttribute('data-index'));
    userAnswers[currentQuestionIndex] = idx;

    // Update UI
    document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    updatePalette();
    updateProgressBar();
}

// ==================== NAVIGATION ====================
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        visitedQuestions[currentQuestionIndex] = true;
        renderQuestion();
        updatePalette();
        updateProgressBar();
    } else {
        confirmSubmit();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        updatePalette();
        updateProgressBar();
    }
}

function goToQuestion(idx) {
    if (idx < 0) idx = 0;
    if (idx >= questions.length) idx = questions.length - 1;
    currentQuestionIndex = idx;
    visitedQuestions[idx] = true;
    renderQuestion();
    updatePalette();
    updateProgressBar();

    // Close mobile palette if open
    var paletteArea = document.querySelector('.palette-area');
    if (paletteArea.classList.contains('open')) {
        togglePalette();
    }
}

// ==================== JUMP TO QUESTION ====================
function jumpToQuestion() {
    var input = document.getElementById('jump-input');
    var num = parseInt(input.value);
    if (isNaN(num) || num < 1 || num > questions.length) {
        input.style.borderColor = '#ef4444';
        setTimeout(function() { input.style.borderColor = ''; }, 1000);
        return;
    }
    goToQuestion(num - 1);
    input.value = '';
    input.blur();
}

// ==================== SAVE & NEXT ====================
function saveAndNext() {
    // If current question is answered, move to next
    if (userAnswers[currentQuestionIndex] !== -1) {
        nextQuestion();
    } else {
        // Flash the options area to indicate no answer selected
        var optList = document.getElementById('options-list');
        optList.style.outline = '2px solid #f59e0b';
        setTimeout(function() { optList.style.outline = ''; }, 800);
    }
}

// ==================== PROGRESS BAR ====================
function updateProgressBar() {
    var answeredCount = userAnswers.filter(function(a) { return a !== -1; }).length;
    var pct = (answeredCount / questions.length) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
}

// ==================== CLEAR & REVIEW ====================
function clearResponse() {
    userAnswers[currentQuestionIndex] = -1;
    document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
    updatePalette();
    updateProgressBar();
}

function toggleReview() {
    markedForReview[currentQuestionIndex] = !markedForReview[currentQuestionIndex];
    renderQuestion();
    updatePalette();
}

// ==================== PALETTE ====================
function buildPalette() {
    var grid = document.getElementById('palette-grid');
    grid.innerHTML = '';
    for (var i = 0; i < questions.length; i++) {
        var btn = document.createElement('button');
        btn.className = 'palette-btn';
        btn.textContent = i + 1;
        btn.setAttribute('data-qi', i);
        btn.setAttribute('aria-label', 'Go to question ' + (i + 1));
        btn.addEventListener('click', function() {
            goToQuestion(parseInt(this.getAttribute('data-qi')));
        });
        grid.appendChild(btn);
    }
}

function updatePalette() {
    var btns = document.querySelectorAll('.palette-btn');
    var answered = 0, notAnswered = 0, review = 0, notVisited = 0;

    btns.forEach(function(btn, i) {
        btn.className = 'palette-btn';
        if (i === currentQuestionIndex) {
            btn.classList.add('current');
        }
        if (markedForReview[i]) {
            btn.classList.add('review');
            review++;
        } else if (userAnswers[i] !== -1) {
            btn.classList.add('answered');
            answered++;
        } else if (visitedQuestions[i]) {
            btn.classList.add('not-answered');
            notAnswered++;
        } else {
            notVisited++;
        }
    });

    var summary = document.getElementById('palette-summary');
    summary.innerHTML =
        '<strong>' + answered + '</strong> Answered · ' +
        '<strong>' + notAnswered + '</strong> Not Answered<br>' +
        '<strong>' + review + '</strong> For Review · ' +
        '<strong>' + notVisited + '</strong> Not Visited';
}

// ==================== MOBILE PALETTE ====================
function togglePalette() {
    var paletteArea = document.querySelector('.palette-area');
    var overlay = document.getElementById('mobile-palette-overlay');
    paletteArea.classList.toggle('open');
    overlay.classList.toggle('open');
}

function addMobileFab() {
    var existing = document.querySelector('.mobile-fab');
    if (existing) existing.remove();

    if (window.innerWidth <= 768) {
        var fab = document.createElement('button');
        fab.className = 'mobile-fab';
        fab.innerHTML = '☰';
        fab.setAttribute('aria-label', 'Open question palette');
        fab.addEventListener('click', togglePalette);
        document.getElementById('test-screen').appendChild(fab);
    }
}

window.addEventListener('resize', function() {
    if (document.getElementById('test-screen').classList.contains('active')) {
        addMobileFab();
    }
});

// ==================== SUBMIT ====================
function confirmSubmit() {
    var answeredCount = userAnswers.filter(function(a) { return a !== -1; }).length;
    var reviewCount = markedForReview.filter(function(r) { return r === true; }).length;
    var msg = 'You have answered ' + answeredCount + ' out of ' + questions.length + ' questions.';
    if (reviewCount > 0) {
        msg += '\n' + reviewCount + ' question(s) are still marked for review.';
    }
    document.getElementById('modal-summary').textContent = msg;
    document.getElementById('confirm-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('confirm-modal').classList.remove('active');
}

function submitTest() {
    clearInterval(timerInterval);
    closeModal();

    // Close mobile palette
    var paletteArea = document.querySelector('.palette-area');
    if (paletteArea.classList.contains('open')) {
        paletteArea.classList.remove('open');
        document.getElementById('mobile-palette-overlay').classList.remove('open');
    }

    // Remove FAB
    var fab = document.querySelector('.mobile-fab');
    if (fab) fab.remove();

    // Calculate time spent
    var timeSpent = TOTAL_TIME - timeLeft;
    var spentMin = Math.floor(timeSpent / 60);
    var spentSec = timeSpent % 60;

    // Calculate results
    var correct = 0, wrong = 0, skipped = 0;
    var sectionStats = {};

    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        var section = q.s;

        if (!sectionStats[section]) {
            sectionStats[section] = { total: 0, correct: 0, wrong: 0, skipped: 0 };
        }
        sectionStats[section].total++;

        if (userAnswers[i] === -1) {
            skipped++;
            sectionStats[section].skipped++;
        } else if (userAnswers[i] === q.a) {
            correct++;
            sectionStats[section].correct++;
        } else {
            wrong++;
            sectionStats[section].wrong++;
        }
    }

    var penalty = wrong * 0.25;
    var score = correct - penalty;
    if (score < 0) score = 0;

    // Save to localStorage
    saveResult(currentSetIndex, score, correct, wrong, skipped, spentMin, spentSec);

    // Show results
    showResults(correct, wrong, skipped, penalty, score, sectionStats, spentMin, spentSec);
}

// ==================== LOCAL STORAGE ====================
function saveResult(setIndex, score, correct, wrong, skipped, spentMin, spentSec) {
    try {
        var results = JSON.parse(localStorage.getItem('iffco_results') || '[]');
        results.push({
            set: setIndex,
            score: score,
            correct: correct,
            wrong: wrong,
            skipped: skipped,
            time: spentMin + 'm ' + spentSec + 's',
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            timestamp: Date.now()
        });
        // Keep only last 20 results
        if (results.length > 20) results = results.slice(-20);
        localStorage.setItem('iffco_results', JSON.stringify(results));
    } catch(e) {
        // localStorage not available, silently fail
    }
}

function loadPastResults() {
    try {
        return JSON.parse(localStorage.getItem('iffco_results') || '[]');
    } catch(e) {
        return [];
    }
}

function renderPastResults() {
    var container = document.getElementById('past-results');
    if (!container) return;

    var results = loadPastResults();
    if (results.length === 0) {
        container.innerHTML = '<p class="no-results">No past attempts yet. Take a mock test to see your history here!</p>';
        return;
    }

    var testNames = ['Mock Test 1', 'Mock Test 2', 'Mock Test 3', 'Mock Test 4 (Easy)', 'Mock Test 5 (Full Length)'];
    var html = '<div class="past-results-grid">';

    // Show most recent first
    var recent = results.slice().reverse().slice(0, 10);
    for (var i = 0; i < recent.length; i++) {
        var r = recent[i];
        var name = testNames[r.set] || ('Mock Test ' + (r.set + 1));
        var pct = Math.round((r.score / 100) * 100);
        var color = pct >= 60 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444';

        html += '<div class="past-result-card">' +
            '<div class="past-result-top">' +
                '<span class="past-result-name">' + name + '</span>' +
                '<span class="past-result-date">' + r.date + '</span>' +
            '</div>' +
            '<div class="past-result-score" style="color:' + color + '">' + r.score.toFixed(1) + '/100</div>' +
            '<div class="past-result-details">' +
                '✅ ' + r.correct + ' · ❌ ' + r.wrong + ' · ⏭️ ' + r.skipped + ' · ⏱️ ' + r.time +
            '</div>' +
        '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all past results?')) {
        try {
            localStorage.removeItem('iffco_results');
        } catch(e) {}
        renderPastResults();
    }
}

// ==================== RESULTS ====================
function showResults(correct, wrong, skipped, penalty, score, sectionStats, spentMin, spentSec) {
    var testNames = ['Mock Test 1', 'Mock Test 2', 'Mock Test 3', 'Mock Test 4 (Easy)', 'Mock Test 5 (Full Length)'];
    document.getElementById('result-test-name').textContent = testNames[currentSetIndex] || ('Mock Test ' + (currentSetIndex + 1));
    document.getElementById('stat-correct').textContent = correct;
    document.getElementById('stat-wrong').textContent = wrong;
    document.getElementById('stat-skipped').textContent = skipped;
    document.getElementById('stat-penalty').textContent = penalty.toFixed(2);
    document.getElementById('score-value').textContent = score.toFixed(2);
    document.getElementById('time-spent').textContent = spentMin + 'm ' + spentSec + 's';

    // Score circle animation
    var pct = Math.max(0, (score / questions.length) * 100);
    var circle = document.getElementById('score-circle');
    setTimeout(function() {
        var color = pct >= 60 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444';
        circle.style.background = 'conic-gradient(' + color + ' ' + pct + '%, #23263a ' + pct + '%)';
    }, 100);

    // Section breakdown
    var breakdownDiv = document.getElementById('section-breakdown');
    breakdownDiv.innerHTML = '';
    for (var sec in sectionStats) {
        var s = sectionStats[sec];
        var row = document.createElement('div');
        row.className = 'breakdown-row';
        row.innerHTML =
            '<span class="breakdown-section">' + sec + '</span>' +
            '<div class="breakdown-stats">' +
                '<span>✅ ' + s.correct + '/' + s.total + '</span>' +
                '<span>❌ ' + s.wrong + '</span>' +
                '<span>⏭️ ' + s.skipped + '</span>' +
            '</div>';
        breakdownDiv.appendChild(row);
    }
    
    // --- CUTOFF ANALYSIS LOGIC ---
    var maxScore = questions.length;
    var percentage = (score / maxScore) * 100;
    var barFill = document.getElementById('cutoff-bar-fill');
    var cutoffTitle = document.getElementById('cutoff-title');
    var cutoffText = document.getElementById('cutoff-text');
    
    // Animate bar width
    setTimeout(function() {
        barFill.style.width = Math.max(0, percentage) + '%';
    }, 100);

    if (percentage >= 70) {
        cutoffTitle.textContent = "🟢 Excellent: Safe Zone!";
        cutoffTitle.style.color = "var(--success)";
        barFill.style.backgroundColor = "var(--success)";
        cutoffText.innerHTML = "You scored <strong>" + percentage.toFixed(1) + "%</strong>. You are easily clearing the estimated cutoff. Keep up this consistency!";
    } else if (percentage >= 50) {
        cutoffTitle.textContent = "🟡 Borderline: Needs Push!";
        cutoffTitle.style.color = "var(--warning)";
        barFill.style.backgroundColor = "var(--warning)";
        cutoffText.innerHTML = "You scored <strong>" + percentage.toFixed(1) + "%</strong>. You are close to the cutoff, but need to improve accuracy and speed to be safe.";
    } else {
        cutoffTitle.textContent = "🔴 Danger Zone: Needs Work!";
        cutoffTitle.style.color = "var(--danger)";
        barFill.style.backgroundColor = "var(--danger)";
        cutoffText.innerHTML = "You scored <strong>" + percentage.toFixed(1) + "%</strong>. You are below the expected cutoff. Please review the Study Guide and practice more.";
    }

    // Switch Screens
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });

    // Detailed review
    buildReviewList('all');

    showScreen('result-screen');
}

function buildReviewList(filter) {
    var reviewDiv = document.getElementById('review-list');
    reviewDiv.innerHTML = '';
    var letters = ['A', 'B', 'C', 'D'];

    for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        var userAns = userAnswers[i];
        var isCorrect = userAns === q.a;
        var isSkipped = userAns === -1;

        var status, statusClass, itemClass;
        if (isSkipped) {
            status = 'Skipped';
            statusClass = 'skipped-status';
            itemClass = 'skipped-item';
        } else if (isCorrect) {
            status = 'Correct';
            statusClass = 'correct-status';
            itemClass = 'correct-item';
        } else {
            status = 'Wrong';
            statusClass = 'wrong-status';
            itemClass = 'wrong-item';
        }

        // Apply filter
        if (filter === 'correct' && !isCorrect) continue;
        if (filter === 'wrong' && (isCorrect || isSkipped)) continue;
        if (filter === 'skipped' && !isSkipped) continue;

        var item = document.createElement('div');
        item.className = 'review-item ' + itemClass;

        var answerHtml = '';
        if (isSkipped) {
            answerHtml = '<span class="correct-ans">Correct Answer: ' + letters[q.a] + '. ' + q.o[q.a] + '</span>';
        } else if (isCorrect) {
            answerHtml = '<span class="correct-ans">Your Answer: ' + letters[userAns] + '. ' + q.o[userAns] + ' ✅</span>';
        } else {
            answerHtml =
                '<span class="your-ans">Your Answer: ' + letters[userAns] + '. ' + q.o[userAns] + ' ❌</span><br>' +
                '<span class="correct-ans">Correct Answer: ' + letters[q.a] + '. ' + q.o[q.a] + '</span>';
        }

        item.innerHTML =
            '<div class="review-q-header">' +
                '<span class="review-q-num">Q' + (i + 1) + ' · ' + q.s + '</span>' +
                '<span class="review-q-status ' + statusClass + '">' + status + '</span>' +
            '</div>' +
            '<div class="review-q-text">' + q.q + '</div>' +
            '<div class="review-answer">' + answerHtml + '</div>';

        reviewDiv.appendChild(item);
    }

    if (reviewDiv.children.length === 0) {
        reviewDiv.innerHTML = '<p style="color: var(--text-dimmer); text-align: center; padding: 20px;">No questions match this filter.</p>';
    }
}

function filterReview(type, btn) {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    buildReviewList(type);
}

// ==================== NAVIGATION ====================
function goHome() {
    clearInterval(timerInterval);
    renderPastResults();
    showScreen('home-screen');
}

function confirmGoHome() {
    document.getElementById('home-modal').classList.add('active');
}

function closeHomeModal() {
    document.getElementById('home-modal').classList.remove('active');
}

function confirmLeave() {
    closeHomeModal();
    goHome();
}

function retakeTest() {
    startTest(currentSetIndex);
}

// ==================== PRINT RESULTS ====================
function printResults() {
    window.print();
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // Don't intercept if user is typing in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
    }

    if (!document.getElementById('test-screen').classList.contains('active')) return;
    if (document.getElementById('confirm-modal').classList.contains('active')) return;
    if (document.getElementById('home-modal').classList.contains('active')) return;

    switch(e.key) {
        case 'ArrowRight':
        case 'n':
            e.preventDefault();
            nextQuestion();
            break;
        case 'ArrowLeft':
        case 'p':
            e.preventDefault();
            prevQuestion();
            break;
        case 'a':
        case '1':
            selectByIndex(0);
            break;
        case 'b':
        case '2':
            selectByIndex(1);
            break;
        case 'c':
        case '3':
            selectByIndex(2);
            break;
        case 'd':
        case '4':
            selectByIndex(3);
            break;
        case 'r':
            toggleReview();
            break;
        case 'x':
            clearResponse();
            break;
        case 'Escape':
            closeModal();
            closeHomeModal();
            break;
    }
});

function selectByIndex(idx) {
    var btns = document.querySelectorAll('.option-btn');
    if (btns[idx]) {
        btns[idx].click();
    }
}

// ==================== PREVENT ACCIDENTAL LEAVE ====================
window.addEventListener('beforeunload', function(e) {
    if (document.getElementById('test-screen').classList.contains('active')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ==================== STUDY GUIDE ====================
function showStudyGuide() {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById('study-screen').classList.add('active');
    
    // Load default topic (iffco) if empty (ignoring HTML comments)
    var contentArea = document.getElementById('study-content-area');
    if (!contentArea.querySelector('h2')) {
        loadStudyTopic('iffco', document.querySelector('.study-sidebar .study-nav-btn'));
    }
}

function hideStudyGuide() {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    document.getElementById('home-screen').classList.add('active');
}

function loadStudyTopic(topicId, btnElement) {
    if (typeof STUDY_MATERIAL === 'undefined') return;
    
    // Update active button
    document.querySelectorAll('.study-nav-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    if (btnElement) {
        btnElement.classList.add('active');
    }
    
    // Render content
    var data = STUDY_MATERIAL[topicId];
    if (data) {
        document.getElementById('study-content-area').innerHTML = '<h2>' + data.title + '</h2>' + data.content;
    }
}

// ==================== INIT ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', function() {
    renderPastResults();
    updateLockUI();
});
