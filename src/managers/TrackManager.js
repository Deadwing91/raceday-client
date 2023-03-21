export const getTracks = () => {
    return fetch("http://localhost:8000/tracks", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const filterTracks = (series) => {
    return fetch(`http://localhost:8000/tracks?series=${series}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createTrack = (track) => {
    return fetch("http://localhost:8000/tracks", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(track)
    })
        .then(res => res.json())
}

export const updateTrack = (id, track) => {
    return fetch(`http://localhost:8000/tracks/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(track)
    })
};

export const getTrack = (id) => {
    return fetch(`http://localhost:8000/tracks/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
};

export const getTrackTypes = () => {
    return fetch("http://localhost:8000/tracktypes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteTrack = (trackId) => {
    return fetch(`http://localhost:8000/tracks/${trackId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        }
    })
};