import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';

export default function Post({_id,title, summary, cover, content, createdAt,author,likes}) {
    
    const [postLike, setPostLike] = useState(likes);

    useEffect(() => {
        fetch('http://localhost:4000/post/'+_id).then(response => {
            response.json().then(postInfo => {
                setPostLike(postInfo.likes);
            });
        });
    }, []);

    useEffect(() => {
        const updateLike = async () => {
            try {
                
                //setPostLike(likes);
                const data = new FormData();
                data.set('title', title);
                data.set('summary', summary);
                data.set('content', content);
                data.set('id', _id);
                data.set('file', null);
                data.set('likes', postLike);
                data.set('tryLike', true);
        
                await fetch('http://localhost:4000/post', {
                    method: 'PUT',
                    body: data,
                    credentials: 'include',
                });
                
            } catch (err) {
                console.error(err);
            }
        }
        updateLike();
            
    },[postLike]);

    /*async function clickLike(e) {
        e.preventDefault();
        likes = likes + 1;
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', _id);
        data.set('file', null);
        data.set('likes', likes);
        data.set('tryLike', true);
        
        await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        setPostLike(likes);    
    }*/

    // Below renders how a single post should be displayed
    return (
        <div className="post">
            <p className="info">
                <Link to={`/profile/${author._id}`}><a className="author">{author.username}</a></Link>
                <time>{formatISO9075(new Date(createdAt))}</time>
                <div Style="margin-left:auto; margin-right:10px;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                <a className="like" onClick={() => setPostLike(postLike+1)}>Likes: {postLike}</a></div>
            </p>
            <Link to={`/post/${_id}`}><img src={'http://localhost:4000/'+cover}></img></Link>
            <div className="texts">
            <Link to={`/post/${_id}`}><h2>{title}</h2></Link>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}