'use strict';


const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('toDo')) || [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item) {
        console.log(item);
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';

        if(item.completed) {
            todoCompleted.append(li);  
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            localStorage.setItem('toDo', JSON.stringify(todoData));
            render();
        });

        const removeTodo = li.querySelector('.todo-remove');
        removeTodo.addEventListener('click', function() {
            todoData.splice(todoData.indexOf(item), 1);
            localStorage.setItem('toDo', JSON.stringify(todoData));
            render();
        });
    });
};

todoControl.addEventListener('submit', function(event) {

    event.preventDefault();
    headerInput.value = headerInput.value.trim();

    if(headerInput.value !== '') {
        const newTodo = {
        value: headerInput.value,
        completed: false
    };

    headerInput.value = '';
    todoData.push(newTodo);
    localStorage.setItem('toDo', JSON.stringify(todoData));
    render();
    }
});

render();