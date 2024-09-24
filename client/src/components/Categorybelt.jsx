import React,{ useState, useRef } from 'react'

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

const categories = [
                    {name:"itemA",image:images[0]},
                    {name:"itemB",image:images[1]},
                    {name:"itemC",image:images[2]},
                    {name:"itemD",image:images[3]},
                    {name:"itemE",image:images[4]},
                    {name:"itemF",image:images[5]},
                    {name:"itemG",image:images[6]},
                    {name:"itemH",image:images[7]},
                    {name:"itemI",image:images[8]},
];

const Categorybelt = () => {
    const [selectedCategory, setselectedCategory] = useState(null);
    const handleClick = (index) => {
        if(selectedCategory === index) setselectedCategory(null);
        else setselectedCategory(index);
    };
    //console.log(selectedCategory);

    {/* Scrollable menu to mouse drag */}
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };
    const handleMouseLeave = () => {
        setIsDragging(false);
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

  return (
    <div>
        <h2 className="pt-2 text-[1.5rem]">What's on your Mind</h2>
        <div className="relative flex overflow-x-auto py-2 hide-scrollbar"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}>
            {categories.map((catergory,index)=>{
                return (
                    <div key={index}
                        className="flex flex-col flex-shrink-0 items-center text-center w-[10rem] h-[10rem]"
                    >
                        <img src={catergory.image} 
                            className={`w-[85%] h-[85%] object-cover rounded-full border border-gray-300 shadow-lg cursor-pointer 
                                ${selectedCategory === index ? 'border-dotted border-blue-900 border-2': ''}`}
                            onClick={()=>handleClick(index)}
                        />
                        <p className="text-center text-gray-700 font-medium cursor-pointer" onClick={()=>handleClick(index)}>{catergory.name}</p>
                    </div>
                )
            })}
        </div>
        <hr className="mx-[1rem] h-[2px] bg-[#e2e2e2] border-none"/>
    </div>
  )
}

export default Categorybelt