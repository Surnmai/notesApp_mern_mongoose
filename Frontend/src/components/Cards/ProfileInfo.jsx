import React from "react";
import { getInitials } from "../../utils/helper";

// import context
import { useGlobalContext } from "../../Context";

const ProfileInfo = ({ onLogout }) => {
  const { userInfo } = useGlobalContext();
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {getInitials(userInfo?.fullName)}
        </div>
        <div>
          <p>{userInfo?.fullName}</p>
        </div>
        <button
          className="text-sm text-slate-700 underline cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfileInfo;
