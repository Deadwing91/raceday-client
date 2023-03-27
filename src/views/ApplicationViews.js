import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { SeriesList } from "../components/series/SeriesList"
import { TrackDetails } from "../components/track/TrackDetails"
import { TrackForm } from "../components/track/TrackForm"
import { TrackList } from "../components/track/TrackList"
import { UpdateTrackForm } from "../components/track/UpdateTrack"
import { Authorized } from "./Authorized"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/tracks" element={<TrackList />} />
                <Route path="/tracks/add" element={<TrackForm />} />
                <Route path={"tracks/:trackId"} element={<TrackDetails />} />
                <Route path="tracks/edit/:trackId" element={<UpdateTrackForm />} />
                <Route path="/series" element={<SeriesList />} />
                
            </Route>
        </Routes>
    </>
}