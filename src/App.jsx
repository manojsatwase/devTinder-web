import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import appStore from './utils/appStore';

const App = () => {
  // Routing can be created at the root level of your application
   
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      {/* Multiple Routes */}
      <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<div>signup</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;