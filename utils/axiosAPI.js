import axios from 'axios'


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AXIOS_API = axios.create({
    baseURL
})

export default AXIOS_API