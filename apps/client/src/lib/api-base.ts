type RuntimeAppConfig = { apiBaseUrl?: string };

const PUBLISHED_SITE_HOSTNAMES = new Set([
  "paretoplus.skywork.website",
  "pareto.business",
  "www.pareto.business",
]);
const PUBLISHED_API_BASE_URL = "https://ja5db8e6a158-prod.skywork.me";

// Resolution order: build-time VITE_API_BASE_URL > runtime app-config.js
// (written by the publish pipeline after backend deploy) > known production
// backend for the public domain > same-origin.
// The static client and the FC backend live on different domains, so the
// runtime config is what wires production FE -> BE without a rebuild.
const runtimeConfig: RuntimeAppConfig =
  (window as Window & { __SKYBASE_APP_CONFIG__?: RuntimeAppConfig }).__SKYBASE_APP_CONFIG__ ?? {};

const publishedApiFallback =
  PUBLISHED_SITE_HOSTNAMES.has(window.location.hostname) ? PUBLISHED_API_BASE_URL : "";

const RAW_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? runtimeConfig.apiBaseUrl ?? publishedApiFallback;

export const API_BASE_URL = (RAW_API_BASE_URL || window.location.origin).replace(/\/+$/, "");

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const apiPath = normalizedPath === "/api" || normalizedPath.startsWith("/api/") ? normalizedPath : `/api${normalizedPath}`;
  return `${API_BASE_URL}${apiPath}`;
}

export function authUrl(path = "") {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return apiUrl(`/auth${normalizedPath}`);
}
