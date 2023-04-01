import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from './UserContext';

export default function Header() { 
    const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
        
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">Journal Page</Link>
            <nav>
                {username && (
                    <> 
                        <Link to={`/profile/${userInfo.id}`}><span Style="padding-right: 80px; font-size: larger;">Hello, @{username}</span></Link>
                        <Link to="/create">Create newpost</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            
            </nav>
        </header>
            
    );
}