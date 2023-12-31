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
        return res.data.user;
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

const getEvents = async (user_id, from_date, to_date, lon, lat, dist, unit, spaces, attending) => {
    const params = {};
    if (user_id) params.user_id = user_id;
    if (from_date) params.from_date = from_date;
    if (to_date) params.to_date = to_date;
    if (lon) params.lon = lon;
    if (lat) params.lat = lat;
    if (dist) params.dist = dist;
    if (unit) params.unit = unit;
    if (spaces) params.spaces = spaces;
    if (attending) params.attending = attending;
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

const patchAttendees = async (event_id, patchBody) => {
    try {
        const res = await condivisoApi.patch(`/events/${event_id}`, {
            attendees: patchBody.attendees,
            event_name: patchBody.event_name,
            event_duration: patchBody.event_duration,
            event_date: patchBody.event_date,
            max_attendees: patchBody.max_attendees
        })
        return res.data;
    } catch(err) {
        console.log(err)
    }
}
const patchEvent = async (event_id, patchBody) => {
    try {
        const res = await condivisoApi.patch(`/events/${event_id}`, {
            event_name: patchBody.event_name,
            event_duration: patchBody.event_duration,
            event_date: patchBody.event_date,
            event_description: patchBody.event_description,
            attendees: patchBody.attendees,
            max_attendees: patchBody.max_attendees
        })
        return res.data;
    } catch(err) {
        console.log(err)
    }
}
const postEvent = async (newEvent) => {
        const postEventBody = {
         event_name: newEvent.event_name,
            first_name: newEvent.first_name,
            last_name: newEvent.last_name,
            user_name: newEvent.user_name,
            user_id: newEvent.user_id,
            email: newEvent.email,
            event_date: newEvent.event_date,
            event_location: newEvent.event_location,
            postcode: newEvent.postcode,
            latitude: newEvent.latitude,
            longitude: newEvent.longitude,
            latitude_fuzzy: newEvent.latitude_fuzzy,
            longitude_fuzzy: newEvent.longitude_fuzzy,
            event_city: newEvent.event_city,
            event_description: newEvent.event_description,
            event_duration: newEvent.event_duration,
            max_attendees: newEvent.max_attendees,
            attendees: newEvent.attendees,
            recipes: newEvent.recipes
          }
            try {
              
        const result = await condivisoApi.post('/events',
            postEventBody
        );
        return result.data;
      } catch (err) {
        console.log(err);
      }
    };

   const postRecipe = async ( user_id, recipe_name, recipe_ingredients, recipe_content, recipe_image ) => {

const postRecipeBody = {user_id, recipe_name, recipe_ingredients, recipe_content, recipe_image 

}
try {const result = await condivisoApi.post('/recipes',
    postRecipeBody
    );

return result.data;
} catch (err) {
console.log(err);
}
}
   

const postUser = async(user_name, first_name, last_name, email, address, postcode, about_me) =>{
    try{
        const sendBody = 
        {
            user_name : user_name,
            first_name : first_name,
            last_name : last_name,
            email : email,
            address : address,
            postcode : postcode,
            about_me : about_me,
        }
        console.log(sendBody);

        const res = await condivisoApi.post('/users', {
            user_name : user_name,
            first_name : first_name,
            last_name : last_name,
            email : email,
            address : address,
            postcode : postcode,
            about_me : about_me,
        })  
    return res.data.result;
    } catch(err){
        console.log(err);
    }
}

// const getSingleUser = (user_id) => {
//     const endpoint = `/users/${user_id}`;
//     return condivisoApi.get(endpoint).then((res) => {
//         return res.data.user;
//     })
// }

module.exports = {
    getSingleEvent,
    getSingleUser,
    getEvents,
    getCoordinates,
    getFuzzyCoordinatesFromCoordinate,
    getRecipes,
    getRecipe,
    patchAttendees,
    patchEvent,
    postEvent,
    postRecipe,
    postUser
}