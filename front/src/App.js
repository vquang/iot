import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Data from './pages/Data'
import History from './pages/History'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<Layout path='/'><Dashboard /></Layout>} />
          <Route path={'/profile'} element={<Layout path='/profile'><Profile /></Layout>} />
          <Route path={'/data'} element={<Layout path='/data'><Data /></Layout>} />
          <Route path={'/history'} element={<Layout path='/history'><History /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
