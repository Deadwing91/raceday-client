import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSeries } from "../../managers/SeriesManager.js"
import { getTrack, getTrackTypes, deleteTrack } from "../../managers/TrackManager.js"

export const TrackDetails = (props) => {
    const [series, setSeries] = useState([])
    const [refresh, setRefresh] = useState(true)
    const { trackId } = useParams()
    const navigate = useNavigate()
    const [track, setTracks] = useState([
        {
            id: 0,
            name: "",
            location: "",
            length: "",
            turns: "",
            seating_capacity: "",
            image: "",
            tracktype: 0,
            series: []
        }
    ])



    const getSingleTrack = async (trackId) => {
        await (getTrack(trackId))
        .then(data => setTracks(data))
    }

    useEffect(() => {
        getSingleTrack(trackId)
    }, [trackId])

    const handleDelete = (trackId) => {
        if (window.confirm("Are you sure you want to delete this post?"))
        deleteTrack(trackId).then(() => {
            setRefresh()
        }).then(() => navigate("/tracks"))
    }

    return (
    <>



        <article className="track-detail">

            



                    
                    <section key={`track--${track.id}`} className="track">
                        <button className="Track_Edit"
                            onClick={() => {
                                navigate({ pathname: `/tracks/edit/${track.id}` })
                            }}
                        >Edit
                        </button>
                        <div className="track__title">{track.name}</div>
                        <div className="track__location">{track.location}</div>
                        <div className="track__skillLevel">{track.length} mi</div>
                        <div className="track__description">{track.turns} Turns</div>
                        <div className="track__description">Seating Capacity: {track.seating_capacity}</div>
                        <div className="track__tracktype">{track.tracktype?.label}</div>
                        
                        <div className="track__tracktype">Series:</div>
                        {track?.series?.map(trackSeries => { return (
                            <section key={`event--${trackSeries.id}`} className="event">
                                <div className="track__series">{trackSeries.name}</div>
                            </section>)
                            })}
                            <img className="track__image" src={track.image}/>
                        
                        <button className="track__delete"
                            onClick={() => {
                                handleDelete(track?.id)
                            }}>Delete Track</button>
                    </section>
            
        </article>
    </>)
}