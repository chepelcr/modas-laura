import test from "node:test";
import assert from "node:assert/strict";
import { verifySeo } from "../scripts/verify-seo.mjs";

test("Every Spanish and English route has consistent search, language, sharing and business metadata", () => {
  assert.deepEqual(verifySeo(), {
    routes: 18,
    indexableRoutes: 16,
    locales: 2,
    shareImagesVerified: 18,
    prerendered: false,
  });
});
