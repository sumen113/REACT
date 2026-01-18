import { useState, useEffect, useLayoutEffect } from "react";
import Particles from "../components/Particles";
import LoadingScreen from "../components/Loading";
import Navbar from "../components/Navbar";
import Select from "../components/Selector";

const Games = () => {
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

  const games = [
    {
      name: "Cookie Clicker",
      image: "/src/gameicons/cookieclicker.png",
      link: "https://g8hh.github.io/cookieclicker/",
      star: true,
    },
    {
      name: "Happy Wheels",
      image: "/src/gameicons/happywheels.png",
      link: "https://cbgamesdev.github.io/chilibowlflash/hw/index.html",
      star: true,
    },
    {
      name: "Drive Mad",
      image: "/src/gameicons/drivemad.png",
      link: "https://lnahtml.github.io/a77/drive-mad/",
      star: true,
    },
    {
      name: "Ragdoll Archers",
      image: "/src/gameicons/ragdollarchers.png",
      link: "https://bitlifeonline.github.io/ragdoll-archers/",
      star: true,
    },
    {
      name: "BitLife",
      image: "/src/gameicons/bitlife.png",
      link: "https://bitlifeonline.github.io/class/index.html",
      star: true,
    },
    {
      name: "Tag",
      image: "/src/gameicons/tag.png",
      link: "https://abinbins.github.io/a3/tag/",
      star: true,
    },
    {
      name: "Football Legends",
      image: "/src/gameicons/footballlegends.png",
      link: "https://footballlegends-online.github.io/file/",
      star: true,
    },
    {
      name: "Basketball Legends",
      image: "/src/gameicons/basketballlegends.png",
      link: "https://basketball-legends-online.github.io/file/",
      star: true,
    },
    {
      name: "Super Soccer Noggins",
      image: "/src/gameicons/supersoccernoggins.png",
      link: "https://html5.gamedistribution.com/rvvASMiM/e9020d1fa4bd48d6ad5da5c6981faa0c/index.html?gdpr-tracking=0&gdpr-targeting=0&gdpr-third-party=0%3Fgd_sdk_referrer_url%3Dhttps%3A%2F%2Ftinyplay.io%2Fsuper-soccer-noggins&rd=1&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2h0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tL2U5MDIwZDFmYTRiZDQ4ZDZhZDVkYTVjNjk4MWZhYTBjLz9nZHByLXRyYWNraW5nPTAmZ2Rwci10YXJnZXRpbmc9MCZnZHByLXRoaXJkLXBhcnR5PTA%252FZ2Rfc2RrX3JlZmVycmVyX3VybD1odHRwczovL3RpbnlwbGF5LmlvL3N1cGVyLXNvY2Nlci1ub2dnaW5zJnJkPTEiLCJwYXJlbnREb21haW4iOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInRvcERvbWFpbiI6Imh0bWw1LmdhbWVkaXN0cmlidXRpb24uY29tIiwiaGFzSW1wcmVzc2lvbiI6ZmFsc2UsImxvYWRlckVuYWJsZWQiOnRydWUsImhvc3QiOiJodG1sNS5nYW1lZGlzdHJpYnV0aW9uLmNvbSIsInZlcnNpb24iOiIxLjUuMTgifQ%253D%253D",
      star: true,
    },
    {
      name: "Slope",
      image: "/src/gameicons/slope.png",
      link: "https://slopeunblocked.bitbucket.io/file/",
      star: true,
    },
    {
      name: "Geometry Dash",
      image: "/src/gameicons/geometrydash.png",
      link: "https://geometrylitepc.io/game/geometry-dash-lite/",
      star: true,
    },
    {
      name: "Ovo",
      image: "/src/gameicons/ovo.png",
      link: "https://ovoclassic-pro.github.io/file/",
      star: true,
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
      <Select select={games} />
    </div>
  );
};

export default Games;
