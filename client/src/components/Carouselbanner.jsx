import React from 'react'
import { Carousel } from 'antd';

const images = [
    'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg',
    'https://images.pexels.com/photos/7428102/pexels-photo-7428102.jpeg',
    'https://images.pexels.com/photos/8101512/pexels-photo-8101512.jpeg'
];

const Carouselbanner = () => {
  return (
    <Carousel autoplay arrows>
        {images.map((image,index) => (
            <div key={index}>
                <img src={image}
                    className="object-cover w-[100%] h-[16rem] text-center rounded-[1rem]"/>
            </div> 
        ))}
    </Carousel>
  )
}

export default Carouselbanner