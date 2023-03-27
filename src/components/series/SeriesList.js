import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSeries } from "../../managers/SeriesManager"
import "./series.css"


export const SeriesList = (props) => {
    const [ series, setEvents ] = useState([])
    const [ refresh, setRefresh ] = useState(true)
    const navigate = useNavigate()

    const getAllSeries = () => {
        getSeries().then(data => setEvents(data))
    }

    useEffect(() => {
        getAllSeries()
    }, [refresh])

    return (
        <>
        <div className="Series_header">
        <div className="series_title">Series</div>
        </div>
        <article className="series">
            {
                series.map(series => {
                    return <section key={`event--${series.id}`} className="series_card">
                        <img className="image_list" src={series.image}height="120px" width="150"/>
                        <div className="series_name">{series.name}</div>
                        {
                        }
                        <div className="event__footer">
                        </div>
                    </section>
                })
            }
            
        </article>
        </>
    )
}