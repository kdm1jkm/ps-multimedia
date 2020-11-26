const applyInfo = document.querySelector(".js-apply");
const applyInfoList = applyInfo.querySelector("ul");
const applyForm = document.querySelector(".js-form");
const applyForms = {
  grade: document.querySelector(".form__grade"),
  class_num: document.querySelector(".form__class"),
  number: document.querySelector(".form__number"),
  period: document.querySelector(".form__period"),
};
const deleteButton = document.querySelector(".js-delete");

function isLocal() {
  return (
    window.location.href === "127.0.0.1" || window.location.href === "localhost"
  );
}

const API_URLS = {
  // get: isLocal() ? "http://127.0.0.1:5000/" : "",
  // apply: isLocal() ? "http://127.0.0.1:5000/apply" : "",
  get: "http://kdm1jkm.pythonanywhere.com/",
  apply: "http://kdm1jkm.pythonanywhere.com//apply",
  delete: "http://kdm1jkm.pythonanywhere.com//delete",
};

function clearInput() {
  applyForms.grade.value = "";
  applyForms.class_num.value = "";
  applyForms.number.value = "";
  applyForms.period.value = "";
}

function getStudentnum() {
  const { grade, class_num, number } = applyForms;

  return `${grade.value}${class_num.value}${
    number.value > 9 ? `${number.value}` : `0${number.value}`
  }`;
}

async function handleSubmit(event) {
  event.preventDefault();

  const student_number = getStudentnum();

  const period = applyForms.period.value;

  const data = {
    student_number,
    period,
  };

  await fetch(API_URLS.delete, {
    method: "POST",
    body: JSON.stringify({ student_number }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  fetch(API_URLS.apply, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      loadData();
    })
    .then(() => {
      clearInput();
    });
}

function clearData() {
  applyInfoList.innerHTML = "";
}

function loadData() {
  clearData();
  let text;
  fetch(API_URLS.get)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.forEach((period, i) => {
        const li = document.createElement("li");
        const h1 = document.createElement("h1");
        const ol = document.createElement("ol");

        applyInfoList.appendChild(li);

        li.appendChild(h1);
        li.appendChild(ol);

        h1.innerText = `${i + 1}교시`;

        period.forEach((student) => {
          const li = document.createElement("li");
          const p = document.createElement("p");

          ol.appendChild(li);
          li.appendChild(p);

          p.innerText = student;
        });
      });
    });
}

async function handleDelete(event) {
  event.preventDefault();

  const student_number = getStudentnum();

  await fetch(API_URLS.delete, {
    method: "POST",
    body: JSON.stringify({ student_number }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  loadData();
}

function init() {
  loadData();
  applyForm.addEventListener("submit", handleSubmit);
  deleteButton.addEventListener("click", handleDelete);
}

init();
