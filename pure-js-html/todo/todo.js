document.addEventListener('DOMContentLoaded',()=>{
    const todo_text = document.getElementById('todo-text');
    const todo_list = document.getElementById('todo-list');
    const todo_add = document.getElementById('add-todo');

    let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
    render(tasks)

    todo_add.addEventListener('click', () => {
        const task = todo_text.value.trim();
        if (task === "") return;
        const newtask = {
            id:Date.now(),
            task:task,
            completed:false
        }
        tasks.push(newtask)
        save_task(tasks)
        clear_render()
        render(tasks)
        todo_text.value="";
    })

    function save_task(tasks){
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    function toggle_complete (id){
        tasks=tasks.map((todo)=>(todo.id === id ? {...todo,completed:!todo.completed}: todo));
        save_task(tasks);
        clear_render();
        render(tasks);
    }

    function delete_todo(id){
        tasks=tasks.filter((todo)=> (todo.id !== id))
        save_task(tasks)
        clear_render()
        render(tasks)
    }
    function enable_edit(id){
        let li = document.getElementById(id)
        let input =li.querySelector('input[type="Text"]')
        input.removeAttribute('disabled')
        input.focus()
        let edit_button = li.getElementsByClassName('editbutton')[0]
        edit_button.innerText='Save'
        let new_button = edit_button.cloneNode(true)
        edit_button.parentNode.replaceChild(new_button,edit_button)
        new_button.addEventListener('click',()=>{
            const newText=input.value
            edit_todo(id,newText)
            input.setAttribute('disabled','true')
            new_button.innerText='Edit'
            new_button.replaceWith(new_button.cloneNode(true))
            new_button.addEventListener('click',()=>enable_edit(id))
        }) 
    }
    function edit_todo(id,text){
        tasks=tasks.map((todo)=>(todo.id === id ? {...todo,task:text}:todo))
        save_task(tasks);
        clear_render();
        render(tasks);
    }
    function render(tasks){
        tasks.forEach(task => {
            const task_element=document.createElement('li')
            task_element.setAttribute('id', task.id)

            const toggle = document.createElement('input')
            toggle.setAttribute('type','checkbox')
            toggle.checked = task.completed
            toggle.addEventListener('click',()=>toggle_complete(task.id))
            toggle.setAttribute('class', 'p-2 m-2 rounded w-6 h-6 ')
            task_element.appendChild(toggle)

            
            const actul_task = document.createElement('input')
            actul_task.setAttribute('type','text')
            actul_task.setAttribute('disabled','true')
            actul_task.setAttribute('class','p-2 m-1 bg-neutral-600 rounded text-center')
            if(task.completed){
                actul_task.classList.add('line-through')
            }
            actul_task.value=task.task
            task_element.appendChild(actul_task)

            const edit = document.createElement('button')
            edit.setAttribute('type','button')
            edit.setAttribute('class','bg-yellow-300 p-2 m-1 rounded hover:bg-yellow-500 text-black editbutton')
            edit.addEventListener('click',()=>{
                enable_edit(task.id)
            })
            edit.textContent='Edit'
            
            task_element.appendChild(edit)

            const delete_task =  document.createElement('button')
            delete_task.setAttribute('type','button')
            delete_task.setAttribute('id',task.id)
            delete_task.setAttribute('class','bg-red-500 p-2 m-1 rounded hover:bg-red-700 text-black')
            delete_task.textContent='Delete'
            delete_task.addEventListener('click',()=>delete_todo(task.id))
            task_element.appendChild(delete_task)
            todo_list.appendChild(task_element)
        });
    }
    function clear_render(){
        todo_list.innerHTML='';
    }
    
    
})


