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
import Email from "../Components/Auth/signUp/Email";
import Validation from "../Components/Auth/signUp/Validation";
import SignUpLayout from "../Components/Auth/signUp/Layout/SignUpLayout";
import EmailLayout from "../Components/Auth/signUp/Layout/EmailLayout";
import HomeLayout from "../Components/Home/HomeLayout";
import EditProfile from "../Components/EditProfile/EditProfile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<HomeLayout></HomeLayout>}>
        <Route index element={<Home></Home>} />
        <Route
          path="/home/profile"
          element={<EditProfile></EditProfile>}
        ></Route>
      </Route>

      <Route path="/signup" element={<SignUpLayout></SignUpLayout>}>
        <Route index element={<SignUp></SignUp>}></Route>

        <Route path="/signup/email" element={<EmailLayout></EmailLayout>}>
          <Route index element={<Email></Email>} />
          <Route
            path="/signup/email/validation"
            element={<Validation></Validation>}
          ></Route>
        </Route>

        <Route
          path="/signup/username"
          element={<CreateuserName></CreateuserName>}
        ></Route>
      </Route>

      <Route path="/login" element={<Login></Login>}></Route>
    </Route>
  )
);
