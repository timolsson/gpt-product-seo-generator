"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [request, setRequest] = useState<{
    brand?: string;
    category?: string;
    color?: string;
    size?: string;
  }>({});
  let [seoText, setSeoText] = useState<string>("");
  /* 
  useEffect(() => {
    checkRedirect();
  }, []);

  function checkRedirect() {
    if (window.location.hostname === "gpt-travel-advisor.vercel.app") {
      window.location.replace("https://www.roamaround.io/");
    }
  } */

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function hitAPI() {
    try {
      if (!request.category || !request.brand) return;
      setMessage("Generating your custom SEO text...");
      setLoading(true);
      setSeoText("");

      setTimeout(() => {
        if (!loading) return;
        setMessage("Getting closer ...");
      }, 7000);

      setTimeout(() => {
        if (!loading) return;
        setMessage("Almost there ...");
      }, 15000);

      const response = await fetch("/api/get-seo", {
        method: "POST",
        body: JSON.stringify({
          color: request.color,
          category: request.category,
          size: request.size,
          brand: request.brand,
        }),
      });
      const json = await response.json();

      let seoText = json.seoText;

      setSeoText(seoText);
      setLoading(false);
    } catch (err) {
      console.log("error: ", err);
      setMessage("");
    }
  }

  return (
    <main>
      <div className="app-container">
        <h1 style={styles.header} className="hero-header">
          Product SEO Generator
        </h1>
        <div style={styles.formContainer} className="form-container">
          <input
            style={styles.input}
            placeholder="Category"
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                category: e.target.value,
              }))
            }
          />
          <input
            style={styles.input}
            placeholder="Color"
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                color: e.target.value,
              }))
            }
          />
          <input
            style={styles.input}
            placeholder="Size"
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                size: e.target.value,
              }))
            }
          />
          <input
            style={styles.input}
            placeholder="Brand"
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                brand: e.target.value,
              }))
            }
          />
          <button className="input-button" onClick={hitAPI}>
            Generate SEO Text
          </button>
        </div>
        <div className="results-container">
          {loading && <p>{message}</p>}
          {seoText ? (
            <div style={{ marginBottom: "30px" }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {seoText}
              </ReactMarkdown>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

const styles = {
  header: {
    textAlign: "center" as "center",
    marginTop: "60px",
    color: "#c683ff",
    fontWeight: "900",
    fontFamily: "Poppins",
    fontSize: "68px",
  },
  input: {
    padding: "10px 14px",
    marginBottom: "4px",
    outline: "none",
    fontSize: "16px",
    width: "100%",
    borderRadius: "8px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    margin: "20px auto 0px",
    padding: "20px",
    boxShadow: "0px 0px 12px rgba(198, 131, 255, .2)",
    borderRadius: "10px",
  },
  result: {
    color: "white",
  },
};
