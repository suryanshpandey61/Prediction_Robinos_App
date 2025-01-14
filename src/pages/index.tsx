import React from 'react'
import Sidebar from '@/components/sidebar';
import Main from '@/components/main'
import "../app/globals.css"
import Navbar from '@/components/navbar';
import OngoingEvents from '@/components/OngoingEvents';


const Index: React.FC = () => {
  return <div className=' flex bg-gradient' >
    

<div className='fixed'><Sidebar/></div>
<div> </div>
<div className='relative ml-[300px]'>
    <Navbar/>
    <Main/>
    <OngoingEvents/>
 
    </div>
    
    
    
    </div>;
};

export default Index;