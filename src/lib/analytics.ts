import { pageview } from "@vercel/analytics";

// Free-plan tracking through Vercel feature flags instead of custom events.
//
// Flag values live in a <script type="application/json" data-flag-values> tag that
// Web Analytics reads and attaches to every page view:
//   traffic_source  where the visit came from (linkedin, github, google, direct, ...)
//   traffic_medium  referral, or the utm_medium value when present
//   device          mobile, tablet or desktop
//   last_click      the most recent thing clicked ("none" until the first click)
//   click_count     how many tracked clicks this visit
//
// The tag is created before hydration by flagsInitScript (so the first page view is
// already flagged). Clicks update last_click and send one virtual page view at
// /click/<target>, which also lists each click under Pages in the dashboard.

// Runs in the browser before React hydrates. Keep it self-contained and ES5-friendly.
function initFlags() {
  var platforms: [RegExp, string][] = [
    [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, "linkedin"],
    [/(^|\.)github\.com$/, "github"],
    [/(^|\.)google\.[a-z.]+$/, "google"],
    [/(^|\.)(bing\.com|duckduckgo\.com|yahoo\.com|ecosia\.org|brave\.com)$/, "search"],
    [/(^|\.)(twitter\.com|x\.com|t\.co)$/, "x"],
    [/(^|\.)(facebook\.com|fb\.com)$/, "facebook"],
    [/(^|\.)instagram\.com$/, "instagram"],
    [/(^|\.)medium\.com$/, "medium"],
    [/(^|\.)reddit\.com$/, "reddit"],
    [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
    [/(^|\.)(mail\.google\.com|outlook\.(live|office)\.com|mail\.yahoo\.com)$/, "email"],
    [/(^|\.)(indeed\.com|glassdoor\.com|wellfound\.com|angel\.co)$/, "job-board"],
  ];

  var source = "direct";
  var medium = "none";
  var params = new URLSearchParams(window.location.search);
  var tagged =
    params.get("utm_source") || params.get("ref") || params.get("source") || params.get("via");

  try {
    var stored = window.sessionStorage.getItem("visit_source");
    var storedMedium = window.sessionStorage.getItem("visit_medium");
    if (stored && !tagged) {
      source = stored;
      medium = storedMedium || "none";
    } else if (tagged) {
      source = tagged.toLowerCase().slice(0, 40);
      medium = (params.get("utm_medium") || "tagged").toLowerCase().slice(0, 40);
    } else if (document.referrer) {
      var host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname) {
        medium = "referral";
        source = host.slice(0, 40);
        for (var i = 0; i < platforms.length; i++) {
          if (platforms[i][0].test(host)) {
            source = platforms[i][1];
            break;
          }
        }
      }
    }
    window.sessionStorage.setItem("visit_source", source);
    window.sessionStorage.setItem("visit_medium", medium);
  } catch (e) {}

  var width = window.innerWidth;
  var flags = {
    traffic_source: source,
    traffic_medium: medium,
    device: width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop",
    last_click: "none",
    click_count: 0,
  };

  var tag = document.createElement("script");
  tag.type = "application/json";
  tag.setAttribute("data-flag-values", "");
  tag.textContent = JSON.stringify(flags).replace(/</g, "\\u003c");
  document.documentElement.appendChild(tag);
}

export const flagsInitScript = `(${initFlags.toString()})();`;

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

function clickTarget(name: string, props: Record<string, string | number | boolean>): string {
  const part = (key: string) => (props[key] ? slug(String(props[key])) : "");
  switch (name) {
    case "social_click":
      return `social-${part("platform")}-${part("location")}`;
    case "resume_download":
      return `resume-${part("location")}`;
    case "nav_click":
      return `nav-${part("section")}-${part("location")}`;
    case "cta_click":
      return `cta-${part("cta")}-${part("location")}`;
    case "project_open":
      return `project-open-${part("project")}`;
    case "project_link_click":
      return `project-link-${part("project")}-${part("link")}`;
    case "credential_click":
      return `credential-${part("certification")}`;
    default:
      return slug(name);
  }
}

// Records a click as a flag change plus one virtual page view carrying the new flag values.
export function trackEvent(name: string, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const target = clickTarget(name, props).replace(/-+$/g, "");

  const tag = document.querySelector<HTMLScriptElement>("script[data-flag-values]");
  if (tag) {
    try {
      const flags = JSON.parse(tag.textContent || "{}");
      flags.last_click = target;
      flags.click_count = (Number(flags.click_count) || 0) + 1;
      tag.textContent = JSON.stringify(flags).replace(/</g, "\\u003c");
    } catch {}
  }

  // Give the page's mutation observer a tick to pick up the new flag values first.
  window.setTimeout(() => {
    pageview({ route: "/click/[target]", path: `/click/${target}` });
  }, 0);
}
