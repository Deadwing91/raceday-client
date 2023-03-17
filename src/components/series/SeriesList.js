import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSeries } from "../../managers/SeriesManager"

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
        <article className="series">
            {
                series.map(series => {
                    return <section key={`event--${series.id}`} className="event">
                        <img src={series.image}/>
                        <div className="event__game">{series.name}</div>
                        {
                        }
                        <div className="event__footer">
                        </div>
                    </section>
                })
            }
            
        </article>
    )
}