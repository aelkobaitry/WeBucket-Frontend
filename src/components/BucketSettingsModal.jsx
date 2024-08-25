import React from "react";
import addUser from "../assets/icons/addUser.png";
import addCover from "../assets/icons/addCover.png";
import editDesc from "../assets/icons/editDescription.png";
import rename from "../assets/icons/renameChecklist.png";
import trash from "../assets/icons/trash.png";

const SettingsModal = ({ setTitleModal, setDescModal }) => {
  const handleTitle = () => {
    setTitleModal(true);
  };

  const handleDescription = () => {
    setDescModal(true);
  };

  const handleClose = () => {
    setTitleModal(false);
    setDescModal(false);
  };

  return (
    <div class="w-44 h-36 bg-darkerPurple rounded-[25px] shadow-custom flex items-center justify-center mx-auto">
      <ul class="font-sans text-[#340732]">
        <li>
          <button class="text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pl-2.5">
            <img src={addUser} class="w-3 h-3 mr-2" />
            Add User
          </button>
        </li>
        <li>
          <button class=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pr-0 pl-2.5">
            <img src={addCover} class="w-3 h-3 mr-2" />
            Add Cover Image
          </button>
        </li>
        <li>
          <button
            onClick={handleTitle}
            class=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pr-0 pl-2.5"
          >
            <img src={rename} class="w-3 h-3 mr-2" />
            Rename Checklist
          </button>
        </li>
        <li>
          <button
            onClick={handleDescription}
            class=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pl-2.5"
          >
            <img src={editDesc} class="w-3 h-3 mr-2" />
            Edit Description
          </button>
        </li>
        <li>
          <button class=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pl-2.5">
            <img src={trash} class="w-3 h-3 mr-2" />
            Delete Checklist
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsModal;
