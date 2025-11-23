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
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          backgroundImage:
            "radial-gradient(circle at center, #3c3836, #29282f)",
          padding: "35px",
          fontFamily: "Nunito, sans-serif",
        }}
      >
        {/* Main Wrapper */}
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
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Background */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "600px",
            }}
          />

          <img
            width="180"
            height="180"
            alt="Profile Picture"
            src={
              "https://hj5xs4m6pg.ufs.sh/f/qeLXJUQ9GpPCDwlCLU9CusgZKWj02Ilfn1Qo5Y43APEcJxkR"
            }
            style={{
              borderRadius: "50%",
              border: "4px solid #3c3836",
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              marginBottom: "40px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0px",
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontSize: 28,
                color: "#a0a0a0",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Care to visit my
            </span>
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                background:
                  "linear-gradient(to bottom right, #ffffff, #a5a5a5)",
                backgroundClip: "text",
                color: "transparent",
                textAlign: "center",
              }}
            >
              {title}
            </span>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "30px",
              fontSize: 18,
              color: "#5c5c5c",
              fontWeight: 600,
            }}
          >
            @thejayduck
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
