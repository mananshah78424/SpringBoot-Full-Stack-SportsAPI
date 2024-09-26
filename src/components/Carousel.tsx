import React, { useEffect, useState } from "react";

// Define the props type
interface CarouselProps {
  images: string[]; // Array of image URLs
  height?: string; // Optional height prop
}

const Carousel: React.FC<CarouselProps> = ({ images, height = "300px" }) => {
  // Default height is 300px
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div
      className={`relative w-full mx-auto overflow-hidden`}
      style={{ height }}
    >
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="min-w-full h-full flex justify-center items-center"
          >
            <img
              src={item}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
