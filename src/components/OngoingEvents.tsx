import React, { useEffect, useState } from 'react';
import eventData from "../../events.json"

interface Team {
    name: string;
    img: string;
  }

interface Event {
    eventCode: string;
    league: string;
    teamA: Team;
    teamB: Team;
    saleStart: string;
    saleEnds: string;
  }  

const OngoingEvents:React.FC = () =>  {

    const [data, setData] = useState<Event[]>([]);

    useEffect(()=>{
        setData(eventData);
    },[])


  return (
    <div className='text-white ml-[105px] mt-8 '>
       {
        data.map((items,index)=>(
          <div key={index} className='bg-[#2D2F6F] w-[450px] border border-pink-400 rounded-lg '>
            {/* <p key={items.eventCode}>{items.eventCode}</p> */}
            <p className='text-slate-400 font-bold pl-4'>{items.league}</p>
            <div className='flex gap-x-2 text-[20px] pl-4 font-serif mt-5'>
            <p>{items.teamA.name}</p> v.
            <p>{items.teamB.name}</p>
            </div>
            <div className='flex gap-x-4 pl-4 mt-4'>
                {/* left card hai  */}
               <div className='bg-[#453982] w-[180px] flex justify-center text-[50px] border border-pink-200 rounded-lg'>
                   MI
               </div>
               {/* rigth card  */}
               <div className='bg-[#453982] w-[180px] text-[50px] flex justify-center border border-pink-200 rounded-lg'>
                    KKR
               </div>


            </div>
            <p className='text-[20px] font-sans pl-4 mt-4'>League Starts at {items.saleStart}</p>
            <p className='text-[20px] font-sans pl-4 mt-4'>League Ends at {items.saleEnds}</p>
           </div>
        ))
       }


    </div>
  )
}

export default OngoingEvents