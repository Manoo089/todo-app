const state = {
    filter: "",
    input: "",
    todos: [],
    isDone: false,
};

function addTodo() {
    state.todos.push(inputText.value);
    inputText.value = "";
}

function render() {
    const todoEntry = document.createElement("li");
    todosList.appendChild(todoEntry).textContent = state.todos.pop();
}

function handleEvents() {
    addTodo();
    render();
}

const inputText = document.querySelector("#input-todo");

const addButton = document.querySelector("#add-todo");
addButton.addEventListener("click", handleEvents);

const todosList = document.querySelector(".todos-list");