export const getSeries = () => {
    return fetch("http://localhost:8000/series", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}