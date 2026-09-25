const form = document.getElementById("addForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("list");
const empty = document.getElementById("empty");
const count = document.getElementById("count");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "item" + (todo.done ? " done" : "");

    const check = document.createElement("button");
    check.className = "item__check";
    check.onclick = () => {
      todo.done = !todo.done;
      save();
      render();
    };

    const text = document.createElement("span");
    text.className = "item__text";
    text.textContent = todo.text;

    const remove = document.createElement("button");
    remove.className = "item__remove";
    remove.textContent = "✕";
    remove.onclick = () => {
      todos = todos.filter(t => t.id !== todo.id);
      save();
      render();
    };

    li.append(check, text, remove);
    list.appendChild(li);
  });

  count.textContent = todos.filter(t => !t.done).length + " left";
  empty.classList.toggle("show", todos.length === 0);
}

form.onsubmit = e => {
  e.preventDefault();

  if (!input.value.trim()) return;

  todos.unshift({
    id: Date.now(),
    text: input.value.trim(),
    done: false
  });

  save();
  render();

  input.value = "";
  input.focus();
};

render();