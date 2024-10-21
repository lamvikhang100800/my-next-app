import axiosClient from "./axiosClient";

const handelAPI = async(url:string , data?:any , method?:'get'|'post'|'put'|'patch'|'delete' )=>{
    return await axiosClient(url,{
        method: method ?? 'get',
        data, 
    });
};
export default handelAPI;