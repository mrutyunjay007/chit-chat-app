import React, { useRef, useState } from "react";
import EditFullName from "./EditFullName";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "../SmallComponents/PofilePic";
import fileCompresser from "../../Utility/FileCompresser";
import Spiner from "../SmallComponents/Loaders/Spiner";
import axios from "axios";
import { upDateUserProfilePic } from "../../Redux/Slices/UserSlice";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { InChat } from "../../Redux/Slices/NavSlice";

function EditProfile() {
  const inputRef = useRef();
  const profilePic = useSelector((state) => state.UserInfo.profilePic);
  const userId = useSelector((state) => state.UserInfo.userId);
  const [Load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-[5.1rem] flex justify-start items-center gap-2 border-b-2 border-slate-200 bg-white">
        <span
          onClick={() => {
            navigate(-1);
            dispatch(InChat(true));
          }}
        >
          <RiArrowLeftLine className="ml-2 size-7 cursor-pointer " />
        </span>
        <span className="font-bold text-2xl ">Profile</span>
      </div>

      <div className="w-full  flex flex-col gap-3 pt-5 justify-start items-center ">
        {/* profilePic */}

        <div
          className={` rounded-full flex justify-center items-center w-32 h-32 ${
            Load && "bg-slate-200"
          } `}
        >
          {Load ? (
            <span className="size-8">
              <Spiner></Spiner>
            </span>
          ) : (
            <ProfilePic url={profilePic} w={"full"} h={"full"}></ProfilePic>
          )}
        </div>

        <span
          className="siz-8 border-2 border-s-slate-300 p-3 cursor-pointer rounded-lg text-center font-medium hover:border-black  hover:bg-black hover:text-white transition-all duration-200"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={async (e) => {
              setLoad(true);
              try {
                const compressedFile = await fileCompresser(e.target.files[0]);

                (async () => {
                  const token = localStorage.getItem("token");
                  const formData = new FormData();
                  formData.append("profilePic", compressedFile);
                  formData.append("userId", userId);

                  try {
                    const { data } = await axios.post(
                      `${
                        import.meta.env.VITE_BASE_URL
                      }/api/v1/user/edit-profile-picture`,
                      formData,
                      {
                        header: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    if (data.success) {
                      dispatch(upDateUserProfilePic({ profilePic: data.url }));
                    }
                  } catch (error) {
                    console.log(error);
                  }
                  setLoad(false);
                })();
              } catch (error) {
                console.error(error);
              }
            }}
            className="hidden"
          />
          change
        </span>

        <EditFullName></EditFullName>
      </div>
    </>
  );
}

export default EditProfile;
