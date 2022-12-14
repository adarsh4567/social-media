import Link from 'next/link'
import {Video} from '../types'
import {NextPage} from 'next'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {HiVolumeOff, HiVolumeUp} from 'react-icons/hi'
import {BsFillPlayFill,BsFillPauseFill,BsPlay} from 'react-icons/bs'
import {GoVerified} from 'react-icons/go'
interface IProps {
   post: Video
}

const VideoCard : NextPage<IProps> = ({post}) => {

  const [isHover,setIsHover] = useState(false)

  const [isPlaying,setIsPlaying] = useState(false)

  const [isMuted,setIsMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress =()=>{
    if(isPlaying){
      videoRef.current?.pause()
      setIsPlaying(false)
    }else{
      videoRef.current?.play();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    if(videoRef?.current){
      videoRef.current.muted = isMuted
    }
  }, [isMuted])
  
    
  return (
    <div className='flex flex-col border-b-2 border-white pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
           <div className='md:w-16 md:h-16 w-10 h-10'>
             <Link href={`/profile/${post.postedBy._id}`}>
                <>
                <Image
                width={62}
                height={62}
                className='rounded-full'
                src={post.postedBy.image}
                alt='profile'
                layout='responsive'
                />
                </>
             </Link>
           </div>
           <div>
            <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex items-center gap-2'>
                   <p className='text-white flex gap-2 items-center md:text-md font-bold'>{post.postedBy.userName}{` `}
                   <GoVerified
                   className='text-blue-500 text-md'
                   /></p>
                   <p className='text-white capitalize font-medium text-xs hidden md:block'>{post.postedBy.userName}</p>
                </div>
            </Link>
           </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}} className='rounded-3xl'>
           <Link href={`/detail/${post._id}`}>
            <video
            ref={videoRef}
            loop
            className='lg:w[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[750px] rounded-2xl cursor-pointer bg-gray-900'
            src={post.video.asset.url}
            >
            </video>
           </Link>
           {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[200px] md:w-[50px] p-3'>
              {isPlaying ? (
                <button onClick={onVideoPress}><BsFillPauseFill className='text-white text-2xl lg:text-4xl'/></button>
              ) : (
                <button onClick={onVideoPress}><BsFillPlayFill className='text-white text-2xl lg:text-4xl'/></button>
              )}
              {isMuted ? (
               <button onClick={()=> setIsMuted(false)}> <HiVolumeOff className='text-white text-2xl lg:text-4xl'/></button>
              ) : (
                <button onClick={()=> setIsMuted(true)}><HiVolumeUp className='text-white text-2xl lg:text-4xl'/></button>
              )}
            </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard