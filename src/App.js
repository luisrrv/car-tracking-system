import React, { useState } from "react"
import LoginForm from "./components/LoginForm"
import Users from "./Users"

function App() {
  const managers = []
  Users.map(user => {
    user.manager && managers.push(user)
    return (
      managers
    )
  })

  const operators = []
  Users.map(user => {
    !user.manager && operators.push(user)
    return (
      operators
    )
  })

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email === managers.find(manager => manager.email).email && details.password === managers.find(manager => manager.password).password) {
      console.log("Logged in")
      setUser({
        name: details.name,
        email: details.email,
        manager: true
      });
    } else if (details.email === operators.find(operator => operator.email).email && details.password === operators.find(operator => operator.password).password) {
      setUser({
        name: details.name,
        email: details.email,
        manager: false
      });
    } else {
      console.log("Details do not match!")
      setError("Details do not match!")
    }
  }

  const Logout = () => {
    setUser({name: "", email: ""});
  }

  return (
    <div className="App">
      {(user.email !== "") ? (
        <div>{
          user.manager ? (
            <h2>Welcome, Manager <span>{user.name}</span>!</h2>
          ) : (
            <h2>Welcome, Operator <span>{user.name}</span>!</h2>
          )
        }
        <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
