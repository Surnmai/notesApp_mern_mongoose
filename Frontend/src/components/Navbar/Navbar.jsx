import React from "react";

// import components
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

// import context
import { useGlobalContext } from "../../Context";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  const { setSearchQuery, searchQuery } = useGlobalContext();

  const handleSearch = () => {};
  const onClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <>
      <div className="bg-white flex items-center justify-between container py-2 shadow-md">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo onLogout={onLogout} />
      </div>
    </>
  );
};

export default Navbar;
