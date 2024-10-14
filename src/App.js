import React from 'react';
import Category from './components/Category';
import Type from './components/Type';
import IncExpInfo from './components/IncExpInfo';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">      
        {/* Menu Bar */}
        <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-blue-500 hover:underline">Categories</Link>
            </li>
            {/* <li>
              <Link to="/types">Types</Link>
            </li> */}
            <li>
              <Link to="/inc-exp-info" className="text-blue-500 hover:underline">Inc & Exp</Link>
            </li>
          </ul>  
          </div>
        </nav>

        {/* Routes */}
        <div className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/categories" element={<Category />} />
            <Route path="/types" element={<Type />} />
            <Route path="/inc-exp-info" element={<IncExpInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
