const taskForm = document.getElementById("taskform");
const taskTitleInput = document.getElementById("tasktitle");
const taskDescInput = document.getElementById("taskdescription");
const taskDateInput = document.getElementById("taskdate");
const tasksList = document.getElementById("tasksList");
const submitBtn = document.getElementById("submitbtn");

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

function renderTasks() {
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    tasksList.innerHTML =
      '<div class="no-tasks">هیچ داتایەک داخل نەکراوە</div>';
    return;
  }

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task-card";

    /*'<h3>' + task.title + '</h3>'
     + peshtr awa aman nusy ballam am shewazy dolar signa kurtu puxt traw aloz nya */
    //'<p>Due: ' + task.date + '</p>' +

    taskElement.innerHTML = `
      <h3>${task.title}</h3>  
      <p>${task.description}</p>
      <p>Due: ${task.date}</p>
     
      <div class="task-actions">
        <button class="edit-btn"  data-id="${task.id}" >چاک کردن</button> //'+task.id+'
        <button class="delete-btn" data-id="${task.id}">سرینەوە</button>
      </div>
    `;
    tasksList.appendChild(taskElement);
  });
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();
  const date = taskDateInput.value;
  //leraya trim bo labrdny space sarataw kotay bakardeny atwany bkaryshy naheny balam nusynaka narek abet jwan nya
  const isEditing = submitBtn.hasAttribute(
    "data-editing-id" /*nawy attrybutakaya */
  );
  // hasattribute leraya ba boolyan value akaman ayatawa
  if (isEditing) {
    //ama bo updait bu rolla
    const taskId = parseInt(submitBtn.getAttribute("data-editing-id")); //leraya bangy akaynawa
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks[taskIndex] = {
      id: taskId,
      title,
      description,
      date,
    };
    submitBtn.textContent = "زیادکردن";
    submitBtn.removeAttribute("data-editing-id");
  } else {
    // lera badwawa bo tasky tazaya
    const newTask = {
      id: Date.now(),
      title,
      description,
      date,
    };
    tasks.push(newTask);
  }

  saveTasks();
  renderTasks();
  taskForm.reset();
});

// lerawa sray delete w edit buttonekana ka jullay bame
tasksList.addEventListener("click", function (e) {
  // delete
  if (e.target.classList.contains("delete-btn")) {
    const taskId = parseInt(e.target.getAttribute("data-id"));
    if (confirm("دڵنیای لە سڕینەوەی ئەم ئەرکە؟")) {
      tasks = tasks.filter((task) => task.id !== taskId);
      saveTasks();
      renderTasks();
    }
  }

  // edit
  if (e.target.classList.contains("edit-btn")) {
    const taskId = parseInt(e.target.getAttribute("data-id"));
    const taskToEdit = tasks.find((task) => task.id === taskId);

    taskTitleInput.value = taskToEdit.title;
    taskDescInput.value = taskToEdit.description;
    taskDateInput.value = taskToEdit.date;

    submitBtn.textContent = "تازەکردنەوە";
    submitBtn.setAttribute("data-editing-id", taskId);

    taskForm.scrollIntoView({ behavior: "smooth" }); // du jory kay scroll man haya (instant )u auto sayry nmunakay mdn bka
  }
});

loadTasks();
