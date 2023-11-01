import axios from "axios";

const apiFastApi = axios.create({
    baseURL: 'http://localhost:8000',
})

export default apiFastApi;