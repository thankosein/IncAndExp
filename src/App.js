import React from 'react';
import Category from './components/Category';
import Type from './components/Type';
import IncExpInfo from './components/IncExpInfo';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        {/* Menu Bar */}
        <nav>
          <ul>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/types">Types</Link>
            </li>
            <li>
              <Link to="/inc-exp-info">Inc & Exp</Link>
            </li>
          </ul>  
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/categories" element={<Category />} />
          <Route path="/types" element={<Type />} />
          <Route path="/inc-exp-info" element={<IncExpInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
