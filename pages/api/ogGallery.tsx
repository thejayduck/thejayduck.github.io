/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");
  // additional image properties
  const title = searchParams.get("title");
  const software = searchParams.get("software");
  const attribution = searchParams.get("attribution");
  const tags = searchParams.get("tags");
  const sensitive = searchParams.get("sensitive");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          backgroundImage:
            "radial-gradient(circle at center, #3c3836, #29282f);",
          padding: "35px",
          fontFamily: "Nunito, sans-serif",
        }}
      >
        {/* Main Wrapper */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            backgroundColor: "#29282f",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            border: "1px solid #3c3836",
          }}
        >
          {/* Info (lefr-side) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flex: "1.5",
              padding: "60px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 16, color: "#5c5c5c" }}>
                  @thejayduck | Gallery Page
                </span>
              </div>
            </div>

            <div // Middle Section contains: title, and image information
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                flex: 1,
              }}
            >
              <div // title
                style={{
                  display: "flex",
                  fontSize: 48,
                  fontWeight: 800,
                  marginBottom: "12px",
                  background:
                    " linear-gradient(to bottom right, #ffffff, #a5a5a5)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {title}
              </div>

              {/* Image Information */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "5px",
                  alignItems: "flex-start",
                }}
              >
                {software && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#39354b",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: 16,
                      color: "#eeedfd",
                      border: "1px solid hsla(248, 85%, 66%, 0.5)",
                    }}
                  >
                    <svg // ri-edit-box-line
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    >
                      <path d="M16.7574 2.99678L14.7574 4.99678H5V18.9968H19V9.23943L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path>
                    </svg>

                    {software}
                  </div>
                )}
                {tags && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#39354b",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: 16,
                      color: "#eeedfd",
                      border: "1px solid hsla(248, 85%, 66%, 0.5)",
                    }}
                  >
                    <svg // ri-hashtag
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    >
                      <path d="M7.78428 14L8.2047 10H4V8H8.41491L8.94043 3H10.9514L10.4259 8H14.4149L14.9404 3H16.9514L16.4259 8H20V10H16.2157L15.7953 14H20V16H15.5851L15.0596 21H13.0486L13.5741 16H9.58509L9.05957 21H7.04855L7.57407 16H4V14H7.78428ZM9.7953 14H13.7843L14.2047 10H10.2157L9.7953 14Z"></path>
                    </svg>
                    {tags}
                  </div>
                )}
                {attribution && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#39354b",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: 16,
                      color: "#eeedfd",
                      border: "1px solid hsla(248, 85%, 66%, 0.5)",
                    }}
                  >
                    <svg // ri-creative-commons-by-fill
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ width: 16, height: 16, marginRight: 6 }}
                    >
                      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM14 10H10C9.44772 10 9 10.4477 9 11V15H10.5V19H13.5V15H15V11C15 10.4477 14.5523 10 14 10ZM12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5Z"></path>
                    </svg>

                    {attribution}
                  </div>
                )}
              </div>
            </div>

            {/* Notifier */}
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#a0a0a0",
                fontWeight: 500,
                marginTop: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg // remix icon ri-arrow-right-line
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{
                    width: "28px",
                    height: "28px",
                    marginRight: "8px",
                  }}
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                Click Link to View Page
              </div>
            </div>
          </div>

          {/* Image Preview */}
          <div
            style={{
              display: "flex",
              flex: "3",
              height: "100%",
              position: "relative",
              backgroundColor: "#121212",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="Preview Image"
              src={`https://utfs.io/a/41l64ami3u/${id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                boxShadow: "inset 10px 0 20px rgba(0,0,0,0.2)",
                filter: sensitive == "true" ? "blur(10px)" : "none",
              }}
            />
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
