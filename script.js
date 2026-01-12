const alertBox = document.getElementById("alertBox");

// Alert ko'rsatish funksiyasi
function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `alert ${type} show`;

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}

// Feedback form submit
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value || "Noma'lum",
    email: document.getElementById("email").value || "Yo‘q",
    comment: document.getElementById("comment").value,
    rating: document.querySelector('input[name="rating"]:checked')?.value || "Baholanmagan"
  };

  const API_URL = "https://backend-api-snsf.onrender.com";

  fetch(API_URL + "/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData.success) {
        showAlert("✅ Fikringiz yuborildi! Rahmat 😊", "success");
        document.getElementById("feedbackForm").reset();
      } else {
        showAlert("❌ Xatolik yuz berdi 😕", "error");
      }
    })
    .catch(() => {
      showAlert("❌ Backend ishlamayapti!", "error");
    });
});

// Aside yangiliklar modali
function openNews(title, text) {
  document.getElementById("newsTitle").innerText = title;
  document.getElementById("newsText").innerText = text;
  document.getElementById("newsModal").style.display = "flex";
}

function closeNews() {
  document.getElementById("newsModal").style.display = "none";
}







