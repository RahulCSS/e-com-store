import React from 'react'
import { Carousel } from 'antd';

const images = [
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-ash-craig-122861-376464.jpg?alt=media&token=18a6d08b-5337-46a1-89a2-07040c37c53f',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-cottonbro-7428102.jpg?alt=media&token=d503d196-16e7-44cb-bdc6-3b4ef29f27f7',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-diva-plavalaguna-5711391.jpg?alt=media&token=31edaeba-9741-4602-9742-870ffcc92a74',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-jeshoots-238118.jpg?alt=media&token=1033f306-7d4a-4bdf-acf3-fccb48d516b2',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-jessbaileydesign-788946.jpg?alt=media&token=1a26b2db-a8ec-4251-a3ab-25d3ec75ba76',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-karolina-grabowska-5650026.jpg?alt=media&token=0d1f9671-64e5-4d5a-90e3-7bcd6a4bb56c',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-photo-70497.jpeg?alt=media&token=5a90c1a6-1a88-4a06-bb2b-0e84f78487ac',
    'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/carousel%2Fpexels-pixabay-256198.jpg?alt=media&token=1e471f6e-10e2-48bf-bfc1-446fd3bda1eb'
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