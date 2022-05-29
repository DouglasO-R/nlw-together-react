import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContexts';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';



function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rooms/new' element={<NewRoom />} />
          </Routes>
        </AuthContextProvider>
      </Router>

    </div>
  );
}

export default App;
