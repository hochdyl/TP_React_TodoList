import React, {useEffect, useState} from 'react';
import './App.scss';
import Form from "./components/Form";
import {TodoProps} from "./types";
import Todo from "./components/Todo";

const App: React.FC = () => {
    const [todos, setTodos] = useState<TodoProps[]>([])

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos')
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    const updateLocalStorage = (todos: TodoProps[]) => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const handleSubmit = (title: string) => {
        const updatedTodos = [...todos, {
            id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
            title: title
        }]
        setTodos(updatedTodos)
        updateLocalStorage(updatedTodos)
    }

    const handleEdit = (id: number, newTitle: string) => {
        const updatedTodos = [...todos]
        updatedTodos[todos.findIndex(todo => todo.id === id)].title = newTitle
        setTodos(updatedTodos)
        updateLocalStorage(updatedTodos)
    }

    const handleDelete = (id: number) => {
        const updatedTodos = [...todos]
        updatedTodos.splice(todos.findIndex(todo => todo.id === id), 1)
        setTodos(updatedTodos)
        updateLocalStorage(updatedTodos)
    }

    return (
        <div className="app-wrapper">
            <Form onSubmit={title => handleSubmit(title)} />
            <div className="list">
                {todos.map((todo) => {
                    return (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            onEdit={(id, newTitle) => handleEdit(id, newTitle)}
                            onDelete={id => handleDelete(id)}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
