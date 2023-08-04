const axios = require("axios");

const condivisoApi = axios.create({
    baseURL: "https://condiviso-be.onrender.com/api"
});

const getSingleEvent = (eventId) => {
    const endpoint = `/events/${eventId}`;
    return condivisoApi.get(endpoint).then((res) => {
        return res.data.event;
    })
}


module.exports = getSingleEvent;