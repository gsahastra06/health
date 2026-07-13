import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DHCtzrNJ.js";
import { R as Route, L as Link } from "./router-EsH-5qUr.js";
import { A as AgoraVideoCall } from "./AgoraVideoCall-CQcBEiXx.js";
import { B as Button } from "./button-C6zbt4DZ.js";
import { V as Video } from "./video-Dt07ASBN.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./mic-BUXZSAuF.js";
function JoinCallPage() {
  const {
    channel
  } = Route.useSearch();
  const [started, setStarted] = reactExports.useState(false);
  const [ended, setEnded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-background px-4 py-6 md:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-display font-bold text-navy flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "size-6 text-mint" }),
        " Video consultation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Join the live consultation from this device." })
    ] }),
    !channel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-navy text-xl", children: "Call link is missing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ask the ASHA worker to share the video call link again." })
    ] }),
    channel && !started && !ended && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 mx-auto rounded-full bg-[var(--gradient-mint)] grid place-items-center text-navy mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "size-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-navy text-xl", children: "Ready to join?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Allow camera and microphone permissions when prompted." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "navy", size: "lg", className: "mt-6 gap-2", onClick: () => setStarted(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "size-4" }),
        " Join video call"
      ] })
    ] }),
    channel && started && !ended && /* @__PURE__ */ jsxRuntimeExports.jsx(AgoraVideoCall, { channel, doctorName: "ASHA consultation", doctorSpecialty: "Live video call", onEnd: () => {
      setStarted(false);
      setEnded(true);
    } }),
    ended && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-navy text-xl", children: "Call ended" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "You can close this page now." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-6", children: "Go home" }) })
    ] })
  ] }) });
}
export {
  JoinCallPage as component
};
