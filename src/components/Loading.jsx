import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Loaders from "react-loader-spinner";
import "../Index.css";

const getCSSVariable = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const defaultColors = [getCSSVariable("--text")];

const LoadingScreen = ({ loading, loaderType = "FidgetSpinner" }) => {
  const messages = [
    "lowk dont have anything to write",
    "this is sumensite v3 btw",
    "make sure to suggest",
    "please dont snitch",
    "sumensite is so tuff",
  ];

  const [message, setMessage] = useState("");

  const Loader = Loaders[loaderType] || Loaders["FidgetSpinner"];
  const defaultColors = [getCSSVariable("--text")];

  useEffect(() => {
    if (loading) {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMsg);
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1B1B1B",
            zIndex: 9999,
            color: "white",
            fontFamily: "monospace",
          }}
        >
          <Loader
            colors={[
              defaultColors,
              defaultColors,
              defaultColors,
              defaultColors,
              defaultColors,
              defaultColors,
            ]}
            color={defaultColors}
            barColor={defaultColors}
            borderColor={defaultColors}
            secondaryColor={defaultColors}
            dnaColorOne={defaultColors}
            dnaColorTwo={defaultColors}
            backgroundColor={defaultColors}
            height={80}
            width={80}
            radius={9}
            ariaLabel="audio-loading"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              marginTop: 20,
              fontSize: "1.4rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
            className="loading-message"
          >
            {message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
