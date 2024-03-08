import { useEffect, useState } from "react"
import { AddTodoForm } from "./AddTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("TODOS")

        if (storedTodos == null){
            //This is the user's first time coming to this website
            const defaultTodos = JSON.stringify([{"id":crypto.randomUUID(),"todotext":"Hello! This is a simple todo project using ReactJS",  "completed":false},
                {"id":crypto.randomUUID(),"todotext":"You can create todo items using the form on the left",  "completed":false},
                {"id":crypto.randomUUID(),"todotext":"You can check todos off the list, and delete them using this button ->",  "completed":true},
                {"id":crypto.randomUUID(),"todotext":"If you exit the page and come back your todos will stay the same",  "completed":false}
                ])
            localStorage.setItem("TODOS", defaultTodos)
            return defaultTodos
        }

        return JSON.parse(storedTodos)
    })

    useEffect(() => {
        localStorage.setItem("TODOS", JSON.stringify(todos))
    }, [todos])

    function addTodo(todotext) {
        setTodos(currentTodos => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), todotext, completed: false },
            ]
        })
    }

    function toggleTodo(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }

                return todo
            })
        })
    }

    function deleteTodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

    return (
        <>
            <div className="column">
                <h1 className="header">Add Todo</h1>
                <AddTodoForm onSubmit={addTodo} />
            </div>
            <div className="column">
                <h1 className="header">Todo List</h1>
                <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </div>
        </>
    )
}
