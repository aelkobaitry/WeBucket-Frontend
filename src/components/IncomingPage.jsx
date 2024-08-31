import DateCountdown from "react-date-countdown-timer";
import logo from "../assets/Logo.svg";
import { useState } from "react";

const IncomingPage = () => {
  const [showContact, setShowContact] = useState(false);
  const allowContact = () => {
    setShowContact(true);
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
    </div>
  );
};

export default IncomingPage;
