import {useState} from "react";
import {Navigate} from 'react-router-dom';
export default function SignupPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function signup(e){
        e.preventDefault();
        if (!username){
            setMessage('Please enter a username');
        }else if (!email){
            setMessage('Please enter your email');
        }else if (!(email.includes("@"))){
            setMessage('Please enter a valid email address');
        }else if (!password){
            setMessage('Please enter a password');
        }else if (!password2){
            setMessage('Please re-enter the password');
        }else if (password !== password2){
            setMessage(`*Passwords don't match`);
        }else{
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                body: JSON.stringify({username, password, email}),
                headers: {'Content-Type': 'application/json'},
            });

            if(response.status === 200){
                alert('Account created successfully!'); 
                setRedirect(true);          
            }else{
                setMessage('Please enter a different username');
            }
        }    
    }

    if (redirect){
        return <Navigate to={'/login'} />
    }

    return (
        <div className="signup">
        <form className="signup" onSubmit={signup}>
            <h1>Sign Up</h1>
            <input type="text" 
                   placeholder="Username" 
                   value={username} 
                   onChange={e => setUsername(e.target.value)}/>
            <input type="text" 
                   placeholder="Email"
                   value={email}
                   onChange={e => setEmail(e.target.value)}/>
            <input type="password" 
                   placeholder="Password" 
                   value={password}
                   onChange={e => setPassword(e.target.value)}/>
            <input type="password" 
                   placeholder="Confirm Password"
                   value={password2}
                   onChange={e => setPassword2(e.target.value)}/>
            <p Style="color:#d91204;">{message}</p>
            <button>Sign Up</button>
        </form>
        
        <footer>
                <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
                <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
        </footer>
        </div>
    );
}