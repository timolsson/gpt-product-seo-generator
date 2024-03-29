"use client";

import Input from "../components/Input";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export default function Home({ params }) {
  let paramsObj = {};
  if (params?.slug) {
    paramsObj = params?.slug?.reduce((acc, curr, i) => {
      if (i % 2 === 0) {
        acc[decodeURI(curr)] = decodeURI(params.slug[i + 1]);
      }
      return acc;
    }, {});
  }
  const [request, setRequest] = useState<{
    brand?: string;
    category?: string;
    color?: string;
    size?: string;
    language?: string;
  }>(paramsObj);
  const [seoText, setSeoText] = useState<string>("");

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
          language: request.language,
        }),
      });
      const json = await response.json();

      const seoText = json.seoText;

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
        <form
          style={styles.formContainer}
          className="form-container"
          onSubmit={(event) => event.preventDefault()}
        >
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
          <Input
            type="text"
            placeholder="Your language"
            value={request.language || ""}
            onChange={(e) =>
              setRequest((request) => ({
                ...request,
                language: e.target.value,
              }))
            }
            required={true}
          />
          <button className="input-button" onClick={getText}>
            Generate SEO Text
          </button>
        </form>
        <div className="results-container">
          {loading && <p>{message}</p>}
          {seoText ? (
            <div
              style={{
                marginBottom: "30px",
                padding: "16px",
                position: "relative",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(seoText);
                }}
              >
                <Image
                  alt="code available on github"
                  width="18"
                  height="18"
                  src="/copy-icon.svg"
                />
              </button>
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
    textAlign: "center" as const,
    marginTop: "60px",
    color: "snow",
    fontWeight: "900",
    fontFamily: "Lato",
    fontSize: "4vh",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column" as const,
    margin: "20px auto 0px",
    padding: "20px",
    borderRadius: "10px",
  },
  result: {
    color: "snow",
  },
};
