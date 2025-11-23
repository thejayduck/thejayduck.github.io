/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const content = searchParams.get("content");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          backgroundImage:
            "radial-gradient(circle at center, #3c3836, #29282f)",
          padding: "35px",
          fontFamily: "Nunito, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "#29282f",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            border: "1px solid #3c3836",
            padding: "60px",
            position: "relative",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "30px",
            }}
          >
            {/* Identifier */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#39354b",
                padding: "8px 16px",
                borderRadius: "50px",
                border: "1px solid hsla(248, 85%, 66%, 0.5)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#eeedfd"
                style={{ width: 18, height: 18, marginRight: 8 }}
              >
                <path d="M3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3H3ZM6 7H12V13H6V7ZM8 9V11H10V9H8ZM18 9H14V7H18V9ZM14 13V11H18V13H14ZM6 17V15L18 15V17L6 17Z"></path>{" "}
              </svg>
              <span style={{ fontSize: 16, color: "#eeedfd", fontWeight: 600 }}>
                Blog Post
              </span>
            </div>

            {/* Date */}
            {date && (
              <span style={{ fontSize: 18, color: "#888", fontWeight: 600 }}>
                {date}
              </span>
            )}
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                background:
                  " linear-gradient(to bottom right, #ffffff, #a5a5a5)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1.1,
                marginBottom: "24px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
              }}
            >
              {title}
            </div>

            {/* Short Description */}
            {content && (
              <div
                style={{
                  fontSize: 28,
                  color: "#a0a0a0",
                  lineHeight: 1.4,
                  fontWeight: 400,
                  maxWidth: "90%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {content}
              </div>
            )}
          </div>

          {/* Footer Wrapper */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "auto",
              paddingTop: "40px",
              borderTop: "1px solid #3c3836",
            }}
          >
            {/* Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                width="48"
                height="48"
                src={
                  "https://hj5xs4m6pg.ufs.sh/f/qeLXJUQ9GpPCDwlCLU9CusgZKWj02Ilfn1Qo5Y43APEcJxkR"
                }
                alt="Avatar"
                style={{ borderRadius: "50%", border: "2px solid #3c3836" }}
              />
              <span style={{ fontSize: 20, color: "#5c5c5c", fontWeight: 600 }}>
                @thejayduck
              </span>
            </div>

            {/* Notifier */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 20,
                color: "#eeedfd",
                fontWeight: 600,
              }}
            >
              Read Article
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 24, height: 24, marginLeft: 8 }}
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
