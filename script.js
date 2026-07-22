// ============================================
// ĐÁP ÁN
// ============================================
const answerKey = {
    "1": {"ans": 0, "letter": "A", "text": "mì, bún, phở"},
    "2": {"ans": 3, "letter": "D", "text": "hamburger"},
    "3": {"ans": 3, "letter": "D", "text": "mì ý"},
    "4": {"ans": 2, "letter": "C", "text": "nước ngọt"},
    "5": {"ans": 2, "letter": "C", "text": "nước táo/cam ép"},
    "6": {"ans": 2, "letter": "C", "text": "kẹo"},
    "7": {"ans": 1, "letter": "B", "text": "bánh quy"},
    "8": {"ans": 3, "letter": "D", "text": "thứ nhất (ngày 1) 1st"},
    "9": {"ans": 2, "letter": "C", "text": "thứ hai (ngày 2) 2nd"},
    "10": {"ans": 0, "letter": "A", "text": "thứ ba (ngày 3) 3rd"},
    "11": {"ans": 0, "letter": "A", "text": "thứ tư (ngày 4) 4th"},
    "12": {"ans": 3, "letter": "D", "text": "thứ năm (ngày 5) 5th"},
    "13": {"ans": 0, "letter": "A", "text": "thứ sáu (ngày 6) 6th"},
    "14": {"ans": 2, "letter": "C", "text": "thứ bảy (ngày 7) 7th"},
    "15": {"ans": 1, "letter": "B", "text": "thứ tám (ngày 8) 8th"},
    "16": {"ans": 1, "letter": "B", "text": "thứ chín (ngày 9) 9th"},
    "17": {"ans": 0, "letter": "A", "text": "thứ mười (ngày 10) 10th"},
    "18": {"ans": 2, "letter": "C", "text": "thứ mười một (ngày 11) 11th"},
    "19": {"ans": 3, "letter": "D", "text": "thứ mười hai (ngày 12) 12th"},
    "20": {"ans": 0, "letter": "A", "text": "thứ mười ba (ngày 13) 13th"},
    "21": {"ans": 2, "letter": "C", "text": "thứ mười bốn (ngày 14) 14th"},
    "22": {"ans": 3, "letter": "D", "text": "thứ mười lăm (ngày 15) 15th"},
    "23": {"ans": 2, "letter": "C", "text": "thứ mười sáu (ngày 16) 16th"},
    "24": {"ans": 2, "letter": "C", "text": "thứ mười bảy (ngày 17) 17th"},
    "25": {"ans": 1, "letter": "B", "text": "thứ mười tám (ngày 18) 18th"},
    "26": {"ans": 1, "letter": "B", "text": "thứ mười chín (ngày 19) 19th"},
    "27": {"ans": 3, "letter": "D", "text": "thứ hai mươi (ngày 20) 20th"},
    "28": {"ans": 3, "letter": "D", "text": "thứ hai mươi mốt (ngày 21) 21st"},
    "29": {"ans": 3, "letter": "D", "text": "thứ hai mươi hai (ngày 22) 22nd"},
    "30": {"ans": 2, "letter": "C", "text": "thứ hai mươi ba (ngày 23) 23rd"},
    "31": {"ans": 1, "letter": "B", "text": "thứ hai mươi tư (ngày 24) 24th"},
    "32": {"ans": 0, "letter": "A", "text": "thứ hai mươi lăm (ngày 25) 25th"},
    "33": {"ans": 2, "letter": "C", "text": "thứ hai mươi sáu (ngày 26) 26th"},
    "34": {"ans": 1, "letter": "B", "text": "thứ hai mươi bảy (ngày 27) 27th"},
    "35": {"ans": 3, "letter": "D", "text": "thứ hai mươi tám (ngày 28) 28th"},
    "36": {"ans": 2, "letter": "C", "text": "thứ hai mươi chín (ngày 29) 29th"},
    "37": {"ans": 2, "letter": "C", "text": "thứ ba mươi (ngày 30) 30th"},
    "38": {"ans": 2, "letter": "C", "text": "thứ ba mươi mốt (ngày 31) 31st"}
};
const totalQuestions = 38;

let currentUser = '';
let cameraStream = null;
let isCameraOn = false;

// ============================================
// LOGIN
// ============================================
window.onload = function() {
    const savedName = localStorage.getItem('quiz_username');
    if (savedName) {
        document.getElementById('usernameInput').value = savedName;
    }
    document.getElementById('usernameInput').focus();
    
    document.getElementById('usernameInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') enterQuiz();
    });
};

function enterQuiz() {
    const nameInput = document.getElementById('usernameInput');
    const errorDiv = document.getElementById('loginError');
    const name = nameInput.value.trim();
    
    if (name === '') {
        errorDiv.textContent = '⚠️ Vui lòng nhập tên của bạn!';
        nameInput.style.borderColor = '#ef4444';
        return;
    }
    
    if (name.length < 2) {
        errorDiv.textContent = '⚠️ Tên phải có ít nhất 2 ký tự!';
        nameInput.style.borderColor = '#ef4444';
        return;
    }
    
    currentUser = name;
    localStorage.setItem('quiz_username', name);
    
    document.getElementById('displayName').textContent = name;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    
    errorDiv.textContent = '';
    nameInput.style.borderColor = '';
}

function logout() {
    currentUser = '';
    localStorage.removeItem('quiz_username');
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('usernameInput').value = '';
    document.getElementById('usernameInput').focus();
    
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        isCameraOn = false;
        document.getElementById('cameraContainer').style.display = 'none';
        document.getElementById('cameraBtn').textContent = '📷 Bật Camera';
    }
}

// ============================================
// CAMERA
// ============================================
function toggleCamera() {
    if (isCameraOn) {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
        isCameraOn = false;
        document.getElementById('cameraContainer').style.display = 'none';
        document.getElementById('cameraBtn').textContent = '📷 Bật Camera';
    } else {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                cameraStream = stream;
                isCameraOn = true;
                const video = document.getElementById('video');
                video.srcObject = stream;
                video.play();
                document.getElementById('cameraContainer').style.display = 'block';
                document.getElementById('cameraBtn').textContent = '📷 Tắt Camera';
            })
            .catch(err => {
                alert('⚠️ Không thể truy cập camera: ' + err.message);
            });
    }
}

// ============================================
// KIỂM TRA BÀI
// ============================================
function checkAnswers() {
    let score = 0;
    let answeredCount = 0;

    for (let i = 1; i <= totalQuestions; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback_${i}`);
        const correctInfo = answerKey[i];

        if (selected) {
            answeredCount++;
            const userAns = parseInt(selected.value);
            if (userAns === correctInfo.ans) {
                score++;
                feedbackDiv.innerHTML = '<p style="color:var(--green);"><b>✓ Chính xác!</b></p>';
            } else {
                feedbackDiv.innerHTML = `<p style="color:var(--red);"><b>✗ Chưa chính xác.</b> Đáp án đúng là <b>${correctInfo.letter}</b> (${correctInfo.text})</p>`;
            }
        } else {
            feedbackDiv.innerHTML = `<p style="color:var(--orange);"><b>! Chưa trả lời.</b> Đáp án đúng là <b>${correctInfo.letter}</b> (${correctInfo.text})</p>`;
        }
    }

    const resultDiv = document.getElementById('resultSummary');
    resultDiv.innerHTML = `
        <h2 style="color:var(--cyan);">📊 KẾT QUẢ BÀI LÀM</h2>
        <p><b>Số câu đã làm:</b> ${answeredCount} / ${totalQuestions}</p>
        <p><b>Số câu trả lời đúng:</b> <span style="color:var(--cyan);font-weight:700;font-size:1.2rem;">${score} / ${totalQuestions}</span> (${Math.round((score/totalQuestions)*100)}%)</p>
    `;
}

function resetForm() {
    document.getElementById('quizForm').reset();
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`feedback_${i}`).innerHTML = '';
    }
    document.getElementById('resultSummary').innerHTML = '';
}
