import React, { useState } from 'react'
import { useEffect } from 'react'
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import './MovieCredits.css'
import Reviews from '../reviews/Reviews'

const MovieCredits = ({ id }) => {
    const [casteDetails, setCasteDetails] = useState([])
    useEffect(() => {
        getCredits()
    })
    function getCredits() {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=306f43dc590e94a7d640f7c80bc4b3fc&language=en-US`)
            .then(res => res.json())
            .then(data => setCasteDetails(data.cast))
    }

    const items = casteDetails.map(cast => (
        <div className="carouselItem">
            {
                cast.profile_path ?
                    <>

                        <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                            alt={cast?.name}
                            className="carouselItem__img"
                        />
                        <h3 className="carouselItem__txt text-center">{cast.name}</h3>

                    </>
                    : null
            }
        </div>
    ))


    const responsive = {
        0: {
            items: 3
        },
        512: {
            items: 5
        },
        1024: {
            items: 7
        },
    }



    return (
        <>
            <div className="main-credits">
                <h1 style={{marginTop: "1rem"}} className='credit-head'>Credits</h1>
                <AliceCarousel
                    disableButtonsControls
                    disableDotsControls
                    autoPlay={true}
                    autoPlayInterval={1000}
                    mouseTracking
                    responsive={responsive}
                    infinite
                    animationType='slide'
                    items={items}
                />
            </div>
            {/* </main> */}
            <Reviews id={id} />
        </>
    )
}
export default MovieCredits

