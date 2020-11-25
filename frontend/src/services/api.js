import axios from 'axios';

const baseApi = (BaseUrl) => {
    const api = axios.create({
        BaseUrl,
    });
    return api;
}

export default baseApi;