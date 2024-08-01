import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActOfSearching, SearchingUser } from "../../Redux/Slices/SearchSlice";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import getToken from "../../Config/getToken";

function SearchInput({ isSearching, handleSearching }) {
  const [searching, setSearching] = useState("");
  const { searchAct } = useSelector((state) => state.SearchInfo);

  const dispatch = useDispatch();

  const handelSearch = async (value) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/connection/search?userName=${value}`,
        getToken()
      );
      if (data.success) {
        dispatch(SearchingUser({ success: true, ...data.user }));
      }
    } catch (error) {
      if (error.response.status == 404) {
        dispatch(SearchingUser({ success: false }));
        console.log("no");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <span
      className={` ${
        searchAct && "flex-1 pl-5 w-full"
      }  justify-center items-center `}
    >
      <span
        onClick={() => {
          dispatch(ActOfSearching(true));
        }}
      >
        <RiSearchLine
          className={`size-7 cursor-pointer ${searchAct ? "hidden" : "block"}`}
        />
      </span>
      <span
        className={` flex duration-500 border-2 px-3 py-2 rounded-xl border-slate-500 ${
          !searchAct ? "hidden w-0" : "block w-full "
        }`}
      >
        <input
          type="text"
          placeholder="search..."
          className=" w-full   focus:outline-none  "
          value={searching}
          onChange={(e) => {
            e.preventDefault();
            setSearching(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handelSearch(e.target.value);
              setSearching("");
            }
          }}
        />
      </span>
    </span>
  );
}

export default SearchInput;
