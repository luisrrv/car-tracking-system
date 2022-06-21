import React, { useState } from "react"
import LoginForm from "./components/LoginForm"
import Users from "./Users"

function App() {
  const managers = []
  const managerUser = Users.map(user => {
    user.manager && managers.push(user)
    return (
      managers.map(manager => {
        // console.log(manager)
        return (
          {
            email: manager.email,
            password: manager.password,
            manager: true
          }
        )
      })
    )
  })

  const operators = []
  const operatorUser = Users.map(user => {
    !user.manager && operators.push(user)
    return (
      operators.map(operator => {
        // console.log(operator)
        return (
          {
            email: operator.email,
            password: operator.password,
            manager: false
          }
        )
      })
    )
  })


  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
    if (details.email === managerUser.email && details.password === managerUser.password) {
      console.log("Logged in")
      setUser({
        name: details.name,
        email: details.email
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
      {(user.email != "") ? (
        <div>
          <h2>Welcome, <span>{user.name}</span>!</h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
