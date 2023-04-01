import Post from '../Post';
import {useEffect, useState} from 'react';

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);
    
    useEffect(() => {
        const searchData = async () => {
            try {
                let profilepost = [];
        
                if(search === ""){
                    setSearchedPosts(searchedPosts);
                }else{
                    for (let i = 0; i < posts.length; i++) {
                        if(posts[i].title.includes(search) || posts[i].author.username.includes(search)){
                            profilepost.push(posts[i]);
                        }
                    }
                    setSearchedPosts(profilepost);
                }
                
            } catch (err) {
                console.error(err);
            }
        }
        searchData();
            
    },[search]);
    /* // The below function also works but it is 1-step slower than useEffect
    function searching(e){
        let profilepost = [];
        setSearch(e);
        if(search === ""){
            setSearchedPosts(posts);
        }else{

            for (let i = 0; i < posts.length; i++) {
                if(posts[i].title.includes(search)){
                    profilepost.push(posts[i]);
                }
            }
            setSearchedPosts(profilepost);
        }
    }*/
    const [searchedPosts, setSearchedPosts] = useState(posts);
    
    return (
        <>
            <br /><br /><br /><br /> <br />
            
            <input type="text" 
                placeholder="Search for JournalPage Posts by title or users ..."
                onChange={e => setSearch(e.target.value)} 
                Style="width: 860px; margin: 0 auto; border-color: #00034f;" />
            <br />
            <div>
            {search && searchedPosts.length > 0 && searchedPosts.map(post => (
                <Post {...post} />
            ))}

            {!search && posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
            </div>
            <footer Style={'float: bottom; position:fixed;'}>
                <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
                <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
            </footer>
        </>
    );
}