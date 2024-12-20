import React from "react";
import "./App.css";
import Messages from "./components/Messages";
import CreateMessage from "./components/CreateMessage";

const App: React.FC = () => {
  const renderPage = () => {
    const path = window.location.pathname;
    switch (path) {
      case "/listMessages":
        return <Messages />;
      case "/create":
        return <CreateMessage />;
    }
  };
  return <div>{renderPage()}</div>;
  // return (
  //   <div className="App">
  //     <h1 className="text-2xl font-bold mb-4 mt-4">MERN Example</h1>
  //     <Messages />
  //   </div>
  // );
};

export default App;
