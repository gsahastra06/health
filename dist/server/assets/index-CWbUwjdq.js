import { U as jsxRuntimeExports } from "./worker-entry-DHCtzrNJ.js";
import { L as Link } from "./router-EsH-5qUr.js";
import { c as createLucideIcon, B as Button } from "./button-C6zbt4DZ.js";
import { A as Activity } from "./activity-qR_tQqTd.js";
import { A as ArrowRight } from "./arrow-right-BnLJkrqY.js";
import { D as Download } from "./download-DiDC7qJC.js";
import { U as Users } from "./users-D9EYxMbn.js";
import { S as Stethoscope } from "./stethoscope-CrXTj90q.js";
import { V as Video } from "./video-Dt07ASBN.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-display font-bold text-navy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-8 rounded-lg bg-[var(--gradient-hero)] grid place-items-center text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4" }) }),
        "ASHA Assistant"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "Sign in" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden min-h-[85vh] flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-[var(--navy)]", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 opacity-60 mix-blend-color-dodge", style: {
        background: "var(--gradient-hero)"
      }, "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -right-32 size-[600px] rounded-full opacity-40 blur-[100px] -z-10 animate-pulse-accent mix-blend-screen", style: {
        background: "var(--color-accent)"
      }, "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-10 -left-20 size-[400px] rounded-full opacity-30 blur-[80px] -z-10 animate-float mix-blend-screen", style: {
        background: "var(--mint)"
      }, "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-4 py-20 md:py-28 text-primary-foreground relative z-10 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-mint" }),
          "Built for India's ASHA workers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight", children: [
          "Triage faster.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-mint to-teal-300", children: "Refer smarter." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg md:text-xl text-white/80 max-w-2xl font-light", children: "A pocket triage assistant for frontline health workers. Capture symptoms, get evidence-based suggestions, and escalate to a doctor — all in one app." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "hero", size: "lg", className: "gap-2", children: [
            "Get started ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how", className: "inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "lg", className: "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white", children: "How it works" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/project-files.zip", download: true, className: "inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "lg", className: "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
            " Download files"
          ] }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "how", className: "mx-auto max-w-6xl px-4 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-display font-bold text-navy", children: "Designed for the field" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl mx-auto", children: "Three tools that work even on low bandwidth — wherever your patients are." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        icon: Users,
        title: "Patient register",
        body: "Maintain a private register of patients in your village. History travels with each patient across visits."
      }, {
        icon: Stethoscope,
        title: "Symptom triage",
        body: "Multi-select symptoms. Get the top likely conditions with confidence scores and urgency level."
      }, {
        icon: Video,
        title: "Teleconsult escalation",
        body: "When a case needs a doctor, escalate to a live video consultation in one tap."
      }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-3xl glass-panel border border-border shadow-[var(--shadow-elevated)] hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] transition-all duration-300 relative overflow-hidden group bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 rounded-2xl bg-[var(--gradient-mint)] grid place-items-center text-navy mb-6 shadow-md group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "size-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-navy relative z-10", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed relative z-10", children: f.body })
      ] }, f.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 p-10 md:p-14 rounded-[2.5rem] bg-[var(--navy)] text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-[var(--shadow-elevated)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[var(--gradient-hero)] mix-blend-overlay opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -bottom-20 size-80 rounded-full bg-mint/20 blur-[60px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-mint text-sm font-semibold uppercase tracking-wider bg-mint/10 px-4 py-1.5 rounded-full border border-mint/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4" }),
            "Private & secure"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 text-3xl md:text-4xl font-display font-bold leading-tight", children: "Patient data stays with you" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-white/70 font-light", children: "Each ASHA worker only sees their own patient register. Powered by row-level security." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "relative z-10 w-full md:w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "hero", size: "lg", className: "w-full md:w-auto h-14 px-8 text-lg rounded-2xl shadow-[var(--shadow-glow-accent)] hover:scale-105 transition-transform", children: "Create your account" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border py-8 text-center text-xs text-muted-foreground", children: "ASHA Assistant — a triage tool. Not a substitute for clinical judgement." })
  ] });
}
export {
  Landing as component
};
