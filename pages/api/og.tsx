/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "black",
          background: "#f6f6f6",
          fontFamily: "Nunito, sans-serif",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width="256"
          height="256"
          alt="Profile Picture"
          src={"https://github.com/thejayduck.png"}
          style={{
            boxShadow: "0 4px 10px hsla(202, 56%, 12%, 0.15)",
            borderRadius: 128,
          }}
        />

        <p>Care to visit my {title}?</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
