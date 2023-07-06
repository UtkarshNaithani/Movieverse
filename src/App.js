import Header from './components/header'
import Cards from './components/Cards'
import AddMovie from './components/AddMovie'
import {Route, Routes} from 'react-router-dom';
import Detail from './components/Detail';
import { createContext, useContext, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const Appstate=createContext();

function App() {
  //initially login and username are false and empty
  const[login,setLogin]=useState(false);
  const[userName,setuserName]=useState("");

  

  return (
    <Appstate.Provider value={{login,userName,setLogin,setuserName}}>
    <div className="App relative">
        
        <Header />
        <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Routes>

    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
