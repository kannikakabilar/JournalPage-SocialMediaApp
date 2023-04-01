import {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {UserContext} from '../UserContext';
import {Navigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Post from '../Post';

export default function ProfilePage() {
    const [profInfo, setProfInfo] = useState(null);
    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/profile/${id}`).then(response => {
            response.json().then(profInfo => {
                setProfInfo(profInfo);
            });
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:4000/profilepost/${id}`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);

    if (!profInfo){
        return (
            <div>User not found! :(</div>
        );
    }

    if (!userInfo){
        return <Navigate to={'/login'} />
    }

    
    let timestamp = (profInfo._id).toString().substring(0,8);
    let date = new Date( parseInt( timestamp, 16 ) * 1000 );
    const joindedAt = date.toDateString();

    return (
        <>
            <br /><br /><br /><br />

            <div Style={`width: 1100px; margin: 0 auto; border: solid 2px; border-color:${profInfo.color}`}>
            <div className="profiletitle">
            
            {userInfo.id.toString() === (profInfo._id).toString() && (
                <div Style="display:flex; padding-bottom: 0;"><h1 Style={`font-family:Candara; color:${profInfo.color};`}>@{profInfo.username}</h1><p Style="float: right; padding-left:500px;"><Link to={`/editprofile/${profInfo._id}`}><button>Edit Profile</button></Link></p></div>
            )}

            {userInfo.id.toString() !== (profInfo._id).toString() && (
                <div><h1 Style={`font-family:Candara; color:${profInfo.color};`}>@{profInfo.username}</h1></div>
            )}

            <h2 Style="padding-top: 0; font-family:Candara; color:lightslategray; padding-left:20px">Status Message: {profInfo.statusMessage}</h2>
            </div>

            <div className="profilepage">
            <p><div>Email:</div> <input className="profileinput" value={profInfo.email}/>
            <div>Line of work:</div> <input className="profileinput" value={profInfo.lineOfWork}/></p>
            <p><div>Joined On:</div> <input className="profileinput" value={joindedAt}/>
            <div>Located@: </div> <input className="profileinput" value={profInfo.locatedAt}/></p>
            <p><div>Interests: </div><input Style="width: 190%;" className="profileinput" value={profInfo.interests}/></p>
            <p><div>My Posts</div></p>
            </div>
            
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
            </div>
            
            <footer Style="position:fixed;">
                <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
                <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
            </footer>
        </>
        
    );
}