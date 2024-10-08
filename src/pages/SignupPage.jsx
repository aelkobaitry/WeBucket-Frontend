import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import MinorToast from "../components/modals/MinorToast";
import { createUser, verifyUniqueUser } from "../store/Fetch";
import emailjs from "@emailjs/browser";
import ConfirmEmailModal from "../components/modals/ConfirmEmail";

function SignupPage() {
  const navigate = useNavigate();
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [code, setCode] = useState(0);
  const [showModal, setShowModal] = useState(false);

  emailjs.init("DNsZyQzNcsbxO-nad"); // Replace with webucket EmailJS public key

  const validateParams = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const usernameRegex = /^(?=.{4,})[a-zA-Z0-9._]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!emailRegex.test(email)) {
      MinorToast("Error!", "Please enter a valid email.");
      return false;
    }
    if (!nameRegex.test(first) || !nameRegex.test(last)) {
      MinorToast("Error!", "Names should consist of letters only.");
      return false;
    }
    if (!usernameRegex.test(username)) {
      MinorToast("Error!", "Invalid username.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      MinorToast("Error!", "Invalid password.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const unique = await verifyUniqueUser({username: username, email: email});
    if (!unique) {
      return;
    }

    const generatedCode = Math.floor(100000 + Math.random() * 900000);
    setCode(generatedCode);

    if (!validateParams()) {
      return;
    }

    var templateParams = {
      firstname: first,
      lastname: last,
      username: username,
      password: password,
      email: email,
      code: generatedCode,
    };

    emailjs.send("service_emxyxn8", "template_fnm7b2b", templateParams).then(
      //replace with webucket template code and email service
      (result) => {
        setShowModal(true);
      },
      (error) => {
        alert("Failed to send email. Please try again later.");
        console.error(error);
      }
    );
  };

  const handleCorrectCode = () => {
    const formDetails = {
      firstname: first,
      lastname: last,
      username: username,
      password: password,
      email: email,
    };
    createUser(formDetails, navigate);
    navigate("/login");
  };

  return (
    <div class="relative z-10">
      <form
        className="text-[#A778AF] font-light text-xl relative"
        onSubmit={handleSubmit}
      >
        Sign Up
        <div className="grid w-full pt-4 gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="pb-1 text-sm text-mainPurple">First name</label>
            <input
              className="flex p-3.5 bg-transparent border-2 rounded-md mb-4 text-mainPurple text-base"
              type="text"
              name="firstName"
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="pb-1 text-sm text-mainPurple">Last name</label>
            <input
              className="flex p-3.5 bg-transparent border-2 rounded-md border-purple-950 mb-4 text-mainPurple text-base"
              type="text"
              name="lastName"
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
        </div>
        <div className="grid w-full md:grid-cols-1">
          <div className="flex flex-col">
            <label className="pb-1 mt-0 text-sm text-mainPurple">Email</label>
            <input
              className="flex p-3.5 bg-transparent border-2 rounded-md mb-4 text-mainPurple text-base"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="pb-1 mt-0 text-sm text-mainPurple">
              Username
            </label>
            <input
              className="flex p-3.5 bg-transparent border-2 rounded-md text-mainPurple text-base"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label class="text-lightGray opacity-70 pb-2 text-xs mt-1">
              At least 4 characters containing only letters, numbers, periods or
              underscores
            </label>
          </div>
          <div className="flex flex-col">
            <label className="pb-1 mt-0 text-sm text-mainPurple">
              Password
            </label>
            <input
              className="flex p-3.5 bg-transparent border-2 rounded-md border-purple-950 text-mainPurple text-base"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label class="text-lightGray opacity-70 text-xs pb-2 mt-1">
              At least 8 characters, one capital letter, and one number
            </label>
          </div>
          <div className="flex flex-col">
            <label className="pb-1 mt-0 text-sm text-mainPurple">
              Confirm password
            </label>
            <input
              className="flex p-3.5 bg-transparent border-2 rounded-md border-purple-950 text-mainPurple text-base"
              type="password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </div>
        <button
          className={`w-full p-2 mt-8 text-mainPurple text-opacity-100 
            ${first && last && email && username && password && password === confirmPass ? "bg-opacity-100" : "bg-opacity-50"}  bg-medium-dark-purple`}
          type="submit"
          disabled={
            !first ||
            !last ||
            !email ||
            !username ||
            !password ||
            password !== confirmPass
          }
        >
          Sign Up
        </button>
        <label class="text-hoverPurple text-xs pb-4 leading-3 mt-2">
          Already have an account?
          <Link class="hover:underline" to="/login">
            {" "}Log in
          </Link>
        </label>
      </form>
      <ConfirmEmailModal
        open={showModal}
        setOpen={setShowModal}
        code={code}
        handleCorrectCode={handleCorrectCode}
      />
    </div>
  );
}

export default SignupPage;
