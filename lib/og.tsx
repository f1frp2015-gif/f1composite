import { ImageResponse } from "next/og";

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

type OgImageOptions = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  chips: string[];
};

export function renderOgImage({
  eyebrow,
  title,
  description,
  accent,
  chips,
}: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f6f5ef 0%, #f0efe7 42%, #e6f5f2 100%)",
          color: "#102a29",
          padding: "56px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: "28px",
            border: "1px solid rgba(16,42,41,0.12)",
            background: "rgba(255,255,255,0.78)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "68%",
              padding: "56px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "24px",
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#5a6f6c",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "48px",
                    height: "4px",
                    borderRadius: "999px",
                    backgroundColor: accent,
                  }}
                />
                {eyebrow}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "66px",
                    lineHeight: 1.02,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    maxWidth: "680px",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    display: "flex",
                    maxWidth: "640px",
                    fontSize: "28px",
                    lineHeight: 1.35,
                    color: "#405553",
                  }}
                >
                  {description}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "24px",
                color: "#405553",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  backgroundColor: "#102a29",
                  color: "#ffffff",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: 800,
                }}
              >
                F1
              </div>
              f1composite.com
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "32%",
              padding: "32px",
              background: `linear-gradient(180deg, ${accent} 0%, #102a29 100%)`,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                borderRadius: "22px",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.08)",
                padding: "28px",
                color: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    opacity: 0.8,
                  }}
                >
                  Key Signals
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {chips.map((chip) => (
                    <div
                      key={chip}
                      style={{
                        display: "flex",
                        padding: "12px 16px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      {chip}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "52px",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                  }}
                >
                  Pultruded FRP
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "24px",
                    lineHeight: 1.35,
                    opacity: 0.86,
                  }}
                >
                  Manufacturer, engineering content, and technical resources for global
                  infrastructure and industrial projects.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
