import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResult from '../../components/NoResult'
import { IUser,Video } from '../../types'
import { BASE_URL } from '../../utils'

interface IProps{
    data:{
        user:IUser;
        userVideos:Video[];
        userLikedVideos:Video[];
    }
}

const Profile = ({data}:IProps) => {
  const [showUserVideos,setShowUserVideos] = useState(true);
  const {user,userVideos,userLikedVideos} = data
  const videos = showUserVideos? 'border-b-2 border-gray-400':'text-gray-400';
  const liked = !showUserVideos? 'border-b-2 border-black':'text-gray-400';
  const [videosList,setVideosList] = useState<Video[]>([]);
  useEffect(() => {
     if(showUserVideos){
         setVideosList(userVideos)
     }else{
      setVideosList(userLikedVideos);
     }
  }, [showUserVideos,userLikedVideos,userVideos])
  
  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bd-transparent w-full'>
      <div className='w-8 h-16 md:w-24 md:h-24'>
                <Image
                src={user.image}
                width={34}
                height={34}
                className='rounded-full'
                layout='responsive'
                alt='profile'
                />
              </div>
              <div className='flex flex-col justify-center'>
                <p className=' md:text-xl text-white tracking-wider flex gap-1 items-center justify-center text-md font-bold'>
                  {user.userName}
                  <GoVerified className='text-blue-800'/>
                </p>
                <p className='capitalize md:text-lg text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
      </div>
      <div>
        <div className='flex text-white gap-10 mb-10 mt-10 border-b-2 border-gray-200 w-full'>
          <p onClick={()=>setShowUserVideos(true)} className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}>
            Videos
          </p>
          <p onClick={()=>setShowUserVideos(false)} className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start text-white'>
            {videosList.length > 0 ? (
              videosList.map((post:Video,idx:number)=>(
                <VideoCard post={post} key={idx}/>
              ))
            ):(
              <NoResult text={`No ${showUserVideos ? '':'Liked'} Videos yet`}/>
            )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params:{id}}:{params:{id:string}}) => {
   const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return{
        props:{ data:res.data}
    }
}

export default Profile