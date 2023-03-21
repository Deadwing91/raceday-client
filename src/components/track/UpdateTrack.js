import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSeries } from "../../managers/SeriesManager.js"
import { getTrack, getTrackTypes, updateTrack } from '../../managers/TrackManager.js'


export const UpdateTrackForm = () => {
    const navigate = useNavigate()
    const { trackId } = useParams()
    const [trackTypes, setTrackTypes] = useState([])
    const [series, setSeries] = useState([])
    const [trackSeries, setTrackSeries] = useState([])



    const [currentTrack, setCurrentTrack] = useState({
        name: "",
        location: "",
        length: "",
        turns: "",
        seating_capacity: "",
        image: "",
        tracktype: 0,
        series: []
    })

    useEffect(() => {
        getTrackTypes().then(res => setTrackTypes(res))
        getTrack(trackId).then(res => {
            setCurrentTrack(res)
        })
    },
        [trackId])



    const changeTrackState = (Event) => {
        const copy = { ...currentTrack }
        copy[Event.target.name] = Event.target.value
        setCurrentTrack(copy)
    }

    useEffect(() => {
        getTrack(trackId).then((data) => {
            setCurrentTrack(data)

            const seriesSet = new Set()
            for (const series of data.series) {
                seriesSet.add(series.id)
            }
            setTrackSeries(seriesSet)
        })
    }, [trackId])

    useEffect(() => {
        getSeries().then(data => setSeries(data))
    }, [])

    const seriesArr = (serId) => {
        let copy = new Set(trackSeries)
        copy.has(serId) ? copy.delete(serId) : copy.add(serId)
        setTrackSeries(copy)
    }

    return (
        <form className="trackForm">
            <h2 className="trackForm__title">Update Track</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Track Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentTrack.name}
                        onChange={changeTrackState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentTrack.location}
                        onChange={changeTrackState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="length">Length: </label>
                    <input type="text" name="length" required autoFocus className="form-control"
                        value={currentTrack.length}
                        onChange={changeTrackState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="turns">Turns: </label>
                    <input type="text" name="turns" required autoFocus className="form-control"
                        value={currentTrack.turns}
                        onChange={changeTrackState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="seating_capacity">Seating Capacity: </label>
                    <input type="text" name="seating_capacity" required autoFocus className="form-control"
                        value={currentTrack.seating_capacity}
                        onChange={changeTrackState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="label">Track Type:</label>
                    <select required autoFocus className="trackTypeList" value={currentTrack.tracktype.id} onChange={(evt) => {
                        const copy = { ...currentTrack }
                        copy.tracktype = parseInt(evt.target.value)
                        setCurrentTrack(copy)
                    }}
                    >
                        {trackTypes.map(tracktype => (<option
                            name={tracktype.label}
                            className="form-control"
                            value={tracktype.id}
                            key={`tracktype--${tracktype.id}`}
                        >{tracktype.label}</option>
                        ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="field">
                    <label htmlFor="content" className="label">Series: </label>
                    {
                        series.map(carSeries => {
                            const foundSeries = currentTrack?.series?.find(trackSeries => carSeries.id === trackSeries.id)

                            return <div key={`tag--${carSeries.id}`}>
                                <input type="checkbox" name={carSeries.name}
                                    defaultChecked={foundSeries}
                                    onClick={() => seriesArr(carSeries.id)} />
                                <label htmlFor={carSeries.name}>{carSeries?.name}</label>
                            </div>
                        })
                    }
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const track = {
                        name: currentTrack.name,
                        location: currentTrack.location,
                        length: currentTrack.length,
                        turns: currentTrack.turns,
                        seating_capacity: currentTrack.seating_capacity,
                        image: currentTrack.image,
                        tracktype: parseInt(currentTrack.tracktype),
                        series: Array.from(trackSeries)

                    }

                    if (currentTrack.tracktype.id) {
                        track.tracktype = currentTrack.tracktype.id

                    } else {
                        track.tracktype = parseInt(currentTrack.tracktype)
                    }

                    // Send POST request to your API
                    updateTrack(trackId, track)
                        .then(() => navigate(`/tracks/${trackId}`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}