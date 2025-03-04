import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Login from './Login';
import Profile from './Profile';

const App = () => {
  // Routing can be created at the root level of your application
   
  return (
    <>
    <BrowserRouter basename='/'>
      {/* Multiple Routes */}
      <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<div>signup</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;