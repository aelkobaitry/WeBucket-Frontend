import DateCountdown from "react-date-countdown-timer";
import logo from "../assets/Logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken } from "../Auth";

const IncomingPage = () => {
  const [showContact, setShowContact] = useState(false);
  const allowContact = () => {
    setShowContact(true);
  };
  const [tester, setTester] = useState({ email: "nothing" });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching");
    fetch("http://localhost:8000/api/v1/auth/current_user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => setTester(data))
      .catch((error) => console.error(error));
    console.log(tester);
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div class="flex flex-col items-center justify-center pt-60">
      <img src={logo} class="w-[8%]" alt="logo" />
      <div class="text-[#A778AF] font-bold text-3xl pt-4">
        <DateCountdown
          dateTo="October 01, 2024 00:00:00 GMT-0400"
          noAnimate={false}
          locales={[":", ":", ":", ":", ":"]}
          locales_plural={[":", ":", ":", ":", ":"]}
        />
        {tester.email}
      </div>
      <a
        class="text-[#A778AF] font-light text-xl pt-64"
        href="#contact"
        onClick={allowContact}
        id="contact"
      >
        Contact the team
      </a>
      {showContact ? (
        <div className="pt-4 pb-14">
          <form
            action="https://getform.io/f/azyldqdb"
            method="POST"
            encType="multipart/form-data"
            class="text-[#A778AF] font-light text-xl"
          >
            <div className="grid w-full gap-4 py-2 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="py-2 text-sm">Name</label>
                <input
                  className="flex p-3 bg-transparent border-2 rounded-md border-purple-950"
                  type="text"
                  name="name"
                />
              </div>
              <div className="flex flex-col">
                <label className="py-2 text-sm">Phone number</label>
                <input
                  className="flex p-3 bg-transparent border-2 rounded-md border-purple-950"
                  type="text"
                  name="phone"
                />
              </div>
            </div>
            <div className="flex flex-col py-2">
              <label className="py-2 text-sm">Email</label>
              <input
                className="flex p-3 bg-transparent border-2 rounded-md border-purple-950"
                type="email"
                name="email"
              />
            </div>
            <div className="flex flex-col py-2">
              <label className="py-2 text-sm">Message</label>
              <textarea
                className="flex p-3 bg-transparent border-2 rounded-md border-purple-950"
                rows="3"
                name="message"
              ></textarea>
            </div>
            <button className="w-full p-2 mt-4 text-neutral-300 bg-purple-950">
              Submit
            </button>
          </form>
        </div>
      ) : null}
      <button
        className="w-full p-2 mt-4 text-neutral-300 bg-purple-950"
        onClick={signOut}
      >
        signout
      </button>
    </div>
  );
};

export default IncomingPage;
