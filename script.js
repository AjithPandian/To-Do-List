const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const inputElement = document.querySelector('.input-field');
const addSingleItems = document.querySelector('.add-items');
const container = document.querySelector('.container');
const todoContainer = document.querySelector('#todo-List-container');


onLoadEventListeners();


function onLoadEventListeners() {

    // Listening for single items add in todo-list
    addSingleItems.addEventListener('click', addItemsList);

    form.addEventListener('submit', addToTask);

    todoContainer.addEventListener('click', manageTask);

}

function addItemsList() {
    const input = document.createElement('input');
    input.className = 'task-input-list';
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'list-items')
    input.id = "taskInputEle"
    inputElement.appendChild(input);
}


function addToTask(e) {
    let todoObj = {};
    todoObj.todoElements = [];

    if (taskInput.value === "") {
        alert("Add the List title");
    } else {
        todoObj.taskTitle = taskInput.value;

        let listInputs = container.getElementsByClassName('task-input-list');
        for (let i = 0; i < listInputs.length; i++) {
            todoObj.todoElements.push(listInputs[i].value);
        }
        createToDoLists(todoObj);

        taskInput.value = "";
        while (listInputs.length > 0) {
            listInputs[0].parentNode.removeChild(listInputs[0]);
        }
    }
    e.preventDefault();
}

function createToDoLists(obj) {
    //parent wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    //heading portion
    const heading = headingContainer(obj.taskTitle);
    wrapper.appendChild(heading);

    //taskList portion
    const taskListItems = toDoListContainer(obj.todoElements);
    wrapper.appendChild(taskListItems);


    //adding them to the main container
    todoContainer.appendChild(wrapper);


}

function headingContainer(title) {
    const heading = document.createElement('div');
    heading.className = 'header-align';

    const toDoTitle = document.createElement('span');
    toDoTitle.className = 'card-title';
    toDoTitle.innerText = title;
    heading.appendChild(toDoTitle);

    const clearTasks = document.createElement('div');
    clearTasks.className = 'clear-tasks';

    const del = document.createElement('a');
    del.className = 'clear-tasks-text';
    del.appendChild(document.createTextNode('Delete'))
    clearTasks.appendChild(del);
    heading.appendChild(clearTasks);
    return heading;
}

function toDoListContainer(todoArr) {
    const taskListItems = document.createElement('div');
    taskListItems.className = 'task-list-items';

    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.appendChild(document.createTextNode('Pending list to-do'));
    taskListItems.appendChild(todoText);

    const pendingList = document.createElement('ul');
    pendingList.className = 'collection-todo';

    todoArr.forEach((task) => {
        if (task !== '') {
            const li = document.createElement('li');
            li.className = 'task-items';
            li.appendChild(document.createTextNode(task));

            const done = document.createElement('a');
            done.className = 'done';
            done.appendChild(document.createTextNode('Move to Done'));
            li.appendChild(done);

            const clear = document.createElement('a');
            clear.className = 'clear-item';
            clear.appendChild(document.createTextNode('x'));
            li.appendChild(clear);

            pendingList.appendChild(li);
        }
    });

    //completed List Items
    const completedListHeading = completedListHeadingContainer("Completed");

    taskListItems.appendChild(pendingList);
    taskListItems.appendChild(completedListHeading);
    return taskListItems;
}

function completedListHeadingContainer(heading) {
    const completedText = document.createElement('span');
    completedText.className = 'todo-text';
    completedText.appendChild(document.createTextNode(heading));
    return completedText;
}

function completedTaskItems(task) {
    const completedList = document.createElement('ul');
    completedList.className = 'completed-collection';

    const li = document.createElement('li');
    li.className = 'task-items tasks-done';
    li.appendChild(document.createTextNode(task));

    const done = document.createElement('a');
    done.className = 'pending';
    done.appendChild(document.createTextNode('Move to Pending'));
    li.appendChild(done);

    const clear = document.createElement('a');
    clear.className = 'clear-item';
    clear.appendChild(document.createTextNode('x'));
    li.appendChild(clear);

    completedList.appendChild(li);

    return completedList;
}

function manageTask(e) {
    if (e.target.classList.contains('clear-item')) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('clear-tasks-text')) {
        e.target.parentElement.parentElement.parentElement.remove();
    }

    if (e.target.classList.contains('done')) {
        const completedList = completedTaskItems(e.target.parentElement.firstChild.textContent);
        const taskListItems = e.target.parentElement.parentElement.parentElement;
        taskListItems.appendChild(completedList);
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('pending')) {
        const taskList = e.target.parentElement.parentElement.parentElement.firstChild.nextElementSibling;
        const pendingLi = movetoPendingLists(e.target.parentElement.firstChild.textContent);
        taskList.append(pendingLi);
        e.target.parentElement.parentElement.remove();
    }

}

function movetoPendingLists(task) {
    const li = document.createElement('li');
    li.className = 'task-items';
    li.appendChild(document.createTextNode(task));

    const done = document.createElement('a');
    done.className = 'done';
    done.appendChild(document.createTextNode('Move to Done'));
    li.appendChild(done);

    const clear = document.createElement('a');
    clear.className = 'clear-item';
    clear.appendChild(document.createTextNode('x'));
    li.appendChild(clear);
    return li;
}

