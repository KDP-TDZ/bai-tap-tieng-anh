const originalData = [
    { type: "mc", q: "Từ 'thứ nhất (ngày 1)' trong tiếng Anh là gì?", opts: ["the first", "the second", "the third", "the one"], a: "the first" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the f_rst (thứ nhất)", a: "i" },
    { type: "mc", q: "Ký hiệu '2nd' được đọc đầy đủ là:", opts: ["the twoth", "the second", "the third", "the fourth"], a: "the second" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the se_ond (thứ hai)", a: "c" },
    { type: "mc", q: "Nghĩa tiếng Việt của 'the third' là gì?", opts: ["thứ hai", "thứ tư", "thứ ba (ngày 3)", "thứ năm"], a: "thứ ba (ngày 3)" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the t_ird (thứ ba)", a: "h" },
    { type: "mc", q: "Từ nào có nghĩa là 'thứ tư (ngày 4)'?", opts: ["the fifth", "the four", "the fourth", "the third"], a: "the fourth" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the fo_rth (thứ tư)", a: "u" },
    { type: "mc", q: "Cách viết đúng của 'ngày 5' (thứ năm) là?", opts: ["the fiveth", "the fith", "the fifth", "the fivth"], a: "the fifth" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the fi_th (thứ năm)", a: "f" },
    { type: "mc", q: "'the sixth' nghĩa là gì?", opts: ["thứ sáu (ngày 6)", "thứ bảy", "thứ tám", "thứ chín"], a: "thứ sáu (ngày 6)" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the s_xth (thứ sáu)", a: "i" },
    { type: "mc", q: "Từ 'thứ bảy (ngày 7)' viết là gì?", opts: ["the eighth", "the seventh", "the sixth", "the ninth"], a: "the seventh" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the sev_nth (thứ bảy)", a: "e" },
    { type: "mc", q: "Chọn từ đúng cho ngày 8 (thứ tám):", opts: ["the eigth", "the eightth", "the eighth", "the eighh"], a: "the eighth" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the e_ghth (thứ tám)", a: "i" },
    { type: "mc", q: "Cách viết 'thứ chín (ngày 9)' là:", opts: ["the nineth", "the ninth", "the nighth", "the nine"], a: "the ninth" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the n_nth (thứ chín)", a: "i" },
    { type: "mc", q: "'the tenth' tương ứng với số thứ tự nào?", opts: ["10th", "1th", "12th", "9th"], a: "10th" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: the te_th (thứ mười)", a: "n" },
    { type: "mc", q: "'Sinh nhật của bạn là khi nào?' dịch sang tiếng Anh là:", opts: ["What is your birthday?", "When is your birthday?", "Where is your birthday?", "How is your birthday?"], a: "When is your birthday?" },
    { type: "fill", q: "Điền TỪ còn thiếu: ____ is your birthday? (Sinh nhật của bạn là khi nào?)", a: "when" },
    { type: "mc", q: "Câu 'it is on the first of July' có nghĩa là:", opts: ["Nó vào ngày mồng hai tháng Bảy.", "Nó vào ngày mồng một tháng Sáu.", "Nó vào ngày mồng một tháng Bảy.", "Sinh nhật tôi vào tháng Bảy."], a: "Nó vào ngày mồng một tháng Bảy." },
    { type: "fill", q: "Điền TỪ còn thiếu: It is __ the first of July. (Nó vào ngày mồng một tháng Bảy)", a: "on" },
    { type: "mc", q: "'Bạn muốn ăn/uống cái gì?' trong tiếng Anh là:", opts: ["What do you want to eat/drink?", "When do you want to eat?", "Do you want to eat/drink?", "How do you want to eat/drink?"], a: "What do you want to eat/drink?" },
    { type: "fill", q: "Điền TỪ còn thiếu: What do you want __ eat/drink? (Bạn muốn ăn/uống cái gì?)", a: "to" },
    { type: "mc", q: "Chọn câu đúng: 'Tôi muốn một vài miếng khoai tây chiên / một ít nước chanh.'", opts: ["I want a chips / a lemonade.", "I want some chips / some lemonade.", "I have some chips / some lemonade.", "I want many chips / much lemonade."], a: "I want some chips / some lemonade." },
    { type: "fill", q: "Điền TỪ còn thiếu: I want ____ chips / some lemonade. (Tôi muốn một vài miếng khoai tây chiên...)", a: "some" },
    { type: "mc", q: "Từ 'some' có nghĩa là gì?", opts: ["nhiều", "không có gì", "1 vài, 1 ít", "tất cả"], a: "1 vài, 1 ít" },
    { type: "fill", q: "Điền CHỮ CÁI còn thiếu vào chỗ trống: s_me (1 vài, 1 ít)", a: "o" }
];

// ====== KHOÁ LƯU TRỮ ======
const STORAGE_KEY = 'quiz_answers_saved';
const QUIZ_ORDER_KEY = 'quiz_order_saved';

// Lấy thứ tự câu hỏi từ LocalStorage hoặc tạo mới
let quizData;
const savedOrder = localStorage.getItem(QUIZ_ORDER_KEY);

if (savedOrder) {
    // Nếu đã có thứ tự lưu, khôi phục lại y nguyên
    const order = JSON.parse(savedOrder);
    quizData = order.map(id => {
        const found = originalData.find((item, idx) => idx === id);
        return { ...found, id: id };
    });
} else {
    // Tạo mới và xáo trộn
    quizData = originalData.map((item, idx) => ({ ...item, id: idx }));
    shuffleArray(quizData);
    // Lưu thứ tự ID vào localStorage
    const orderIds = quizData.map(item => item.id);
    localStorage.setItem(QUIZ_ORDER_KEY, JSON.stringify(orderIds));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Lấy dữ liệu đã lưu từ LocalStorage
const userAnswers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const container = document.getElementById('quiz-container');

// ====== RENDER CÂU HỎI ======
quizData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `card-${index}`;

    const qTitle = document.createElement('div');
    qTitle.className = 'question-title';
    qTitle.innerText = `Câu ${index + 1}: ${item.q}`;
    card.appendChild(qTitle);

    const inputArea = document.createElement('div');
    inputArea.id = `input-area-${index}`;

    // Xử lý theo loại câu hỏi
    if (item.type === 'mc') {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        item.opts.forEach((opt) => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `q${index}`;
            radio.value = opt;
            
            // Nếu đã có câu trả lời lưu trước đó, tự động check
            if (userAnswers[index] && userAnswers[index].userAns === opt) {
                radio.checked = true;
            }
            
            label.appendChild(radio);
            label.appendChild(document.createTextNode(' ' + opt));
            optionsDiv.appendChild(label);
        });
        inputArea.appendChild(optionsDiv);
    } else if (item.type === 'fill') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `input${index}`;
        input.placeholder = 'Nhập đáp án...';
        input.autocomplete = 'off';
        
        // Nếu đã có câu trả lời lưu trước đó, tự động điền vào
        if (userAnswers[index]) {
            input.value = userAnswers[index].userAns;
        }
        
        inputArea.appendChild(input);
    }

    // Nút lưu
    const btnSave = document.createElement('button');
    btnSave.className = 'btn-save';
    btnSave.innerText = 'Lưu câu trả lời';
    btnSave.onclick = () => saveAnswer(index, item);
    inputArea.appendChild(btnSave);

    card.appendChild(inputArea);

    // Thông báo đã lưu
    const savedMsg = document.createElement('div');
    savedMsg.id = `saved-msg-${index}`;
    savedMsg.className = 'saved-msg';
    savedMsg.innerHTML = '🔒 Đã ghi nhận và khóa câu trả lời.';
    card.appendChild(savedMsg);

    container.appendChild(card);

    // Nếu câu hỏi đã được lưu trước đó => khóa luôn
    if (userAnswers[index]) {
        document.getElementById(`input-area-${index}`).style.display = 'none';
        document.getElementById(`saved-msg-${index}`).style.display = 'block';
        document.getElementById(`card-${index}`).classList.add('locked');
    }
});

// ====== HÀM LƯU CÂU TRẢ LỜI ======
function saveAnswer(index, item) {
    let answer = "";
    if (item.type === 'mc') {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (!selected) {
            alert("Vui lòng chọn một đáp án trước khi lưu!");
            return;
        }
        answer = selected.value.trim();
    } else {
        const input = document.getElementById(`input${index}`);
        if (!input.value.trim()) {
            alert("Vui lòng nhập đáp án trước khi lưu!");
            return;
        }
        answer = input.value.trim();
    }

    // Lưu vào object
    userAnswers[index] = {
        q: item.q,
        userAns: answer,
        correctAns: item.a,
        isCorrect: (answer.toLowerCase() === item.a.toLowerCase())
    };

    // Lưu xuống LocalStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userAnswers));

    // Ẩn vùng nhập liệu
    document.getElementById(`input-area-${index}`).style.display = 'none';
    document.getElementById(`saved-msg-${index}`).style.display = 'block';
    document.getElementById(`card-${index}`).classList.add('locked');

    // Cập nhật trạng thái nút Nộp Bài
    updateSubmitButton();
}

// ====== KIỂM TRA VÀ CẬP NHẬT NÚT NỘP BÀI ======
function updateSubmitButton() {
    const answeredCount = Object.keys(userAnswers).length;
    const btn = document.getElementById('btn-finish');
    
    if (answeredCount === quizData.length) {
        btn.disabled = false;
        btn.innerText = 'Nộp Bài & Tải File Kết Quả';
    } else {
        btn.disabled = false; // Vẫn cho phép bấm nhưng sẽ báo lỗi
    }
}

// Gọi lần đầu để set trạng thái nút
updateSubmitButton();

// ====== HÀM NỘP BÀI VÀ DOWNLOAD ======
function finishAndDownload() {
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < quizData.length) {
        alert(`Bạn mới hoàn thành ${answeredCount}/${quizData.length} câu. Vui lòng làm và nhấn "Lưu" tất cả các câu trước khi nộp bài!`);
        return;
    }

    let score = 0;
    let reportText = "========================================\n";
    reportText += "KẾT QUẢ BÀI KIỂM TRA TIẾNG ANH\n";
    reportText += "Chủ đề: Số thứ tự & Ăn uống\n";
    reportText += `Thời gian hoàn thành: ${new Date().toLocaleString('vi-VN')}\n`;
    reportText += "========================================\n\n";

    let detailsText = "";
    
    quizData.forEach((item, index) => {
        const ansObj = userAnswers[index];
        if (ansObj && ansObj.isCorrect) score++;

        detailsText += `Câu ${index + 1}: ${ansObj ? ansObj.q : item.q}\n`;
        detailsText += `- Đáp án của bạn: ${ansObj ? ansObj.userAns : "Chưa làm"}\n`;
        detailsText += `- Đáp án chuẩn: ${item.a}\n`;
        detailsText += `- Kết quả: ${ansObj ? (ansObj.isCorrect ? "✅ ĐÚNG" : "❌ SAI") : "❌ Chưa làm"}\n\n`;
    });

    reportText += `TỔNG ĐIỂM: ${score} / ${quizData.length}\n\n`;
    reportText += "CHI TIẾT CÁC CÂU TRẢ LỜI:\n\n" + detailsText;

    // Tạo file .txt để tải về
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ket_Qua_Bai_Tap_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Đổi trạng thái nút
    const btn = document.getElementById('btn-finish');
    btn.innerText = "✅ Đã Nộp Bài & Tải Kết Quả Thành Công";
    btn.disabled = true;

    document.getElementById('result-message').style.display = 'block';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    // Xóa dữ liệu đã lưu sau khi nộp (nếu muốn reset)
    // localStorage.removeItem(STORAGE_KEY);
    // localStorage.removeItem(QUIZ_ORDER_KEY);
}

// ====== [TÙY CHỌN] NÚT RESET (XÓA HẾT DỮ LIỆU) ======
// Thêm vào HTML nếu muốn: <button onclick="resetAll()">Làm lại từ đầu</button>
function resetAll() {
    if (confirm("Bạn có chắc muốn xóa toàn bộ tiến độ và làm lại từ đầu?")) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(QUIZ_ORDER_KEY);
        location.reload();
    }
}
