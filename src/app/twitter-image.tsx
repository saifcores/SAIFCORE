import { createOgImageResponse, ogAlt, OG_SIZE } from "./og-shared";

export const runtime = "edge";

export const alt = ogAlt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return createOgImageResponse();
}
