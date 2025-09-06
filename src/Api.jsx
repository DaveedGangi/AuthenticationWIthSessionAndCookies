import axios from "axios";

const api=axios.create({
    baseURL:"https://authenticationcookiessessionsbackenddave.onrender.com",
    withCredentials:true,
});

export default api;