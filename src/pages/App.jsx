import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import CountUp from "../components/Counter";
import LoadingScreen from "../components/Loading";
import DecryptedText from "../components/DecryptedText";
import Particles from "../components/Particles";

import useGlobalDailyCounter from "../components/UseGlobalDailyCounter";

const App = () => {
  const [iframeSrc, setIframeSrc] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(false);
  const iframeTimeoutRef = useRef(null);
  const iframeStartTimeRef = useRef(0);

  const [sactive, satActive] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        satActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const viewsToday = useGlobalDailyCounter();

  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  };

  const [theme] = useState(() => {
    const saved = getCookie("theme");
    return saved ? decodeURIComponent(saved) : "green";
  });

  const [loaderType] = useState(() => {
    const saved = getCookie("loaderType");
    return saved ? decodeURIComponent(saved) : "FidgetSpinner";
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const cloaks = [
    {
      id: "classroom",
      name: "Home - Classroom",
      favicon: "https://ssl.gstatic.com/classroom/favicon.png",
    },
    {
      id: "docs",
      name: "Google Docs",
      favicon:
        "https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico",
    },
    {
      id: "canva",
      name: "Home - Canva",
      favicon:
        "https://static.canva.com/domain-assets/canva/static/images/favicon-1.ico",
    },
    {
      id: "google",
      name: "Google",
      favicon:
        "https://www.gstatic.com/images/branding/searchlogo/ico/favicon.ico",
    },
  ];

  const [cloak] = useState(() => {
    const saved = getCookie("cloak");
    return saved ? decodeURIComponent(saved) : "classroom";
  });

  useEffect(() => {
    const activeCloak = cloaks.find((c) => c.id === cloak);
    if (!activeCloak) return;

    // Set tab title
    document.title = activeCloak.name;

    // Set favicon
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = activeCloak.favicon;
  }, [cloak]);

  useEffect(() => {
    if (!iframeSrc) return;

    iframeStartTimeRef.current = Date.now();
    setIframeLoading(true);

    iframeTimeoutRef.current = setTimeout(() => {
      setIframeLoading(false);
      iframeTimeoutRef.current = null;
    }, 8000);

    return () => {
      if (iframeTimeoutRef.current) {
        clearTimeout(iframeTimeoutRef.current);
        iframeTimeoutRef.current = null;
      }
    };
  }, [iframeSrc]);

  const nav = [
    {
      icon: (
        <i
          className="fa-solid fa-gamepad-modern"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Games",
      onClick: () => (window.location.href = "games"),
    },
    {
      icon: (
        <i
          className="fa-solid fa-grid-2"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Apps",
      onClick: () => (window.location.href = "apps"),
    },
    {
      icon: (
        <i
          className="fa-solid fa-popcorn"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Movies",
      onClick: () => (window.location.href = "movies"),
    },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2000);
    };

    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const [active, setActive] = useState(false);

  return (
    <div className="View">
      <LoadingScreen loading={loading} loaderType={loaderType} />
      <Particles
        particleCount={200}
        particleSpread={5}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <div className="count-up-wrapper">
        <h1 className="count-up-mini-text">Views Today</h1>
        <CountUp
          from={0}
          to={viewsToday}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
          delay={4}
        />
      </div>
      <Navbar
        items={nav}
        panelHeight={60}
        baseItemSize={50}
        magnification={70}
      />
      <div className="Name-Wrapper">
        <DecryptedText
          text="HAPPY HALOWEEN"
          speed={75}
          maxIterations={10}
          animateOn="both"
          revealDirection="start"
          sequential={true}
          className="Name"
        />
        <button
          className={`SearchButton ${active ? "active" : ""}`}
          onClick={() => setActive(!active)}
        >
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              color: "#fff",
              fontSize: "150%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          ></i>
        </button>
        <SearchBar
          active={active}
          setIframeSrc={setIframeSrc}
          setIframeLoading={setIframeLoading}
        />
      </div>

      <div
        ref={chatRef}
        className={`chatb ${sactive ? "active" : ""}`}
        onClick={() => satActive((prev) => !prev)}
      >
        <iframe src="/chat" className="chatiframe" title="chat" />
        <i className="fa-solid fa-message-dots chati"></i>
      </div>

      {iframeSrc && (
        <>
          <LoadingScreen loading={iframeLoading} loaderType={loaderType} />

          <iframe
            src={iframeSrc}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              position: "absolute",
              inset: 0,
              zIndex: 900,
            }}
            onLoad={() => {
              const elapsed = Date.now() - iframeStartTimeRef.current;
              const remaining = Math.max(8000 - elapsed, 0);

              setTimeout(() => {
                setIframeLoading(false);
              }, remaining);
            }}
            title="Proxy View"
          />
        </>
      )}
    </div>
  );
};

export default App;
