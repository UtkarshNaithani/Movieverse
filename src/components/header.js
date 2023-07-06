import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom'
import { Appstate } from '../App';



const Header = () => {

  //to logout 
  function refresh() {
    window.location.reload(false);
  }

  const useAppstate= useContext(Appstate);
 

  return (
    <div className=' sticky z-10 top-0 text-3xl text-red-500 items-center bg-neutral-950 flex justify-between font-bold p-3 border-b-2 border-gray-500'>
    <Link to={'/'}> <span>Movie<span className='text-white'>Verse</span></span> </Link>
       {
        useAppstate.login ?
        <div className='flex space-x-3'>
       <Link to={'/addmovie'}> <h1 className='text-lg  cursor-pointer flex items-center' >
          <Button ><AddIcon className='mr-1' color='secondary'/><span className='text-white'>Add New</span></Button> 
          </h1></Link>
           <h1 className='text-lg bg-green-500 cursor-pointer flex items-center' >
          <Button onClick={refresh}><span className='text-white font-medium capitalize'>Logout</span></Button> 
          </h1>
          </div>
          :
          <Link to={'/login'}> <h1 className='text-lg bg-green-500 cursor-pointer flex items-center' >
          <Button ><span className='text-white font-medium capitalize'>Login</span></Button> 
          </h1></Link>

       }
    </div>
  )
}

export default Header