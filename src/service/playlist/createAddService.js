import axios from 'axios'

const URI = import.meta.env.VITE_URI

import { userStore } from '@/store/User';

const userStoreObj = userStore()

axios.defaults.headers.common['Authorization'] = `TOKEN ${userStoreObj.userToken}`;

export async function createPlaylistService(data){
    try{
        return await axios.post(`${URI}/api/tracks/playlist/create/`, data)
            .then((res)=>{
                return res.data
            })
            .catch((err)=>{
                if(err.response){
                    if(err.response.status==401)
                        return {code:0 , message: err.response.data.detail}
                }
                else
                    return { code:0 , message:'Network error' }
            })
    }
    catch(err){
        return {code:-1 , message:'Network error'}
    }
}