import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constant';
import UserCard from './UserCard';

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials : true
      })
      dispatch(addFeed(res?.data?.data));
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length <= 0) return <h1 className='flex justify-center my-10 text-xl font-bold'>No new users at the moment!</h1>

  return (
    feed && (<div className='flex justify-center my-4'>
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed