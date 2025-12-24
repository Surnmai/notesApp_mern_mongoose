import React from "react";

// import images
import SVGImage from "../../assets/notes-medical-solid-svgrepo-com.svg";
const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center m-20">
      <img src={SVGImage} alt="svg-note-img" className="w-60" />

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        Start creating your first note! Click on the 'Add' button to jot down
        your thoughts, ideas and reminders. Let's get started
      </p>
    </div>
  );
};

export default EmptyCard;
