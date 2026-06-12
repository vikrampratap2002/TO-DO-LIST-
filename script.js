let todos = JSON.parse(localStorage.getItem("todos")) || [];

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addTodo);

function addTodo(){

    const name = document.getElementById("itemName").value.trim();
    const date = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    if(!name || !date || !priority){
        alert("Please fill all fields");
        return;
    }

    const todo = {
        id: Date.now(),
        name,
        date,
        priority,
        completed:false
    };

    todos.push(todo);

    saveTodos();

    document.getElementById("itemName").value="";
    document.getElementById("deadline").value="";
    document.getElementById("priority").value="";

    renderTodos();
}

function deleteTodo(id){

    todos = todos.filter(todo => todo.id !== id);

    saveTodos();
    renderTodos();
}

function toggleComplete(id){

    todos = todos.map(todo => {

        if(todo.id === id){
            todo.completed = !todo.completed;
        }

        return todo;
    });

    saveTodos();
    renderTodos();
}

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoElement(todo){

    const div = document.createElement("div");

    div.className = todo.completed
        ? "todo completed"
        : "todo";

    div.innerHTML = `
        <span>${todo.name}</span>
        <span>${formatDate(todo.date)}</span>
        <span>Priority: ${todo.priority}</span>

        <div class="actions">
            <button class="tick"
                onclick="toggleComplete(${todo.id})">
                ✓
            </button>

            <button class="delete"
                onclick="deleteTodo(${todo.id})">
                🗑
            </button>
        </div>
    `;

    return div;
}

function formatDate(date){

    const d = new Date(date);

    return d.toLocaleDateString("en-GB");
}

function renderTodos(){

    const todayList = document.getElementById("todayList");
    const futureList = document.getElementById("futureList");
    const completedList = document.getElementById("completedList");

    todayList.innerHTML = "";
    futureList.innerHTML = "";
    completedList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    todos.forEach(todo => {

        const element = createTodoElement(todo);

        if(todo.completed){

            completedList.appendChild(element);

        }else if(todo.date === today){

            todayList.appendChild(element);

        }else{

            futureList.appendChild(element);
        }
    });
}

renderTodos();
