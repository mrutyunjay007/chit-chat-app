import React, { useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { upDateUserFullName } from "../../Redux/Slices/UserSlice";
import axios from "axios";
import Spiner from "../SmallComponents/Loaders/Spiner";
import getToken from "../../Config/getToken";

function EditFullName() {
  const user = useSelector((state) => state.UserInfo);
  const dispatch = useDispatch();

  const fullNameRef = useRef(null);
  const [editedFullName, setEditedFullrName] = useState(user.userFullName);
  const [fullName, setFullName] = useState(false);
  const [Load, setLoad] = useState(false);

  return (
    <div className="w-1/2 relative flex flex-col justify-center rounded-lg  border-2 p-4  border-s-slate-200 cursor-pointer">
      <FiEdit2
        className={`size-4 cursor-pointer absolute top-4 right-4 text-slate-400 ${
          !fullName ? "block" : "hidden"
        } hover:text-slate-600`}
        onClick={() => {
          setFullName(true);
        }}
      />
      <span className="text-slate-500">Full Name :</span>
      <span className=" font-semibold  ">
        {!fullName ? (
          <span> {editedFullName}</span>
        ) : (
          <>
            <input
              ref={fullNameRef}
              value={editedFullName}
              onChange={(e) => {
                e.preventDefault();
                setEditedFullrName(e.target.value);
              }}
              className="w-full h-10 p-2 border-2 border-s-slate-200 focus:outline-none"
            ></input>
            <div
              className="w-1/2 mt-1 p-3 flex justify-center items-center cursor-pointer rounded-lg drop-shadow-lg text-center font-medium border-2 border-slate-200 text-black hover:border-black hover:bg-black hover:text-white"
              onClick={async () => {
                setLoad(true);

                const { data } = await axios.post(
                  `${
                    import.meta.env.VITE_BASE_URL
                  }/api/v1/user/update-full-name`,
                  { userId: user.userId, userFullName: user.userFullName },
                  getToken()
                );

                if (data.success) {
                  dispatch(
                    upDateUserFullName({ userFullName: editedFullName })
                  );
                }

                setFullName(false);
                setLoad(false);
              }}
            >
              {Load ? (
                <span className="size-7">
                  <Spiner></Spiner>
                </span>
              ) : (
                <span>Save</span>
              )}
            </div>
          </>
        )}
      </span>
    </div>
  );
}

export default EditFullName;
