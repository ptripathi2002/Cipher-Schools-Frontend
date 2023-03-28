import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Sidebar from "./components/sidebar/Sidebar";
import Forgot from "./pages/auth/Forgot";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";

import Home from "./pages/Home/Home";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddInterest from "./pages/addInterest/AddInterest";
import { getLoginStatus } from "./redux/features/auth/authService";
import InterestDetail from "./components/interest/interestDetail/InterestDetail";
import EditInterest from "./pages/editInterest/EditInterest";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }

    loginStatus();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <br />
                <br />
                <Profile />

                <br />
                <br />
                <br />
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-interest"
          element={
            <Sidebar>
              <Layout>
                <AddInterest />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/interest-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <InterestDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-interest/:id"
          element={
            <Sidebar>
              <Layout>
                <EditInterest />
              </Layout>
            </Sidebar>
          }
        />

        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
