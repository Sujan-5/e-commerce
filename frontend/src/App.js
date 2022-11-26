import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './hTpaths/Home';
import Productpage from './hTpaths/Productpage';
import { Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">
            <span>City</span> Wide
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<Productpage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
