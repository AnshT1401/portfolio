import { useState, useEffect, useRef } from "react";

const data = {
  name: "Ansh Tambat",
  title: "Backend & Full-Stack Developer",
  tagline: "ASP.NET Core · C# · Java · MERN",
  email: "ansh.tambat14@gmail.com",
  phone: "+91 7517245430",
  linkedin: "https://linkedin.com/in/ansh-tambat",
  github: "https://github.com/AnshT1401",
  summary:
    "Computer Engineering student (CGPA 8.87) with production-level internship experience building enterprise ERP systems using C#, gRPC, and MVVM — and independent projects in ASP.NET Core 8 REST APIs and MERN. Strong foundations in DSA, OOP, REST API design, and clean architecture.",
  skills: {
    Languages: ["C#", "Java", "C++", "SQL", "Python", "JavaScript"],
    Backend: ["ASP.NET Core 8", "EF Core", "gRPC", "Node.js", "Express.js"],
    Frontend: ["React.js", "XAML", "HTML5", "CSS3"],
    Databases: ["SQL Server", "MongoDB", "MySQL"],
    "Tools & Practices": ["JWT", "BCrypt", "Swagger/OpenAPI", "MVVM", "Git", "Agile/Scrum"],
    "Core CS": ["DSA", "OOP", "OS", "DBMS", "Networks", "SDLC"],
  },
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Praktan Technologies",
      location: "Nashik",
      period: "Jan 2025 – June 2025",
      points: [
        "Delivered 5+ production ERP modules (planning, scheduling, order, confirmation) on the Reflection 2.0 platform, eliminating manual bottlenecks for manufacturing clients.",
        "Replaced REST polling with a gRPC inter-service layer in C#, reducing cross-module sync latency and improving system responsiveness under concurrent load.",
        "Built real-time XAML screens using MVVM with live data binding and validation, enabling floor operators to update production states instantly.",
        "Contributed to Agile sprint planning and peer code reviews, enforcing clean-code standards that reduced regression bugs across release cycles.",
      ],
    },
  ],
  projects: [
    {
      name: "VehicleIQ",
      subtitle: "Real-Time Vehicle Telemetry Platform",
      stack: ["ASP.NET Core 8", "EF Core", "SQL Server", "JWT", "BCrypt", "Swagger", "Vite"],
      points: [
        "Built a REST API for real-time GPS and sensor data ingestion with a normalized SQL Server schema engineered for high-frequency concurrent writes.",
        "Implemented JWT + BCrypt auth with role-scoped access control, and a background Hosted Service for 24/7 autonomous vehicle journey simulation.",
        "Delivered LINQ analytics endpoints (peak speed, engine trends, leaderboards) via a Swagger-documented API consumed by a Vite SPA.",
      ],
    },
    {
      name: "Reflection 2.0",
      subtitle: "Enterprise ERP System",
      stack: ["C#", "gRPC", "XAML", "MVVM", ".NET"],
      points: [
        "Delivered production lifecycle modules (planning → order → confirmation) for live manufacturing clients via gRPC service contracts integrated into the operational backend.",
        "Applied MVVM with reactive two-way XAML bindings, decoupling UI from business logic and enabling faster feature iterations with zero regressions.",
      ],
    },
    {
      name: "MelodIQ",
      subtitle: "Full-Stack Music Streaming App",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
      points: [
        "Building a MERN streaming platform with a RESTful API, MongoDB Atlas, JWT sessions, and a React UI supporting playlist management, search, and audio playback.",
      ],
    },
  ],
  education: [
    {
      degree: "B.E. Computer Engineering",
      institution: "Sinhgad College of Engineering, SPPU, Pune",
      score: "CGPA: 8.87",
      period: "Nov 2022 – June 2026",
    },
    {
      degree: "HSC Science",
      institution: "Amro College of Science, Nashik",
      score: "75.50%",
      period: "Aug 2020 – June 2022",
    },
    {
      degree: "SSC",
      institution: "Boys' Town Public School, Nashik",
      score: "94.20%",
      period: "March 2019 – May 2020",
    },
  ],
  certifications: [
    "Certified Java Developer",
    "Spoken Tutorial IIT Bombay: C++, Java, SQL",
    "AI & ML with Deep Learning (Fundamentals)",
    "Deloitte: Data Analysis & Forensic Tech | Cyber Security",
  ],
  achievements: [
    "1st Prize — Crime Investigation Competition: Top honors in college-level analytical problem-solving.",
    "Government Certified Artist (Drawing & Sketching): Precision and structured creative thinking.",
  ],
};

// ─── Typing animation hook ───────────────────────────────────────────────────
function useTyping(phrases, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[idx % phrases.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIdx((i) => i + 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, phrases, speed, pause]);
  return text;
}

// ─── Intersection observer hook ──────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, children, style }) {
  const [ref, visible] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        padding: "80px 0",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ label, num }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 13, letterSpacing: 2 }}>
        {num}.
      </span>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, color: "#e8eaf0", margin: 0, letterSpacing: "-0.5px" }}>
        {label}
      </h2>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#00e5ff22,transparent)", marginLeft: 12 }} />
    </div>
  );
}

// ─── Skill chip ───────────────────────────────────────────────────────────────
function Chip({ label }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-block",
        padding: "4px 12px",
        fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
        color: hover ? "#0a0e1a" : "#00e5ff",
        background: hover ? "#00e5ff" : "transparent",
        border: "1px solid #00e5ff44",
        borderRadius: 4,
        cursor: "default",
        transition: "all 0.2s",
        letterSpacing: 0.5,
      }}
    >
      {label}
    </span>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,14,26,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #00e5ff18" : "1px solid transparent",
      transition: "all 0.4s ease",
      padding: "0 clamp(20px,5vw,80px)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 15, fontWeight: 700, letterSpacing: 1 }}>
          AT<span style={{ color: "#ffffff44" }}>.dev</span>
        </span>
        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8892a4", textDecoration: "none", letterSpacing: 1, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#00e5ff"}
              onMouseLeave={e => e.target.style.color = "#8892a4"}>
              <span style={{ color: "#00e5ff55" }}>{String(i + 1).padStart(2, "0")}.</span> {l}
            </a>
          ))}
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "1px solid #00e5ff33", borderRadius: 6, padding: "6px 10px", cursor: "pointer", display: "none" }} className="hamburger">
          <div style={{ width: 20, height: 2, background: "#00e5ff", marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 14, height: 2, background: "#00e5ff", marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 20, height: 2, background: "#00e5ff", borderRadius: 2 }} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "rgba(10,14,26,0.98)", padding: "16px 24px 24px", borderTop: "1px solid #00e5ff18" }}>
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#8892a4", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid #ffffff08" }}>
              <span style={{ color: "#00e5ff55" }}>{String(i + 1).padStart(2, "0")}.</span> {l}
            </a>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 720px) { .desktop-nav { display: none !important; } .hamburger { display: block !important; } }
      `}</style>
    </nav>
  );
}



// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTyping(["Backend Engineer.", "Full-Stack Developer.", "C# & .NET Specialist.", "REST API Architect.", "gRPC Engineer."]);
  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 clamp(20px,5vw,80px)", position: "relative", overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#00e5ff08 1px,transparent 1px),linear-gradient(90deg,#00e5ff08 1px,transparent 1px)", backgroundSize: "60px 60px", zIndex: 0 }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "20%", left: "55%", width: 500, height: 500, background: "radial-gradient(circle,#00e5ff12,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
        {/* Text content */}
        <div style={{ flex: "1 1 400px", minWidth: 0 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 13, letterSpacing: 3, marginBottom: 20, animation: "fadeUp 0.6s ease both" }}>
            HELLO, WORLD — I'm
          </p>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,7vw,80px)", fontWeight: 900,
            color: "#e8eaf0", margin: "0 0 8px", lineHeight: 1.0, letterSpacing: "-2px",
            animation: "fadeUp 0.7s 0.1s ease both",
          }}>
            {data.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, animation: "fadeUp 0.7s 0.2s ease both", minHeight: 48 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(14px,2.5vw,24px)",
              color: "#8892a4", letterSpacing: -0.5,
            }}>
              {typed}
              <span style={{ color: "#00e5ff", animation: "blink 1s step-end infinite" }}>|</span>
            </span>
          </div>
          <p style={{
            maxWidth: 520, color: "#8892a4", lineHeight: 1.75, fontSize: 15,
            marginBottom: 44, animation: "fadeUp 0.7s 0.3s ease both",
          }}>
            {data.summary}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.7s 0.4s ease both" }}>
            <a href="#projects" style={btnStyle("#00e5ff", "#0a0e1a")}>View Projects</a>
            <a href="#contact" style={btnStyle("transparent", "#00e5ff", true)}>Get In Touch</a>
            <a href={data.github} target="_blank" rel="noreferrer" style={btnStyle("transparent", "#8892a4", true)}>GitHub ↗</a>
          </div>
        </div>
        {/* Photo */}
        <div style={{ flex: "0 0 auto", animation: "fadeUp 0.8s 0.3s ease both" }}>
          <div style={{
            position: "relative", width: "clamp(200px,25vw,300px)", height: "clamp(200px,25vw,300px)",
          }}>
            {/* Cyan border frame */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "conic-gradient(#00e5ff 0deg 90deg, transparent 90deg 180deg, #00e5ff 180deg 270deg, transparent 270deg 360deg)",
              padding: 3, animation: "spin 8s linear infinite",
            }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#0a0e1a" }} />
            </div>
            {/* Glow ring */}
            <div style={{
              position: "absolute", inset: -8, borderRadius: "50%",
              background: "radial-gradient(circle,#00e5ff18,transparent 70%)",
              zIndex: 0,
            }} />
            {/* Photo */}
            <img
              src={`data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAHhAZwDASIAAhEBAxEB/8QAHQAAAgEFAQEAAAAAAAAAAAAAAAECAwQFBgcICf/EAE8QAAEDAgQDBgMFBQUGBAILAAEAAgMEEQUSITEGQVEHEyJhcYEykaEIFLHB8CNCUtHhFTNDYnIkNIKSwvEWNaKyY7MlJic2N0ZTVXN1k//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAApEQEAAgICAgEEAQUBAQAAAAAAAQIDEQQxEiFBEyIyUUIFFCNhkXGB/9oADAMBAAIRAxEAPwDtICYCYCYC32xIBSARZNRsgrIATTUbTok0IRMBJNCAQmkgOaaEIkJJoQJCaEAkmhAkJ80IEhNCIJCaESSE0IEkpJFAiNUJoRBWQU0IFZIhSsUigSE0IkkITQRQU0kRorITQUESkpJEIhEpEKVkFEaUyEiFMpEIjSkQlZVCFGyC6HRMICalYBCEwo2BCE0SSE0IkgmnZCBWRZNCAQmhEFzSUilzRIsiyaAgVkJoQRTTshArJKSLIEkmhAWSspJIFZCZQgimUIQCBuiyLIGSDskhCBITKSIKyE0IkioqR2USgEICECQmhEI2SUkiiEbJKSCiECNFEqoVGyIXKEIRcJhAQiRZOyAmiCsmhCAQmhElZCaEAhNCCKLJoQJCaEAhCECKE0IgkIQgChCEAhBNhc8kIEhCaBIQUIkITSRAKSZQiSRZMoQJFk0IIkJWUikgjbVBTshAihMhJAikU0IhGyRUjskiNIkJFSQgrJoTRYITQgLICaEAkmhAITQgRQmixQHNCEIBLmgoQCEIQCSai97Ixd7g0dSgaFz3tC7WeGeE4nxNq48RxAC7aWDxf8z72b+PkuF8R/aF4yxOExUWFU2FAOv30TzI63TxCw+RUbg09a31tfXog3B2Nutl4ed2m9oEgD//ABRWZjfNaRunsRp7KnUdp3G80fcVHGNe4BtspmsbfJR5J8XuCWdjWkskYcurudvksbRcTYFV1hoosTpPvbbZoTK3OL+V7rw1i2O4vicjKqsxuurJA3KHOncSB8/wWOqg90pjkqXSSNddwku4tPnfVR5Hi+hMk0cbgHkNB5lRNREweJ7WjkSV4VwfjjjCiaIKLiPEqe2mQ1Je3b+F4I08rfJZpvahxvh7M9Vjks9PJq4uAyXvvoPDup8jxe1rggEEEEXBGyF4xwDtq474fxFr5poK+hkN+6k+A+hGrb+41XWuCPtC4JXVApcdppsOadBMfE1p/hNuXLN6epeUI07ohYzCOIcFxiHvcKxSjqx/8OZp/D1WRa9riW38Q3bzCsJoQkgE0IRASTQiSTQhAklJJBFCaCgiUipJEIIoKaRQJIpoRBJJpG6IXFk0IRITCEIkJpJoEnZACY3QCLIQgR3RZNFkCQhLmgOaEJIGoucGC7jYKFU9kdO+SRzGtaLku2A815H7eu07EMVx+XCeHMWldh8XhmEOYNJB1AsfEPPQbWUTOiHobtE7SuH+DqZwnqW1NcQclKxwLve2w9V5o447XuO+I552wYmzCcNN2dxSOIe5pPM2ve3Qrl5kqdQ+B93G93XaXeyTZJnSAmIlo0sCdPTkCqTMytpeGBzy+VzpJ3nxFouL9SXHQFNhdO0sjzMLNg45grWaoEHhEcjiTrq79OVMYo9oc3vZAb+JpNgoSrTZ4Gh0k7rG92luh9FJtRTBoZJG6WLcsLAfYKk+qFS0ZnNczm1wzAe/JUpoo4i2SkdK23xNzbfrogvHOpBCHQDuRe7i1uxGmqUdaGsAkzyW1Y7Ll1HuR+uSoQyeINkJEu4cNHEfgVTlZlc61gwncGwBOnsgvZMRknJaxxidfUtAAHqN1QdWVbHETyB22ue4I5foqhk7sAvu1v7r7fD5HoqksLntcXs7yMDUt1Lb7EeSC6irJZGODDGwEHMzL4D7D1VOibSukLnyGleB4wCMu/Q8v15q3pGFkuVpDjfwnk79fNRnYTTmdhe2JztR/wDpvF7jyP4hBmWTiKqJD3x1MYFpYnZSRe4P60PyK3TA+1PivBe7a/F6moiyiwmJcQBpoTrp5Lm0tPJBBDVA5qfyNwL7jyB6cjbqskXM+6MeZu8o3DK0vGZ0J5td1FjodDbrZRB279w/2/4thzYHY9h8WJUEmpqYQY5GDzGrT8wut8LdpHCvEDGGgxOBz3tzdw92WVvXwnceYK8YRU0+FujniqQ6lNg4ZrsF/PYg+e/VZGHC5aZwrMMrBSvJz906+S/UbFh9FeLImHu2nnhqYxJBK2RvVpuqhXknhvtc4lwKeL+0WtkhY4NMpdY+jnW1/wCIfzXo3gHjXDuLsPZNT/saq1307zqR/E07OH4K0TtXWm0osgWKFIaRTQgVkFNCCKVk0IEQkpFIoIFKymUuSCNkFNIogiFGykUkFwmErJoGiyEIkBCE0AhCEAhCaBIQkUAhCRQCwnGnEuDcKYHNi2NVopaeIcrFzjyaBzJWTr6yload9RWVMVPCxpc58jg0ADfUrxh2+8dDjbiAsowf7Lo3FtOLnxu5yG/PkNNvUqJnREbW/a12p1/HFXKyOWbDsGJ8NK595JeV5A2zT/p1A81z4SaZYpZmt9hdREDGyh0jrtLbgtIuD53/AFZVqZ5qHNjiZEBbxOfs706+mqzXWzIGRv72qeRmF2sabuPS5VxT1mVjhFKyNu18tyPdTqKagYCM7qmV2pvoB52GgHqSrOV+ZuSOne4DQOtZvy5+6CtKWE61AJJvdzwT8gqMuYtA1k10zW28lRMd7tMAa70v9Ck9krD4XZhbxM5oKkbCc3c3Dhuwizh6KvEBUNDQ7u5h8JI38j6oogKpt2FoLAA4W+Ecj6fgr0U5expADnAXa/YHTUH+fugpU1KasSU722laPCQTcOHL+R9AlQve2a0seaUAjKSbSNG49uiydKHQ54Z2jK4gxPv4mXOxPS/y0TliYJO+AD2Pdd4A1FtCeunRBRioWgF1OXSU7xYBw1af4T+A+XkrJuailtEczf4AdR1y/LULPsY4ZhARKx2j4z++LcvO3sRe/IiyxOijLXyQSCUDVxIsfQ9DpvzHpdBGnoKWopQ8ODGSXtKBo08gegv8j9XTYc+CoNNVAthqvA7LchsoPhd6EfjZLBqgQ1TQ5xZnBBD9WuHQ+4+vUXWero6aKNkzwfuj3ASakuhN9/Y7Hlby1DCYdEaN8mH1EZfBKNWu0uD+Y1F/yCs6miFBiP3WKWR0Egt0zAX16XH4+RWxVUMNUwROu18byC4CxabjxD8bdCAnWQPnhaWStbURDK5oGjtNPmOnMIDh6nyQSUT3MlGQ5Q5tmOY7m2/IndvImxB0V3RxCgcIRLmpydGl5D4z0aeY52/FWtM+l7sXeISz9oQB/d6fECeWh0236FUMVlqYB97YC+25aPitsddP57b2QXWLyNaM8meaNws6RrQ4Zf8AMBe4WR7Osc/sLG43R174Yi4GN7XWEbjo11+Q5cwRobrD0uLQTUrnxjuK+MaxX8MgtoW3/Ly3WCxOogq9WM+61eYlvON4O4BGxv6eYTY928DcSN4hwsvlYIcQpnd1VxDk4cx5HcLYl5S+zjxvPFjsVNXSES+GGRrzYujBt72vfrovVcZu229vqtIlTSXNNIG4umpAkmUkCIQmkQiAUimkUSRSO6kkUEUlJJAiFE+ikdkjuguEIQgEwhNAk0IQCAmhAgmhCBFJNJAK2xCtpKClkqKuojgjYLuc9wAHzVw42GgJPkuA/al44xbB6OHBcLmfTOnDhUuY3dpA8OY9QeQv5qJnRDR+3btb/wDEc0uD4JO9mGDMyWQf44B0t5G17+a4bPVPe42+AaCyq10h71pvy0sfoqERZHG95bd4dbUXHv8Arms5ldUppD3YbcEN2zD4Sd7q2a+WedwgDyP3nAfqwV7RSQkubM0Bj+Y+Ie/IK8xCelip209MyNnhDiG6Bg6n+W6DHd41rSxzwCP4Wl310CtpAyR9g5+uxcP6qMtQ0eCIXvu4/kERFrzke2xOxCCpG2ZgOR4kY06gHM35HkrmCSHO1krHtB2IO3mCqMUbmuyteA8bC+Uny6FXsDopIXQytLyNQDoeunQoKTmmgq4auI3GzgNA5pWbpHs+9vjhLTDUgPhO3jFrjpe/tb0WEMj42CKWz43CzHHZw3ynoef/AHSglcz9nrYHNGTuLcvy+WyDPzGOeDu/7qbVrR0I0cw+4BHkQeRVjTVgL3RSuMcrXaa7PF7ex1HzVu2qFQ52fR7tH8rOGzvUfX5q2q5DLK572t7wDI/lfofpv7FBsVHVtZbRxiccjo813RuGth16ja4213qzNzuY6m1k3MRFnSt52HP2sbrCUNQKiEsytdOwWkjfoZWj+E/xD9WVy6Zwp+6ljFTTF2uhzt6EDcEeW9gglJHT/ec8b3sJdqxwsWmx1F/b68xreR1bBFJBK5xZILFpOjbHe/Sxt8vU4qplzwnunvkYTYSE3eOdnbXt10P5xp6kSZaeoc0XP7N52af1p6HysgyNNVPa2aFzznp2ODiD/hf039LLJVFWA2CpDmWljAObVmYXaQfI2t7jmVq0ks9NVCoYCJIzkd5EDTTpZVqasZJSSRxi2V2eNp1bkd8TPYge1kGQnrI6eqdC9z2xOJfBKy3eR66tPmD8xe/NWorXwVAGdoaNJWtuWFp2eB/CenLT0VpVyuPhBJkY67HO1uLXHuNj1Csp5LSNfEbDUsAOrOrT1/kUFete1koMclmbDNrkHIaclRfO6c5nDI9vPkTfn8/qqLZo5BkmDgxungAva5KjEWRy2zucLc2WuPmoGb4dxaowzEoqiLM2VjrA2zW16c17v7P8bZjnDlFViVkhmp2vzMNxtqPYgrwJhsTn1LQyUg522c0XLdd7aL1/2KGHDcUjwyle50Rp3Pn8V2mYhriQbWA308vJXqrZ2JosPqmoEl1iwWbuSeamDfVXQEWQhAJJpIBBTSsgifJIhSKRCCNkWTQUQiUkykgroQhEmmkmgEIQgaEJc0DSQhAFIplIoIvzW8I9SDsvJv2reI31/E39jU4b90w4Xc9jbF0rh4ideWg+a9N8ZYkzB+G67E30rqk08Lntibu8gbLwRxZidTitZVVtQ9pfUTyPNhsS4m3S3RVtKYYOokzeBzALHWwN0qhzB42iwdrqdiqcl8rSCDbqqZzv0a0Nv1OyosjJLZ2flfTncqJ7x4JcHeM3WRo6emEOpD5NyefkB0/H0VOeSMuIboL/AMQ19EFqynfa4jBHmFdUoDHNZMTlI0adfx/BRFO+wfnjF9sz9VeUdJNVMLTma4fwtJafYfr8E2a2t5A4OLcgcCL28uoUWyPaGtIDxyv09RstqocCM9O1l3d7fQFh0J39jusrR8B1NS8FsYYSbAZ9CfL+iznJENIx2nppERErXMAFnDxNcb3/AF1SZCT4BJG6/IvFwuq0HZbVSxBzmtifud/ksk3sreRaVofzFhYj+axnk0j5b14l5+HGJY3aOdlzDZ7b39+vqmJWOeBOe6ltYSgaW6EdF16q7KCAXxOdc8uXy2WDxDsuro5w1kb7dQEjk0ktxMkfDnslMC0TRhzS394G7fIgjVv62WSoqsyx93JZk7f3wA5rvMgfiPfa62N3Z7i9HKWsfOy2+W4H0VR3BmJtjvN4xa+Yxi/rcK/16/tT+3v+mr1TA/LM2NrQ7d0YzNdyt1878li6mF7QXAXA3IGo8nD8Ft0mB4rTuJdGCToSW3DvW/NWFVRVEIzFjC34chZ9B/RTGWJ6UnFaO2vun72nyyAl1gwk6E2+E+vI+ypwHumSaZmPI12LXDU2/XRZKow+RvijjJDtgWn5Ki+ldkzjwNN7Bw36j6K3nCPCVq4l4bE++aImx2JbyHty9SqDw9z7uAzc76A+ayIgDg1pyA7Ak206eaKmmvO+MF77mzLDy26pFlfGWIku14cWkHZwRfw6HVuyr1MIYXNGmXcOFtVQiDJHZZC/yLW5j+IV4lVsvZ+xs2LNdlY54Fmlx0YToDb9476FewOzCifh1JTV1c0tfII4GRttnI1OY663J32svE+HGOiqGzf3kjTcW0yn0XaeyjtOxShraalxLEJq3DQ7xwP+KIWsHMPkr1lEw9eACTU39CqgWMwysFRSQ1NPNFNBK0OY4OuCD5gfksixzj8TC33uFdVJCLIQCSaSBpFNCBFJMpFEEkmUkSRSUiolEKyEIRJhNIJoD2QEIQNJNCBJoQgRUSmUigxfE/3c4HVsqWNfC6J3eNc3NdoGunNfPfFxGzFKuIyFsTZ3AZhdzBmNtQPT1svffaNJBTcD41VzyshbHQykyOF8oynVfP6Vtv27w4PeLuu4Hf0VLJhbSuvmAMbhsbjf2VpJmva1h8griZvxENIA312Vu8OtZzuWlze6qsbZHvtDGbA7kmwPr5Ku+FoLGNvI7qAdT5D81SpgGvzFuY8hyus5hFIauWz3OI2uHWBP6091EzoiNyjglBNLUFjmZB5nRdIwLhJ8vduc1rCBcAjfXfUFVuD+Ghdj3gRNbr4AL+lzsuucN0MUVMI2MIa863dcuXDm5Gp9PS4/F3G5YLhvhiojymSKJ0Z/iYBm+mo91vGH4DSMF200bHZQCACB8uQ8tVdRMDHDICG310/NZNhAbcuzemllxXyTZ6OPDWqyhw6OM2bGwDqFXjo43Mtr53CuWva7UkjobqTe8MgDcuUje+t1xy64UPuMbXN8AOl9VGbCoJSSYWarJNGX4gTpbZV2g3AG291aNk6YR+C05beRrX220vZUpOHKd7QTG2xAu0bb/itijaXgE21dr5Kq9geQLAj8tltXbG2mjVPCFDI0OdRg5hqABYeq1THOzylfmayAA25tBHp5LtMbIXxgFxHK/VKppIRlOUajQluhPnzWsTNfbG0Vn1MPM+Idn/cMzshcLGz2OJLSL/uja+/n1WAreFpS9kYp4zpYW0J6a8uXzXqHEsPZUeEtGXkDo0/qy1zFeHqdzmuihDpD4Q/mev5aJ9eY7V/tqz083xcOtbV94Ymlkmjoydjexsbafo8lTx3h/uqZozAPY7wGwzgeml+X6277VcKMlqI3SGO40c1rdCPUnp+tVpXaLhkdIZGxRsDSPC0AAbbW9lrjz+VtOfLx4pWZee8apu6neTNHqL6EknroPzssbEDnyszXNrkix1/BbZVYW6rqBZmgcGvu7+LQOPMjS1uVvLWwODvYxst7ES91Iyxv7exBXp06eTbtiIiI2iRzQWOBFvosnhU1RQ1YMTgZWbO5OBFvcWVOGimkldAAARleSdtd7+Wiuaald94bGy7+78QcP4Rrb1V1Xs7sQx3+1+GcpjeGwtYHZtdS0X/A+4K6K3Tw79D5LhP2VKiaSkxeAkhrZ2lpI+AW0b+P1XdGj94adRyWqiaOSAmgSE0jugChNIoApFMpIIlLkpFJAioqR2SKIVUIQESaaQQgaEXQgE0gmgEIQgRSTKRQa12mRd/wHjUJkDM9HI0OLb5bt1NjubXsvn1bLEA7O0mxtfYed19FuKIPvWBVVNmLWysyOIFzY6aLwBx/QnC+KMSoHgh0VS9p1vYXuB66/NUsmGFkfG1odkNzpuCCqMgDcpZfKRcWP0TjcDqRumXt1aBoVVY4IszgXHnst74Iw93etkdf8PILTsOz98xsbA55O/P0uun8HUM5LHPAeCdSNh6Hn+t1hmtqG+Cu5dMwDDIhTBzjmeAA0chfmtqw2LubMaTysd/osRgYEUTGu1uNLrNMkYGBwtqdL8l5Fp3L3qVisMkX93kY1pc5+p00FlfMuWNLrj1OixdLLIW3DbX2Ngr2ESaXOvQKky1irIRsiuAG+9rqceUX01302PurcB17g2A81cQk7tF1jM7axGlzCA62lvJXTGeDffyVKnZmgu5o3+WqrNYALgXvzUxKspgWGVo0vvdVGNBsd+dyqD3hoFyBYc1Rhe92uUuB0C0i+mc1mWUiO9hcbgBEhGYZGhnppdWZMhHhDrA8rfJRlcRo7fXQjVX81PBUqAC4lhI9DtdY+oYc+jfENSbHTlr1VZ7pGtLtXeqpmfw3H7o0KpOpWj0x1c3u4RcAi5vc9VynjthcXy3ke4WDQdQeei6ri5L6ezQdx/X6Ln3G2HVEsEjonOJAuAGg+mnP9e9sForf2pyKTanpxOrLaSpLycwdma4A6FpsdfcD5lYf+02TUrGvcC5pDXta/poXfRU+LKmohq5oXXjc1xGo2PkfdayJiCMpIytLjY87jby0H1Xu0ncPnbxqW6xR0zg57y494wMJaQLAa/MOBWJpmzyV743sax7mC4a7bSx9d72VLBKtz6R0INzFJdvkHG5H1KykjBBVOq2tvePvWEga5W/0V1HfPsqy5HYoGgiMubmNtyf63Xfl5/8AsqC4xWVxsx0jMpv1BO3qPqvQJ3WkKSSaEKQIQhAFJNHK6BIQjkgiUjspFIohEpFM7JHdBU5ppJoBNJNEhNJCCSOaSEDQhCBFIpo5oKcjQ4WN+q8K/aFoaik7UcZkqISxtXKJor/wZQBb5D5+a92uGllwD7XPCkU/CUPEEUAdUQVDGveALiM3BHpqD/wjoq26THbyYfAwaW8OnqURtuQG210t+am8XGu+Y6K/4Xo3YhjUFM1ma5uVnM6ja9Y3Om4cBcNyzOFTLE3K7YuF/VdQwqlhpGgMZ8PMcvQJYbTMpqSKNrQ0NZZSrqujoI2y1EzYxf1Lj5BeXkvN5ezix1x1bBTPfcOByg/u3us1QgSuDXG/Ow3XNYuJ3VBb3Mb2wki3iF/forh3FYo5T/tDHu6ZyAPbqqRx7S0/uqQ61TUjahsbRmDWOBFnEbbbHbyWcpqVrG5bHNfrdceou0unp2BgpcQqJCd2tB/NbFhnaVCW3OD17SBe72HXrYgEfNRbjWWry6zLo7aZwbe46hDInu8PO4vpstUoOO6Ooe4SU88BAv4xuN/nb8Fm4OIKJ7W/d3CQueGnXb9Xuua2KauqmWLdS2CjYLhttSqk7bXLQCL7KhSVIdYkA6XB6q4bMHXa4X5AqIiOkzve1NkehL/RVI4hyIB3yrE43jMFDGXyO0zWs03115D3WsVXFDpYgWiVkjXlrZHC173APQ2NvUHrdXrXfStra7dDDYxlDnDW9rqMkbd2vaASuW1nGVReSZ1XG17WCKNhcDru5xB0Otm+xNjsdTl4w4ikldDSVlO3xkF81dGC/wCbtBfUbW6LemHycuTPFXcp4nOzCOSNxHIELA4rXR0ZHfh9huQbgfJcuosQ4nkkAbV0ctyLBuIwG3/M+53Omi2WkoOIa6IfeqA1byP3ZY5MvplcfkOqm3GiflSvLn9NtbNBVUjZIHBzdwdliZ2N7x0cjWlpGt+Xz5rB4tHi+B2nmoMQpvMsy2/J299eSWFcRUuI3imzMlI8LiCM3pcD6aLly4Zr7h24c1b+pc77WOz81kkuI4aADkLnMIuDb8PVcFqY3RTSQyNyuHhLea9o1kLiGgEE5eY/ELzd248PswviE1VOzLFN4tORXbweRMz4Web/AFDjRX76tCoJTS1hP7jhqPXZbO6qEcjmPcJGGzbg/B4SdvcLVQ5mRjwwZwSHEfvD0WQwwiSpeHkkytDGuv0tovVeQ9efZjoBT8Fd66ENEkxkieP32OFx8rWXXlq/ZdhYwjgnC6Huu6MNOwC3MFo/NbQtVAhCaACEeyEAkmhAikmUigRSKZSQIpJpIhMJqI3TCBoQEIk+aOaLoQNNIICBoQhAIQhAisVxVhtPi2A1lDUR942SB7QPMhZUhRcL3Hkg+bNVSOpK2ehkLXOp3PjzC9iWuIJ1W29jVN3vEUji2+SG4081kO37A4uHe06spYA/uXsZN4gbNdIXOc0HnY5v0EdijQ3iCtB2+7tseozLlz+qS6OP7yQ6jWXip3PbbwjY6D5rW8PwDFcfrhM0spoGPyOqpbm5H7kYAu821sAbcyFuX3eOoc2OUubGNXuaNQBuR58h52WQrmGlf931j7pvduDXeFtv8Mf5Rz/idcnkubh4Zy21Hp6eefTHYdwthdI1oc+oqpGggySSd22/UMjN/YvurGtpaOmqHSR0cL37gkBoB9gHf+oqvX45FSsdG+bL72sFqM/Ek9bmkoad8sQN+8dZrLep3HpddnMx0xajH7c+LVt+a9xSvxOJrhFT4abWtmjkfp/xvK12qxnGLOa6hwu9zqKJoBHTTX6q7fiovkrMVwqBx5d4XW+gVhUuqKiIPoKzDq4HcQyEOHtqVyVm/wAwtaMfwr02N4hoH4bRkA/4ZkZ+DtCtswjHaKoyx1MVTQyvlz97FJ3rOZsWm2huToeS0GkrXxyiOdj4pTs14uDbodis3RVcbpWBo8WlgRootqfVoXpHzEut01VXR920zxPgkYZI5o4wWuaL5jtcEcwdQshS49QQudH99qX5PiDYALac9VrvBkrjG1j5Q6LMWlpOgEjSxx+X4K6gwaYPka+jlbIT4mhpvdeblrFbPTx2mY0qcSVrMToagUmI1WaJgkdGWWDm5gDqDuCRpba/RabHSwYX+3rIpa6teBKyna7JHCLG3eO1Jcbg5Ba3M30G/UODuiaGywvjZK5rHCRlrjMDpffYfRalxQ1kE0rrFzi4mzTqTdaYr6hllp5SwuLYhW3L4vutO62hbEHEE6/vXO/65Kxpa/FZjlkxquLr/wCFO6MD0DbWWGxeunM3cwAOlcdQSbNHUrDwyMZViOeora+Ym3c0jSdenh9l2VpaYcV7VrLsPD9TJDl+84jWSHTV9VI4W9LreMMxGlbK3vzG9h8NiSfc6rgeAcQ0U2H1VXT8JYhWUdK7JPK2rGZhyk2sXXOgvorun4gwWubGcNxDEMGqXsDo46q72S32Izbi/QqYx5MdovtMZcN48XpSnmkLf9iqp6e+7WTEA+yx1VBG6XvKmjgml3M0DWxTfNos4eTgfULl3CvGeJ0FazDcajALv7meI+CQeXQ+S6dg+KxVTA9rwPp816t7cLkU+6IrLHHTNjt9vuBJFmax7Xtljc05ZGi17bgg/C4HccvMEE8d+0Dhve4C2oYBdj7N16j+i7OY2x1shjOaCduZwBADJBsdbAC1wf6Bcx+0E0xcKmnbHnlknjaGAXIBvr6ea+frj+lyIiJ3DvzX+pgnfbzLCGvp3A2vlOX13/p7rofYvgAxvtGwCFpjdH333qRp5taAXMPnstIhp6iSqlpqeBzpMhblAueQ+a7L9mDBqml49pp6yncx8bZdObBkHi9OV17NZjengTWdbesqWCOnp2QRC0bGhrB0A2CrJkaostmZJoQgEtU+SECQmkUCKRTKSBIKZUSiCKSZS9EEgmopgoGmldCJSQkhBIISTQATSTQCCmkgCgb6oVGuc5tFO5nxCJxHrYqJNPOPbPLBxjimIUlPTxNha4wmRzQ57y1x8QPKxJtbksL2TdnNK2llrqfEZmYrA17JYZHNbFJHmbl1I8J1Guo306anWYnjB4hy0zi1jHWc07Oud1sOAYnXDjOsLZckkFA2N1hcODnZiCDodhuvM+ra299PXtx60iNduu1uH0eAVNFSS/dqxs1RG6R5fd7SLkNNrW1sbbaa30to2J176mIyMlAL7uJ9Vn8GxU4pX08ONMmqpBOO5AfkYwu8LX6akgna9je3rpkkWSER6jks6ZfD8WsVmfy7aNxPI5lUZah0k7WXLImDRx8+volwvhs3Ela3+1a91PADYU0Ti0nyv/JbPUYVJITJkLm8rqphsVJTEipo3NJOpLeS6bciLVhl9Hdp25hxRRxYFLjWCuw2F1RLPeCeZviZFe4y3HSwv6rN9nOGHi5+DYFNgNGPuD3OqMRgvHJ3GptIW2FwdnEnlpoSd/qJMLqIREQJSDcB7cw9LG/NFPLKyJkMdFAGNP70IseuhSeVuNKRwo3vbXeNMDdgc80FBiUOK0GcZGySt7yM67HbQDfpa9+Zw7QmoijqGPzMcbEO0IPMLb30NRVlpNOL6A/s/wBfNV4MElYSQ1rXW2aBZq575Y06ceGYlf8AD7y18GH5WtZPIM0z23ETQCST7bDnayy8vFOA4biFRRYXw1/acTJS1tVUzSXkA0vlZYAH/usHV0slPStkkJbGHNLvM8vdb5wlhtMaRv3iJhe4atHJcGTJqXdjx+R0WK4Ti+GT11FRR4fiFIwPbTCYvbOBfMBmF2m1ram5053GvcTYXHWudNfLHILg6GwOqzXEmCwUFZHUU5MTZDlD2m1ndHfz6rLUODP+7Mp52gl0d7fO4H65Ktb+/S04/H/689VvD7pXSyVMk0Le8t3TIjmcLkHxcvTzVzxTh8FVgmGO4ehkp6yhzNMRaG5mnUm+17gHVdb4l4MqZy6eikcx55Ftx8ua053DuMxOLXUhkA0cYn6keh2XfTkfpw348T6lyPA+CeOG/f20bK6njqmWqs0+Vk7b3GfLfNvf0J669UxLhqGbgfDuHxhIqRTQCM1UwDQHAaltrka9bLPYdRYjTBjhh1RKW7ZmB9ug9PZZd4x6tibCad8EVtiA0D2TJypmNGPh0rLmnCPDeMUpfSOqBPTM2jmNyPQ2/quj4C2WCMBwaws0ICr0+E/dW55JCHc9LfmVVeJGHL3ZIG5B281yZck3j268WKKdJU9ZWT17qemgknLWh5ZGNRZwF/qqXE/EGAYbg1RNX0tO2mp6ez4DC+SZp3b4XEi5u3WwtrrZQia5jKupizNcYQMwPIyMv+awHH8DXcH4lIbFzmXcQLcxfbZThv4zEftjyMc2iZ/SypsJ4Ywid+OSUrZA6kDrRNzFxcb3H1Vfsv4twyTiuKohon0czniJrHa3jJta/vdZTs/oKau7LoJ3jPUPhdGSRs1hLQB8r+6w3AWCuh45jY+AFrJGOvbq4K0ZJjJrfuJaRii2GZ16mHpG3JOyZGqRX0L5ckimUigEIQgCkmUigCkhBQIqJTKSBFJMpIgJhJAQSTUUwiTTSTQCkFEKQQMISTQCaSaAVGsBNJMG/EY3AfIqsiwOiiUw8fmjiZxFUOIFw0EDzWL4KkfUcbcQTkFrTlAHkDp9At74qwdtFxzUQBpGWaRnte4+hC0rhSN1PxHj5eCHNewfDbQi/wCvRePjjXlEvd5FvLwtDe6CQ01dFVtGsL2yWHPKQfyV9iuEGLH6yn3aydxabbtJu23sQsRC8Mb3gHougHDzX4FQY5C4OMTG01UN7Fukbj6tABPULH3qYaxrcTLF0mFN7trHNGotbzVxLw9Svc4mjj0G5jF/qsthj43zFgFiNNuf6KztOwkeFrXP5W9VzzNvh2RSvy0yl4bjLPDTPAI8Nzy9FkKbhWEMaX5WW1sAtxbTtDcpyg6EndSDWNYbi9xsqza/yt4U+Iaq7DYKdvgjDQRrpb+qxGIwwiHwusL3d/X8VsPEk7aWlkmm8LBsdlqsVXBJh9VNPBUzVTmXpaeMhuZ9wW53H4Wncm1w0bEuAWmOJmNyyyW16hYYw/v6ulw0Btqa1RI3/wCI4eBp9G6+7VunDsTm08Zc8uuNRl1WhcO0s9PXTTVrmSVM0jpJHAaZj0HIAaDyC6nw7TEUkTnsa5rtuQ9VXJSdemmGYjs6mnZUU74qgB0Ugyub5K2p698VPT4fPLmnpXdyXfxA6xv9xofMFbDi+HGCESBxdmBv5LVq3CJaiqFVGR3jGljm7CVm+UnkQdQeXuqRWazr5WmYvG2W+9Ne4G5aSNjp81WNNDLYljXEjQ8x7rXMbqJ4ZHVVPE4NYP8Aa4CfE0bd7pu07G2x8jdZvBayJ8TJA9wblsrWjStfcK0mFBoBDnhvS+iP7MLgdXkdLaLNQFrmnQtHMt5q8ZCDdnxFvXYaqYxzPypN4hrTsHZJE4PjGTz6rE1dHHH4HNtrbRbtUU7xHciwHktbr4hM54DgHNG52S2KYTW8T21yejdDSzuAuJDbbkAb/VzVqXGjXy8L4mxujjTvI8iAui4kWmlbDFctYLBx3ceZ/X5LQ8Va6SOogOrXxuG3VK68418KXiZrP+1j2FTPPAsNO6TMHyykX83k/mtv4Sw6STiV9QTo+pY0dfBqdPZWnAvDDsCoqSje5sjo2DNz1tr9VtXArGzYpI+2sbpHnyJNh+a0x1+pyPXzKMt5w8XU/pu53USpHdRK+jfKgpIKPdAJFPkkgSCgpFAHZJBQgRSKZUSgDskhHuiCTURumgakFEJolJCiCmEEkJJoJBASCYQNNJF0DQkhBxbtkpnUXGlPWZQ1lUwEHq4eE/kufywx09dVVHd2fK5uYgau6fiuy9u+FPrOHafEIiM1HL4tNQ12l/nZcfmlEhY9zDnsA/16heVmr45Zl7GC/ngiP0nR/wB4GuF2cgfKy23AcbrcMneyBw7qZhbJERdrx0IWpwTxRuOezTtfoFkqaTPMZGNDiw215DyXLP7dtIiY1LfsFlopJzLGHRknxMvmA8gdx+tVssFVRMaQamNhJ2Jyn5FaFRFgprAFxIuNOf6/ArIvwN9VF3n36paSLgNkuB89E9a20iLdRLbZK+mY7SRnW5dp89lYzYrC+p7uKeN5tplcDc/ktXfw1NlJGJ1Hrlb/ACWucSYPNRUshbW1D9DvKdR6BZTqZ02+6I2uOPuLKCgmFJJNHUVbntZFGDcNJNtuZ9bAf5rWV1hc1DRUTpKie8huXOcdXE7rjIwWWsxTPI57GxuuCN730srvj6PFazDRSmRwicBnkiJHzC6PpbiIcsZvGZmW8Y/jlG6vY6lqGAE6APF1u3CnEz5KNkb5iAwWXnTBuzzBLMqqjEHyC2YMta56LZYcclwiL7tE6csafAXG5t68/VRlxRrVZMOe292h6OxLiMyYeXOmDWtBu5xsAOq1vh/tU4LEv3V/EOGSyF1rCobf8dVoWA4pDxDRGgxZne0rh+0Y82YW2/e6+ix3EPZ3wHJC6qwyiMUx8LGRuO/osK4o/lM7dFsk+vCI07dj9ZQT4LNjNBKBPSxOmhex9r2Fy2/Q7cx67LT+HuPeGp6swVefDpydS0ZWE+h8PuHNv/CFgeBeHMRh4eNDVVL3UztGwN6f5j68gsDxvwu/DnMqmAgNdvf5qa19TEovb3Fqu70XEWCho7vGIZgR0ufoT+KyNDxPhrWky1bHEnQ3a0HTzIXD+CBQVDWNnha94HPkusYHDhTGtkZTw5v4slwfZIv4zpM4/Ku2ffxJSTwuFM+CQ2Nix3eEezdPqsHO6QyB8oIza6g3trsOX4rMOFJFB4I4mf6QOWunNYTFKpneuDTYbAne3/dMt9wjFSNrGskDYg2+TTQ87/qy1SrINQ4NGWwO/rZZ+rkc8gOa4HkPJa1iWX729zfCLEa9f1dY449r5Z1Dc6SoZHhUdY+Zve5A2OIDxOdbRZvs9hc2OrmdqS4MvyNt/qStQwaOV8MFQGMfK9rYoxsegXUMJom0GHw0rd2N8R6nmV3/ANOxbvNv087+p5tY4p+10d1EqSS9p4JFJMpIBIppIApFBSQBSTSKBFRKkVFAikmUIhBMJBCCQTUQmgkmFFNEpISCYQSTCiE+aBppIQNCEILfFKKLEMPno5/7uVha73XmrHqduH109I13eCmkczN1sbXXp5u+q848d4dJh/EeIU0rSHd86RhI+JriSD9Vx8qOpdvDnuGujxTfCC7r1F1lKaqa0i9tenmsZGC2Qg+xtdTfKM7WsbYHYj8F509vVpPrbbMNrwGthlkD2OINhu2xWzUWIShpDjmjFiy7Rcn9dFzLDqsun7pzix5uGu5EracOq5SMhmLsoFxlsb81jeNOrHbbapsQErRZ5zHYAWv1WFx6Rk1OWWvvYX0CnHMQAy+9wLC5Vpikhhpnuy6AEaLKnbXJbVWDw3D2MLntAJvuTuNbqjiNHFPmyjLry2IV4y8jAHkWI0Gv65e1leUNMxzR3pAZp4r20XZFvFwTu/qGnVPDrXvzNNmEaW81GnwCpFyLdy02udSPPzXRof7KhuNJh9Ff0FbhEYDJacRjLfMOR81Fs0/prj4u43tz/BcNDKkQ1MT3EEagW0XQMOwamgizx0rRe3idp9OuivY/7CcfvGcSEEWcdAPLVZiLEMM7kAhuUG4s7ZV89r/28x8rfDbQ6BoHK99QsXxmI6qheDEHxtNnX6LMmqw2Z2SkqGFzidL2N1a1ZiggfG4fsy0g3IsR+is4mN6TMWiNuRxB+D137FuelLvA6+ovyXQMBxeZ7GhhuOR5hadXQtNdU0RcHwuJy3HXUfX9aqtgBfC7I4XczVjvJRkr8mHJ8Q6NPibiBFmB18RBtY/9la1M8sz/AAytJO9tbLCiplk+PMLCwtspUs3dObG0ua25NyNbdb81hLo3C9q6kBrgXuItb+l1gqxuZ+pvcaknYq9leahrXBtgb8uStJWvdK2NoDs9g0D94nZWxx7Y5p9NowTvGCgpWtJlJZlA9iupC+UX3tqtb4TwKppXNr8TY1lTkyRwg37pvmeZWye69zg4ZxUny7l4PP5FcuSIr1ASKELtcBFIplIoApFCRQBKSChAikUykgRSTKRQJJMqN/JEIDdSCgEwgkFJRTRKQTUQmgYUlBSCCQQFEFNBJNRTQO6aV0IGtd494Yo+IcIlc6K1dBE800jdDmtcNPUEjZbEmDY6KLRFo1KazNZ3Dyi42e11rJFmdrc1jyFxz/JbB2j4Q7BuMq+lDbQySfeIOmR9zb0BuPZYDxaAX6nReNkr42mHuYreVYkqcvhqR3guds3IrZ8Le+cNaCI+Rc4C3XZarE9rnBruR0NvNbJhLoiCQCQBewNgsLw6scs9HeMkXty02Kx+OOz0pALHeHMbgHlssnDE6Vg0Jv7LH8QHusOfHHE7M5p05nTRY4/ya5vdWlycSU9A8xyzNDhtryWFxLjOase5lJ3jwP3GbLFYt2fVNfL9+qKupDXnxNa74df18ltXBnAkVFFK2CvfKHRtFpQ3w76jTfXn0XoeFI97cVPq2nVYXmE4NxriWEDEITFHGS3LG5xzWP6K6Azsh4me6MP4kDHODS4NptiRci+blsqWHz4xS0EdBTyQ542NaJpoS4uI5kAtBPpZdOwzjGtlAbNhEbToCW1Jve3Qs/NNU37Xth5cRusNG4c7J8brM7sax2RndSviayBoBcAbZrnr6KeL9j+JUmOz08fEtWyiNPniJALydSb6W6fNbpFxdi0QmLsHpy4zu7u1SQMl9L+A62/QWOxjFsexKriqo6v7t3TC0RQ+Jr76+K4Nzppsq/49LUwcu8/qP9uG4rgvGeB1ta5lUyoipXWDsxa5wsD89QtexHteqoO8w+oo6iapp/iEZzW059F3iswWExy1FZd81Sc8uYXLyB+9yJsAPbyWtS8P0FdWtp3RMZBG4Oe1rAA4352VP8ce7Q2thyxGotDkvC3FtbiWJPmroHQvmcAwPBabC9vddO4fBkl70NOXcW19lT4u4WhzzVcMQbazm2FgDpZZLg+Bwp2vkAuDfLzKxzWrMbhXBjtW2rMiKJgYHPAc07A6n+itZo2Ns6R7bX0Nr3+uiy2JtayK4sB6kkeiwVSXudZ5uRrYrkj26bel2DGymeWh1yOf8k+FaY1/F+HwvafDMJHi2wZ4rfQD3Vj3tonB1wALk8ity7IqEy1VfjD2kZLU8d+ps53/AE/Mrt4ePyyQ4Obl8ccujFIoQvoHzpFCRQUAUroUUDSKEkAUkykgEihBQIpFNIoEoqRUUQpJhRBTCCQUlBMFBIKQUeaYRKSEkwiDF1IKIUgiTQkhBIJqPNO6BppIQc47d8DdWYFDjdPHmloHZZrbmFx3/wCF1j6ElcVY8tOYAE3Ntdl6uqIoainkp6iNssMrCyRjhcOaRYg+y8ycbYHUcMcTVGGyhzob56eR3+JEb5T6jY+YK4eVj/lDv4mX+MsW4h4v4DfXRZHBpzBO0kAi3usTcZ/hA9FeUssedlyQeS86z06zp0fC6iN8AcAB180VkMddJmu7LfVrTofVaxh2JCJmj7kcz+az1DWMaGO7xuUnTXQ35Ln8ZiduvyiY0s8ZpRC3u8gAtrbmsFSOnoZ80L2i2uUrb8TY2eA5rWItZaZjEM0bHBjS5o181vS24Z2+ydw3vhviDDp4X09XlZN8ieq2WjqcMGZrJGtGhaAbD3AXnypxCvpJc7InG3VRbxpicLdaJ5bexIcQtJrNmuPmUr29IVlXh7YWte5rg7KXjkTYWJV5S8QYfTQDuYonSXvttovNtNx1is+kWHgjb9o8n6LIUON8SVE4Fo4mk6hkdifmpnyj2ieTitGvcusYpWy108jzJ3bXO58/RTw6CNkbYohnJN3X/XktXwenr6hrH1MpD77ALcsKh7pvjABI38lx3tO20X8/elHGYY3UxjdtYeS1+haKORzG+Lm03tb+izWO97MO5ifYjVxAOiwds7bRjbQm+hKzmPSnl9ypJXEykOBBcNegKsKjLmdK5t3E73+qqTzMv3Yylw+K52VlVVGRxcctj4W3H60SsfpS0liEzyO7iBe52jWjck7Bdu4Twz+x+HqPD3G8jGZpT1e7V31NvZcw7KMEfi+PHFqnxUtA8EEjSSbdo9G/F/yrsV17nBw+NfKXg87N528Y+AldBKRXe4DSKEigCkUJFAIQgoApFCSAKCkhAFRKaSAKimdlFEKITBUQmgkEwohMIJhNRundBIJhRTCJTCLqKYKISTuoougmgJAouiUgmohMFAytT7T+EmcWYAYoMjMSprvpJXDnzYf8rrexAPKy2xMbKJiJjUprM1ncPH7u9pZ3wTsMMsTiySNw1Y4aEEdQUzOMh8td91t3bnTsi4/r54mjxsjc8DmcgF/otCjnabNtr6LyMmPVpevjy7iNsxT1uVzC22+oIWwYZVmcNjMjgY7OYNupWliZtrC+bor+iqC14LiXAcr/AEWfi2i8xLpNBWtmb3b9dQLLJS4XHOy7RqRcaLTsJrGmVjhYi/Pcf0W44RiEcptntp4Xfu/NYXrMdOvHeLdrR3CVLUuzPbfqegVzBwTg+hfT57/xD8lm4qiKIszMec/PRXENSy4d3jSHC2W4/JU87w18KT8MRRcG4PFLkFK0E7ENWai4aw8EZYGgnQ2H5q5++NDbSWadPiPmR/L5qrHWOY27gCy1y3bS+/y/WytEzPcqzWsdQosw6npmDu72Gl/NOeCzHNB1CvjLG0BznN7sE5gd7Wv/ACVpiM8ZLhGQAPE7TVUmk7T9SGvVLpWFxy3jzWJ535fXmtdxKZrnB7Tbk0ncf1V3j2JuYXXlNxdoF9bHy9h9VrVXXeO7XnN1Gqv47YTfSu6ZjHEO0JPhF7K1tVYnikGG0NpameXu2DkSep6Dc+QWNxev0s46kjTp0WydkkP/ANbKCpksLyHILbDKVtixxuJlz5sk6mIdv4bwinwLBKbC6bVsLfG+1jI86ucfUrI3QSo3XuxGo1DwZnc7kyUkIUgSJQUigCUkeyEAkgoQNJBKR6oAo0SSQMlRukUigZKimVEoKIKd1FNEJJqIKaJSumFEJoJAp3UbpoJKQUAmNkE0XUbougldSB1UQUAoJ3TUb6p3QSCagCuXcZ9oDsQ7RcM7NuGpQaqomvilUw3+7wtGZzB/mIFr8r9VMRtEzpqHbUWycd1FrEdzHbz0XMK6F0EriALHVdM7Vix3HdVGxoayGNkTR5Bv9VpWJQB1m203XlZLf5JevSn+OJYON5c4HY81XZOW+PmN7KhJG6KQtIG+yYBPw6g76KPGJV3LN4ZiTmHu35XN/wAx3K2nDMZEOUxWfbQtvYj+a56wvj8Ys7qrmKsc2zmkusNATuVFse+l6Zddut0HEMEzO5ID7g6HXX9frRZiCqp3QNlaLkauyXBC45RYs+J/jJb1ss1hvEcrQWsI6EHc+65rYpdePPHy6bJiLTHuCx3XormPEo2xXj3BG5/L26jn0XOG4yXxEvlNz10sFSkxuGxIkvpfoqRSW1s1XQH8Ryd4Yj5AuNtfMfl/3WNxTG2xsLIpO5YQ7M4m9tPTZaHU8Rss4PeCDcAtNysbVYpVVzslyGE21uSQtIxTPbmnNEdMziGIGqfnzGw2N1iKmu7oAD125q2mnDGZMwz8jfZUYKd08gJBNzchaxSIYTeZX9BC+una99y0WXTOzyLuuKMMaBa0jh/6StV4foRGwOcLELf+zONj+P8ACWSNs0ukbb1jcqVtvLWP9tZprFaZ/TqxKS1+m4jp4eOcS4KxFwhxWka2eAHQVNO74Xt8wQWkdW35rPXXuTGngxJpEouldEmkhIoGSkkUIHySOyLpXQBKEJIAoQkUCOySaRQCSRKVyiFAIuogpgqRMFNQCkoSkEwop3RCSYUQndBIJ3UEwUE7oUb9UXRKSldQui6Cdwi6p3WpdqHH2D8B4L97rz31XNdtLSsPjld+TRzKmImZ1CJnS17beOouB+DZqqF7TilUDDQxn+M/vHyaNVxP7H9NJiXaZjeNVUj5pqeis57zcufNJdzj5+A/MrmXH/FuLcYY9JiuLzF0m0cbT4IW30a0fnzXc/sVUBbhPEGIubbvauOEHqGsB/Fy3mnhRlWfKyHac3Lx7iTTfV7T/wCkLXZW5gGubcjW9tlt3bhTSYf2jQTOae5xCnLWnlnYb29wT8lrrYxIDl0110Xz2b1eX0OD7scMFV0bgAXNOt1i3RPY45brbJIy9rmm2mhusbVUhHiYCWnkNSlbl8bBiW+jm+6Ryk3buRpYq9mo/CTb5KylhLTYN16rSLMZqozucDcWv1sqAqJ2OBHTbZTk7wPy2N/NUHvLTqzy0SZIquPv9SBlIuOgOiXf1Ul88hbysFbCQl1gw36q4gZK+9owOSjadbXNM5sRDjmLrc9VcNqXloyX+SVJh80upBLeellmaDCyzfa9rFRNkxSVpQ0cszxe5JO3VbXhOGuAAAvfS91Uw/DmxjMQRpzWx4bRjus7rsbsCG7n0XNkyurFhQpaXILagZbE9FlOFpzR8UYXUsFslTGy3QOdl/NRnae7ytAa0a23VDChJLxhgdAywdPVB7tNms1/HL81jitM3hvmrEY5VPto09VhXEXCfGOFyup62EyQMlaNcw8bb9RYPFuhK3jsu4vpeNeEKbF4QGVA/ZVcN9YpR8Q9DuPIhW/2xcPbP2XQ1ZbmfRVkLwbbZiWH6OXmTsw46r+A+InVEDDUUNSQ2qpibZxycOjgvrq088UT8w+Rm3jeXsu6LrE8L49hnEmDw4rhNS2eCUa2PiY7m1w5EdFk7rnn01iU7pEpXQiTKEroQNJCOSASQkiDUSmkiQkU7qJKAKSOSSIWoUlAFSCkSBTBUU7qBK6YKgE0EwU7qF9U7olO6LqCaITui6gqVXU09HA6ernip4mi5fI8NA9yguLo1XK+Mu3Lg/Aw+HD3yYxUt2FPpHfzedPldcW4v7ceM8djdFSzxYRTv0yUl89vN51+QC0ritKs3iHd+1PtcwDguKWjgc3EsZynLSxu8MZ6yO/d9N15Q4p4gxTifG58YxqpNRUydfhY3k1o5ALETyvkkdJLI98j3FznON3OJ3JPMqBd4LXXVTHFGNrTKEhvd3Ur119kan7rsshmI1nq6h/raQt/6V5GkF2gL2h9m6EU/ZJgFgBngdJ65nud+apl6Wp2yHb9wtPj3Bb8Qw9hdiOGOFVAANXFu7fdtx7rimC10OI4dDWU8gs9oJXrena2anLHAEOFiCvLHaNw5LwL2hTxQsy4RibnT0wt4Y3X8bPmbjyPkvE5mL+UPZ4OX+Eo5DIwkgZrbjYqhLBlBGXceqvqdjZ2hwOUO1Uu4IlbnaXN5LzfJ6ngwxpWOaXagFWNXS5nEFpIbsR0WzOoruJDbDkOqouprGxGQ9CFeMjO2Jqk1ECPCNfMKykw8kkEXO62+akBb4oybe9laPomuBIdl9RdWjJtnOJrtPhhYRaO43PiWXpcM/eIa0X08v5q8hpJnOAYI7Dq5ZikpZHDKJGg9RsPdRORauJQpcLa1oubki9gND0WUoKIyOIiYXPB/d2HuryjoIMv7Qvf/lzW+g2WYhaxrQ1sbQAdABYfzK575XRTCoUtCIWsLxmtrYHS/wCavWNzEX08uQCrUsLjq/YbaK47hmTQNOXn1XPNtumK66W2haXagDkjsVpXY92qV+Ita11JhbGUsbgf33eN4+Qj+aw3HONRYNgs0pflOS45WXXPs28LPwHgSlqKyJrcQrWurashtjnlOYNPUtZ3bL/5V3cDF538pcH9Ry+GPx/a6+0RRPxPsu4ipIGd5MMPkkib1ewZh9WrwZPZ7Q9u5F/NfRXi2L7zS1NO4AiSB7CPUEL52xRuhp2Rv+KMZSD1Gi+s434zD5XN+TZOzTjvFOCMaFXRXlpJbfe6VzvDKOo6OHIr1bwRxngPGOH/AHvBqtr3NA72B+kkR6EfmvEUhIJAFr+avMBxbEcFxKHEsLq5aWqiN2vjNvY9R5FXyYov/wCq0vNXvJNeeeF/tD1MWWLiXBmTs0BqKN2Vw8yw/kV1fhPtH4O4mLWYdjMLZ3f4E/7OT5O39lx2x2r3DeLxLb7oujcBwsQdikqLpXRdRRdAyldInRIlBK6RKRKV0DJUUElCAJ0S9kikiFsCmCogphSJoCimCURtIJgqITChKV9UxukAVqXG/aNwtwjG9tfXNnqwLilpznkPr091MRM9G9dtwAWB4q4w4b4Yg73GcVgpzyjzZpHejRqV51437duJsYdJTYOG4LSOuAYyHTOHm46D2HuuS4hVzVVS+onmlmmkN3yPcXOcfMnVb1wTPbKcn6d941+0M8h9NwpheS4IFVV6n1DB+ZXFOKOLuIeJKl02N4rU1etwxz/A30aNAsHqbafVJwIGYgDmt4xxXpSbb7GsjrEk8z6KVhYkqcDLR3PxHUqRab6Wv5q8QrMqVxs0JAbC/sploseV02AdNSmkbRkALRray9q9gBB7IOGiDf8A2Bl/a68YPbdl+XOy9dfZhrRVdkOGx38VM6aAjpaR1vpZY5oaY5dlwqS4AWA7YOC4+MOD56RjWiti/bUkh/dlA016HVp8iVlMKfZwBK2elaJosrhcEWK4r1i0TEuml5rMTDxlwvVzMzUlVG6OaFxY9j9HMcDYg+YNwtrhjbKwAOt+azHb/wAIuwHitvElJERSYi4CfLs2cDfyzAA+octdwaqDxGL/AFXz2ek47TD6bj5IyUiWQFINQNHjX0UTSxuGWUA+uhWUiF9235bclUdC0ggs0PILn8pb+LATYQ4AGN+l9QSreTDZ2OIPeddSbErY8hYz4PDzChcuPwAgbc7KfOUeEMFT4fJmDjJcg6C5/AFZCnoA05i299iTYfzWRjFmghjQRpoNVew+F2YsOYaAXVZvK0UhaQULDa4u29zlCy1PA1jB3cfrb8ERuAsCHAfh81dZtQ51x00/JZTLSFEQPcMxGXll6JVkrKaIule0AAq5dK3uyS2wbzK0Tj3GmU9M9oIuB1UVibTpE21G5Y2iwuXj/tKw3AxmfQxTCeuNtBCw3I9zYW6Er2BhMIp8OFhbNrboOQXJPs4cJHCuGnYvVxBuIYoRI8ub4mMI8LPZup83ldkqz3dNYW0C+k4mH6dIfNc3P9TJP+mt4u8Oklef3Y3H5BfO17jN3kp2c4u36m6+heKOtQ1UjzYCGQk+xXzwoRejYeWQfgvZ4vUvKy9wtJm72AFjqfJRabg+HN6FVZRYk6aqiAWnUc97roZKrWm3khoadHkXbqD+BU47Wsb281TqowWBwBDh+CaG48K9pPGnDTmsocZmlp26dxVftWW6am4+a7Hwb2+4RWhkHEuHyYdMdO+hPeRH15j5LzXERIwOJU7EOFrggLO2Ktl4vMdPdeCY3hGOUoqsIxGmrYT+9E8FXxuvCOEYvXYZVipoaueknbs+F5adPTddd4N7dsaoO7p+IKdmKQXsZm2ZMB+Dvoue3HmOmlcsfL0gUvmtb4R484X4pY0YXicffkXNPL4JR7Hf2WykEFYTEx21id9EkmUlAEimookFLVBQiFmmCohTDTbyUoAKkAStY4s484V4XjIxTFYROASKeJ2eR3sFwvj3tvxvGHSUmBNOE0Zu3MCHTPHmdm+3zWlcdrK2tEPQXEvF3DfDcebGMWp6Zx2jLrvPo0armuP9v+E05dHguET1bgdJKh4jafbUrzfUVUtRUSTTymWWQkuklcS53qSrbO5wFt1tXBHyznJLpXGXbNxdj0LqZlWzDaZ+hjo7tcR5v3+VlzaaaSV7i4uLibkk6nzUQCSOYUshLtuWq3rWI6ZzMypEE/rknkF+RVcMI16oDRbYeZVkLYt1JA3TjYJJgwjRurj+SqSuDGFx2sq9JF3cV3XzO1co0bRya+LdU3AWJ1V0Rc6A6669FbyausPkpFLIXahVGtFxvp9VIMaDrqBzTGVrQS63QdU0JSAmI6Wt5r0x9kacP4ExCnzX7qscbeoBXmkNLgC/5cl6L+yK8uwXHYeTaiN23UEfksc0el8fbvUH7OVpW14W/wAIK1aUWaHDcBZ3B5bsaFxzDphPj3hul4p4XrMIqrATx2a+2sbxq1w9Db6rypDR12D4lNh1fEYammkMcjSOYNtOo6HzXsuAhwsei5L9oHgr73R/+KMPY41NKzLVMaPjjGzvVvPy9AvN5uDzr5R3D0uByPC3hPUubYfKHMGU6fNZCPMXG4u1avg9QSANd766LZKWUlovex914VvT6GPcKzoA8EhxB2ta4VtJCb7X05rIRDM3Kw3J8tVI04IvfNbcDcKuxjIGPvYhoI9lkIWZbEMIvvqiNjbl1spHkq8GU5iRYnlfkkynSpFDkGZwy+oVcg5L2ItzsoMJZuDbzVpiVW1sZIfewVexZ43iDYozZ1yB1Wp8FYFLxtx5BDM0Pw+hcKmsBOjgD4Wf8Thr5ByteL8Vaxjmh2gGut13bsF4R/sLhWGWsitW1h+9VRI1F/hZ7Cw9SV6PCwedty8/nZ/p01HbpWAUgp6aNmW2Vt3ep/pYKti7ssB0V3TsyRa7nUnzWLxp+zOpXuxD52Zab2iVDqHgHiGrBs6HDZ3A+fdleCKZp7jILeEWC909uLjD2S8WvGhGEzfVpC8JU7pAXZbO5gH8ivQ4vUubL2jM3U2JPUKg4ba6nyV1Lkfewv1vuFbvBbYAa+a6JhkcZ0tuqzbWG3mL8lRZZrtLq4BzAaaHTRTAs3DuJi0Xyu2VUA87XCdS0PYW7HcFU6dwc0i97fRRoScLHMNLcroa8XAIunZpI6EbhRFg4gkFBc08r4pRIwua5pu1zSQWnqCugcM9r3GWCRsiNe2vgG0dW3OQOgdoVzkEiwOvS6lchunRRNYntMTMdPRfDfb3h9Q5sePYPJSX3mpn940e2hXT+HOKOH+Iou8wfFaeqI3Y11nt9WnVeJ2k7XIFuRVzSVU9JUMqaaaSCVmrJI3Fr2+hCwtx6z0vGWY7e5yPVRK85cD9t+MYZkpOIYv7UpRYd82zZmj8HLtvCvGfDXE8IdhWKQvktd0Dzkkb6tK5r4rV7bVvEs+geqZaUAHos1nEOPO3HDMMnfQ8N07cSnabOqZCRCD5c3fguO8TdpXGGOucKzGqiKI/4VOe6aPlr9Vphda518lSc57iLuP8l31xVhyzeZV5ZnvcXEucXXub3J9VSzuNtPVJjXam9wdFNjTq291ppUNAcRcb9VJjBe6m1pGotcKYBDbblSINBIJ1UgP3gdVINsCb+iYF7O10UoR1JIO1725oDTrpa6mQSBsD5KJzXt0RLH1VR3VQzPE5zW72Nlf0tTFUsvE8k8xzCoVMQkbZ21tljJKaWF/eQuc0joqTM1TGpbC4G2hsBz6Ki1hOv16qwpMTzN7mYAP2zX0Kvw8lgDNLc1aJiekTGkZS1gy5bk7AclSYCfERr+IVUts2+p6lUzbNoTrtdSLmIa36r0L9kJ14eIo+j4XfPMvPVPqR1F1377IEtsX4jg6wwP8Ak54/NY5fxXxz7eiZx4PZX2CvtlCtJRdpVCpxCLBsJqsWqP7qnZmsDYuOwaPMmw91xW6dMdtrxXGqDBaIVVfNkGzGtF3OPQBazR9obMTxFlG7DAymkJYS6S77elre1/muRy47W4ziMmJV8mZ0psGjaNvJrfIf15rJYYwy1Ebo3H4gQQfqufy8pbeGu0uN+BZ8KxGoxPBaZ9VgrvHmh1NMTqWubuAORtaxWIofGwBpubaXXY8MdUspxUQ1B71oFwDZywnFHDdJiUcmI4bCynr2AulhibZswGpcBycNyBv6ry+Vwu74/wDj1uJz+qZP+tKia7KM2lt+arNYRJdozaWThY6wdmDlcxxtLC69ifNeS9haZbPPToLKQc5ouG677K6EILGEm1twqMlgS3WxHJEbUHvtGXPt5W1WAxyr7qFzcw20CzOIOAjcz4QOmqt+EeHKnijHmU7oH/cYnXqHt08P8IPU/hda4sc3tEQzy5Ix1m0sL2W8I1HGHF0U80d8MoJBLUucNHOGrWe5sT5DzXpumxHCKCtbhs9bBFUlocI3OsTfZa3jeL4bwjghoMFpYGTRtysZGAI4T1P8TlxfGa+aqkfLUSulkkOaSR5uXHqV9Bixxgrr5fO5ss577+HqfMCwODg4HYgrBYm7NWMHJcS7OO0jEMFxKPDMRmkqsNmeGgvdd0JPO/Mfgu1Oe2omZPG67HDMD1C6KTEuW0aaT2+t/wDsd4sI/wD2mX8F4RZ8TiNjyAXu/wC0AQ3sZ4t3/wDK5h8xZeD4yb3B+my9Djfi5cvaqW6hwI0Fh091SewuBJBBGtrqsLAEkHUa+iHgm3Xp1XSyUCwkX6a7KpG4FtgXDoFMGx1bp1A/FRlLIjnkdlba9ybKQZSSdOWvmrNzTFMRmFjsOYUJqioqLtpgYYjp3hGp8x0UqalEfiJc4k3JO5UC5H4KLgW7gCyna1uXnfZI2sQQTZSItN9T11Fk22toLhMXtpcH6IZrcnN7ckABZxaRp1UtR4iSUgeWpvvqnctGxPrsoDJ18N1UimkjkEsb3RvYbtc02IPl0VFurrnXzumQbDe/mmhvvDPaxxlghYwYka+Btv2NUM+nTNuumYX2/wCFPo2HEsBq46n94QSNcz2JsV52Zcu0sCk7Q7kX6LO2Glu4Wi9o+WKLBfQenmlls6xvY8tlXLTZo8vkogFzgNfTqrqItaLmxubbKo1h058zpsm0Abaac1JjRa9/kUCAGpsNdAVMNz2udktSDluVOxtsECytH5pAfui5UmizTuPNFrkDfblupCO99NknXABOgvqnITfe4G9lRDg9+UC5/BQAg356DmUu7L7NDdT5K5iis7xnU7BTJAJIUiyZh8DXmRzQ5/LyU6f4CLK5f8N1Qg0da/M+yjWkk+4F/KyokZTY6EclcyNPwkc+itXa766adFCF3SjW+mmmi7Z9k2fuuOcTpj/jUIO/Nrx/MritFrqbHousfZnlEPavTMc4Bs1LKzXmQAQPoVTL+K9O3q9/iLWN3K1XtB/+kKYYZCSYqc5pLbF/9PzK2PFZ5KDDZqiIXqC0iIEaDzK1nhGM1kT433e4klxOpJK863v066+vbndPE6kqTE9pyE7LZcDilp6hr2uLozq0rLcQ8OlspLWqXDVK5l6WYajVhWPhMT6b+cTHts+G1LxCC3Lve/P09EsGrnT4vVmJxtC9ronDYnn+Cp00T4iY3X12VejpAZDJC+xcbFpU1x6nakyw/GmGR0Vf96p48tPVjvY7fun95vsfxCwMTnGPpzC6BjtLNPw1PHPTlzqY98x+wDf3tfTW3kueOlLQcr+ZsAF4PNw/SyzrqX0PBzTlxRvuFZszDo9uo2VKaXwjLYa6gK0mqxDeQC+lrW1W0cD4RLVQuxs0oqGiTJBG4eB5Gji4WO19PMLPBhnLbxhtnzVw08pWeEcL1OJltXXl1Lh+98v7SUdGj81u2HvbRUwpMNp/ulKwWDGDxHzc7z/V1kqXCq6slEtWS2/K+gCyFZRU9HT+G5dbe+y97BxqYY9dvneRyr5599OX8Z3e3xWDdTYLmGM1Be8sbYNC7DxHQuqi45Tbkue4pw84z+Fu5Wl6TMqVtEQ1elpDIC5w5L0H2Z4mcS4YpzI680Tcj/UGx/C/uFySbCJqSmD8hLeZsrzs34jdg3FpopnH7nV+HXZr9h89vUBRTcSi33Q3P7SM7YexXiRxNu8gZF/zSsH5rw5CN7HkvZv2r5S3sUrBG8ft6ulYDf4h3rXH6NXjVg0F/qvT40fa4cv5Cw8QaOX1QdRoQSeSZvaxB31SNtrbnddMMyG56dVQrqczSNcTmDdmA6K4Atqfkh17C+nTyUilAwBuXpyKm0X0I908oO4OiRaWnw69edkCIA0GpS99VJp01Bv5hDzYnaykQAv6+SQ0Om55qT9r6eiLkg235FQDUWsNlLLoLi6Bq3X5Ia3S5GiAcBew05pgD1uN7p7jl6oA1HQ8k0IANdc32UgAf+ykALnLv5oaHW5e6IYs2tl1J9E2gB1h9VGndeJhOtwLqY1vcaE9VUDQNcxspi22l/JR0bzIFuiluP6XQNo0va6ZAG515i6CBYbXAQ217a/JSG7UACx6qNtRtb8U73FvySNxfewsgt65zmsuDYlY/DJXGvIdfW/NZKdocw73Kw1+4r2OB2cqWnUxK0NkYBayd/DrcKMXwgjS+p1UnNNrakbq6FN7vD5nZU2NANwBvYKpqXaDmla7swsAPxUCm8+E3ufVWx0fe9gdldS7K2uXEON/6qBd0OmttiupfZ/ppp+1HCjE4NMQfI83/dy5T/7guXUg00t811n7NVQ2HtcwyOwBnhqIh69051v/AEKt43WVq9w9XYjTiaN4GvRWHBVB91r5mvHxO0WfpGgucD1USwQVgc0LzpdcL3FsMZPDnDQSFgZ8JDCJYxZzdQt1pS2SMA8wqM9IBcAaclCYay2BtTBmAs8BW/dvY8FoI11CyssRpasECzXn6qpU0RlPeR6B3TkUTMrAuM1PJTyPcIpY3RvtrYOBH5rk/EEdZg+LS0dW22UBzS398HZzeoP8+a6w6CaB3iBssXxXgcPEGEmme4R1MYJpZj+47+E/5Tt5brk5nF+tXcdw6+Dy/oW1PUuN1eIguBOrSCN/10XZ/s+4xHiHCtXh5Ic6hqbg9WSDMP8A1By834zJU4bXVFPVZ4pIXlkrDu1wK7V9loPOEY9Wb95VRRg/6Wk/9QXDw6zXL6ehz7RbC7c+RjB0ssTW5qglx+Hkq7s0r8vIbqTmgANGwXsQ8JhJ6IFurbrCS4O2eta3ILXuVt9QBbKN1GjpmiTOQpSwmJcPwvwt0fdtJy9FxPEcCno8ZkEkZyZ7tcvSVUBkDbbrVOKsKpZIHPcxt7dE1sidOG/aPx6So7HcJoJszpTiTc7uWVrH/Ukg/wDZecGCzAd/Vdq+0LO9vDNNRiR3duxBoDL6fC8/kuLgXFtzbQcyu/jx9jly/kjpvoLDkom4JJsD0Ujve/vZRd8Nhcm2y6GY1A+ljyStYgl2m+ioRSObYOdmJ+Jx0uddB5DQXVwwtebs0PS1lETsL4t9QEXtvp7JkWUW2L9dB1UhVJy07hqSbAD81ThLnxg2sU8RJuxh/wBVioxA92N7dbp8ibtD/RNhsbDbZI8iCFMgh9769FITGlvI+gUrEg6EJusD/MIuC4t1v1KIGl773QNzcfJM3BsTuokgkm5sglo02I5dUw4gaZh6KJNhpf1tsl7k+hQYanPhc3m15H1VzpoLHU9Va/DVzR/5g7byVy22mo9L7qiA2+vht0Km3qLEjUlQZ/echb3Uh0y59PmiUhtzvyUm309EgDuCRbZM32I15qQX03sPRRJIaSdimXC2ug/olYEDXT0UCL7g7aLCYkzLNn2N7hZw2+ZWLxOMWzADVVvG4TXtlaN4kga4a3AKrOJ57+e6x+DyZqNgN9AR8lkHAgEGwPpqrRO4ETaxPTr1UGk3A0/NSO9zpbqlYXJ6b8rIIyAWIICtDpYDrdXb9ht6hWzx4gLqBdUfwbCxPsuh9hM4g7WuF5CQP9u7v/nY9n/Uuc02xsefPRbZwDUuo+NMAqmm3dYtSO35CZl/pdNetD3pHGWSE+aoVt84d0WSdGLlWFc34vmF5jtZbCpLwsPkspo8LA4M/QDos2wkWIUSLXEaMTwuFteStMJflk+7yixvz6rNNIcsbidIc4qIvibuOqg2u5qKKZpBGqwVfSGmkI3YVnKOpbLGx3Mix9VRxbI6Mh1kg08w/aSwf7nxFS4zFEe6xCPu5LD/ABmAD5ltv+UrsXYpw7VcL8B0WHVUZbX1L3VVS3bu3PAs0+YaGg+d1k8TwHD8Ylo3YjSsqWUdUyqhDx8MrPhPtdbhh8GneyDU7LKuGK3m/wC29s82xxT9Jd13EIBOrtSVbF93HVXOJvy5Re2isI3gnUrWGKqWZnXPIK4gbbVQGtrbKrHo1EKNSbyAdFrvFMlqZ48ln3m8hN1q3FjrxkBTEeyenmH7Rgth2Dxk6yVskluoawj/AKlx8EZdTp16ea6z9pp5binDdKD4RT1Mjh5udGB/7SuTm4abi5HmvSwxqkOW/wCSLxYaka+aThYgFpt0TNwdDz33Sv5bfRaQoi4Nc3xXPl/NUDC9mrDYfr9clcv0AGijchosbc1OhTD3FoLxqdx06eqrQ7/j0VKW177dAq8Fi4HUWFwUgWVbd1XY28Lba/NVWNsDv6AqjZskznFzcrr6gK4bYDnf0SBANcLi2l1WANuh8tVBtvPrspxgEDVwPRSgyARYanmkbnXT06KQNrgkm+o0Sd4dzYdSAgQFhZ1wEiRyzeaV+hIHoh7i46k6+SB3s02dcJNcANrqAJA2NioOcb6OFkGNqgGYh5OYPof6qoHWttYcrKliuj4JPMt+n9EMkOn4LP5Fw0m99CbfJVgDzHrzVvEdweXUKswWBsB56qRIHS1rfiUX0AsR6oAHz5ovrbMbHW3VEkSOR2GtknHW23uhzjl1DrDyVMa3Ivf1RCoNDYXFlbVzM0JHTkVctsBe4uoVAuy1/dEsfgji10keuhGizR0BF/lstfoiY8Ry7ZgtgGrevh2vt5KtOkyg4a/yCLnYAe+wUn6aAmwG21lH2GX6BWQi6+mp2VrL4XB3JXT+ettOatZ72Nxq3YH6qBOkPjv6cll6WqNCBVsBc6mImbpfVhzD6hYemOp3v+rrKQtEkTonHQjLbyKQPo9TPE1OyVrrh7Q4ehCtMRZpflZY/syxEYx2f8PYrYj75hlNOR0Lomk/UrMYgy8V+i82Y1OnZHSzwd9pbXWxxm7QtVoXZKoLZqc+EX6KspVWvyu3VU2ItuCraS5F04pRaxUJW72GGV2TY6hW9dI6eNrIz4ibBXFZK1upI0VKijbI9017DYfmpQqYdS3eAfhHVZgAACys2P7khgbo7nfn5qu17suvVU3tOtKNezPKB/k/msWGOZJa6ydU69S3/QPxKoSsGa6tAGGwsq40ZdW7fiCrPNoiiFvf4tVrHEYzBwWzu/uyVq/EBGVxVq9kvJn2l6h0naNSUhPgp8KiIB6vllv/AO1q5sbZbW2+YW79v9T947WMRaL/AOzwQQ+n7MP/AOsrSL6XJsLH2Xp0/GHJbtAixO22/JM2PP0/ojMRqNCbfr2SIAHOw9rfrZWhUn6sIGh6qIHh6eSk46Bp56eqROtz7qREnL4fO6qZskT33AICpHV7baWKKw2pi031NteSCjASbEA+d+quB1cTv1uqNMLgG1zyKrcg69vNIQG31Av10UyBrtdQu5oudLBS+F4IG6sDdu+vVI+I2sL9eqOdnXuenNUwTyJI89kEjc9AR9VG9hzIHVPrr+SiCL5TpbzUBOJy6WHqrGsqCyazrXtyKu3Gwv1Gui1zHpy2vsCQMo06LPJbxja1a+U6ZTFheha8aEOBPzVnDJdwF7q8rwZKCQf5dFi6WTMW8wVEz7RHTLxEE66q4brzFgNNFawuvbXU9VdNtbwj81KDHW/0SNrae10zYXPi6qJueRI9FIg++UWda/uotBAF9EnkF2vRJp3dfXyUCs24NvZN40/BRbtpmA9FMm21wb7oMLWXirY36/Fqs8zUDS6w+Lx3bmCyOHSCSlY/qBfRRHa3wuSOZv7lRuLcr+eykbWJsBteyRJzHpurIUpNNfkSreVtnaW2Cu5LAdPT9eitpRyI1KgRisHA6H2/XzWVpNxbkNisUz49TfVZKmJ00I9QkJe5/s61Yq+xvhs3H7GlNP8A/wCT3R/9K32rF4z6Lkf2SqlsvZLBTh1zTV1RGf8Aif3n/WuwSi8ei8/L6vLqpP2w13VlQD5rZqF+eJp8lrlc3LPfzWawd+aFo8lSVoZGQWaqBIa46q53FlZ1JyvKqMHxDUmJpsVnKCF7MIY0AlzWBzhbUncrV8XvUYtS017iSUA/NbxT3EdrWCWjcaIlbYbM2okae9Dw11yByWRDNPdQYGt1AAub7Krm0Wda6TM7WlUwd+D0aFQf8JVzO4d/b/KCrWqOVhIWkIUo9X7qrOfDZUaXU3VWc3cAgpyf3RWq8Qn9mVtNQbRH0WqcRG0ZJ01Vq9ot08Vdq8v3jtS4glvmJrMgH+hjWf8AStcsCDY68tfxV5xPUGr4sxipcbmbEKhwN9wZXW+llZbk+mrTpdepXpxou1eRvz6/VB08Wa4/W6PNxzEdP1z/ACTdqb7G++9/1+SmBC3RPcZfkEb9T9f1/VRuCLaa8kABd40vYKlXk+BhsTe+o5K4YLk5h81bVdn1lrGw0sfwSROIWFrHpZTNrnXyUWjQNt5AclIXJGQm5+qlBkC2tlB2jdNuh5qQOl9tPmk9wJNgTflZSIvewtvc7a2UXkbkiyhd19rC/wAkxra1x6C6CYcb8vmk8ga5wb9AsjiGEVdFgWG4xK3/AGfEDIItLZchAH/MLkeQKxbiQPJRsUZiNCSeexWt1472rkJ1sbD5LNVUvhcL2B3BCxVM0Pa955vJWWSPLULVnXtl3/7tJ6LCUWzPQIQq2/KCPxllaT+6d7/mr4fD7/yQhaKqr9j7fiFT5e5QhBQH73qhm3v+SEIKrvi9ymNh7IQgtcT/ALg+6eC/7oz1P4oQq/yWjpko/jZ/p/moH4h/qQhXhA/xR+uat5Phb/pahCgQi+JnqPwWRoP3PX8kIRL1t9jj/wC4eK//ANw//wCRCu6Sf3Y9EIXBm/OXTj/FgcU/vD7LI4F/dBCFnPS8dsy1Wdd8ZQhVGs//AJuof9Z/AreWfAhCWQqD4UHYoQqwmFrUf7yP9H5lW9b/AHXshCshSo+fsqkv94hCJhSqv7papxN/u7f9QQhXr2rbp4Lqv/NJ/wD+V/8A7km/Cf1zQhenXpyqUX94fQ/ipu+E+6EKYRKnN8Lfb80z8Tfb8EIUoSZy/wCH8Faj/wAwd+uiEKBWZyTd/dO9EIUhv/d9QqLtx6/zQhIQt2fGp9fRCFEph1rj/wD/AAcwD/RS/wDySuRP2Pr+aEKmPpezH1vx+35Kzw7/AHYf6ihCT+SI6f/Z`}
              alt="Ansh Tambat"
              style={{
                position: "absolute", inset: 6, borderRadius: "50%",
                width: "calc(100% - 12px)", height: "calc(100% - 12px)",
                objectFit: "cover", objectPosition: "center top",
                zIndex: 1,
                filter: "contrast(1.05) brightness(1.02)",
              }}
            />
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "bounce 2s ease infinite" }}>
        <div style={{ width: 1, height: 50, background: "linear-gradient(#00e5ff,transparent)" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8892a4", letterSpacing: 2 }}>SCROLL</span>
      </div>
    </section>
  );
}

function btnStyle(bg, color, outline = false) {
  return {
    display: "inline-block", padding: "12px 28px",
    background: bg, color: outline ? color : bg === "#00e5ff" ? "#0a0e1a" : color,
    border: `1px solid ${color}`,
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1.5,
    fontWeight: 700, textDecoration: "none", borderRadius: 6,
    transition: "all 0.25s",
    cursor: "pointer",
  };
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section id="skills">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>
        <SectionHeading label="Technical Skills" num="02" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
          {Object.entries(data.skills).map(([cat, items]) => (
            <div key={cat} style={{
              background: "rgba(255,255,255,0.025)", border: "1px solid #00e5ff18",
              borderRadius: 12, padding: 24, transition: "border-color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#00e5ff44"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#00e5ff18"}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 11, letterSpacing: 2, marginBottom: 16, margin: "0 0 16px" }}>{cat.toUpperCase()}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(s => <Chip key={s} label={s} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <Section id="experience">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>
        <SectionHeading label="Work Experience" num="03" />
        {data.experience.map((job) => (
          <div key={job.role} style={{
            border: "1px solid #00e5ff18", borderRadius: 12, padding: "32px 36px",
            background: "rgba(0,229,255,0.03)", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(#00e5ff,#00e5ff00)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf0", fontSize: 20, fontWeight: 800, margin: 0 }}>{job.role}</h3>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#00e5ff", background: "#00e5ff15", padding: "4px 12px", borderRadius: 20 }}>{job.period}</span>
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8892a4", fontSize: 13, marginBottom: 20 }}>
              {job.company} · {job.location}
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {job.points.map((pt, i) => (
                <li key={i} style={{ color: "#8892a4", lineHeight: 1.7, fontSize: 14 }}>
                  <span style={{ color: "#e8eaf0" }}>{pt.split(":")[0]}{pt.includes(":") ? ":" : ""}</span>
                  {pt.includes(":") ? pt.slice(pt.indexOf(":") + 1) : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const [active, setActive] = useState(null);
  return (
    <Section id="projects">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>
        <SectionHeading label="Projects" num="04" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
          {data.projects.map((proj, i) => (
            <div key={proj.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                background: active === i ? "rgba(0,229,255,0.05)" : "rgba(255,255,255,0.025)",
                border: `1px solid ${active === i ? "#00e5ff44" : "#00e5ff18"}`,
                borderRadius: 12, padding: 28,
                transition: "all 0.3s", cursor: "default",
                transform: active === i ? "translateY(-4px)" : "none",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 11, letterSpacing: 2 }}>PROJECT_{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 20 }}>{"📡 🏭 🎵".split(" ")[i]}</span>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf0", fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>{proj.name}</h3>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8892a4", fontSize: 12, marginBottom: 16 }}>{proj.subtitle}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {proj.stack.map(s => <Chip key={s} label={s} />)}
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                {proj.points.map((pt, j) => (
                  <li key={j} style={{ color: "#8892a4", fontSize: 13, lineHeight: 1.65 }}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <Section id="education">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>
        <SectionHeading label="Education" num="05" />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data.education.map((ed, i) => (
            <div key={ed.degree} style={{
              display: "grid", gridTemplateColumns: "auto 1fr auto",
              alignItems: "center", gap: "0 24px",
              padding: "24px 28px", borderRadius: 10,
              background: i === 0 ? "rgba(0,229,255,0.04)" : "transparent",
              border: `1px solid ${i === 0 ? "#00e5ff2a" : "#ffffff08"}`,
              marginBottom: 8,
              transition: "background 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,229,255,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background = i === 0 ? "rgba(0,229,255,0.04)" : "transparent"}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "#00e5ff15", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", color: "#00e5ff", fontSize: 12 }}>
                {["B.E", "HSC", "SSC"][i]}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#e8eaf0", fontSize: 16, fontWeight: 800, margin: "0 0 4px" }}>{ed.institution}</h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8892a4", fontSize: 12, margin: 0 }}>{ed.degree}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 13, fontWeight: 700 }}>{ed.score}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8892a4", fontSize: 11 }}>{ed.period}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Certs + Achievements */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: 48 }}>
          <div style={{ border: "1px solid #00e5ff18", borderRadius: 12, padding: 28 }}>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 11, letterSpacing: 2, margin: "0 0 20px" }}>CERTIFICATIONS</h3>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {data.certifications.map((c, i) => <li key={i} style={{ color: "#8892a4", fontSize: 13, lineHeight: 1.6 }}>{c}</li>)}
            </ul>
          </div>
          <div style={{ border: "1px solid #00e5ff18", borderRadius: 12, padding: 28 }}>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 11, letterSpacing: 2, margin: "0 0 20px" }}>ACHIEVEMENTS</h3>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
              {data.achievements.map((a, i) => <li key={i} style={{ color: "#8892a4", fontSize: 13, lineHeight: 1.6 }}>{a}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <Section id="contact">
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)", textAlign: "center" }}>
        <SectionHeading label="Get In Touch" num="06" />
        <p style={{ color: "#8892a4", fontSize: 16, lineHeight: 1.75, marginBottom: 40 }}>
          Open to backend and full-stack engineering roles. If you have an opportunity, a project, or just want to connect — reach out.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
          <a href={`mailto:${data.email}`} style={btnStyle("#00e5ff", "#0a0e1a")}>Say Hello →</a>
          <a href={data.linkedin} target="_blank" rel="noreferrer" style={btnStyle("transparent", "#00e5ff", true)}>LinkedIn ↗</a>
          <a href={data.github} target="_blank" rel="noreferrer" style={btnStyle("transparent", "#8892a4", true)}>GitHub ↗</a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {[["EMAIL", data.email], ["PHONE", data.phone]].map(([label, val]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00e5ff", fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8892a4", fontSize: 13 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #00e5ff18", padding: "28px clamp(20px,5vw,80px)", textAlign: "center" }}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#8892a44", fontSize: 12, color: "#445566" }}>
        Designed & Built by Ansh Tambat · {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh", color: "#e8eaf0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0e1a; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #00e5ff33; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes bounce { 0%,100% { transform:translateX(-50%) translateY(0) } 50% { transform:translateX(-50%) translateY(8px) } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        a:hover { opacity: 0.85; }
      `}</style>
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
