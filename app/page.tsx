"use client";

import Input from "./components/Input";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export default function Home() {
  const [request, setRequest] = useState<{
    brand?: string;
    category?: string;
    color?: string;
    size?: string;
  }>({});
  let [seoText, setSeoText] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function getText() {
    try {
      if (!request.category || !request.brand) return;
      setMessage("Generating your custom SEO text...");
      setLoading(true);
      setSeoText("");

      setTimeout(() => {
        if (!loading) return;
        setMessage("Hang on ...");
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
        <form style={styles.formContainer} className="form-container" onSubmit={(event) =>event.preventDefault()}>

          <Input
            type="text"
            placeholder="Category"
            value={request.category || ""}
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                category: e.target.value,
              }))
            }
            required={true}
          />

          <Input
            type="text"
            placeholder="Color"
            value={request.color || ""}
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                color: e.target.value,
              }))
            }
            required={true}
          />
          <Input
            type="text"
            placeholder="Size"
            value={request.size || ""}
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                size: e.target.value,
              }))
            }
            required={true}
          />
          <Input
            type="text"
            placeholder="Brand"
            value={request.brand || ""}
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                brand: e.target.value,
              }))
            }
            required={true}
          />
          {seoText ? (
            <button
              className="input-button"
              onClick={() => {
                navigator.clipboard.writeText(seoText);
              }}
            >
              <Image
                style={{ marginRight: "6px" }}
                alt="code available on github"
                width="18"
                height="18"
                src="/copy-icon.svg"
              />
              Copy SEO Text
            </button>
          ) : (
            <button className="input-button" onClick={getText}>
              Generate SEO Text
            </button>
          )}
        </form>
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
    color: "snow",
    fontWeight: "900",
    fontFamily: "Lato",
    fontSize: "4vh",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    margin: "20px auto 0px",
    padding: "20px",
    borderRadius: "10px",
  },
  result: {
    color: "snow",
  },
};
