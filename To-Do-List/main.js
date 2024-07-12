document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        li.addEventListener('click', function() {
            li.remove();
        });

        taskList.appendChild(li);

        li.addEventListener('click', function() {
            li.classList.toggle('completed');
        });
    }
});
