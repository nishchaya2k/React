import React from 'react'
// import movies from '../data'
import MovieCard from './MovieCard';
import Slider from 'react-slick';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Sliding = ({ movies }) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    // const { latest } = movies;
    return (
        <div className='border w-screen h-[500px] bg-zinc-500'>
            <Slider {...settings}>
                {
                    movies.map((movie, index) => {
                        return <MovieCard key={index} movie={movie} />
                    })
                }
            </Slider>
        </div>
    )
}

export default Sliding


//refer: "https://www.npmjs.com/package/react-slick"

/*
index.css , for margin between cards 
.slick-slide > div{
    margin: 0 10px
}

1. Taken Array of data

*/