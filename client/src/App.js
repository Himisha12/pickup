import { BrowserRouter, Link,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import MyQuote from './components/MyQuote';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Error from './components/Error';
import { Logout } from './components/Logout';
import { NavLink } from 'react-router-dom';
import { useAuth } from './store/auth';
 import './App.css';
 import './styles.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
        
//       </header>
//     </div>
//   );
// }

// export default App;

function App() {
  const {isLoggedIn} = useAuth();
  return (
    <BrowserRouter>
      <nav>
      <Link to="/">
      <div className="logo">
          <span>PICKUP REQUEST</span>
        </div>
      </Link>
      
        <ul>
          <li><NavLink to="/" activeclassname="active">Home</NavLink></li>
          <li><NavLink to="/form" activeclassname="active">Form</NavLink></li>
          <li><NavLink to="/my-quote" activeclassname="active">My Quote</NavLink></li>
          {isLoggedIn ? (<li><NavLink to="/logout" activeclassname="active">Logout</NavLink></li>) : (<>
            <li><NavLink to="/login" activeclassname="active">Login</NavLink></li>
          <li><NavLink to="/signup" activeclassname="active">SignUp</NavLink></li>
          </>)}
          
          
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-quote" element={<MyQuote />} />
      <Route path="/login" element={<Login />} />
      <Route path="/form" element={<Form />} />
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path='/logout' element={<Logout />} />
      <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;