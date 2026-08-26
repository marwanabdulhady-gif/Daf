#!/usr/bin/env node
/* Emit the small, classroom-safe story payload embedded in one standalone deck.
   Payload shape and the publishability/approval rules live in ./story-payload.js,
   which the foundation check uses as well — the deck can never embed a stale,
   unpublished or unapproved window without the check failing. */
const fs = require("fs");
const path = require("path");
const { buildPayload, serializePayload } = require("./story-payload.js");

const ROOT = path.resolve(__dirname, "..");
const code = process.argv[2];
const map = JSON.parse(fs.readFileSync(path.join(ROOT, "story", "story-map.json"), "utf8"));
const load = (name) => {
  const p = path.join(ROOT, "story", name);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : { windows: [] };
};
const registries = { stem: load("stem-sources.json"), amanah: load("amanah-sources.json") };

process.stdout.write(serializePayload(buildPayload(map, registries, code)));
