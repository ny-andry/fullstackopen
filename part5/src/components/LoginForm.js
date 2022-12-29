const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button id="login" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
