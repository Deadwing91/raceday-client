import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSeries } from "../../managers/SeriesManager.js"
import { getTrack, getTrackTypes, deleteTrack } from "../../managers/TrackManager.js"
import "./details.css"

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
        if (window.confirm("Are you sure you want to delete this track?"))
            deleteTrack(trackId).then(() => {
                setRefresh()
            }).then(() => navigate("/tracks"))
    }

    return (
        <>



            <article className="track-detail">






                <section key={`track--${track.id}`} className="track">
                    <div className="header">
                        <svg onClick={() => {
                            navigate({ pathname: `/tracks/edit/${track.id}` })
                        }} xmlns="http://www.w3.org/2000/svg" width="60" height="40" fill="white" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                        {/* <button className="Track_Edit"
                            
                        >Edit
                        </button> */}
                        
                        <div className="track_details_header">Track Information</div>
                        <svg onClick={() => {
                                handleDelete(track?.id)
                            }} xmlns="http://www.w3.org/2000/svg" width="36" height="44" fill="White" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                        {/* <button className="track__delete"
                            >Delete Track</button> */}
                    </div>
                    
                    <div className="track__info">{track.name}</div>
                    
                    <div className="track__info">{track.location}</div>
                    <div className="track__info">{track.length} mi</div>
                    <div className="track__info">{track.turns} Turns</div>
                    <div className="track__info">Seating: {track.seating_capacity}</div>
                    <div className="track__info">{track.tracktype?.label}</div>

                    <div className="track__info">Series:</div>
                    {track?.series?.map(trackSeries => {
                        return (
                            <section key={`event--${trackSeries.id}`} className="event">
                                <div className="track__info">{trackSeries.name}</div>
                            </section>)
                    })}
                    <img className="track__image" src={track.image} height="400px" width="390px" />


                </section>

            </article>
        </>)
}