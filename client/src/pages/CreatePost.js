import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navigate} from 'react-router-dom';
import {useState, useContext} from 'react';
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
export default function CreatePost() {

    const {userInfo} = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(0);
    async function createNewPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.status === 400){
            setRedirect(2);
        }
        if (response.ok) {
            setRedirect(1);
        }
    }

    if (redirect === 1){
        return <Navigate to={'/'} />
    }
    if (redirect === 2){
        return <Navigate to={'/login'} />
    }
    if (!userInfo){
        return <Navigate to={'/login'} />
    }
    return (
        <>
        <form className="createpost" onSubmit={createNewPost}>
            <br /><br /><br />
            <h1 Style="font-family:Candara; color:#000126;">Create a Post</h1>
            <input type="title" placeholder={'Title'} value={title} onChange={ e => setTitle(e.target.value) }/>
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ e => setSummary(e.target.value) }/>
            <input type="file" placeholder={'Upload a cover image'} onChange={ e => setFiles(e.target.files) }/>
            <ReactQuill Style="width:1000px" value={content} onChange={ newVal => setContent(newVal) } modules={modules} formats={formats}/>
            <br />
            <button>Create post</button>
        </form>
        <footer Style="position: fixed;">
            <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
            <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
        </footer>
        </>
    );
}