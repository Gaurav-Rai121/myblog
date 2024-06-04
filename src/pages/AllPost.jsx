import React,{useEffect,useState} from 'react'
import { PostCard,Container } from '../components'
import service from '../appwrite/conf'

function AllPost() {
    const[Post,setPost]= useState()
    useEffect(()=>{},[])

    service.allPost([])
    .then((Post)=>{
         if(Post)
            {
                setPost(Post.documents)
            }
    })
    .catch((error)=>{
      console.log("AllPost::error::",error);
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {Post.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
    
  )
}

export default AllPost