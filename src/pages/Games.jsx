import { useState, useEffect, useLayoutEffect } from "react";
import Particles from "../components/Particles";
import LoadingScreen from "../components/Loading";
import Navbar from "../components/Navbar";
import Select from "../components/Selector";

const Games = () => {
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

  const initialGames = [
    {
      name: "Suggest a Game",
      image: "/gameicons/suggest.png",
      link: "https://tally.so/r/yPJDzx",
      star: false,
      newTab: true,
      pinned: true,
    },
    {
      name: "Cookie Clicker",
      image: "/gameicons/cookieclicker.png",
      link: "https://g8hh.github.io/cookieclicker/",
      star: true,
    },
    {
      name: "Happy Wheels",
      image: "/gameicons/happywheels.png",
      link: "https://cbgamesdev.github.io/chilibowlflash/hw/index.html",
      star: true,
    },
    {
      name: "Drive Mad",
      image: "/gameicons/drivemad.png",
      link: "https://lnahtml.github.io/a77/drive-mad/",
      star: true,
    },
    {
      name: "Ragdoll Archers",
      image: "/gameicons/ragdollarchers.png",
      link: "https://bitlifeonline.github.io/ragdoll-archers/",
      star: true,
    },
    {
      name: "BitLife",
      image: "/gameicons/bitlife.png",
      link: "https://bitlifeonline.github.io/class/index.html",
      star: true,
    },
    {
      name: "Tag",
      image: "/gameicons/tag.png",
      link: "https://abinbins.github.io/a3/tag/",
      star: true,
    },
    {
      name: "Football Legends",
      image: "/gameicons/footballlegends.png",
      link: "https://footballlegends-online.github.io/file/",
      star: true,
    },
    {
      name: "Basketball Legends",
      image: "/gameicons/basketballlegends.png",
      link: "https://basketball-legends-online.github.io/file/",
      star: true,
    },
    {
      name: "Super Soccer Noggins",
      image: "/gameicons/supersoccernoggins.png",
      link: "...",
      star: true,
    },
    {
      name: "Slope",
      image: "/gameicons/slope.png",
      link: "https://slopeunblocked.bitbucket.io/file/",
      star: true,
    },
    {
      name: "Geometry Dash",
      image: "/gameicons/geometrydash.png",
      link: "https://geometrylitepc.io/game/geometry-dash-lite/",
      star: true,
    },
    {
      name: "Ovo",
      image: "/gameicons/ovo.png",
      link: "https://ovoclassic-pro.github.io/file/",
      star: true,
    },
  ];

  const starredFromCookie = (() => {
    const raw = getCookie("starredGames");
    return raw ? decodeURIComponent(raw).split(",") : [];
  })();

  const [games, setGames] = useState(
    initialGames.map((game) => ({
      ...game,
      starred: starredFromCookie.includes(game.name),
    }))
  );

  useEffect(() => {
    const starredNames = games.filter((g) => g.starred).map((g) => g.name);
    setCookie("starredGames", starredNames.join(","));
  }, [games]);

  const toggleStar = (name) => {
    setGames((prev) =>
      prev.map((game) =>
        game.name === name && !game.pinned
          ? { ...game, starred: !game.starred }
          : game
      )
    );
  };

  const sortedGames = [...games].sort((a, b) => {
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
      <Select select={sortedGames} onStarClick={toggleStar} />
    </div>
  );
};

export default Games;
