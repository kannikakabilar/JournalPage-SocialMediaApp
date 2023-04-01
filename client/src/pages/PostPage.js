import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import {UserContext} from '../UserContext';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';

export default function PostPage() {
    const [postInfo,setPostInfo] = useState(null);
    const [postLikes,setPostLikes] = useState(0);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
                setPostLikes(postInfo.likes);
            });
        });
    }, []);

    if (!postInfo){
        return (
            <div>Sorry, Post not found! :(</div>
        );
    }

    async function clickLike(e) {
        e.preventDefault();
        postInfo.likes = postInfo.likes + 1;
        const data = new FormData();
        data.set('title', postInfo.title);
        data.set('summary', postInfo.summary);
        data.set('content', postInfo.content);
        data.set('id', postInfo._id);
        data.set('file', null);
        data.set('likes', postInfo.likes);
        data.set('tryLike', true);
        
        await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        setPostInfo(postInfo);
        setPostLikes(postInfo.likes);   
    }

    if (!userInfo){
        return <Navigate to={'/login'} />
    }

    return (
        <>
        <div className="post-page">
            <br /><br /><br /><br />
            
            <div className="post-title">
                <h1>{postInfo.title}</h1>
                {userInfo.id === postInfo.author._id && (   
                    <h1 className="edit" ><Link to={`/edit/${postInfo._id}`} Style="text-decoration: none;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                Edit Post</Link></h1>
                )}
            </div>
            
            <p className="info">
                <Link to={`/profile/${postInfo.author._id}`}><a className="author">{'@'+postInfo.author.username}</a></Link>
                <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                <div Style="margin-left:auto; margin-right:10px;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                <a className="like" onClick={clickLike}>Likes: {postLikes}</a></div>
            </p>
            <img src={`http://localhost:4000/${postInfo.cover}`}></img>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
        
        <br /><br /><br />
        <footer>
                <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
                <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
        </footer>
        </>
    );
}