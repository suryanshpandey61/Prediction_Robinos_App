import React from 'react'
import Sidebar from '@/components/sidebar';
import Main from '@/components/main'
import "../app/globals.css"
import Navbar from '@/components/navbar';
import OngoingEvents from '@/components/OngoingEvents';

const Index: React.FC = () => {
  return <div className='h-[100vh] flex bg-gradient' >
    

<div className=''><Sidebar/></div>
<div className=''>
    <Navbar/>
    <Main/>
    <OngoingEvents/>
    </div>
    
    
    
    </div>;
};

export default Index;