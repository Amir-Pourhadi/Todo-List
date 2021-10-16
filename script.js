const list = document.querySelector("#todo-list");
const today = new Date().toISOString().slice(0, 10);

function populateTodoList(todo) {
  const todoEl = document.createElement("li");

  todoEl.className = "list-group-item d-flex justify-content-between align-items-center";
  todoEl.append(todo);
  console.log(!dateInput.value);
  if (dateInput.value !== today && dateInput.value) {
    const deadline = document.createElement("span");

    const todayInt = parseInt(today.split("-").join(""));
    const inputInt = parseInt(dateInput.value.slice(0, 10).split("-").join(""));
    const daysLeft = inputInt - todayInt;

    deadline.append(daysLeft);

    if (daysLeft < 3) deadline.style.color = "red";
    else if (daysLeft < 7) deadline.style.color = "orange";
    else deadline.style.color = "green";

    todoEl.appendChild(deadline);
  } else if (dateInput.value === today && dateInput.value)
      alert("OMG! Today is deadline for this task! Do it ASAP!");

  const buttons = document.createElement("span");
  buttons.className = "badge bg-primary rounded-pill";

  const doneBtn = document.createElement("i");
  doneBtn.className = "fa fa-check";
  doneBtn.style.cursor = "pointer";
  buttons.appendChild(doneBtn);

  const undoneBtn = document.createElement("i");
  undoneBtn.classList = "fa fa-times d-none";
  undoneBtn.style.cursor = "pointer";
  buttons.appendChild(undoneBtn);

  buttons.append(" ");

  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fa fa-trash";
  deleteBtn.style.cursor = "pointer";
  buttons.appendChild(deleteBtn);

  todoEl.appendChild(buttons);
  list.appendChild(todoEl);

  function toggleDone() {
    doneBtn.classList.toggle("d-none");
    undoneBtn.classList.toggle("d-none");
    todoEl.classList.toggle("text-decoration-line-through");
  }

  doneBtn.addEventListener("click", toggleDone);
  undoneBtn.addEventListener("click", toggleDone);
  deleteBtn.addEventListener("click", () => {
    todoEl.remove();
    if (list.children.length === 1) deleteAllBtn.classList.add("d-none");
  });
}

const addBtn = document.querySelector("#add-todo-btn");
function addNewTodo(event) {
  console.log("hi");
  event.preventDefault();
  const todoInput = document.querySelector("#todoInput");
  if (todoInput.value) {
    populateTodoList(todoInput.value);
    todoInput.value = "";
    deleteAllBtn.classList.remove("d-none");
    deleteAllBtn.classList.add("d-block");
    todoInput.placeholder = "New todo...";
  } else todoInput.placeholder = "Enter a task HERE!";

  dateInput.classList.add("d-none");
  dateInput.value = "";
}
addBtn.addEventListener("click", addNewTodo);

const deleteAllBtn = document.createElement("button");
deleteAllBtn.append("Delete All Completed");
deleteAllBtn.className = "btn btn-danger mb-3 align-self-center d-none";
list.appendChild(deleteAllBtn);

function deleteAllCompletedTodos() {
  const completedTasks = [...list.children].filter(({ classList }) =>
    classList.contains("text-decoration-line-through")
  );
  if (completedTasks.length === 0) alert("Come on! Finish some tasks first.");
  else
    confirm("You are going to delete ALL completed tasks!")
      ? completedTasks.forEach((element) => element.remove())
      : alert("Ok! Nothing was deleted! Safe to go :)");
  if (list.children.length === 1) deleteAllBtn.classList.add("d-none");
}

deleteAllBtn.addEventListener("click", deleteAllCompletedTodos);

const pickDateBtn = document.createElement("button");
pickDateBtn.append("Pick deadline");
pickDateBtn.className = "btn btn-warning mb-3 ";
document.querySelector("#add-todo-btn").parentElement.appendChild(pickDateBtn);

const dateInput = document.createElement("input");
dateInput.type = "date";
dateInput.min = today;
dateInput.className = "form-control d-none";
document.querySelector("#add-todo-btn").parentElement.appendChild(dateInput);

function pickDate(event) {
  event.preventDefault();
  pickDateBtn.classList.toggle("btn-warning");
  pickDateBtn.classList.toggle("btn-success");

  dateInput.classList.toggle("d-none");
  dateInput.classList.toggle("d-block");
}

pickDateBtn.addEventListener("click", pickDate);
