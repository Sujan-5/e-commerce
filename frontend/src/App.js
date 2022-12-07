import { Route, Routes, Navigate } from 'react-router-dom';
// import Home from './components/Home';
// import Productpage from './components/Productpage';
// import { Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';

function App() {
  const user = localStorage.getItem('token');
  return (
    // <BrowserRouter>
    // <div>
    //   <header>
    //     {/* <Link to="/">
    //         <span>City</span> Wide
    //       </Link> */}
    //   </header>
    // <main>
    //   </main>
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      {/* <Route path="/product/:slug" element={<Productpage />} />
            <Route path="/" element={<Home />} /> */}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>

    // </div>
    // </BrowserRouter>
  );
}

export default App;
