const input = document.getElementById('input');
const list = document.getElementById('list');

function addTask() {
    const userInput = input.value.trim();
    if (userInput) {
        localStorage.setItem(`task ${localStorage.length}`, userInput);
        location.reload();
    } else {
        alert('Enter a valid task');
    }
}

function putElements() {
    const tasks = [];
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key.startsWith('task')) {
            tasks.push(key);
        }
    }

    tasks.sort((a, b)=> (a.split(' ')[1]) - (b.split(' ')[1]));

    tasks.forEach((key)=>{
        const task = document.createElement('li');
        task.innerText = localStorage.getItem(key);
        task.setAttribute('done', 'false');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.setAttribute('id', 'btn1');
        deleteBtn.onclick = ()=> deleteTask(key);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.setAttribute('id', 'btn2');
        editBtn.onclick = ()=> editTask(key);

        const doneBtn = document.createElement('button');
        doneBtn.innerText = 'Done';
        doneBtn.setAttribute('id', 'btn3');
        doneBtn.onclick = ()=> doneTask(task);

        task.appendChild(deleteBtn);
        task.appendChild(editBtn);
        task.appendChild(doneBtn);
        list.appendChild(task);
    })
}

function deleteTask(key) {
    localStorage.removeItem(key);
    location.reload();
}

function editTask(key) {
    const edited = prompt('Enter Your edit task: ');
    if(edited) {
        localStorage.setItem(key, edited);
        location.reload();
    } else {
        alert('Enter a valid edited task');
    }
}

function doneTask(task) {
    const check = task.getAttribute('done');
    if(check === 'false') {
        task.style.backgroundColor = 'green';
        task.setAttribute('done', 'true');
    } else {
        task.style.backgroundColor = '#444';
        task.setAttribute('done', 'false');
    }
}

window.onload = putElements();