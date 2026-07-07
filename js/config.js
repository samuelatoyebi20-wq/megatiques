// =========================
// SHARED API CONFIG
// Load this file BEFORE any other script that uses API.
// Only this file should ever declare "API".
// =========================

const API =
window.location.hostname === "localhost"
? "http://localhost:3000/api"
: "/api";
