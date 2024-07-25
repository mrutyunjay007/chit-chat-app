import axios from "axios";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PopUpProfile() {
  const userId = useSelector((state) => state.UserInfo.userId);
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-6  left-5 drop-shadow-lg  rounded-r-xl rounded-t-xl  p-3 flex justify-center bg-white border-2 border-slate-200 items-center">
      <div className=" flex flex-col gap-2">
        <span
          className="flex items-center gap-2"
          onClick={() => {
            navigate("/home/profile");
          }}
        >
          <RiEditBoxLine />
          <span className="font-bold ">Edit</span>
        </span>
        <span
          className="flex items-center gap-2"
          onClick={async () => {
            const { data } = await axios.post(
              "/api/v1/logout",
              { userId },
              {
                header: {
                  "content-type": "applictation/json",
                },
              }
            );
            if (data.success) {
              navigate("/login");
            }
          }}
        >
          <RiLogoutBoxLine />
          <span className="font-bold ">Logout</span>
        </span>
      </div>
    </div>
  );
}

export default PopUpProfile;
