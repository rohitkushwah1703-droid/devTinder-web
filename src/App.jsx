import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Body />}>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/signup"} element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
