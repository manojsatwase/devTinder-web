import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

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
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/chat/:targetUserId" element={<Chat/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;