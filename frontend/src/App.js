import { Route, Routes, Navigate } from 'react-router-dom';
// import Home from './hTpaths/Home';
// import Productpage from './hTpaths/Productpage';
// import { Link } from 'react-router-dom';
import Login from './hTpaths/Login';
import Signup from './hTpaths/Signup';
import Main from './hTpaths/Main';

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
    <main>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        {/* <Route path="/product/:slug" element={<Productpage />} />
            <Route path="/" element={<Home />} /> */}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
      </Routes>
    </main>
    // </div>
    // </BrowserRouter>
  );
}

export default App;
