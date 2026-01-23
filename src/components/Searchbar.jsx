import React, { useState } from "react";

const SearchBar = ({ active, setIframeSrc }) => {
  const [query, setQuery] = useState("");

  const PROXY_BASE = "https://ashamed-lucilia-ffsdsefe-ef618c65.koyeb.app/#";

  const getValidUrl = (input) => {
    if (!input) return null;

    let url = input.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    try {
      const parsed = new URL(url);
      if (!parsed.hostname.includes(".")) throw new Error();
      const clean = url.replace(/^https?:\/\//i, "");
      return `${PROXY_BASE}${clean}`;
    } catch {
      return null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const viewParent = e.target.closest(".View");
      if (viewParent) {
        // viewParent.classList.add("active");
        const src = getValidUrl(query);
        if (!src) return;

        setIframeSrc(src);
      }
    }
  };

  return (
    <div className={`search-bar ${active ? "active" : ""}`}>
      <input
        type="text"
        placeholder="Unblock..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
