const applyForm = document.querySelector(".js-apply");
const applyList = applyForm.querySelector("ul");

const API_URL = "http://127.0.0.1:5000/";

function init() {
  const span = document.createElement("span");
  applyForm.appendChild(span);

  let text;
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.forEach((period) => {
        const ol = document.createElement("ol");
        const li = document.createElement("li");
        applyList.appendChild(li);
        li.appendChild(ol);
        period.forEach((student) => {
          const p = document.createElement("p");
          const li = document.createElement("li");
          ol.appendChild(li);
          li.appendChild(p);

          p.innerText = student;
        });
      });
    });
}

init();
