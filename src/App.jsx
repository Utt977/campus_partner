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
import Privacy from "./component/Privacy";
import TermsOfService from "./component/TermsOfService";
import CancellationAndRefund from "./component/CancellationAndRefund";
import ContactUs from "./component/ContactUs";
import RefundPolicy from "./component/RefundPolicy";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <div className="flex flex-col min-h-screen"> {/* Flex container to ensure full height */}
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/requests" element={<Request />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/terms-and-conditions" element={<TermsOfService />} />
              <Route path="/cancellation-and-refund" element={<CancellationAndRefund />} />
              <Route path="/shipping-and-delivery" element={<RefundPolicy />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<Privacy />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
