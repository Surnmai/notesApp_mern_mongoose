import React, { useEffect } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import Toast from "../../components/Toast/Toast";
import AddNotes from "./AddNotes";

// import icons
import { MdAdd } from "react-icons/md";

// import modal
import Modal from "react-modal";

// import context
import { useGlobalContext } from "../../Context";

// import axios instance
import axiosInstance from "../../utils/axiosinstance";

// import useNavigate
import { useNavigate } from "react-router-dom";

// import moment
import moment from "moment";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const {
    openEditModal,
    setOpenEditModal,
    setUserInfo,
    setGetNotes,
    getNotes,
    showToastMsg,
    setShowToastMsg,
  } = useGlobalContext();

  // console.log(openEditModal.isShown);
  // console.log(getNotes);

  const navigate = useNavigate();

  // get userInfo
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 400) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes/get-all-notes");
      if (response.data && response.data.allNotes) {
        setGetNotes(response.data.allNotes);
      }
    } catch (error) {
      console.log("An unexpected error occurred please try again");
    }
  };

  // Delete Note
  const deleteNote = async (note) => {
    try {
      const response = await axiosInstance.delete(
        `/notes/delete-notes/${note?._id}`
      );

      if (response?.data && response?.data?.success) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
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

  const handleEdit = (notes) => {
    setOpenEditModal({ isShown: true, data: notes, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ message, isShown: true, type });
  };
  const handleCloseToast = () => {
    setShowToastMsg({ message: "", isShown: false });
  };

  // to fetch all user and notes data on component mount
  useEffect(() => {
    getAllNotes();
    getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <section className="container">
        {getNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {getNotes.map((item, idx) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format("Do MM YYYY")}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </section>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 "
        onClick={() => {
          setOpenEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openEditModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddNotes
          type={openEditModal.type}
          noteData={openEditModal.data}
          onClose={() => {
            setOpenEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
