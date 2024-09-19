import { useState } from "react";
import { Card, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import plane from "../assets/icons/plane.png";
import dice from "../assets/icons/dice.png";
import pizza from "../assets/icons/pizza.png";
import PropTypes from "prop-types";
import CreateCardModal from "./modals/CreateCardModal";

const CreateNewCard = ({ setBuckets }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative opacity-50">
      <Card class="bg-mainPurple w-[270px] h-[390px] rounded-[30px] m-10">
        <div className="flex justify-between p-2">
          <IconButton disableRipple disableFocusRipple size="small" disabled>
            <StarBorderRoundedIcon />
          </IconButton>
          <IconButton size="small" disabled>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="flex items-center justify-center flex-grow w-full">
          <div className="bg-midnight w-[235px] h-40 rounded-[25px] shadow-custom flex justify-center items-center">
            <img
              src={plane}
              alt="plane icon"
              className="mx-1 w-14 h-14"
              draggable={false}
            />
            <img
              src={dice}
              alt="dice icon"
              className="mx-1 w-14 h-14"
              draggable={false}
            />
            <img
              src={pizza}
              alt="pizza icon"
              className="mx-1 w-14 h-14"
              draggable={false}
            />
          </div>
        </div>
        <h1 className="mt-2 ml-5 mr-4 overflow-hidden text-2xl font-righteous text-midnight line-clamp-1">
          New List Title
        </h1>
        <div className="w-[230px] h-[75px] flex justify-start items-start mx-auto mb-1.5">
          <p className="overflow-hidden font-sans text-midnight line-clamp-3">
            Add a description...
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 mt-1 text-sm transition-transform duration-100 rounded-full bg-midnight text-mainPurple custom-shadow active:scale-95 active:bg-midnight"
          >
            Create
          </button>
        </div>
      </Card>
      <CreateCardModal
        open={showModal}
        setOpen={setShowModal}
        setBuckets={setBuckets}
      />
    </div>
  );
};

CreateNewCard.propTypes = {
  setBuckets: PropTypes.func.isRequired,
};

export default CreateNewCard;
