import React from "react";

// import components
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

// import context
import { useGlobalContext } from "../../Context";

// import axios Instance
import axiosInstance from "../../utils/axiosinstance";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const { userInfo, setSearchQuery, searchQuery, setIsSearch, setAllNotes } =
    useGlobalContext();

  // Search Note
  const searchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/notes/search-notes", {
        params: { query },
      });

      if (response?.data && response?.data?.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      if (
        error?.response &&
        error?.response.data &&
        error?.response.data.message
      ) {
        setError("Unexpected error occurred");
      }
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchNote(searchQuery.trim());
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    setIsSearch(false);
  };

  // Handle Enter key press in search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <div className="bg-white shadow-md">
        <div className="flex items-center justify-between container py-2">
          <h2 className="text-xl font-medium text-black py-2">Notes</h2>

          {userInfo && (
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => {
                setSearchQuery(target.value);
              }}
              onKeyDown={handleKeyDown}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          )}

          <ProfileInfo onLogout={onLogout} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
