import axios from 'axios'
import queryString from 'querystring'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosClient = axios.create({
    baseURL,
    paramsSerializer:(params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config:any) =>{
    const token = localStorage.getItem('token');
    config.headers={
        Authorization: token ? `Bearer ${token}` : '',
        Accept:'application/json',
        ...config.headers
    };

    config.data;

    return config;
})

axios.interceptors.response.use((res) => {
    if(res.data && res.status >= 200 && res.status < 300){
        return res.data;
    }else{
        return Promise.reject(res.data);
    }
},error=>{
    const {response} = error;
    return Promise.reject(response.data);
});

export default axiosClient;