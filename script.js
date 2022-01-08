class TodoApp {
    state = {
        filter: "all",
        input: "",
        todos: [
            { text: "Leberkaas essen", isDone: false },
            { text: "Augustiner trinken", isDone: false },
        ],
    };

    constructor() {
        this.initEventHandlers();
        this.render();
    }

    initEventHandlers = () => {
        document
            .querySelector("#input-todo")
            .addEventListener("keydown", this.handleAddTodoKeydownEvent);
        document
            .querySelector("#input-todo")
            .addEventListener("input", this.handleInputEvent);
        document
            .querySelector(".filter__container")
            .addEventListener("input", this.handleFilterEvent);
        document
            .querySelector("#add-todo-button")
            .addEventListener("click", this.handleAddTodo);
        document
            .querySelector("#delete-todo-button")
            .addEventListener("click", this.handleRemoveDoneEvent);
    };

    handleAddTodoKeydownEvent = (event) => {
        if (event.keyCode === 13) {
            this.handleAddTodo();
        }
    };

    handleInputEvent = () => {
        const inputElement = document.querySelector("#input-todo");
        const currentValue = inputElement.value;
        this.state.input = currentValue;
    };

    handleFilterEvent = (event) => {
        const clickedCheckbox = event.target;
        const filter = clickedCheckbox.value;
        this.state.filter = filter;
        this.render();
    };

    handleAddTodo = () => {
        const newTodoText = this.state.input;
        const newTodo = { text: newTodoText, isDone: false };
        this.state.todos.push(newTodo);

        const input = document.querySelector("#input-todo");
        input.value = "";

        this.render();
    };

    handleRemoveDoneEvent = () => {
        const onlyOpenTodos = this.state.todos.filter(
            (todo) => todo.isDone === false
        );
        this.state.todos = onlyOpenTodos;
        this.render();
    };

    renderCheckboxElement = (todo) => {
        const checkboxIsDone = document.createElement("input");
        checkboxIsDone.type = "checkbox";

        checkboxIsDone.addEventListener("input", () => {
            todo.isDone = !todo.isDone;
            this.render();
        });

        if (todo.isDone === true) {
            checkboxIsDone.setAttribute("checked", "");
        }

        return checkboxIsDone;
    };

    renderLiElement = (todo) => {
        const newLi = document.createElement("li");

        if (todo.isDone === true) {
            newLi.style.textDecoration = "line-through";
        }
        newLi.textContent = todo.text;
        return newLi;
    };

    render = () => {
        const todoList = document.querySelector("#todos-list");

        todoList.innerHTML = "";

        switch (this.state.filter) {
            case "all":
                this.state.todos.forEach((todo) => {
                    const newLi = this.renderLiElement(todo);
                    const checkboxElem = this.renderCheckboxElement(todo);

                    todoList.appendChild(newLi);
                    newLi.appendChild(checkboxElem);
                });
                break;
            case "open":
                this.state.todos.forEach((todo) => {
                    if (todo.isDone === false) {
                        const newLi = this.renderLiElement(todo);
                        const checkboxElem = this.renderCheckboxElement(todo);

                        newLi.appendChild(checkboxElem);
                        todoList.appendChild(newLi);
                    }
                });
                break;
            case "done":
                this.state.todos.forEach((todo) => {
                    if (todo.isDone === true) {
                        const newLi = this.renderLiElement(todo);
                        const checkboxElem = this.renderCheckboxElement(todo);

                        newLi.appendChild(checkboxElem);
                        todoList.appendChild(newLi);
                    }
                });
                break;
        }
    };
}

const app = new TodoApp();