import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navigate, useParams} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import {UserContext} from '../UserContext';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ]
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [likes, setLikes] = useState('');
    const [redirect, setRedirect] = useState(0);
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/post/'+id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
                setLikes(postInfo.likes);
            });
        });
    }, []);

    async function updatePost(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        data.set('likes', likes);
        data.set('tryLike', false);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(1);
        }
        
    }

    if (redirect === 1){
        return <Navigate to={'/post/'+id} />
    }
    if (!userInfo){
        return <Navigate to={'/login'} />
    }
    
    return (
        <>
        <form className="editpost" onSubmit={updatePost}>
            <br /><br /><br />
            <h1 Style="font-family:Candara; color:#000126;">Edit Post</h1>
            <input type="title" placeholder={'Title'} value={title} onChange={ e => setTitle(e.target.value) }/>
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ e => setSummary(e.target.value) }/>
            <input type="file" onChange={ e => setFiles(e.target.files) }/>
            <ReactQuill value={content} onChange={ newVal => setContent(newVal) } modules={modules} formats={formats}/>
            <br />
            <button>Update post</button>
        </form>
        <footer Style="position: fixed;">
            <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
            <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
        </footer>
        </>
    );
}