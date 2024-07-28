import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigater = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.BASE_URL}/api/v1/auth`
        );
        if (data.success) {
          navigater("/home");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          navigater("/login");
        }
      }
    })();
  }, []);

  return (
    <div className=" h-full w-full">
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
