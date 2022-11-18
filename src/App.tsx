import React, {useEffect, useState} from 'react';
import './App.scss';
import Form from "./components/Form";
import {TodoProps} from "./types";
import Todo from "./components/Todo";

const App: React.FC = () => {
    const [todos, setTodos] = useState<TodoProps[]>([])
    const [errorMessage, setErrorMessage] = useState<string>('')

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
        setErrorMessage('')
        const todo = todos.find(todo => {return todo.title === title})
        if (todo === undefined) {
            const updatedTodos = [...todos, {
                id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
                title: title,
                createdAt: Date.now()
            }]
            setTodos(updatedTodos)
            updateLocalStorage(updatedTodos)
        } else {
            setErrorMessage('Tâche déjà existante')
        }
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
            <Form onSubmit={title => handleSubmit(title)} error={errorMessage.length > 0} />
            {errorMessage.length > 0 &&
                <p className="error-message">{errorMessage}</p>
            }
            <p className="todo-info">Il y a {todos.length} todos.</p>
            <div className="list">
                {todos.map((todo) => {
                    return (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            createdAt={todo.createdAt}
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
