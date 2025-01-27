import React from 'react'
import Sidebar from '@/components/sidebar';
import Main from '@/components/main'
import "../app/globals.css"
import bg from '../assets/bg.png'
import Navbar from '@/components/navbar';



const Index: React.FC = () => {
  return <div className=' flex bg-gradient ' >
    

<div className='relative'><Sidebar/></div>
<div> </div>
<div className='relative'>
    <Navbar/>
    
    <Main/>
    
    
   
 
    </div>
    
    
    
    </div>;
};

export default Index;