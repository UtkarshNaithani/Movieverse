import React, { useEffect,useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import ReactStars from "react-stars";
import{ Audio,ThreeDots } from "react-loader-spinner";
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
    // use State hook with data = array of objects
    const [data, setData] = useState([]);
    const[loading, setLoading]=useState(false);
    //to get the data from the collection
    useEffect(()=>{
        async function getData(){
            setLoading(true);
            const _data=await getDocs(moviesRef)
            //will return the doc,add the prev data and it insert it into data in usestate which we are mapping below
           _data.forEach((doc)=>{
                setData((prv)=>[...prv, {...(doc.data()),id:doc.id}])
           })
            setLoading(false);

        }
        getData();
    },[])
    return (

       <div className='flex flex-wrap justify-between px-2 mt-2'>
            {/* e->element(the complete object i.e. data), i->index */}
         {/* data.map will map all the elements present in data */}
        { loading? <div className="w-full flex justify-center items-center h-96"><ThreeDots height={40} color='white' /> </div>:
       
          data.map((e,i)=> { 
            return(
            // key should be unique i.e. we are taking index
           <Link to={`/detail/${e.id}`}> <div key={i} className='card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration:500'>
                <img className='h-60 md:h-72 ' src={e.image} />
                <h1 > 
                {e.title}
                </h1>
                <h1 className='flex items-center' ><span className='text-gray-500 mr-1'>Rating:</span> 
                <ReactStars 
                size={20}
                half={true}
                value= {e.rating/e.rated}
                edit={false}
                />
                </h1>
                <h1 ><span className='text-gray-500'>Year:</span>  {e.year}
                </h1>
        
            </div></Link>


           )}) }
            
        </div>
    );
};

export default Cards