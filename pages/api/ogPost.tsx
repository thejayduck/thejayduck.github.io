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
          fontSize: 45,
          color: "black",
          background: "#f6f6f6",
          fontFamily: "Nunito, sans-serif",
          width: "100%",
          height: "100%",
          padding: "10px 20px",

          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: 25,
            margin: "0.5rem 0.5rem 0 0",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          Blog Post - {date}
        </p>
        <section
          style={{
            width: "100%",
            position: "absolute",
            top: 65,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            width="128"
            height="128"
            alt="Profile Picture"
            src={"https://github.com/thejayduck.png"}
            style={{
              marginRight: "2rem",
              boxShadow: "0 4px 10px hsla(202, 56%, 12%, 0.15)",
              borderRadius: 128,
            }}
          />
          <p style={{ textAlign: "center" }}>{title}</p>
        </section>
        <p
          style={{
            backgroundColor: "#e0e0e0",
            padding: 15,
            fontSize: 35,
            width: "100%",
            textAlign: "center",
            borderRadius: "0.7em",
            boxShadow: "0 4px 10px hsla(202, 56%, 12%, 0.15)",
          }}
        >
          {content}
        </p>

        <p
          style={{
            bottom: 0,
            position: "absolute",
            backgroundColor: "#725ff2",
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            padding: "1.2rem",
            borderRadius: "0.7rem",
            border: "2px solid #725ff2",
          }}
        >
          Open Link to Read More
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
