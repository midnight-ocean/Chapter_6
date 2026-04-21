const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
    return (
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div> Username: {""}
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div> Password: {""}
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    )
}

export default LoginForm;