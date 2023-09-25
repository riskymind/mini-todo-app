let todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoInput = document.querySelector(".todo_input");
const todoList = document.querySelector(".todoList");
const todoCount = document.getElementById("todo_count");
const addButton = document.querySelector(".add_btn");
const deleteButton = document.querySelector(".delete_btn");

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  displayTodos();

  addButton.addEventListener("click", addTodo);
  deleteButton.addEventListener("click", deleteTodos);
  todoInput.addEventListener("keydown", (e) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      addTodo();
    }
  });
});

// display all todo
function displayTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
        <div class="todo-container">
            <input type="checkbox" class="todo_checkbox" id="input-${index}" ${
      todo.disable ? "checked" : ""
    }>
            <p id="todo-${index}" class="${
      todo.disable ? "disable" : ""
    }" onclick="editTodo(${index})">${todo.text}</p>
        </div>   
          `;
    p.querySelector(".todo_checkbox").addEventListener("change", (e) => {
      toggleTodo(index);
    });

    todoList.appendChild(p);
  });

  todoCount.textContent = todos.length;
}

// Add Todo
function addTodo() {
  const value = todoInput.value.trim();
  if (value !== "") {
    todos.push({ text: value, disable: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTodos();
  }
}

// Edit todo
function editTodo(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const editingText = todos[index].text;
  const inputField = document.createElement("input");

  inputField.value = editingText;
  todoItem.replaceWith(inputField);
  inputField.focus();

  inputField.addEventListener("blur", () => {
    const updatedText = inputField.value.trim();
    if (updatedText) {
      todos[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTodos();
  });
}

// Delete All Todo
function deleteTodos() {
  todos = [];
  saveToLocalStorage();
  displayTodos();
}

// Toggle todo check state
function toggleTodo(index) {
  todos[index].disable = !todos[index].disable;
  saveToLocalStorage();
  displayTodos();
}

// Save todos to local Storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
