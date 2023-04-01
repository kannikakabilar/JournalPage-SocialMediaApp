import {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {UserContext} from '../UserContext';
import {Navigate} from 'react-router-dom';

export default function EditProfile(){
    const [username, setUsername] = useState('');
    const [color, setColor] = useState('');
    const [email, setEmail] = useState('');
    const [lineOfWork, setLineOfWork] = useState('');
    const [locatedAt, setLocatedAt] = useState('');
    const [interests, setInterests] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [origUsername, setOrigUsername] = useState('');
    const [newStatusMessage, setNewStatusMessage] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newLineOfWork, setNewLineOfWork] = useState('');
    const [newLocatedAt, setNewLocatedAt] = useState('');
    const [newInterests, setNewInterests] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [msg, setMsg] = useState('');
    const [oldPswd, setOldPswd] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const bcrypt = require('bcryptjs');
    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    const [profPswd, setProfPswd] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/editprofile/'+id).then(response => {
            response.json().then(profiInfo => {
                setUsername(profiInfo.username);
                setOrigUsername(profiInfo.username);
                setLineOfWork(profiInfo.lineOfWork);
                setColor(profiInfo.color);
                setEmail(profiInfo.email);
                setLocatedAt(profiInfo.locatedAt);
                setInterests(profiInfo.interests);
                setStatusMessage(profiInfo.statusMessage);
                setProfPswd(profiInfo.password);
                    
            });
        });
    }, []);


    let timestamp = (id).toString().substring(0,8);
    let date = new Date( parseInt( timestamp, 16 ) * 1000 );
    const joinedAt = date.toDateString();

    async function updateProfile(e){
        e.preventDefault();
        if (oldPswd && !(bcrypt.compareSync(oldPswd, profPswd))){
            setMsg('*Your current password is incorrect');
        }else if (oldPswd && !password){
            setMsg('*Please enter a new password');
        }else if (oldPswd && !password2){
            setMsg('*Please re-enter your new password');
        }else if (password !== password2){
            setMsg(`*Passwords don't match`);
        }else{
        
            let msg, eml, low, la, intr = '';
            (newEmail) ? eml = newEmail : eml = email;
            (newLineOfWork) ? low = newLineOfWork : low = lineOfWork;
            (newLocatedAt) ? la = newLocatedAt : la = locatedAt;
            (newInterests) ? intr = newInterests : intr = interests;
            (newStatusMessage) ? msg = newStatusMessage : msg = statusMessage;
        
            const mydata = {'id': id, 'username': username, 'statusMessage': msg, 'color': color, 'email': eml, 'lineOfWork': low, 'locatedAt': la, 'interests': intr, 'oldPswd': oldPswd, 'newPswd': password};
       
            const response = await fetch('http://localhost:4000/editprofile', {
                method: 'PUT',
                body: JSON.stringify(mydata),
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            });
            if (response.status === 401){
                setMsg('*Please select a different username');
            }else if (response.status === 402){
                setMsg('*Your current password is incorrect');
            }
            else if (response.ok){
                alert('Profile updated successfully!');
                setRedirect(true);
            }
        }
        
    }

    if (redirect){
        return <Navigate to={'/profile/'+id} />
    }
    
    function mySetUsername(e){
        if(e === ''){
            setUsername(origUsername);
        }else{
            setUsername(e);    
        }
        return;
    }

    if (!userInfo){
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <br /><br /><br /><br />
            <form onSubmit={updateProfile} Style={`width: 1100px; margin: 0 auto; border: solid 2px; border-color:${color}`}>
            <div className="editprofiletitle">
            <button Style="float: right;">Update Profile</button>
            <h1 Style={`font-family:Candara; color:${color};`}>@{username}</h1>
            <h2 Style="gap: 10px; display: flex; font-family:Candara; color:lightslategray; padding-left:20px">Change Username: <input Style="padding: 5px; width: 55%;" className="editprofileinput" placeholder={username} onChange={e => mySetUsername(e.target.value)}/></h2>
            <h2 Style="gap: 10px; display: flex; font-family:Candara; color:lightslategray; padding-left:20px">Status Message: <input Style="padding: 5px; width: 60%;" className="editprofileinput" placeholder={statusMessage} onChange={e => setNewStatusMessage(e.target.value)}/></h2>
            </div>
            
            <div className="profilepage">
            <p><div>Email:</div> <input className="editprofileinput" placeholder={email} onChange={e => setNewEmail(e.target.value)}/>
            <div>Line of work:</div> <input className="editprofileinput" placeholder={lineOfWork} onChange={e => setNewLineOfWork(e.target.value)}/></p>
            <p><div>Joined On:</div> <input className="editprofileinput" placeholder={joinedAt} disabled/>
            <div>Located@: </div> <input className="editprofileinput" placeholder={locatedAt} onChange={e => setNewLocatedAt(e.target.value)}/></p>
            <p><div>Interests: </div><input Style="width: 190%;" className="editprofileinput" placeholder={interests} onChange={e => setNewInterests(e.target.value)}/></p>
            </div>
            
            <div className="pswdprofilepage">
                <p><div>Change Password: </div>
                <input type="password" placeholder='Current Password' onChange={e => setOldPswd(e.target.value)}/>
                <input type="password" placeholder='New Password' onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder='Re-enter New Password' onChange={e => setPassword2(e.target.value)}/></p>
            </div>

            <div className="colorprofilepage">
                <div for="colors">Choose a theme color:</div>
                <select name="colors" id="colors" onChange={e => setColor(e.target.value)}>
                    <option value="#00009c">Select a Color</option>
                    <option value="#00009c">Navy Blue</option>
                    <option value="#13fc03">Lime Green</option>
                    <option value="#ff0516">Ruby Red</option>
                    <option value="#fc4714">Fiery Orange</option>
                    <option value="#f502bc">Hot Pink</option>
                    <option value="#9d0af2">Violet</option>
                </select>
            </div>
            <br /><br />
            <div Style="width: 80%; margin: 0 auto; color:red;">{msg}</div>
            <br /><br />
            </form>

            <footer Style="position:fixed;">
                <p>Copyright © 2023 All Rights Reserved by Kannika Kabilar.</p>
                <p>For more information and to view the source code of this project, please visit my GitHub page.</p>
            </footer>
        </>
    );
}