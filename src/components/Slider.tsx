import React from 'react';

const Slider: React.FC = () => {
  // Hardcoded value for the slider (50%)
  const sliderValue: number = 50;

  return (
    <div className="flex justify-center items-center border rounded-md  py-4 bg-[#383687]">
      <div className="flex items-center w-full p-1 gap-x-1">
        {/* Display the percentage */}
        <p className="text-[20px] font-bold">{sliderValue}%</p>
        
        <div className="relative w-full">
          {/* Background of the Slider */}
          <input
            type="range"
            value={sliderValue}
            readOnly
            className="w-[100%] h-2 rounded-full appearance-none"
            style={{
              backgroundSize: '50% 100%', // Fill the first 50% with the gradient
              backgroundImage: 'linear-gradient(to right, #C076E5, #FDD158)', // Gradient from purple to yellow
              backgroundPosition: '0 0', // Gradient starts from the left side
              backgroundColor: 'transparent', // The rest will be transparent
            }}
          />
          {/* Hidden the default slider thumb */}
          <style>
            {`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 0;  /* Hide the thumb */
                height: 0; /* Hide the thumb */
                background: transparent; /* Make sure the thumb is invisible */
              }
              input[type="range"]::-moz-range-thumb {
                width: 0;  /* Hide the thumb */
                height: 0; /* Hide the thumb */
                background: transparent; /* Make sure the thumb is invisible */
              }
            `}
          </style>
        </div>

        {/* Display the percentage on the other side */}
        <p className="text-[20px] font-bold">{sliderValue}%</p>
      </div>
    </div>
  );
};

export default Slider;
