
import Sidebar from '@/components/sidebar';
import React, { useEffect, useState } from 'react';


const Portfolio: React.FC = () => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will run only on the client side
  }, []);

  if (!isClient) {
    return null; // Return null until we are on the client side
  }

  return (

    <div>
      <Sidebar/>
 
     Anshu
      



    </div>
  );
};

export default Portfolio;
