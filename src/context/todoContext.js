import {createContext,useContext }from 'react'

export const TodoContext= createContext({
    todos:[],
    addTodos:(todo)=>{},
    updateTodos:(todo,id)=>{},
    deleteTodos:(id)=>{},
    toggleComplete:(id)=>{}
})

export const useTodo=()=>{
    return useContext(TodoContext)
}

export const TodoProvider=TodoContext.Provider