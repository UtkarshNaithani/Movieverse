import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { db, reviewsRef } from '../firebase/firebase';
import { addDoc,doc,updateDoc,query,where,getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id,prevRating,userRated}) => {
    //to fill name which has logged in we will use useAppstate
    const useAppstate=useContext(Appstate);
    const navigate=useNavigate();
    const[rating,setRating]=useState(0);
    //1st send your reviews i.e. thoughts on the database
    const[loading,setLoading]=useState(false);
    //getting user's thought
    const[form,setForm]=useState("");
    const[reviewsloading,setreviewslaoding]=useState(false);
    const[data,setData]=useState([]);
    const [newAdded,setNewAdded]=useState(0);

    //send review function
    const sendReview = async()=>{
        setLoading(true);
        try{
                if(useAppstate.login){
            await addDoc(reviewsRef,{
                movieid:id,
                name:useAppstate.userName,
                rating:rating,
                thought:form,
                timestamp:new Date().getTime()
            })
            //to access that  particular doc ref
            const ref=doc(db,"movies",id);
            await updateDoc(ref,{
                //total rating update
                   rating : prevRating+rating,
                   rated : userRated+1
            })

            setRating(0);
            setForm("");
            setNewAdded(newAdded+1);
            swal({
                title:"Review Sent",
                icon:"success",
                buttons:false,
                timer:3000
            })
        } else{
             navigate('/login');   
        } 
    }    
    catch(error){
            swal({
                title:"error.message",
                icon:"error",
                buttons:false,
                timer:3000
            })
        }
        setLoading(false);
    }

    //to get the reviews
    useEffect(()=>{
        async function getData(){
            setreviewslaoding(true);
            setData([]);
            //fetch according to movieid
            let quer=query(reviewsRef,where('movieid','==',id))
            const querySnapshot=await getDocs(quer);
            querySnapshot.forEach((doc)=>{
                setData((prev)=>[...prev,doc.data()])
            })
            setreviewslaoding(false);
        }
        getData();
    },[newAdded])


  return (
    <div className='mt-2 border-t-2 border-gray-700 w-full'>
        <ReactStars 
            size={30}
            half={true}
            value={rating}
            onChange={(rate)=>setRating(rate)}
            />
        <input
            value={form}
            onChange={(e)=>setForm(e.target.value)}

            placeholder='Share your thoughts...'
            className='w-full p-2 outline-none header'
        />

        <button onClick={sendReview} className='bg-green-600 flex justify-center w-full p-2'>
            
           {loading ? <TailSpin height={20} color='white'/> : 'Share'} 
        </button>
        {
            reviewsloading ?
           <div className='mt-6 flex justify-center'> <ThreeDots height={10} color='white'/></div>
            :
            <div className='mt-4 '>
                {data.map((e,i)=>{
                    return(
                        <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 bor mt-2' key={i}>
                            <div className='flex items-center'>
                            <p className='text-blue-500'>{e.name}</p>
                            <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                            </div>
                            <ReactStars 
                           size={15}
                            half={true}
                            value={e.rating}
                           edit={false}
                           />
                            <p>{e.thought}</p>
                        </div>
                        
                    )
                })}
            </div>
        }

    </div>
  )
}

export default Reviews