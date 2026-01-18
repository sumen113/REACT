import { useState, useEffect, useLayoutEffect } from "react";
import Particles from "../components/Particles";
import LoadingScreen from "../components/Loading";
import Navbar from "../components/Navbar";
import { scale, transform } from "motion";

const Settings = () => {
  const setCookie = (name, value, days = 365) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  };

  const themes = [
    "green",
    "blue",
    "purple",
    "red",
    "pink",
    "cyan",
    "gray",
    "neon",
  ];

  const [theme, setTheme] = useState(() => {
    const saved = getCookie("theme");
    return saved ? decodeURIComponent(saved) : "green";
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    setCookie("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.setTheme = setTheme;
  }, []);

  const spinners = [
    "Audio",
    "Bars",
    "DNA",
    "FidgetSpinner",
    "Grid",
    "Hourglass",
    "MutatingDots",
    "ProgressBar",
    "Puff",
    "Radio",
    "ThreeDots",
    "Triangle",
    "Vortex",
  ];

  const [loaderType] = useState(() => {
    const saved = getCookie("loaderType");
    return saved ? decodeURIComponent(saved) : "FidgetSpinner";
  });

  const handleSpinnerClick = (type) => {
    setCookie("loaderType", type);
    window.location.reload();
  };

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

  const [cloak, setCloak] = useState(() => {
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

    setCookie("cloak", cloak);
  }, [cloak]);

  const nav = [
    {
      icon: (
        <i
          className="fa-solid fa-house"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Home",
      onClick: () => (window.location.href = "/"),
    },
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
      setTimeout(() => setLoading(false), 1000);
    };

    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

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

      <Navbar
        items={nav}
        panelHeight={60}
        baseItemSize={50}
        magnification={70}
      />

      <div className="bgg">
        <h2>Settings - not much rn</h2>
      </div>

      <div className="theme-select">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="s-select"
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="cloak-select">
        <select
          value={cloak}
          onChange={(e) => setCloak(e.target.value)}
          className="s-select"
        >
          {cloaks.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id}
            </option>
          ))}
        </select>
      </div>

      <div className="loader-select">
        <select
          value={loaderType}
          onChange={(e) => handleSpinnerClick(e.target.value)}
          className="s-select"
        >
          {spinners.map((s) => (
            <option className="s-option" key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Settings;
