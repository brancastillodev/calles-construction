export const RESERVED_SEGMENTS = [
  "jobs",
  "gallery",
  "estimate",
  "services",
  "location",
  "login",
  "admin",
  "register",
];

let prefix = "";
let slug: string | null = null;

export function setPrefix(p: string) {
  prefix = p;
}

export function getPrefix() {
  return prefix;
}

export function getCurrentSlug() {
  return slug;
}

export function setCurrentSlug(s: string | null) {
  slug = s;
  prefix = s ? `/${s}` : "";
}

export function tlink(path: string): string {
  return prefix + path;
}

export function parseSlug(pathname: string): string | null {
  const segment = pathname.split("/")[1];
  if (!segment || RESERVED_SEGMENTS.includes(segment)) return null;
  return segment;
}