// [SECTION] DEPENDENCIES
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// [SECTION] FILE IMPORTS
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Catalog from './pages/Catalog';
import ItemView from './pages/ItemView'
import AdminDash from './pages/AdminDash'
import CartDash from './pages/CartDash';
import Error from './pages/Error';

import './App.css';
import {UserProvider} from './UserContext';

// [SECTION] PROVIDER
function App() {

  const baseURL = process.env.REACT_APP_BASE_URL; 

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

const unsetUser = () => {
  localStorage.clear();
}

useEffect(() => {

  fetch(`${baseURL}/users/getUserDetails`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then(res => res.json())
  .then (data => {
    console.log(data)

        if(typeof data._id !== "undefined"){
            setUser({
              id: data._id,
              isAdmin: data.isAdmin
            })

        } else {

              // set back the initial state of user
              setUser({
                id: null,
                isAdmin: null
              })
        }

  })

}, [baseURL])


// [SECTION] RENDERING
  return(
    <>
    <UserProvider value ={{user, setUser, unsetUser}}>
    <Router>
    <AppNavBar/> 
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/catalog" element={<Catalog/>}/>
      <Route exact path="/itemView/:itemId" element={<ItemView/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
      <Route exact path="/admin" element={<AdminDash/>}/>
      <Route exact path="/cart" element={<CartDash/>}/>
      <Route exact path="*" element={<Error/>}/>
    </Routes>
    </Router>
    </UserProvider>
    </>
  )
};

export default App;
