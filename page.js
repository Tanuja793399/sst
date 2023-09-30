

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskDatetimeInput = document.getElementById('task-datetime');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');
let editingTask = null;

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = taskInput.value;
    const taskDatetime = taskDatetimeInput.value;

    if (taskText.trim() === '') {
        return;
    }

    if (editingTask) {
        // If we are editing a task, update it instead of adding a new one
        editingTask.querySelector('label').textContent = taskText;
        editingTask.querySelector('label.time-label').textContent = taskDatetime;
        taskForm.reset();
        editingTask = null;
        return;
    }

    const taskItem = createTaskItem(taskText, taskDatetime);

    taskItem.querySelector('button.edit-button').addEventListener('click', function () {
        // Handle task editing
        taskInput.value = taskText;
        taskDatetimeInput.value = taskDatetime;
        editingTask = taskItem;
    });

    taskItem.querySelector('button.delete-button').addEventListener('click', function () {
        // Handle task deletion
        taskItem.remove();
    });

    pendingTasksList.appendChild(taskItem);

    taskForm.reset();
});

function createTaskItem(taskText, taskDatetime) {
    const taskItem = document.createElement('li');
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    const taskLabel = document.createElement('label');
    taskLabel.textContent = taskText;
    taskLabel.classList.add('task-label');
    const taskTimeLabel = document.createElement('label');
    taskTimeLabel.textContent = taskDatetime;
    taskTimeLabel.classList.add('time-label');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(taskTimeLabel);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskCheckbox.addEventListener('change', function () {
        if (taskCheckbox.checked) {
            taskLabel.classList.add('completed-task');
            completedTasksList.appendChild(taskItem);
        } else {
            taskLabel.classList.remove('completed-task');
            pendingTasksList.appendChild(taskItem);
        }
    });

    return taskItem;
}



