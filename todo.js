let taskList =[] ;
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('add-task');
const taskListElement = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        taskList.push({task, completed: false});
        renderTaskList();
        taskInput.value = '';
    }
}

function renderTaskList() {
    const taskListHtml = taskList.map((task, index) =>{
        return`
        <li data-index="${index}">
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class=" ${task.completed ? 'completed' : ''}"> ${task.task}</span>
            <button class="delete-task">Delete</button>
        </li>
        `;
    }).join('');
    taskListElement.innerHTML = taskListHtml;


    const checkboxes = taskListElement.querySelectorAll('input[type="checkbox"]');
    const deleteButtons = taskListElement.querySelectorAll('.delete-task');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('chenge', (e) => {
            const index = e.target.parentNode.dataset.index;
            taskList[index].completed = e.target.checked;
            renderTaskList();
        })
    })
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.parentNode.dataset.index;
            taskList.splice(index, 1);
            renderTaskList();
        })
    })
}