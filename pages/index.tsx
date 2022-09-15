import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import {Video} from '../types'
import VideoCard from '../components/VideoCard'
import NoResult from '../components/NoResult'
import { BASE_URL } from '../utils'

interface Iprops{
  videos: Video[],
}
                       //videos
const Home = ({videos}:Iprops) => {
  
  return (<>
    
      <Head>
        <title>MeetUp</title>
      </Head>
      <div className='flex flex-col gap-10 videos h-full'>
         {videos.length ? (
          videos.map((video:Video) => (
            <VideoCard post={video} key={video._id}/>
          ))
         ):(
          <NoResult text='No videos'/>
         )}
      </div>
      </>
  )
}

export const getServerSideProps = async () => {
  const {data} = await axios.get(`${BASE_URL}/api/post`)
  
  
  return {
    props: {
      videos:data
    }
  }
}

export default Home
