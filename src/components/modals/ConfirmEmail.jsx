import { Modal } from "@mui/material";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import MinorToast from "./MinorToast";

const ConfirmEmailModal = ({ open, setOpen, code, handleCorrectCode }) => {
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleModalClose = () => {
    const enteredCode = inputs.join("");
    console.log(code, enteredCode);

    if (enteredCode === code.toString()) {
      setOpen(false);
      handleCorrectCode();
    } else {
      MinorToast("Incorrect code", "Please try again.");
    }
  };

  const handleInputChange = (index, value) => {
    // Allow only single-digit integers or empty strings
    if (value === "" || /^[0-9]$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      // Move focus to the next input box if the input is valid and not empty
      if (value && index < inputs.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    // Move focus to the previous input box if backspace is pressed
    if (event.key === "Backspace" && !inputs[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <Modal
      open={Boolean(open)}
      onClose={handleModalClose}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md p-4 border-2 border-solid border-mainPurple bg-midnight rounded-xl text-mainPurple text-center font-righteous">
          Check your email for a code!
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex justify-center space-x-2">
              {inputs.map((input, index) => (
                <input
                  className="w-16 h-16 text-mainPurple border-mainPurple border-solid border-2 text-center"
                  key={index}
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleModalClose}
                className="px-6 py-2 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ConfirmEmailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  code: PropTypes.number.isRequired,
  handleCorrectCode: PropTypes.func.isRequired,
};

export default ConfirmEmailModal;
