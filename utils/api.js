import axios from "axios";

const condivisoApi = axios.create({
    baseURL: "https://condiviso-be.onrender.com/api"
});

const postcodesApi = axios.create({
    baseURL: "https://api.postcodes.io/postcodes/"
});

const getSingleEvent = (eventId) => {
    const endpoint = `/events/${eventId}`;
    return condivisoApi.get(endpoint).then((res) => {
        return res.data.event;
    })
}

const getSingleUser = (user_id) => {
    const endpoint = `/users/${user_id}`;
    return condivisoApi.get(endpoint).then((res) => {
        return res.data;
    })
}

const getRecipes = async (user_id) => {
    const params = {}
    if (user_id) params.user_id = user_id;
    const res = await condivisoApi.get(`/recipes`, {
        params: params
    })
    return res.data;
}

const getRecipe = async (recipe_id) => {
    const res = await condivisoApi.get(`/recipes/${recipe_id}`)
    return res.data;
}

const getEvents = async (user_id, from_date, to_date, lon, lat, dist, unit, spaces) => {
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

const getCoordinates = async (postcode) => {
    try {
      const result = await postcodesApi.get(
        `/${postcode}`
      );
      return [result.data.result.longitude, result.data.result.latitude];
    } catch (err) {
      console.log(err);
    }
};

const getFuzzyCoordinatesFromCoordinate = async (lon, lat) => {
    try {
        const res = await postcodesApi.get(`/`, {
            params: { lat: lat, lon: lon, limit: 1, widesearch: true },
        });
    const postcode =  res.data.result[0].postcode;
    const nearest = await postcodesApi.get(
        `/${postcode}/nearest`,
        { params: { radius: 300, limit: 100 } }
      );
      const fuzzy = nearest.data.result.find((postcode) => {
        return postcode.distance >= 200;
      });
      if (fuzzy) return [fuzzy.longitude, fuzzy.latitude];
      return [
        nearest.data.result[nearest.data.result.length - 1].longitude,
        nearest.data.result[nearest.data.result.length - 1].latitude,
      ];
    } catch(err) {
        console.log(err)
    }
};



module.exports = {
    getSingleEvent,
    getSingleUser,
    getEvents,
    getCoordinates,
    getFuzzyCoordinatesFromCoordinate,
    getRecipes,
    getRecipe,
}