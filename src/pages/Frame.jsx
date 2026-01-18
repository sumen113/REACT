import { useState, useEffect, useLayoutEffect } from "react";
import Dock from "../components/Dock";
import LoadingScreen from "../components/Loading";

const Frame = () => {
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

  function goFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  const dock = [
    {
      icon: (
        <i
          className="fa-solid fa-u-turn-up-left"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Back",
      onClick: () => {
        if (document.referrer) {
          window.location.href = document.referrer;
        } else {
          window.location.href = "/";
        }
      },
    },
    {
      icon: (
        <i
          className="fa-solid fa-star"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Star",
      onClick: () => alert("Star in progress"),
    },
    {
      icon: (
        <i
          className="fa-solid fa-expand"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Fullscreen",
      onClick: () => goFullscreen(),
    },
  ];

  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState("/error");

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 8000);
    };

    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const PROXY_BASE = "https://ashamed-lucilia-ffsdsefe-ef618c65.koyeb.app/#";

  useEffect(() => {
    const updateSrcFromHash = () => {
      let hash = window.location.hash.replace("#", "").trim();

      if (!hash) return;

      // Normalize input like "wikipedia.com"
      if (!/^https?:\/\//i.test(hash)) {
        hash = `https://${hash}`;
      }

      // Remove protocol for the proxy format if needed
      const clean = hash.replace(/^https?:\/\//i, "");

      // Build the proxied iframe URL
      const proxiedUrl = `${PROXY_BASE}${clean}`;

      setSrc(proxiedUrl);
    };

    updateSrcFromHash();
    window.addEventListener("hashchange", updateSrcFromHash);

    return () => window.removeEventListener("hashchange", updateSrcFromHash);
  }, []);

  return (
    <div className="View">
      <LoadingScreen loading={loading} loaderType={loaderType} />
      <Dock
        items={dock}
        panelHeight={60}
        baseItemSize={50}
        magnification={70}
      />
      <iframe
        src={src}
        title="Fullscreen Iframe"
        className="fullscreen-iframe"
      />
    </div>
  );
};

export default Frame;
