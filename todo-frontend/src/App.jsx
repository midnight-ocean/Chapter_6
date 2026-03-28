import TodoList from "./components/ToDoList";
import { useState, useEffect } from "react";
import todoService from "./services/todos";
import authService from "./services/auth";
const App = () => {
  const [todos, setTodos] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect (() => {
    //helper async function
    const fetchTodos = async () => {
      const res = await todoService.getTodos();
      setTodos(res);
    };
    //call that helper async here
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    // prevent page refresh
    e.preventDefault();

    try {
      const result = await authService.login({ username, password });
      console.log("login response:", result);
      setLoggedUser({ username: result.username, name: result.name });
    } catch (error) {
      console.error("Invalid Credentials:", error);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Todo App</h1>
      {loggedUser && (
      <>
      <span>Howdy, {loggedUser.name}!</span>
      <button onClick={() => setLoggedUser(null)}>Logout</button>

  )}
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        username
        <input value = {username}
        onChange={e=>setUsername(e.target.value)}/>
        <br />
        password
      <input type="password" value = {password}
      onChange={e=>setPassword(e.target.value)}/>
      <br />
      <button type="submit">Login</button>
      </form>
      <TodoList todos = {todos}/>
    </div>
  ); 
}; 

export default App; 