import React, { useEffect, useRef } from "react";
import { MessagesProp } from "../utils/types";

const Messages = () => {
  const [messages, setMessages] = React.useState<MessagesProp[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    (async () => {
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        const url = `${process.env.REACT_APP_API_URL}/messages/getAllMessages`;
        const res = await fetch(url, {
          signal: abortControllerRef.current.signal,
        });
        const data = await res.json();
        const messages = data.data;
        console.log(messages);
        if (messages) setMessages(messages);
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="flex items-center justify-center mt-36">
      <table className="border-collapse border border-gray-300 text-left table-auto ">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 border border-gray-300">ID</th>
            <th className="px-6 py-3 border border-gray-300">Name</th>
            <th className="px-6 py-3 border border-gray-300">Email</th>
            <th className="px-6 py-3 border border-gray-300">Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((item) => (
            <tr className="hover:bg-green-100 even:bg-gray-50">
              <td className="px-6 py-3 border border-gray-300">{item._id}</td>
              <td className="px-6 py-3 border border-gray-300">{item.name}</td>
              <td className="px-6 py-3 border border-gray-300">{item.email}</td>
              <td className="px-6 py-3 border border-gray-300">
                {item.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
