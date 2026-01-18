import React, { useState } from "react";

const SearchBar = ({ active }) => {
  const [query, setQuery] = useState("");

  const PROXY_BASE = "https://ashamed-lucilia-ffsdsefe-ef618c65.koyeb.app/#";

  const getValidUrl = (input) => {
    if (!input) return "/error";

    let url = input.trim();

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    try {
      const parsed = new URL(url);

      if (!parsed.hostname.includes(".")) {
        throw new Error("Invalid domain");
      }

      const clean = url.replace(/^https?:\/\//i, "");
      return `${PROXY_BASE}${clean}`;
    } catch {
      return `/error`;
    }
  };

  const handleKeyDown = (e) => {     
    if (e.key === "Enter") {
      const viewParent = e.target.closest(".View");
      if (viewParent) {
        const src = getValidUrl(query);

        viewParent.classList.add("active");
        viewParent.innerHTML = `
          <iframe 
            src="${src}" 
            style="border-radius:1rem;width:100%;height:100%;border:none;"
          ></iframe>
        `;
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
