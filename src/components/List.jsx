import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleComplete, updateTodo } from '../features/todo/todoSlice';

export default function List({todo}) {
    const dispatch = useDispatch();

    const [todoEdit, settodoEdit] = useState(false);
    const [messages, setMessages] = useState(todo.text);

    return (
        <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
            todo.complete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
    >
        <input
            type="checkbox"
            className="cursor-pointer"
            checked={todo.complete}
            onChange={()=>{dispatch(toggleComplete({id:todo.id}))}}
        />
        <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg ${
                todoEdit ? "border-black/10 px-2" : "border-transparent"
            } ${todo.complete ? "line-through" : ""}`}
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            readOnly={!todoEdit}
        />
        {/* Edit, Save Button */}
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
                if (todo.complete) return;

                if (todoEdit) {
                    dispatch(updateTodo({id:todo.id,text:messages}));
                    settodoEdit(false)
                } else settodoEdit((prev) => !prev);
            }}
            disabled={todo.complete}
        >
            {todoEdit ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => dispatch(removeTodo(todo.id))}
        >
            ❌
        </button>
    </div>
    );
}
