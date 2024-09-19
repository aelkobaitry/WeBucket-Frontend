import toast from "react-hot-toast";
import logo from "../../assets/Logo.svg";

const MinorToast = (title, message) => {
  toast.custom(
    (t) => (
      <div
        className={` w-full max-w-sm overflow-hidden bg-midnight opacity-90 border-solid border-mainPurple border-[1px] rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <div className="pt-2 pb-2 pl-4 pr-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img src={logo} className="mt-2 w-7" alt="WeBucket Logo" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="font-medium text-md text-mainPurple">{title}</p>
              <p className="text-sm text-mainPurple">{message}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      position: "top-right",
      duration: 4000,
    }
  );
};

export default MinorToast;
