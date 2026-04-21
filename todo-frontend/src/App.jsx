import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import todoService from "./services/todos";
import authService from "./services/auth";

const App = () => {
  const [todos, setTodos] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    // helper async function
    const fetchTodos = async () => {
      const res = await todoService.getTodos();
      setTodos(res);
    };
    // call that helper async here
    fetchTodos();
  }, []);

    useEffect(() => {
    const refreshUser = async () => {
      try {
        const userInfo = await authService.refreshUser();
        setLoggedUser(userInfo);
      } catch (error) {
        setLoggedUser(null);
      }
    };
    refreshUser();
  }, []);

  const handleSubmit = async (e) => {
    // prevent page refresh
    e.preventDefault();

    try {
      const result = await authService.login({ username, password });
      console.log("Login Response: ", result);
      setLoggedUser({ username: result.username, name: result.name });
    } catch (error) {
      console.log("Invalid Credentials");
    }

    setUsername("");
    setPassword("");
  };

  
  const handleLogout = async () => {
    try {
      await authService.logout();
      setLoggedUser(null);
    } catch (error) {
      setLoggedUser(null);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      {loggedUser && (
        <>
          <span>Howdy, {loggedUser.username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!loggedUser && (
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      )}

      <TodoList todos={todos} />
    </div>
  );
};

export default App;