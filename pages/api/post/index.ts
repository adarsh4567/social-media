import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method=='GET'){  // GET request for all posts
        const query = allPostsQuery();   // get query from queries.ts

        const data = await client.fetch(query);  // fetch data from Sanity

        res.status(200).json(data);   // return data as JSON
    }else if(req.method==='POST'){
        const document = req.body;
        client.create(document).then(() =>  res.status(201).json('Video Created') )
    }
}