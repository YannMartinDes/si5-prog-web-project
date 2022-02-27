import axios from 'axios';

const useAxiosAuth = () => {
    axios.interceptors.request.use(function (config) {
        if(config.headers){
            config.headers['Authorization'] =  `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    });
    return axios
};

export default useAxiosAuth;