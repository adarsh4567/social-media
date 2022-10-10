import React,{useState} from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResult'
import { IUser,Video } from '../../types'
import { BASE_URL } from '../../utils'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useAuthStore} from '../../store/authStore'

const Search = ({videos}:{videos:Video[]}) => {
    const [isAccounts,setIsAccounts] = useState(false);
    const router = useRouter();
    const {searchTerm}:any = router.query;
    const accounts = isAccounts? 'border-b-2 border-gray-400':'text-gray-400';
    const video = !isAccounts? 'border-b-2 border-black':'text-gray-400'; 
    const {allUsers} = useAuthStore();
    const searchedAccounts = allUsers.filter((user:IUser)=> user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className='w-full'>
        <div className='flex text-white gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full'>
          <p onClick={()=>setIsAccounts(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}>
            Accounts
          </p>
          <p onClick={()=>setIsAccounts(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${video}`}>
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div className='md:mt-16'>
            {searchedAccounts.length >0  ? (
              searchedAccounts.map((user:IUser,idx:number)=>(
                <Link href={`/profile/${user._id}`} key={idx}>
                <div className='flex text-white gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                <div>
            <Image
            src={user.image}
            width={50}
            height={50}
            className='rounded-full'
            alt='profile'
            />
          </div>
          <div className='hidden xl:block text-white'>
            <p className='flex gap-1 items-center text-md font-bold'>
              {user.userName}
              <GoVerified className='text-blue-800'/>
            </p>
            <p className='capitalize text-gray-400 text-xs'>
              {user.userName}
            </p>
          </div>
                </div>
              </Link>
              ))
            ):(<div className='text-white'>
              <NoResult text='No Result'/>
              </div>
            )}
          </div>
        ):(
          <div className='md:mt-16 flex flex-wrap gap-6 text-white'>
            {videos.length ?(
              videos.map((video:Video,idx)=>(
                <VideoCard post={video} key={idx}/>
              ))
            ):(<NoResult text='No Results'/>)}
          </div>
        )}
    </div>
  )
}

export const getServerSideProps = async ({params:{searchTerm}}:{params:{searchTerm:string}}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)
 
     return{
         props:{ videos:res.data}
     }
 }

export default Search