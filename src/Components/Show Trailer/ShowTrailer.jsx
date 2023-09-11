import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import './ShowTrailer.css'

const ShowTrailer = ({ id }) => {
    const [video, setVideo] = useState()

    useEffect(() => {
        getVideo()
    })
    function getVideo() {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=306f43dc590e94a7d640f7c80bc4b3fc&language=en-US`)
            .then(res => res.json())
            .then(data => setVideo(data.results[0]?.key))
    }

    return (

        <>
            <h1 className='text-center' style={{
                margin:"3rem 0"
            }}>Related Video</h1>
            <div className="yt-video">
                <YouTube videoId={video} iframeClassName='video' />

            </div>

        </ >
    )
}

export default ShowTrailer