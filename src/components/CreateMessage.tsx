import React, { useState } from "react";

const CreateMessage: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [messages, setMessages] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessages({
      ...messages,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/messages/createMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messages), // Send form data as JSON
        }
      );
      const result = await response.json();
      console.log("Response from API:", result);
      setIsSaved(true);
    } catch (error: any) {
      setIsSaved(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex flex-col items-center h-screen">
        <label className="text-md  font-sans w-1/3">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          className="text-md border-2 font-sans p-2 m-4 w-1/3"
          onChange={handleChange}
        ></input>
        <label className="text-md   font-sans  w-1/3">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="text-md border-2 font-sans p-2 m-4 w-1/3"
          onChange={handleChange}
        ></input>
        <label className="text-md  font-sans  w-1/3">Message</label>
        <input
          id="message"
          type="text"
          name="message"
          placeholder="Message"
          className="text-md border-2 font-sans p-2 m-4 w-1/3 h-48 align-text-top"
          onChange={handleChange}
        ></input>
        <button
          className="border-2 m-4 p-2 w-[200px] bg-purple-600 text-white rounded-xl"
          type="submit"
        >
          Send Message
        </button>
        {isSaved && (
          <label className="text-md  font-sans  w-1/3 font-bold text-green-600 text-center">
            Message saved successfully!
          </label>
        )}
      </div>
    </form>
  );
};

export default CreateMessage;
