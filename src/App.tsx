import { useState, useEffect, useRef } from "react";

import { io } from "socket.io-client";

import icon from "../public/up.png";

import "./App.css";

const socket = io("http://localhost:3333");

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("jobs", (jobs: [{ title: any; link: any; description: any }]) => {
      jobs.map((job) => {
        chrome.notifications.create(job.link, {
          type: "basic",
          iconUrl: icon,
          title: job.title,
          message: job.description,
          priority: 2, 
        });
      });
    });

    return () => {
      socket.off("jobs");
    };
  }, []);

  useEffect(() => {
    chrome.storage.local.get(["URL"], function (result) {
      if (result.URL != undefined) {
        inputRef.current!.value = result.URL;
      }
    });
  }, []);

  function handleSubscribe() {
    const URL = inputRef.current?.value;
    chrome.storage.local.set({ URL });
    socket.emit("subscribe", URL);
    setIsSubscribed(true);
  }

  function handleUnsubscribe() {
    socket.emit("unsubscribe");
    setIsSubscribed(false);
  }

  return (
    <>
      <div>
        <h1>Up-Fetch</h1>
        <input ref={inputRef} placeholder="advanced search url" />
        {isSubscribed ? (
          <button className="warn" onClick={handleUnsubscribe}>
            Unsubscribe
          </button>
        ) : (
          <button onClick={handleSubscribe}>Subscribe</button>
        )}
      </div>
      <p>@ ALL-RIGHTS RESERVED TO UP-FETCH</p>
    </>
  );
}

export default App;
