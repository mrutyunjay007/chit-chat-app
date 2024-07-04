import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "../Components/Layout/Layout";
import SignUp from "../Components/Auth/signUp/SignUp";
import CreateuserName from "../Components/Auth/signUp/CreateuserName";
import Login from "../Components/Auth/Login";
import Home from "../Components/Home/Home";
import axios from "axios";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home></Home>}></Route>

      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route
        path="/username"
        element={<CreateuserName></CreateuserName>}
      ></Route>

      <Route path="/login" element={<Login></Login>}></Route>
    </Route>
  )
);
