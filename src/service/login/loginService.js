import axios from 'axios'

const URI = import.meta.env.VITE_URI



export async function LoginService(data){
    try{
        return await axios.post(`${URI}/api/user/signin/` , data)
            .then((res)=>{
                return res.data
            })
            .catch(()=>{
                return {code:-1 , message:'Network error'}
            })
    }
    catch(e){
        return {code:-1 , message:'Network error'};
    }
}

export async function SignupService(data){
    try{
        return await axios.post(`${URI}/api/user/signup/` , data)
            .then((res)=>{
                return res.data
            })
            .catch(()=>{
                return {code:-1 , message:'Network error'}
            })
    }
    catch(e){
        return {code:-1 , message:'Network error'};
    }
}


export async function VerifyToken(token){
    try{
        return await axios.get(`${URI}/api/user/verify/token/` ,{
            headers:{
                'Authorization': `TOKEN ${token}`
            }})
            .then((res)=>{
                if(res.status == 401)
                    return {code:0 , message: res.data.detail}
                return res.data
            })
            .catch(()=>{
                return {code:-1 , message:'Network error'}
            })
    }
    catch(e){
        return {code:-1 , message:'Network error'};
    }
}