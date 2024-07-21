import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ConnectionElememtFromSearch } from "../../Redux/Slices/SearchSlice";
import { chatAct } from "../../Redux/Slices/ChatSlice";

function Search({ search, searchDone }) {
  const dispatch = useDispatch();
  console.log(search);

  const handelSearchedChat = async () => {
    //  get chat from api from userId or create chat if not present
    //  open chat
    //  select connention from connection list if prresent, else add connection to connection list and then select that

    try {
      const { data } = await axios.get(
        `api/v1/chat/search?userId=${search._id}`
      );
      console.log(data);
      if (data.success) {
        const chatId = data.chat._id;

        const connection = {
          _id: chatId,
          connection: {
            _id: search._id,
            userName: search.userName,
            fullName: search.fullName,
          },
        };

        dispatch(ConnectionElememtFromSearch(connection));
        searchDone();
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log("selef messageing is not possible");
      }
      console.log(error);
    }
  };

  if (search === null) {
    return <div> </div>;
  }

  if (!search.success) {
    return <div>no user </div>;
  }
  return (
    <div
      className={`flex items-center gap-2 w-full p-4 rounded-lg border-2
     border-slate-200
       cursor-pointer`}
      onClick={handelSearchedChat}
    >
      <span className="flex items-center">
        <RiAccountCircleLine className={`size-8 `}></RiAccountCircleLine>
      </span>
      <span className="size-8 text-xl font-semibold">{search.userName}</span>
      <span></span>
    </div>
  );
}

export default Search;
