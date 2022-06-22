import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
// import LoginForm from "./LoginForm"
// import Users from "../Users"
// import ManagerNav from "./manager/ManagerNav"
// import OperatorNav from "./operator/OperatorNav"


function Home() {
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
}

  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/')
    }

    if (!authToken) {
      navigate('login')
    }
  }, [])
  return (
      <div>
          Home Page

          <Button variant="outlined" onClick={handleLogout}>Log out </Button>

      </div>
  )
}

export default Home

// function Home() {
//   const managers = []
//   Users.map(user => {
//     user.manager && managers.push(user)
//     return (
//       managers
//     )
//   })

//   const operators = []
//   Users.map(user => {
//     !user.manager && operators.push(user)
//     return (
//       operators
//     )
//   })

//   const [user, setUser] = useState({name: "", email: ""});
//   const [error, setError] = useState("");

//   const Login = details => {
//     console.log(details);

//     if (details.email === managers.find(manager => manager.email).email && details.password === managers.find(manager => manager.password).password) {
//       console.log("Logged in")
//       setUser({
//         name: details.name,
//         email: details.email,
//         manager: true
//       });
//     } else if (details.email === operators.find(operator => operator.email).email && details.password === operators.find(operator => operator.password).password) {
//       setUser({
//         name: details.name,
//         email: details.email,
//         manager: false
//       });
//     } else {
//       console.log("Details do not match!")
//       setError("Details do not match!")
//     }
//   }

//   const Logout = () => {
//     setUser({name: "", email: ""});
//   }

//   return (
//     <div className="App">
//       {(user.email !== "") ? (
//         <div>{
//           user.manager ? (
//             <div>
//               <ManagerNav />
//               <h2>Welcome, Manager <span>{user.name}</span>!</h2>
//             </div>
//           ) : (
//             <div>
//               <OperatorNav />
//               <h2>Welcome, Operator <span>{user.name}</span>!</h2>
//             </div>
//           )
//         }
//         <button onClick={Logout}>Logout</button>
//         </div>
//       ) : (
//         <LoginForm login={Login} error={error} />
//       )}
//     </div>
//   );
// }

// export default Home
