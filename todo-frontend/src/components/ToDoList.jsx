import Todo from './Todo';
import React from 'react'; 
const ToDoList = ({todos}) => {
    return (
        <div>
            <h3>ToDo List</h3>
            <ul>
                {todos.map((t) => (
                    <li key = {t.id}>
                    <Todo todo={t} />
                    </li>)
            )}
            </ul>
        </div>
    ); 
}; 

export default ToDoList;