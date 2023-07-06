import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { moviesRef } from '../firebase/firebase'
import { doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { getDoc } from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner'
import  Reviews  from './Reviews'

const Detail = () => {
    //id passed in App.js i.e. detail/:id
    const {id}=useParams();
    //with the help of this id we can fetch the data
    const[data, setData]=useState({
        title:"",
        year:"",
        image:"",
        description:"",
        rating:0,
        rated:0
    });

    const[loading,setLoading]=useState(false);

    useEffect(()=>{
         async function getData(){
            setLoading(true);
            //doc to fetch for the reference for a particular id
            const _doc=doc(db,"movies", id);
            //getdoc to fetch data from that reference
            const _data=await getDoc(_doc);
            //data field will be changed
            setData(_data.data());
            setLoading(false);
         }  
         getData(); 
    },[])
    return (
        <div className='p-4 mt-4 w-full flex flex-col md:flex-row items-center  md:items-start justify-center'>
          { loading ? <div className='h-96 flex w-full justify-center items-center'><ThreeCircles height={30} color='white'/></div> :
            <>
            <img className='h-96 block md:sticky top-24' src={data.image} />
            <div className='md:ml-4 ml-0 w-full md:w-1/2'>
                <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
                <ReactStars 
                size={20}
                half={true}
                value= {data.rating/data.rated}
                edit={false}
                />
                <p className='mt-2'>
                     {data.description}   
                </p>
                {/* prop sent-id && prevRating to reviews component */}
                <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
               
            </div>
            </>
}
        </div>
    )
}

export default Detail