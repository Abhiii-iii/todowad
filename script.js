const form = document.getElementById("addForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("list");
const empty = document.getElementById("empty");
const count = document.getElementById("count");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showTodos() {
  list.innerHTML = "";

  todos.forEach(todo => {
    const item = document.createElement("li");
    item.className = "item";

    if (todo.done) {
      item.classList.add("done");
    }

    const checkButton = document.createElement("button");
    checkButton.className = "item__check";

    checkButton.onclick = () => {
      todo.done = !todo.done;
      saveTodos();
      showTodos();
    };

    const text = document.createElement("span");
    text.className = "item__text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "item__remove";
    deleteButton.textContent = "✕";

    deleteButton.onclick = () => {
      todos = todos.filter(item => item.id !== todo.id);
      saveTodos();
      showTodos();
    };

    item.append(checkButton, text, deleteButton);
    list.appendChild(item);
  });

  count.textContent = todos.filter(todo => !todo.done).length + " left";
  empty.classList.toggle("show", todos.length === 0);
}

form.onsubmit = event => {
  event.preventDefault();

  if (input.value.trim() === "") {
    return;
  }

  todos.unshift({
    id: Date.now(),
    text: input.value.trim(),
    done: false
  });

  saveTodos();
  showTodos();

  input.value = "";
  input.focus();
};

showTodos();
