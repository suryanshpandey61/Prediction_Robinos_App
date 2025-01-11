import React from 'react'
import Sidebar from '@/components/sidebar';
import Main from '@/components/main'
import "../app/globals.css"
import Navbar from '@/components/navbar';
import OngoingEvents from '@/components/OngoingEvents';
import Portfolio from './Portfolio';
import Link from 'next/link';

const Index: React.FC = () => {
  return <div className=' flex bg-gradient' >
    

<div className=''><Sidebar/></div>
<div> </div>
<div className=''>
    <Navbar/>
    <Main/>
    <OngoingEvents/>
    <Link href="/Portfolio"><Portfolio/></Link>
    </div>
    
    
    
    </div>;
};

export default Index;