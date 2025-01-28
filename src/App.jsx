import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./component/Body";
import Feed from "./component/Feed";
import Login from "./component/Login";
import Profile from "./component/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Request from "./component/Request";
import Connection from "./component/Connection";
import Chat from "./component/Chat";

const App = () => {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/> 
          <Route path="/connections" element={<Connection/>}/>
          <Route path="/requests" element={<Request/>}/>
          <Route path="/chat/:targetUserId" element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
