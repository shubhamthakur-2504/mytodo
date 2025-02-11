import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:JSON.parse(localStorage.getItem('todos')) ||[]
}

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo : (state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload,
                complete:false,
            }
            state.todos.push(todo)
            localStorage.setItem('todos',JSON.stringify(state.todos))
        },
        removeTodo: (state,action)=>{
            state.todos=state.todos.filter((todo)=>(todo.id !== action.payload))
            localStorage.setItem('todos',JSON.stringify(state.todos))
        },
        updateTodo : (state,action)=>{
            state.todos=state.todos.map((todo)=>(todo.id === action.payload.id ? {...todo,text:action.payload.text} : todo))
            localStorage.setItem('todos',JSON.stringify(state.todos))
        },
        toggleComplete:(state,action)=>{
            state.todos=state.todos.map((todo)=>(todo.id === action.payload.id ? {...todo,complete:!todo.complete}:todo))
            localStorage.setItem('todos',JSON.stringify(state.todos))
        }
    }
})

export const {addTodo,removeTodo,updateTodo,toggleComplete} = todoSlice.actions
export default todoSlice.reducer