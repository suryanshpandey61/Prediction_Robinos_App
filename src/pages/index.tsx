import React from 'react'
import Sidebar from '@/components/sidebar';
import Main from '@/components/main'
import "../app/globals.css"
import bg from '../assets/bg.png'
import Navbar from '@/components/navbar';



const Index: React.FC = () => {
  return <div className=' flex bg-gradient ' >
    

<div className='fixed'><Sidebar/></div>
<div> </div>
<div className=''>
    <Navbar/>
    
    <Main/>
    
    
   
 
    </div>
    
    
    
    </div>;
};

export default Index;