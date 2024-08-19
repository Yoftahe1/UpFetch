import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import "./App.css";

const socket = io("http://localhost:3333");

function App() {
  const [data, setData] = useState<string[]>([]);
  // useEffect(() => {
  //   chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  //     if (request.action === "update_popup") {
  //       // Update the popup UI with the received data
  //       const data = request.data;
  //       setData(data);
  //       sendResponse({ status: "Message received in background" });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('jobs', (msg) => {
      console.log(msg)
    });

    return () => {
      socket.off('jobs');
    };
  }, []);

  function handleClick(){
    const URL=Math.floor(Math.random()*100)
    socket.emit('subscribe', URL);
  }

  return (
    <div className="ext">
      <h3>UpFetch</h3>
      <div>
        <input />
        <button onClick={handleClick}>save</button>
      </div>
      <div>
        {data.map((v, i) => {
          return <p key={i}>{v}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
