import { useState, useEffect, useLayoutEffect } from "react";
import Particles from "../components/Particles";
import LoadingScreen from "../components/Loading";
import Navbar from "../components/Navbar";
import Select from "../components/Selector";

const Apps = () => {
  const setCookie = (name, value, days = 365) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

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
          className="fa-solid fa-popcorn"
          style={{ color: "#fff", fontSize: "200%" }}
        ></i>
      ),
      label: "Movies",
      onClick: () => (window.location.href = "movies"),
    },
  ];

  const initialApps = [
    {
      name: "Suggest an App",
      image: "/appicons/suggest.png",
      link: "https://tally.so/r/yPJDzx",
      star: false,
      newTab: true,
      pinned: true,
    },
    {
      name: "Google(unblocked)",
      image: "/appicons/google.png",
      link: "https://google.com",
      star: true,
    },
    {
      name: "ChatGPT",
      image: "/appicons/chatgpt.png",
      link: "https://chatgpt.com",
      star: true,
    },
    {
      name: "YouTube",
      image: "/appicons/youtube.png",
      link: "https://www.youtube.com",
      star: true,
    },
    {
      name: "Tiktok",
      image: "/appicons/tiktok.png",
      link: "https://www.tiktok.com",
      star: true,
    },
    {
      name: "Twitch",
      image: "/appicons/twitch.png",
      link: "https://www.twitch.tv/",
      star: true,
    },
    {
      name: "Instagram",
      image: "/appicons/instagram.png",
      link: "https://www.instagram.com/",
      star: true,
    },
    {
      name: "Netflix",
      image: "/appicons/netflix.png",
      link: "https://www.netflix.com",
      star: true,
    },
    {
      name: "Crunchyroll",
      image: "/appicons/crunchyroll.png",
      link: "https://www.crunchyroll.com/",
      star: true,
    },
  ];

  const starredFromCookie = (() => {
    const raw = getCookie("starredApps");
    return raw ? decodeURIComponent(raw).split(",") : [];
  })();

  const [apps, setApps] = useState(
    initialApps.map((app) => ({
      ...app,
      starred: starredFromCookie.includes(app.name),
    }))
  );

  useEffect(() => {
    const starredNames = apps.filter((a) => a.starred).map((a) => a.name);

    setCookie("starredApps", starredNames.join(","));
  }, [apps]);

  const toggleStar = (name) => {
    setApps((prev) =>
      prev.map((app) =>
        app.name === name && !app.pinned
          ? { ...app, starred: !app.starred }
          : app
      )
    );
  };

  const sortedApps = [...apps].sort((a, b) => {
    if (a.pinned) return -1;
    if (b.pinned) return 1;
    if (a.starred && !b.starred) return -1;
    if (!a.starred && b.starred) return 1;
    return 0;
  });

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
      <Select select={sortedApps} onStarClick={toggleStar} />
    </div>
  );
};

export default Apps;
