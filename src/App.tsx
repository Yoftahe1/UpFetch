import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
      if (request.action === "update_popup") {
        // Update the popup UI with the received data
        const data = request.data;
        setData(data);
        sendResponse({ status: "Message received in background" });
      }
    });
  }, []);

  return (
    <div className="ext">
      <h3>UpFetch</h3>
      <div>
        <input />
        <button>save</button>
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
