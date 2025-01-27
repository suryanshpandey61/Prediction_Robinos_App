import React from 'react';
import Sidebar from '@/components/sidebar';
import Main from '@/components/main';
import "../app/globals.css";
import bg from '../assets/bg.png';
import Navbar from '@/components/navbar';

const Index: React.FC = () => {
  return (
    <div className="flex bg-gradient relative min-h-screen">
    {/* Sidebar */}
    <div className="fixed z-10">
      <Sidebar />
    </div>
  
    {/* Content area */}
    <div className="flex-1 w-[100vw] ml-[250px]  overflow-hidden h-[100vh] pl-4 bg-cover ">
      <div className="w-[90%]">
        <Navbar />
      </div>
      <div className="w-[90%]">
        <Main />
      </div>
    </div>
  </div>
  
  );
};

export default Index;
