import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import MinorToast from "../components/modals/MinorToast";
import {
  fetchEarlyAccessToken,
  setEarlyAccessToken,
} from "../store/EarlyAccess";
import logo from "../assets/Logo.svg";
import DateCountdown from "react-date-countdown-timer";

function EarlyAccessPage() {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (accessCode == "hireStudents!!") {
      setEarlyAccessToken(accessCode);
      navigate("/login");
    } else {
      MinorToast("Error!", "incorrect access code");
    }
  };

  const [showContact, setShowContact] = useState(false);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center">
      {fetchEarlyAccessToken() ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <img
              src={logo}
              className="pt-10 mb-5 md:mr-24 w-28"
              alt="WeBucket Logo"
            />
            <form
              className="relative flex flex-col text-xl font-light text-light-purple"
              onSubmit={handleSubmit}
            >
              Do you have an early access code?
              <input
                className="flex w-full p-3 mt-3 bg-transparent border-2 rounded-md sm:w-96 border-light-purple text-light-purple"
                type="text"
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter code"
              />
              <button
                className="w-full p-2 mt-4 text-neutral-300 bg-purple-950"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <a
            className="text-[#A778AF] font-light text-xl mt-5 md:mt-20 md:bottom-14 relative md:fixed"
            href="#contact"
            onClick={() => setShowContact(!showContact)}
            id="contact"
          >
            Request Early Access
          </a>
          <div className="relative text-4xl mb-9 text-mainPurple md:bottom-14 md:fixed">
            <DateCountdown
              dateTo="November 01, 2024 00:00:00 GMT-0400"
              noAnimate={false}
              locales={[":", ":", ":", ":", ":"]}
              locales_plural={[":", ":", ":", ":", ":"]}
            />
          </div>
          {showContact ? (
            <div className="relative pb-14">
              <form
                action="https://getform.io/f/azyldqdb"
                method="POST"
                encType="multipart/form-data"
                className="text-xl font-light"
              >
                <div className="grid w-full gap-4 py-2 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="py-2 text-sm">Name</label>
                    <input
                      className="flex p-3 bg-transparent border-2 rounded-md border-medium-purple text-light-purple"
                      type="text"
                      name="name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="py-2 text-sm">Phone number</label>
                    <input
                      className="flex p-3 bg-transparent border-2 rounded-md border-medium-purple text-light-purple"
                      type="text"
                      name="phone"
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="py-2 text-sm">Email</label>
                  <input
                    className="flex p-3 bg-transparent border-2 rounded-md border-medium-purple text-light-purple"
                    type="email"
                    name="email"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="py-2 text-sm">Reason</label>
                  <textarea
                    className="flex p-3 bg-transparent border-2 rounded-md border-medium-purple text-light-purple"
                    rows="3"
                    name="message"
                  />
                </div>
                <button className="w-full p-2 mt-4 text-neutral-300 bg-purple-950">
                  Submit
                </button>
              </form>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default EarlyAccessPage;
