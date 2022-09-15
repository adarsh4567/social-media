import { useRouter } from 'next/router'
import React,{useState,useEffect} from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { useAuthStore } from '../store/authStore'
import { BASE_URL } from '../utils'


const Upload = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [videoAsset,setVideoAsset] = useState<SanityAssetDocument| undefined>();
    const [wrongFileType,setWrongFileType] = useState(false);
    const [caption,setCaption] = useState('');
    const [category,setCategory] = useState('');
    const [savingPost,setSavingPost] = useState(false);
    const {userProfile}:{userProfile:any} = useAuthStore();
    const router = useRouter();
    const uploadVideo = async (e:any) => {
     const selectedFile = e.target.files[0];
     const fileTypes = ['video/mp4','video/webm','video/ogg'];
     if(fileTypes.includes(selectedFile.type)){
          client.assets.upload('file',selectedFile,{
            contentType: selectedFile.type,
            filename: selectedFile.name
          }).then((data)=>{
            setVideoAsset(data);
            setIsLoading(false);
          })
     }else{
        setIsLoading(false);
        setWrongFileType(true);
     }
    }
    const handlePost = async ()=>{
       if(caption && videoAsset?._id && category){
          setSavingPost(true);
          const document = {
            _type: 'post',
            caption,
            video:{
              _type: 'file',
              asset:{
                _type: 'reference',
                _ref: videoAsset?._id
              }
            },
            userId: userProfile?._id,
            postedBy:{
              _type:'postedBy',
              _ref: userProfile?._id
            },
            topic: category
          }

          await axios.post(`${BASE_URL}/api/post`,document);
          router.push('/');
       }
    }
  return (
    <div className='flex w-full h-full absolute left-0 top-[80px] mb-10 pt-10 lg:pt-8 bg-gray-900 justify-center '>
        <div className='bg-transparent rounded-lg bg-gray-400 xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6'>
            <div className='text-black'>
                <div>
                    <p className='text-2xl font-bold'>Upload Video</p>
                    <p className='text-md mt-1'>Post a video to your account</p>
                </div>
                <div className='border-dashed rounded-xl border-4 border-gray-900 flex flex-col justify-center items-center outline-none mt-4 w-[260px] h-[460px] p-10 cursor-pointer hover:border-black hover:bg-gray-300'>
                     {isLoading ? (
                        <p>Uploading.......</p>
                     ):(
                        <div>
                            {videoAsset ? (
                                <div>
                                    <video src={videoAsset.url} loop controls className='rounded-xl h-[450px] mt-16 bg-black'>

                                    </video>
                                </div>
                            ):(
                                <label className='cursor-pointer'>
                                  <div className='flex flex-col items-center justify-center h-full'>
                                  <div className='flex flex-col items-center justify-center'>
                                    <p>
                                        <FaCloudUploadAlt className='text-gray-900 text-6xl'/>
                                    </p>
                                    <p className='text-xl text-black font-semibold'>
                                         Upload Video
                                    </p>
                                   </div>
                                   <p className='text-black text-center mt-10 text-sm leading-10'>
                                    Mp4 or WebM <br/> 720p or 1080p or higher <br/> Less Than 1GB
                                   </p>
                                   <p className='bg-gray-500 text-black text-center mt-10 rounded text-md font-medium p-2 w-52 outline-none'>
                                    Select
                                   </p>
                                   <input type='file' name='upload-video' onChange={uploadVideo} className='w-0 h-0'/>
                                  </div>
                                </label>
                            )}
                        </div>
                     )}
                     {wrongFileType && (
                        <p className='text-center text-xl text-gray-300 font-semibold mt-4 w-[250px]'>Please select a video file</p>
                     )}
                </div>
            </div>
            <div className='flex flex-col gap-3 pb-10'>
                   <label className='text-md font-medium'>Caption</label>
                   <input type='text' value={caption} onChange={(e)=>setCaption(e.target.value)} className='rounded outline-none text-md border-2 border-gray-200 p-2 '/>
                   <label className='text-md font-medium'>Choose a Category</label>
                   <select className='outline-none border-2 border-gray-200 text-md capitalize lg:p-2 p-2 rounded cursor-pointer' onChange={(e)=> setCategory(e.target.value)}>
                    {topics.map((topic)=>(
                        <option value={topic.name} key={topic.name} className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 ' >
                            {topic.name}
                        </option>
                    ))}
                   </select>
                   <div className='flex gap-6 mt-10'>
                      <button  className='border-black border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'>
                        Discard
                      </button>
                      <button onClick={handlePost} className='bg-black text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'>
                        Post
                      </button>
                   </div>
            </div>
        </div>
    </div>
  )
}

export default Upload