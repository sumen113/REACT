import React, { useEffect, useRef, useState } from "react";
import {
  ref,
  push,
  onChildAdded,
  query,
  orderByChild,
  runTransaction,
  serverTimestamp,
} from "firebase/database";
import { chatDb } from "../components/ChatFirebase";
import "../Chat.css";

const SLOWMODE_MS = 2000;

export default function Chat() {
  const [username, setUsername] = useState(
    localStorage.getItem("chat_username")
  );
  const [usernameInput, setUsernameInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendDisabled, setSendDisabled] = useState(false);

  const lastMessageTime = useRef(0);
  const messagesEndRef = useRef(null);

  // ===== START CHAT (NO AUTH) =====
  useEffect(() => {
    listenForMessages();
  }, []);

  // ===== AUTO SCROLL =====
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===== LISTEN FOR MESSAGES =====
  const listenForMessages = () => {
    const messagesRef = query(
      ref(chatDb, "messages"),
      orderByChild("timestamp")
    );

    onChildAdded(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      setMessages((prev) => [...prev, data]);
    });
  };

  // ===== USERNAME =====
  const normalizeName = (name) => name.toLowerCase().trim();

  const claimUsername = async () => {
    const rawName = usernameInput.trim();
    const finalName = rawName || "Anonymous";
    const key = normalizeName(finalName);

    const usernameRef = ref(chatDb, "usernames/" + key);

    try {
      await runTransaction(usernameRef, (current) => {
        if (current === null) return true;
        return;
      });

      setUsername(finalName);
      localStorage.setItem("chat_username", finalName);
    } catch {
      alert("Username taken");
    }
  };

  // ===== SEND MESSAGE (SLOWMODE) =====
  const sendMessage = async (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastMessageTime.current < SLOWMODE_MS) return;

    const text = messageInput.trim();
    if (!text) return;

    lastMessageTime.current = now;
    setSendDisabled(true);

    await push(ref(chatDb, "messages"), {
      username,
      message: text,
      timestamp: serverTimestamp(),
    });

    setMessageInput("");

    setTimeout(() => {
      setSendDisabled(false);
    }, SLOWMODE_MS);
  };

  // ===== XSS PROTECTION =====
  const escapeHTML = (str) =>
    str.replace(
      /[&<>'"]/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[c]
    );

  return (
    <>
      {!username && <div className="blur-background" />}

      <div className="chat">
        {!username && (
          <div id="username-container">
            <input
              type="text"
              placeholder="Name..."
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && claimUsername()}
            />
            <button style={{ marginTop: 10 }} onClick={claimUsername}>
              Join
            </button>
          </div>
        )}

        <ul id="messages">
          {messages.map((msg, i) => (
            <li
              key={i}
              className={msg.username === username ? "sent" : "receive"}
            >
              <span>{escapeHTML(msg.username)}: </span>
              {escapeHTML(msg.message)}
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>

        {username && (
          <form id="message-form" onSubmit={sendMessage}>
            <input
              autoComplete="off"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              type="text"
            />
            <button
              type="submit"
              disabled={sendDisabled}
              style={{
                opacity: sendDisabled ? 0.5 : 1,
                cursor: sendDisabled ? "not-allowed" : "pointer",
              }}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </>
  );
}
