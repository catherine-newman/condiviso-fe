const axios = require("axios");

const condivisoApi = axios.create({
    baseURL: "https://condiviso-be.onrender.com/api"
});

getSingleEvent = (eventId) => {
    const endpoint = `/events/${eventId}`;
    return condivisoApi.get(endpoint).then((res) => {
        return res.data.event;
    })
}

getSingleUser = (user_id) => {
    const endpoint = `/users/${user_id}`;
    return condivisoApi.get(endpoint).then((res) => {
        return res.data;
    })
}

getEvents = async (user_id, from_date, to_date, lon, lat, dist, unit, spaces) => {
    const params = {};
    if (user_id) params.user_id = user_id;
    if (from_date) params.from_date = from_date;
    if (to_date) params.to_date = to_date;
    if (lon) params.lon = lon;
    if (lat) params.lat = lat;
    if (dist) params.dist = dist;
    if (unit) params.unit = unit;
    if (spaces) params.spaces = spaces;
    const res = await condivisoApi.get(`/events`, {
        params: params
    });
    return res.data;
}

module.exports = {
    getSingleEvent,
    getSingleUser,
    getEvents
}