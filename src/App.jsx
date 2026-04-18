import React, { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Features", "Marketplace", "Pricing", "For Suppliers"];

const PROBLEMS = [
  {
    icon: "📱",
    problem: "Managing projects on WhatsApp groups and paper notebooks",
    loss: "Lose ₦2M+ to miscommunication",
  },
  {
    icon: "🔓",
    problem: "No way to track if site manager is stealing materials",
    loss: "Lose 15-30% to theft & waste",
  },
  {
    icon: "📊",
    problem: "Budget overruns nobody sees coming until it's too late",
    loss: "Average 40% over budget",
  },
  {
    icon: "🏚️",
    problem: "Paying fake or unreliable suppliers with no protection",
    loss: "Lose millions to scam suppliers",
  },
  {
    icon: "👷",
    problem: "No visibility when you're not physically on site",
    loss: "Workers idle, time wasted daily",
  },
  {
    icon: "📋",
    problem: "Invoices, expenses tracked on scattered spreadsheets",
    loss: "Hours wasted every week",
  },
];

const FEATURES = [
  {
    icon: "💼",
    title: "Real-Time Budget Control",
    desc: "See exactly where every naira goes. Set budget categories, approve expenses, get alerts before you overspend. Nothing leaves the account without your say.",
    tag: "Project Intelligence",
    color: "#FF6A00",
  },
  {
    icon: "📦",
    title: "Materials & Inventory",
    desc: "Track every bag of cement, every iron rod. Get low stock alerts powered by AI. Know when to reorder before your site runs out.",
    tag: "Smart Inventory",
    color: "#22C55E",
  },
  {
    icon: "👷",
    title: "GPS Site Attendance",
    desc: "Workers check in from site — GPS verifies they're actually there. No more ghost workers. No more attendance fraud.",
    tag: "People Management",
    color: "#3B82F6",
  },
  {
    icon: "🤖",
    title: "AI Cost Prediction",
    desc: "Claude AI analyses your spending and predicts your final project cost based on real Nigerian market rates. Know your overrun risk before it happens.",
    tag: "AI Powered",
    color: "#8B5CF6",
  },
  {
    icon: "📸",
    title: "Site Progress Tracking",
    desc: "Photo uploads, site diary, defect tracking with photo evidence. Show your client real progress. Build trust without being on site every day.",
    tag: "Progress Control",
    color: "#F59E0B",
  },
  {
    icon: "🔗",
    title: "Client Portal",
    desc: "Share a secure link with your client. They see real-time progress, budget status and photos. No app download needed. Works in any browser.",
    tag: "Client Relations",
    color: "#EF4444",
  },
];

const MARKETPLACE_STEPS = [
  {
    step: "01",
    title: "Browse Verified Suppliers",
    desc: "Find cement, iron rods, sand, roofing and more from verified suppliers near your site.",
  },
  {
    step: "02",
    title: "Compare Prices",
    desc: "See prices from multiple suppliers side by side. Filter by distance. Choose the best deal.",
  },
  {
    step: "03",
    title: "Pay Into Escrow",
    desc: "Your money goes to Projex escrow — not directly to the supplier. You're protected until delivery.",
  },
  {
    step: "04",
    title: "Supplier Delivers",
    desc: "Supplier gets the order, confirms, prepares and delivers to your site.",
  },
  {
    step: "05",
    title: "Confirm Receipt",
    desc: "You confirm delivery on the app. Materials automatically added to your inventory.",
  },
  {
    step: "06",
    title: "Payment Released",
    desc: "Projex releases payment to supplier minus 3% commission. Everybody wins.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    desc: "Perfect for solo contractors just getting started",
    color: "#22C55E",
    features: [
      "2 Projects",
      "5 Team Members",
      "Basic Budget Tracking",
      "Materials Inventory",
      "Marketplace Access",
      "GPS Attendance",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "₦15,000",
    period: "/month",
    desc: "For growing construction firms managing multiple sites",
    color: "#FF6A00",
    features: [
      "Unlimited Projects",
      "20 Team Members",
      "AI Cost Prediction",
      "Smart Reorder Alerts",
      "Weekly PDF Reports",
      "Client Portal",
      "Priority Support",
      "BOQ Import",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₦40,000",
    period: "/month",
    desc: "For large construction firms and property developers",
    color: "#3B82F6",
    features: [
      "Unlimited Everything",
      "Custom Branding",
      "Dedicated Account Manager",
      "API Access",
      "Custom Integrations",
      "SLA Guarantee",
      "Training & Onboarding",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Emeka Okafor",
    role: "Project Director, Okafor Construction Ltd",
    location: "Lagos",
    text: "Before Projex I was managing 6 sites on WhatsApp. I had no idea where money was going. Now I can see every expense from my phone in real time. We reduced material theft by 80% in the first month.",
    rating: 5,
  },
  {
    name: "Ngozi Adeyemi",
    role: "Quantity Surveyor, AdeBuilds",
    location: "Abuja",
    text: "The BOQ import feature alone saved me 3 days of work on our last project. The AI cost predictor flagged that we would exceed budget 6 weeks before it happened. We adjusted in time.",
    rating: 5,
  },
  {
    name: "Chukwudi Eze",
    role: "Site Manager, Delta Builders",
    location: "Port Harcourt",
    text: "I ordered 10 tonnes of granite through the marketplace. Paid through the app, supplier delivered the next day, payment released automatically. The easiest procurement I have done in 12 years.",
    rating: 5,
  },
];

const STATS = [
  { value: "₦15T", label: "Nigerian Construction Market" },
  { value: "40%", label: "Average Budget Overrun Without Projex" },
  { value: "3%", label: "Marketplace Commission Only" },
  { value: "0", label: "Dominant Competitors in Nigeria" },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 5vw",
        background: scrolled ? "rgba(8,14,28,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "Syne",
          }}
        >
          P
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "Syne",
            letterSpacing: "-0.5px",
          }}
        >
          Projex
        </span>
      </div>

      <div
        className="nav-links"
        style={{ display: "flex", gap: 36, alignItems: "center" }}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace(/ /g, "-")}`}
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              fontFamily: "DM Sans",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.target.style.color = "rgba(255,255,255,0.65)")
            }
          >
            {l}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <a
          href="#download"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "DM Sans",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(255,106,0,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 6px 28px rgba(255,106,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "none";
            e.target.style.boxShadow = "0 4px 20px rgba(255,106,0,0.35)";
          }}
        >
          Download App
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 5vw 80px",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #080E1C 0%, #0A1428 50%, #0D1F3C 100%)",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,106,0,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(40px)",
              transition: "all 0.8s ease",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(255,106,0,0.12)",
                border: "1px solid rgba(255,106,0,0.25)",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FF6A00",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "DM Sans",
                  color: "#FF8C3A",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                Built for Nigeria's Construction Industry
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 68px)",
                fontFamily: "Syne",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.05,
                letterSpacing: "-2px",
                marginBottom: 24,
              }}
            >
              Stop Running Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6A00, #FFB366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Construction Sites
              </span>{" "}
              on WhatsApp
            </h1>

            <p
              style={{
                fontSize: 18,
                fontFamily: "DM Sans",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 520,
              }}
            >
              Projex gives Nigerian contractors complete control over every
              project — budgets, materials, workers, suppliers and payments —
              all from one app. Stop losing money to theft, overruns and bad
              suppliers.
            </p>

            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 52,
              }}
            >
              <a
                href="#download"
                style={{
                  padding: "16px 32px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "DM Sans",
                  textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(255,106,0,0.4)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 12px 40px rgba(255,106,0,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "none";
                  e.target.style.boxShadow = "0 8px 32px rgba(255,106,0,0.4)";
                }}
              >
                Download Free App →
              </a>
              <a
                href="#marketplace"
                style={{
                  padding: "16px 32px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: "DM Sans",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.05)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.35)";
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.15)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
              >
                See the Marketplace
              </a>
            </div>

            {/* Social proof */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex" }}>
                {["E", "N", "C", "A", "B"].map((l, i) => (
                  <div
                    key={i}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `hsl(${i * 40 + 180}, 60%, 45%)`,
                      border: "2px solid #080E1C",
                      marginLeft: i > 0 ? -10 : 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "Syne",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ fontSize: 12, color: "#F59E0B" }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "DM Sans",
                    margin: 0,
                  }}
                >
                  Trusted by contractors across Nigeria
                </p>
              </div>
            </div>
          </div>

          {/* Right — App mockup */}
          <div
            className="hero-mockup"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(40px) scale(0.95)",
              transition: "all 1s ease 0.2s",
              position: "relative",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, #0F1E38, #0A1428)",
                borderRadius: 32,
                padding: 24,
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
                maxWidth: 380,
                margin: "0 auto",
              }}
            >
              {/* Phone header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "DM Sans",
                    }}
                  >
                    Good morning 👋
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontFamily: "Syne",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    Emeka Okafor
                  </p>
                </div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#FF6A00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "Syne",
                  }}
                >
                  EO
                </div>
              </div>

              {/* KPI Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                {[
                  {
                    label: "Total Budget",
                    value: "₦50M",
                    color: "#0A2342",
                    icon: "💼",
                  },
                  {
                    label: "Total Spent",
                    value: "₦28.4M",
                    color: "#FF6A00",
                    icon: "📊",
                  },
                  {
                    label: "Active Sites",
                    value: "4",
                    color: "#22C55E",
                    icon: "🏗️",
                  },
                  {
                    label: "Stock Alerts",
                    value: "3",
                    color: "#3D4F5C",
                    icon: "📦",
                  },
                ].map((k) => (
                  <div
                    key={k.label}
                    style={{
                      background: k.color,
                      borderRadius: 14,
                      padding: "12px 14px",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>
                      {k.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontFamily: "Syne",
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 2,
                      }}
                    >
                      {k.value}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.55)",
                        fontFamily: "DM Sans",
                      }}
                    >
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 14,
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: 11,
                    fontFamily: "DM Sans",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Recent Activity
                </p>
                {[
                  {
                    icon: "💰",
                    text: "Materials expense approved",
                    amount: "₦450,000",
                    time: "2m ago",
                    color: "#22C55E",
                  },
                  {
                    icon: "📦",
                    text: "Cement stock low — 12 bags",
                    amount: "Reorder",
                    time: "15m ago",
                    color: "#F59E0B",
                  },
                  {
                    icon: "👷",
                    text: "18 workers checked in",
                    amount: "Abuja GRA",
                    time: "1h ago",
                    color: "#3B82F6",
                  },
                ].map((a, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "7px 0",
                      borderTop:
                        i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {a.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          fontFamily: "DM Sans",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {a.text}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 10,
                          fontFamily: "DM Sans",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {a.time}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "DM Sans",
                        fontWeight: 600,
                        color: a.color,
                      }}
                    >
                      {a.amount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: 10,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {["🏠", "📊", "🏪", "👷", "⚙️"].map((icon, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background:
                          i === 0 ? "rgba(255,106,0,0.2)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                      }}
                    >
                      {icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                background: "linear-gradient(135deg, #22C55E, #16A34A)",
                borderRadius: 14,
                padding: "10px 16px",
                boxShadow: "0 8px 32px rgba(34,197,94,0.4)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: "#fff",
                  fontFamily: "DM Sans",
                  fontWeight: 600,
                }}
              >
                ✓ Payment Escrow
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "DM Sans",
                }}
              >
                Supplier paid safely
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: -30,
                background: "rgba(10,20,40,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "10px 16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                animation: "float 3s ease-in-out infinite 1.5s",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: "#FF6A00",
                  fontFamily: "DM Sans",
                  fontWeight: 600,
                }}
              >
                ⚠️ Budget Alert
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "DM Sans",
                }}
              >
                Materials at 82% spent
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
        @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
      `}</style>
    </section>
  );
}

function Stats() {
  const [ref, inView] = useInView(0.2);
  return (
    <section
      ref={ref}
      style={{
        padding: "60px 5vw",
        background: "rgba(255,106,0,0.06)",
        borderTop: "1px solid rgba(255,106,0,0.12)",
        borderBottom: "1px solid rgba(255,106,0,0.12)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
        }}
        className="stats-grid"
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(20px)",
              transition: `all 0.6s ease ${i * 0.1}s`,
            }}
          >
            <div
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontFamily: "Syne",
                fontWeight: 800,
                color: "#FF6A00",
                marginBottom: 6,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 13,
                fontFamily: "DM Sans",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.4,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problems() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      ref={ref}
      id="features"
      style={{ padding: "100px 5vw", background: "#080E1C" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontFamily: "DM Sans",
              color: "#FF6A00",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            The Problem
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontFamily: "Syne",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1.5px",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Nigerian Construction is
            <br />
            <span style={{ color: "#EF4444" }}>Broken by Design</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              fontFamily: "DM Sans",
              color: "rgba(255,255,255,0.45)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every contractor we spoke to described the same problems. The
            industry contributes 3.4% of Nigeria's GDP — yet it runs on WhatsApp
            and guesswork.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="problems-grid"
        >
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(145deg, #0D1628, #0A1220)",
                borderRadius: 20,
                padding: 28,
                border: "1px solid rgba(239,68,68,0.12)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  background:
                    "radial-gradient(circle at top right, rgba(239,68,68,0.06), transparent)",
                  borderRadius: "0 20px 0 0",
                }}
              />
              <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
              <p
                style={{
                  fontSize: 15,
                  fontFamily: "DM Sans",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: 10,
                  lineHeight: 1.5,
                }}
              >
                {p.problem}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "DM Sans",
                    fontWeight: 600,
                    color: "#EF4444",
                  }}
                >
                  ⚠ {p.loss}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id="features"
      ref={ref}
      style={{
        padding: "100px 5vw",
        background: "linear-gradient(180deg, #080E1C 0%, #0A1428 100%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontFamily: "DM Sans",
              color: "#FF6A00",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Platform Features
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontFamily: "Syne",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1.5px",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Everything You Need to
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #FF6A00, #FFB366)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Run Your Sites Properly
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="features-grid"
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(145deg, #0F1E38, #0A1428)",
                borderRadius: 24,
                padding: 32,
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${f.color}40`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle at top right, ${f.color}10, transparent)`,
                  borderRadius: "0 24px 0 0",
                }}
              />
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `${f.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 18,
                  border: `1px solid ${f.color}25`,
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: 6,
                  background: `${f.color}15`,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "DM Sans",
                    fontWeight: 600,
                    color: f.color,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {f.tag}
                </span>
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontFamily: "Syne",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  fontFamily: "DM Sans",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marketplace() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id="marketplace"
      ref={ref}
      style={{
        padding: "100px 5vw",
        background: "#080E1C",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,106,0,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="marketplace-grid"
        >
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(-40px)",
              transition: "all 0.8s ease",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontFamily: "DM Sans",
                color: "#FF6A00",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              The Marketplace
            </p>
            <h2
              style={{
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontFamily: "Syne",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-1.5px",
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Nigeria's First Construction
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6A00, #FFB366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Materials Marketplace
              </span>
            </h2>
            <p
              style={{
                fontSize: 17,
                fontFamily: "DM Sans",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                marginBottom: 36,
              }}
            >
              No other construction management app in Africa has a built-in
              materials marketplace with escrow-protected payments. Buy cement,
              iron rods, sand and more from verified suppliers near your site.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 36,
              }}
            >
              {[
                {
                  icon: "🔒",
                  text: "Escrow Protection — money held safely until delivery confirmed",
                },
                {
                  icon: "📍",
                  text: "Location-Based — see suppliers closest to your site first",
                },
                {
                  icon: "⭐",
                  text: "Verified Suppliers — every supplier vetted and rated",
                },
                {
                  icon: "📦",
                  text: "Auto-Inventory — delivered items added to your stock automatically",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,106,0,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                      border: "1px solid rgba(255,106,0,0.2)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "DM Sans",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.6,
                      margin: 0,
                      paddingTop: 8,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#download"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "DM Sans",
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(255,106,0,0.35)",
              }}
            >
              Browse Marketplace →
            </a>
          </div>

          {/* Steps */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(40px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {MARKETPLACE_STEPS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                    padding: "16px 20px",
                    borderRadius: 16,
                    background:
                      i === 4 ? "rgba(255,106,0,0.08)" : "transparent",
                    border:
                      i === 4
                        ? "1px solid rgba(255,106,0,0.15)"
                        : "1px solid transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,106,0,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,106,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== 4) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontFamily: "Syne",
                      fontWeight: 800,
                      color: "rgba(255,106,0,0.3)",
                      flexShrink: 0,
                      lineHeight: 1,
                      marginTop: 2,
                    }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 15,
                        fontFamily: "Syne",
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 4,
                      }}
                    >
                      {s.title}
                    </h4>
                    <p
                      style={{
                        fontSize: 13,
                        fontFamily: "DM Sans",
                        color: "rgba(255,255,255,0.4)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        padding: "100px 5vw",
        background: "linear-gradient(180deg, #080E1C 0%, #0A1428 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 72,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontFamily: "DM Sans",
              color: "#FF6A00",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontFamily: "Syne",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1.5px",
              marginBottom: 20,
              lineHeight: 1.1,
            }}
          >
            Start Free. Scale as You Grow.
          </h2>
          <p
            style={{
              fontSize: 17,
              fontFamily: "DM Sans",
              color: "rgba(255,255,255,0.45)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            No credit card required to start. Upgrade when you're ready.
            Suppliers always pay zero monthly fee.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="pricing-grid"
        >
          {PLANS.map((plan, i) => (
            <div
              key={i}
              style={{
                background: plan.popular
                  ? `linear-gradient(145deg, #1A2840, #0F1E38)`
                  : "linear-gradient(145deg, #0F1A30, #0A1220)",
                borderRadius: 24,
                padding: 36,
                border: plan.popular
                  ? `1px solid rgba(255,106,0,0.35)`
                  : "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView
                  ? plan.popular
                    ? "scale(1.03)"
                    : "none"
                  : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
                boxShadow: plan.popular
                  ? "0 20px 60px rgba(255,106,0,0.15)"
                  : "none",
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontSize: 11,
                    fontFamily: "DM Sans",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.5px",
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: 22,
                    fontFamily: "Syne",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  {plan.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      fontFamily: "Syne",
                      fontWeight: 800,
                      color: plan.color,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontFamily: "DM Sans",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontFamily: "DM Sans",
                    color: "rgba(255,255,255,0.4)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {plan.desc}
                </p>
              </div>

              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: 24,
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 32,
                }}
              >
                {plan.features.map((f, j) => (
                  <div
                    key={j}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: `${plan.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 10, color: plan.color }}>✓</span>
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontFamily: "DM Sans",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#download"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: 12,
                  background: plan.popular
                    ? "linear-gradient(135deg, #FF6A00, #FF8C3A)"
                    : "rgba(255,255,255,0.06)",
                  border: plan.popular
                    ? "none"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "DM Sans",
                  textDecoration: "none",
                  boxShadow: plan.popular
                    ? "0 6px 20px rgba(255,106,0,0.3)"
                    : "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = "0.9";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = "1";
                  e.target.style.transform = "none";
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Supplier note */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            padding: "20px",
            borderRadius: 16,
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.15)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontFamily: "DM Sans",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            🏪{" "}
            <strong style={{ color: "#22C55E" }}>
              Suppliers pay zero monthly fee.
            </strong>{" "}
            Projex only earns when you earn — 3% commission per order.
          </p>
        </div>
      </div>
    </section>
  );
}

function ForSuppliers() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      id="for-suppliers"
      ref={ref}
      style={{ padding: "100px 5vw", background: "#080E1C" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="suppliers-grid"
        >
          {/* Supplier dashboard mockup */}
          <div
            className="suppliers-mockup"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(-40px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, #0F1E38, #0A1428)",
                borderRadius: 24,
                padding: 24,
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "DM Sans",
                    }}
                  >
                    Supplier Dashboard
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontFamily: "Syne",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    Hillz Supply Co.
                  </p>
                </div>
                <div
                  style={{
                    padding: "4px 10px",
                    borderRadius: 8,
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "DM Sans",
                      fontWeight: 600,
                      color: "#22C55E",
                    }}
                  >
                    ✓ Verified
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                {[
                  { label: "Total Revenue", value: "₦2.4M", color: "#FF6A00" },
                  { label: "Total Orders", value: "47", color: "#22C55E" },
                  { label: "Products", value: "23", color: "#3B82F6" },
                  { label: "Rating", value: "4.8 ⭐", color: "#F59E0B" },
                ].map((k, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 12,
                      padding: "12px 14px",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontFamily: "Syne",
                        fontWeight: 700,
                        color: k.color,
                        marginBottom: 4,
                      }}
                    >
                      {k.value}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "DM Sans",
                      }}
                    >
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: 11,
                    fontFamily: "DM Sans",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  New Orders
                </p>
                {[
                  {
                    product: "50 bags Dangote Cement",
                    buyer: "Okafor Construction",
                    amount: "₦240,000",
                    status: "NEW",
                  },
                  {
                    product: "20 tonnes Sharp Sand",
                    buyer: "Lagos Builders Ltd",
                    amount: "₦700,000",
                    status: "CONFIRMING",
                  },
                ].map((o, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderTop:
                        i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 12,
                          fontFamily: "DM Sans",
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {o.product}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 10,
                          fontFamily: "DM Sans",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {o.buyer}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontFamily: "Syne",
                          fontWeight: 700,
                          color: "#FF6A00",
                        }}
                      >
                        {o.amount}
                      </p>
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: "DM Sans",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background:
                            o.status === "NEW"
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(255,106,0,0.15)",
                          color: o.status === "NEW" ? "#22C55E" : "#FF6A00",
                        }}
                      >
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(40px)",
              transition: "all 0.8s ease",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontFamily: "DM Sans",
                color: "#FF6A00",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              For Suppliers
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontFamily: "Syne",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-1.5px",
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Reach Thousands of
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF6A00, #FFB366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Construction Companies
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                fontFamily: "DM Sans",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              List your products for free. Receive orders instantly. Get paid
              directly to your bank account within 24 hours of delivery. No
              chasing invoices ever again.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 36,
              }}
            >
              {[
                {
                  icon: "🆓",
                  title: "Register Free",
                  desc: "No monthly fee. No setup cost. List unlimited products.",
                },
                {
                  icon: "📲",
                  title: "Instant Order Notifications",
                  desc: "Get orders via app and WhatsApp. Confirm or decline in one tap.",
                },
                {
                  icon: "💰",
                  title: "Guaranteed Payment",
                  desc: "Money in escrow before delivery. You always get paid.",
                },
                {
                  icon: "⭐",
                  title: "Build Your Reputation",
                  desc: "Verified ratings attract more companies. Top suppliers get featured placement.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    padding: "14px 16px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,106,0,0.2)";
                    e.currentTarget.style.background = "rgba(255,106,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.05)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontFamily: "DM Sans",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        fontFamily: "DM Sans",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#download"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "DM Sans",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
                e.target.style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.06)";
                e.target.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              Register as Supplier — Free →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [ref, inView] = useInView(0.1);
  return (
    <section
      ref={ref}
      style={{
        padding: "100px 5vw",
        background: "linear-gradient(180deg, #080E1C 0%, #0A1428 100%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontFamily: "DM Sans",
              color: "#FF6A00",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Testimonials
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontFamily: "Syne",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            What Contractors Are Saying
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="testimonials-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(145deg, #0F1E38, #0A1428)",
                borderRadius: 24,
                padding: 32,
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ fontSize: 14, color: "#F59E0B" }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontSize: 15,
                  fontFamily: "DM Sans",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7,
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "Syne",
                    flexShrink: 0,
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontFamily: "DM Sans",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      fontFamily: "DM Sans",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Download() {
  const [ref, inView] = useInView(0.2);
  return (
    <section
      id="download"
      ref={ref}
      style={{
        padding: "100px 5vw",
        background: "#080E1C",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(255,106,0,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "Syne",
            margin: "0 auto 28px",
            boxShadow: "0 12px 40px rgba(255,106,0,0.4)",
          }}
        >
          P
        </div>

        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontFamily: "Syne",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-2px",
            marginBottom: 20,
            lineHeight: 1.05,
          }}
        >
          Start Managing Your Sites
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #FF6A00, #FFB366)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Properly Today
          </span>
        </h2>

        <p
          style={{
            fontSize: 18,
            fontFamily: "DM Sans",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            marginBottom: 48,
            maxWidth: 520,
            margin: "0 auto 48px",
          }}
        >
          Join contractors across Nigeria who have stopped losing money to
          theft, overruns and bad suppliers. Free to start. No credit card
          required.
        </p>

        <div
          className="download-buttons"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 28px",
              borderRadius: 14,
              background: "#fff",
              color: "#080E1C",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(255,255,255,0.1)";
            }}
          >
            <span style={{ fontSize: 28 }}>🤖</span>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  fontFamily: "DM Sans",
                  color: "#666",
                  fontWeight: 500,
                }}
              >
                GET IT ON
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontFamily: "Syne",
                  fontWeight: 700,
                  color: "#080E1C",
                }}
              >
                Google Play
              </p>
            </div>
          </a>

          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 28px",
              borderRadius: 14,
              background: "#fff",
              color: "#080E1C",
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(255,255,255,0.1)";
            }}
          >
            <span style={{ fontSize: 28 }}>🍎</span>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  fontFamily: "DM Sans",
                  color: "#666",
                  fontWeight: 500,
                }}
              >
                DOWNLOAD ON THE
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontFamily: "Syne",
                  fontWeight: 700,
                  color: "#080E1C",
                }}
              >
                App Store
              </p>
            </div>
          </a>
        </div>

        <p
          style={{
            fontSize: 13,
            fontFamily: "DM Sans",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Free to download · Starter plan always free · No credit card needed
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "60px 5vw 40px",
        background: "#050A14",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 60,
          }}
          className="footer-grid"
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #FF6A00, #FF8C3A)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: "Syne",
                }}
              >
                P
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: "Syne",
                }}
              >
                Projex
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                fontFamily: "DM Sans",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: 24,
              }}
            >
              Smart construction management for Nigeria. Built to stop the
              theft, overruns and chaos that costs contractors millions.
            </p>
            <p
              style={{
                fontSize: 13,
                fontFamily: "DM Sans",
                color: "rgba(255,255,255,0.25)",
                margin: 0,
              }}
            >
              📧 hello@projex.ng
              <br />
              📱 WhatsApp: +234 xxx xxx xxxx
            </p>
          </div>

          {[
            {
              title: "Product",
              links: [
                "Features",
                "Marketplace",
                "Pricing",
                "For Suppliers",
                "AI Features",
                "Client Portal",
              ],
            },
            {
              title: "Company",
              links: [
                "About Us",
                "Blog",
                "Careers",
                "Press Kit",
                "Privacy Policy",
                "Terms of Service",
              ],
            },
            {
              title: "Support",
              links: [
                "Help Center",
                "WhatsApp Support",
                "Contact Us",
                "System Status",
                "Report a Bug",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: 13,
                  fontFamily: "DM Sans",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {col.title}
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 14,
                      fontFamily: "DM Sans",
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.35)")
                    }
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="footer-bottom"
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontFamily: "DM Sans",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © 2026 Projex Technologies Ltd. All rights reserved. RC: XXXXXXXX
          </p>
          <div className="footer-socials" style={{ display: "flex", gap: 20 }}>
            {["Instagram", "Twitter", "LinkedIn", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: 13,
                  fontFamily: "DM Sans",
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FF6A00")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.25)")
                }
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div
      style={{ background: "#080E1C", minHeight: "100vh", overflowX: "hidden" }}
    >
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080E1C; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080E1C; }
        ::-webkit-scrollbar-thumb { background: rgba(255,106,0,0.4); border-radius: 2px; }

        /* ── Mobile Responsive ── */
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta { font-size: 13px !important; padding: 8px 14px !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-mockup { display: none !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons a { text-align: center !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          .problems-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .marketplace-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-grid > div { transform: none !important; }
          .suppliers-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .suppliers-mockup { display: none !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-brand { grid-column: 1 / -1 !important; }
          .footer-bottom { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
          .footer-socials { justify-content: center !important; }
          .download-buttons { flex-direction: column !important; align-items: center !important; }
          .download-buttons a { width: 100% !important; max-width: 280px !important; justify-content: center !important; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Stats />
      <Problems />
      <Features />
      <Marketplace />
      <Pricing />
      <ForSuppliers />
      <Testimonials />
      <Download />
      <Footer />
    </div>
  );
}
