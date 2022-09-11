import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://chasebankapp.herokuapp.com/api"
})