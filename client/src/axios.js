import axios from "axios";

const instance = axios.create({
    baseURL: "https://baner-creator-api.herokuapp.com/api",
});

export default instance;
