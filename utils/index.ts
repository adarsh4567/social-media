import axios from "axios";

import jwt_decode from "jwt-decode";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response:any,addUser:any)=>{  // addUser is a function that adds a user to the database
  const decoded:{name:string,picture:string,sub:string} =jwt_decode(response.credential);
  
  const {name,picture,sub} = decoded;  // name, picture and sub are the properties of the decoded object

  const user = {    // user object
    _id:sub,
    _type:'user',
    userName:name,
    image:picture,
  }
  addUser(user);
  await axios.post(`${BASE_URL}/api/auth`,user); // post request to the backend
  
}