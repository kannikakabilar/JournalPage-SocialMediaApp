import './App.css';
import Post from './Post';
import Header from './Header';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreatePost from './pages/CreatePost';
import {Route, Routes} from "react-router-dom";
import { UserContextProvider } from './UserContext';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/signup'} element={<SignupPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/editprofile/:id' element={<EditProfile />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
