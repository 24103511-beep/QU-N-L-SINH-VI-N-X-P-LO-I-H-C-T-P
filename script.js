// Các tên môn học theo yêu cầu
const subjectNames = [
    "Giải tích 1",
    "Đại số tuyến tính",
    "Xác suất thống kê",
    "Tin học đại cương",
    "Xây dựng ứng dụng Web"
];

// Hàm tính điểm trung bình
function calculateAverage(scores) {
    const sum = scores.reduce((total, score) => total + score, 0);
    return sum / scores.length;
}

// Hàm xếp loại học tập
function classify(avg) {
    if (avg >= 8.0) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5.0) return "Trung bình";
    return "Yếu";
}

// Hàm xử lý chính khi bấm nút "Tính kết quả"
function processData() {
    // Xóa tất cả thông báo lỗi cũ
    clearErrors();

    const nameInput = document.getElementById("studentName").value.trim();
    const scores = [];
    let isValid = true;

    // Kiểm tra tên sinh viên
    if (nameInput === "") {
        showError("nameError", "Vui lòng nhập tên sinh viên.");
        isValid = false;
    }

    // Kiểm tra điểm 5 môn
    for (let i = 1; i <= 5; i++) {
        const scoreInput = document.getElementById(`score${i}`).value.trim();
        const scoreValue = parseFloat(scoreInput);

        if (scoreInput === "") {
            showError(`score${i}Error`, "Không được để trống.");
            isValid = false;
        } else if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 10) {
            showError(`score${i}Error`, "Điểm phải từ 0 đến 10.");
            isValid = false;
        } else {
            scores.push(scoreValue);
        }
    }

    // Nếu dữ liệu hợp lệ thì tính toán và hiển thị
    if (isValid) {
        const avg = calculateAverage(scores);
        const classification = classify(avg);

        displayResults(nameInput, scores, avg, classification);
    }
}

// Hiển thị thông báo lỗi dưới ô nhập
function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

// Xóa các thông báo lỗi cũ
function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(el => el.innerText = "");
}

// Hiển thị bảng và kết quả xếp loại
function displayResults(name, scores, avg, classification) {
    document.getElementById("resStudentName").innerText = name;

    const tbody = document.getElementById("scoresTableBody");
    tbody.innerHTML = "";

    scores.forEach((score, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${subjectNames[index]}</td>
            <td>${score.toFixed(1)}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById("resAverage").innerText = avg.toFixed(2);

    const classBadge = document.getElementById("resClassification");
    classBadge.innerText = classification;
    
    // Gán màu sắc cho thẻ xếp loại
    classBadge.className = "badge ";
    if (classification === "Giỏi") classBadge.classList.add("badge-gioi");
    else if (classification === "Khá") classBadge.classList.add("badge-kha");
    else if (classification === "Trung bình") classBadge.classList.add("badge-tb");
    else classBadge.classList.add("badge-yeu");

    // Hiện phần kết quả
    document.getElementById("resultContainer").classList.remove("hidden");
}
