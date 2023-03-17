import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSeries } from "../../managers/SeriesManager"
import { createTrack, getTracks, getTrack, getTrackTypes } from "../../managers/TrackManager"


export const TrackForm = () => {
    const navigate = useNavigate()
    const [trackTypes, setTrackTypes] = useState([])
    const [series, setSeries] = useState([])
    const [seriesTypes, setSeriesTypes] = useState(new Set())
    const [currentTrack, setCurrentTrack] = useState({
        name: "",
        location: "",
        length: "",
        turns: "",
        seating_capacity: "",
        tracktype: 0,
        image: "",
        series: []
    })

    const { trackId } = useParams()

    useEffect(() => {
        getTrackTypes().then(res => setTrackTypes(res))
    }, [])

    useEffect(() => {
        getSeries().then(data => setSeries(data))
    }, [])

    const seriesArr = (serId) => {
        let copy = new Set(seriesTypes)
        copy.has(serId) ? copy.delete(serId) : copy.add(serId)
        setSeriesTypes(copy)
    }

    useEffect(() => {
        if (trackId) {
            getTrack(trackId).then((data) => {
                setCurrentTrack(data)

                const seriesSet = new Set()
                for (const carSeries of data.series) {
                    seriesSet.add(carSeries.id)
                }
                setSeriesTypes(seriesSet)
            })
        }
    }, [trackId])

    const changeTrackState = (event) => {
        // TODO: Complete the onChange function
        const copy = { ...currentTrack }
        copy[event.target.name] = event.target.value
        setCurrentTrack(copy)
    }

    


    


    // const handleCheckboxChange = (event) => {
    //     const seriesArray
    //     };

        // const tagArr = (tagId) => {
        //     let tagArray = [...newPostTag] 
        //     tagArray.push(tagId)
        //     setNewPostTag(tagArray)
        // }


    return (
        <form className="trackForm">
            <h2 className="trackForm__title">Create New Track</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
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
                    <label htmlFor="turns">No. of Turns: </label>
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
                    <label htmlFor="image">Image: </label>
                    <input type="text" name="image" required autoFocus className="form-control"
                        value={currentTrack.image}
                        onChange={changeTrackState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="label">Type of Track: </label>
                    <select
                        name="trackType"
                        className="form-control"
                        value={currentTrack.tracktype}
                        onChange={(event) => {
                            const copy = { ...currentTrack }
                            copy.tracktype = parseInt(event.target.value)
                            setCurrentTrack(copy)
                        }}>
                        <option value="0">Choose Track Type:</option>
                        {trackTypes.map(trackType => (
                            <option key={`trackType--${trackType.id}`} value={trackType.id} name={trackType.label}>{trackType.label}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {/* <h2 className="trackForm__title">Series Ran:</h2> */}
            <fieldset className="field">
                    <label htmlFor="content" className="label">Series: </label>
                    {
                        series.map(ser => {
                            // Compare current `id` and see if on object exists with that id in currentGame.categories
                            const Series = currentTrack.series.find(trackSeries => ser.id === trackSeries.series)

                            return <div key={`Series--${ser.id}`}>
                                <input type="checkbox" name={ser.name}
                                    defaultChecked={Series}
                                    onClick={() => seriesArr(ser.id) } />
                                <label htmlFor={ser.name}>{ser?.name}</label>
                            </div>
                        })

                    }</fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    //variable name matches server(django)
                    const track = {
                        name: currentTrack.name,
                        location: currentTrack.location,
                        length: currentTrack.length,
                        turns: currentTrack.turns,
                        seating_capacity: currentTrack.seating_capacity,
                        image: currentTrack.image,
                        tracktype: parseInt(currentTrack.tracktype),
                        series: Array.from(seriesTypes)
                    }

                    // Send POST request to your API
                    createTrack(track)
                        .then(() => navigate("/tracks"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}


// {
//     tags.map(tag => {
//         return <><input type="checkbox" name={tag.label}
//             onClick={() => {
//                 tagArr(tag.id)
//             }} 
//             />
//             <label htmlFor={tag.label}>{tag?.label}</label><br /></>
//     })

// }