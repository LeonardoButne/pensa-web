import React from "react";

const data = [
  {
    title: "Contactos",
    links: [
      {
        label:
          "Alô Vida: Tmcel – 82149 ou 1490 | Vodacom – 84146 | Movitel - 1490",
      },
      {
        label: "E-mail: pensa@sourcecode.solutions",
        href: "mailto:pensa@sourcecode.solutions",
      },
      {
        label: "WhatsApp: +258 820000660",
      },
    ],
  },
];

export function Footer() {
  const [hoveredLink, setHoveredLink] = React.useState<number | null>(null);
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);

  const groups = data.map((group, groupIndex) => {
    const links = group.links.map((link, index) => (
      <a
        key={index}
        href={link.href}
        style={{
          display: "block",
          marginBottom: "0.5rem",
          color: hoveredLink === index ? "#4dabf7" : "#909296",
          transition: "color 100ms ease",
          textDecoration: "none",
          fontSize: "0.875rem",
          textAlign: window.innerWidth <= 768 ? "center" : "left",
        }}
        onMouseEnter={() => setHoveredLink(index)}
        onMouseLeave={() => setHoveredLink(null)}
        className="footer-link"
      >
        {link.label}
      </a>
    ));

    return (
      <div
        key={groupIndex}
        style={{ display: "block" }}
        className="footer-wrapper"
      >
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "white",
          }}
          className="footer-title"
        >
          {group.title}
        </h3>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          {links}
        </div>
      </div>
    );
  });

  return (
    <>
      <footer
        style={{
          paddingTop: "1rem",
          backgroundColor: "#1a1b1e",
          borderTop: "1px solid #373a40",
          color: "white",
        }}
      >
        {/* Container Principal */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="footer-inner"
        >
          {/* Logo */}
          <div
            style={{ display: "flex", alignItems: "flex-start" }}
            className="footer-logo"
          >
            <div
              style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
            >
              <img
                src="/logo-pensa-white.png"
                alt="PENSA"
                style={{ height: "100px", width: "auto" }}
              />
            </div>
          </div>

          {/* Grupos de Contactos */}
          <div
            style={{
              display: "flex",
              gap: "6rem",
            }}
            className="footer-groups"
          >
            {groups}
          </div>
        </div>

        {/* Pós-Rodapé */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #373a40",
          }}
          className="footer-after"
        >
          <p
            style={{
              color: "#909296",
              fontSize: "0.875rem",
              margin: 0,
            }}
            className="footer-copyright"
          >
            © {new Date().getFullYear()} SourceCode. Todos os direitos
            reservados.
          </p>

          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
            }}
            className="footer-social"
          >
            {/* TikTok */}
            <a
              href="https://tiktok.com/@pensa660"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: hoveredSocial === "tiktok" ? "#4dabf7" : "#adb5bd",
                transition: "color 100ms",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
              }}
              onMouseEnter={() => setHoveredSocial("tiktok")}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/pensa.660"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: hoveredSocial === "instagram" ? "#4dabf7" : "#adb5bd",
                transition: "color 100ms",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
              }}
              onMouseEnter={() => setHoveredSocial("instagram")}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/pensa660?_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: hoveredSocial === "facebook" ? "#4dabf7" : "#adb5bd",
                transition: "color 100ms",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
              }}
              onMouseEnter={() => setHoveredSocial("facebook")}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        /* Responsivo para Mobile */
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: center !important;
            gap: 2rem !important;
          }

          .footer-logo {
            width: 100%;
            justify-content: center !important;
          }

          .footer-groups {
            flex-direction: column !important;
            width: 100%;
            gap: 2rem !important;
            align-items: center !important;
          }

          .footer-wrapper {
            width: 100%;
            text-align: center !important;
          }

          .footer-link {
            text-align: center !important;
          }

          .footer-title {
            text-align: center !important;
          }

          .footer-after {
            flex-direction: column !important;
            gap: 1.5rem !important;
            align-items: center !important;
          }

          .footer-social {
            order: 1 !important;
          }

          .footer-copyright {
            order: 2 !important;
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
}

