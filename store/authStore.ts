import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";

const authStore = (set?:any) => ({   // set is a function that sets the state
    userProfile:null,
    allUsers:[],

    addUser:(user:any)=> set({userProfile:user}),  // addUser is a function that sets the userProfile state
    removeUser:()=> set({userProfile:null}),         // removeUser is a function that sets the userProfile state to null
    fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);
        set({allUsers:response.data})
    }
})

export const useAuthStore = create(
    persist(authStore, {
        name:'auth'
    })
);

export default authStore;   // export the store