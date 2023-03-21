import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { filterTracks, getTracks } from "../../managers/TrackManager"
import { getSeries } from "../../managers/SeriesManager"
import "./track.css"

export const TrackList = (props) => {
    const [series, setSeries] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [filteredTracks, setFilteredTracks] = useState([])
    const [tracks, setTracks] = useState([])

    const navigate = useNavigate()

    const getAllTracks = () => {
        getTracks().then(data => {
            setFilteredTracks(data)
            setTracks(data)
        })

    }
    const getAllSeries = () => {
        getSeries().then(data => setSeries(data))
    }

    //This gets all series if the value is set to 0. If it's greater than 0 it gets the filtered track
    const getTracksBySeries = (event) => {
        if (event.target.value > 0) {
            filterTracks(event.target.value).then(data => setFilteredTracks(data))
        }
        else {
            setFilteredTracks(tracks)
        }
    }


    useEffect(() => {
        getAllTracks()
    }, [refresh])

    useEffect(() => {
        getAllSeries()
    }, [refresh])

    // useEffect(() => {
    //     filterTracks(filteredTracks.series.id)
    // }, [refresh])


    return (
        <>
            <>
                <div className="Page_Id">
                    <svg onClick={() => {
                        navigate({ pathname: "/tracks/add" })
                    }} xmlns="http://www.w3.org/2000/svg" width="60" height="50" fill="white" classname="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />

                    </svg>
                    {/* <button
                        
                    >Add New Track
                    </button> */}
                    <div className="track_list_header">Tracks</div>
                    <select className="search" onChange={(event) => {
                        getTracksBySeries(event)
                    }}>
                        <option value={0} >All Series</option>
                        {series.map(carSeries => (
                            <option key={`series--${carSeries.id}`} value={carSeries.id} name={carSeries.name}>{carSeries.name}</option>
                        ))}
                    </select>
                </div>
            </>



            <article className="tracks">
                {
                    filteredTracks.map(track => {
                        return <section key={`event--${track.id}`} className="track_card">
                            <img className="image_list" src={track.image} height="120px" width="150px" />
                            <div>
                                <a className="track_list_name" onClick={() => navigate(`/tracks/${track.id}`)}>
                                    {track.name}
                                </a>
                            </div>

                            {/* <div className="event__game">{track.name}</div> */}

                            {
                            }
                            <div className="event__footer">
                            </div>
                        </section>
                    })
                }

            </article>
            <br></br>
        </>
    )
}