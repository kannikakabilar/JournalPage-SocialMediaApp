import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from '../UserContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState('');
    const {setUserInfo} = useContext(UserContext);
    
    async function login(e){
        e.preventDefault();
        if (!username && !password){
            setMessage('Please enter your username and password');
        }else if (!username){
            setMessage('Please enter your username');
        }else if (!password){
            setMessage('Please enter your password');
        }else{

            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                });
            }else{
                setMessage('*Incorrect username or password');
            }
        }
    }

    if (redirect){
        return <Navigate to={'/'} />
    }
    return (
        <div className="loginOuter">
        <div className="login" >
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <input type="text" 
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)} />
                <input type="password" 
                placeholder="password" 
                value={password}
                onChange={e => setPassword(e.target.value)} />
                
                <p Style="color:#d91204;">{message}</p>
                <button>Login</button>
            </form>
            <div>
            <p Style="color:white; font-size:60px; align-items:left; font-variant-caps: petite-caps;">Share Your Experience</p>
            <p Style="color:white; font-size:40px; align-items:center;">of products, companies, services, and more</p>
            <p className="jp" Style="color:white; font-size:70px; align-items:center; max-width:450px; padding:20px;">@JournalPage</p>
            </div>
        </div>    
            <footer>
                <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
                <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
            </footer>
        </div>
        
    );
}