import { auth } from './firebase/config';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//CSS
import './App.css';

//Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';

//Pages
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';

//Context
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/Createpost';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {
	const [user, setUser] = useState(undefined);
	const authFire = auth;

	const loadingUser = user === undefined;

	useEffect(() => {
		onAuthStateChanged(authFire, (user) => {
			setUser(user)
		});
	}, [authFire]);

	if(loadingUser){
		return <p>Carregando...</p>;
	}


  return (
   <div>
				<AuthProvider value={{user}}>
					<BrowserRouter>
						<Navbar/>
							<div className="container">
								<Routes>
									<Route path='/' element={<Home/>}/>
									<Route path='/about' element={<About/>}/>
									<Route path='/login' element={!user ? <Login/> : <Navigate to='/' />}/>
									<Route path='/register' element={!user ? <Register/> : <Navigate to='/' />}/>
									<Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to='/' />}/>
									<Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to='/' />}/>
									<Route path='/posts/edit/:id' element={user ? <EditPost/> : <Navigate to='/' />}/>
									<Route path='/search' element={<Search/>}/>
									<Route path='/posts/:id' element={<Post/>}/>
								</Routes>
							</div>
						<Footer/>
					</BrowserRouter>
				</AuthProvider>
   </div>
  )
}

export default App
