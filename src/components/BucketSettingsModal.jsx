import addUser from "../assets/icons/addUser.png";
import addCover from "../assets/icons/addCover.png";
import editDesc from "../assets/icons/editDescription.png";
import rename from "../assets/icons/renameChecklist.png";
import trash from "../assets/icons/trash.png";
import PropTypes from "prop-types";

const SettingsModal = ({
  setEditTitle,
  setEditDescription,
  setDeleteChecklist,
  setAddUserOpen,
}) => {
  return (
    <div className="w-44 h-36 bg-darkerPurple rounded-[25px] shadow-custom flex items-center justify-center mx-auto">
      <ul className="font-sans text-[#340732]">
        <li>
          <button
            onClick={() => setAddUserOpen(true)}
            className="text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pl-2.5"
          >
            <img src={addUser} className="w-3 h-3 mr-2" />
            Add User
          </button>
        </li>
        <li>
          <button className=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pr-0 pl-2.5">
            <img src={addCover} className="w-3 h-3 mr-2" />
            Add Cover Image
          </button>
        </li>
        <li>
          <button
            onClick={() => setEditTitle(true)}
            className=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pr-0 pl-2.5"
          >
            <img src={rename} className="w-3 h-3 mr-2" />
            Rename Checklist
          </button>
        </li>
        <li>
          <button
            onClick={() => setEditDescription(true)}
            className=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pl-2.5"
          >
            <img src={editDesc} className="w-3 h-3 mr-2" />
            Edit Description
          </button>
        </li>
        <li>
          <button
            onClick={() => setDeleteChecklist(true)}
            className=" text-sm bg-transparent rounded-lg flex items-center w-40 h-6 hover:bg-hoverPurple pl-2.5"
          >
            <img src={trash} className="w-3 h-3 mr-2" />
            Delete Checklist
          </button>
        </li>
      </ul>
    </div>
  );
};

SettingsModal.propTypes = {
  setEditTitle: PropTypes.func.isRequired,
  setEditDescription: PropTypes.func.isRequired,
  setDeleteChecklist: PropTypes.func.isRequired,
  setAddUserOpen: PropTypes.func.isRequired,
};

export default SettingsModal;
