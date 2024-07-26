import React, { useState } from "react";
import courtroomContact from "../../assets/images/courtroomContact.gif";
import { motion } from "framer-motion";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [query, setQuery] = useState("");
  const [contactMode, setContactMode] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mx-32">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-6xl">Get In Touch</h1>
        <p className="m-0  mt-5 text-white text-lg">
          Want to get along with the 1st Generative AI in Indian Legal Niche?
        </p>
        <p className="text-white text-lg">We are waiting to hear from you</p>
      </div>
      <div className="grid grid-cols-[40%_60%] items-center text-black">
        <div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={courtroomContact}
            alt="contact"
          />
        </div>
        <form style={{ position: "relative" }} onSubmit={handleSave}>
          <div className="mx-32">
            <div
              className="bg-gradient-to-br from-[#025555] to-[#028f8f] p-3"
              style={{
                // background: "bg-gradient-to-br from-[#006E6E] to-[#09FFFF]",
                border: "2px solid white",
                borderRadius: "10px",
              }}
            >
              <div
                className="grid grid-cols-2 gap-3"
                style={{ margin: "20px 10px" }}
              >
                <input
                  className="p-2 border border-black rounded-md"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  placeholder="E-Mail ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="p-2 border border-black rounded-md"
                  placeholder="Mobile No."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="col-span-2 p-2 border border-black rounded-md"
                  placeholder="Business Name"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                />
                <textarea
                  className="col-span-2 p-2 border border-black rounded-md text-black"
                  placeholder="Enter your Query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div
                className="flex justify-center items-center mb-3 gap-3"
                style={{ wordSpacing: "2px" }}
              >
                <h2 className="text-lg m-0 text-white leading-none">
                  Preferred Contact Mode :{" "}
                </h2>
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      value="email"
                      checked={contactMode === "email"}
                      onChange={(e) => setContactMode(e.target.value)}
                      className=""
                    />
                    <h1 className="m-0 text-lg text-white">via E-Mail</h1>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      value="call"
                      checked={contactMode === "call"}
                      onChange={(e) => setContactMode(e.target.value)}
                      className=""
                    />
                    <h1 className="m-0 text-lg text-white">via Call</h1>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <motion.button
                  whileTap={{ scale: "0.95" }}
                  type="submit"
                  style={{ border: "2px solid white" }}
                  className="w-full px-24 py-2 rounded-md bg-transparent text-white text-xl font-bold flex justify-center"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
