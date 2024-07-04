import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchingUser } from "../../Redux/Slices/SearchSlice";
import axios from "axios";

function SearchInput() {
  const [searching, setSearching] = useState("");

  const dispatch = useDispatch();

  const handelSearch = async (value) => {
    try {
      const { data } = await axios.get(
        `api/v1/connection/search?userName=${value}`
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
    <input
      type="text"
      placeholder="search..."
      className="w-4/5 p-1 border-b-2 font border-s-slate-100 focus:outline-none focus:border-black "
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
  );
}

export default SearchInput;
