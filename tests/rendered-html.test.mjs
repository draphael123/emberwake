import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Emberwake playable shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Emberwake — The Mossbound Road<\/title>/i);
  assert.match(html, /aria-label="Playable Emberwake game canvas"/);
  assert.match(html, /Draw your blade/);
  assert.match(html, /Bind the wayside embers\. Break the Warchief\./);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("ships the complete combat and responsive asset set", async () => {
  const [game, css, page, layout] = await Promise.all([
    readFile(new URL("../app/game/GameCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  for (const feature of ["dodge", "heavy", "checkpoint", "combo", "bossSpecial", "pollPad", "waves", "hitstop", "shards", "floats", "attackBuffer", "perfectDodge", "bestTime"]) assert.match(game, new RegExp(feature));
  assert.match(game, /Math\.sign\(-dx\)===p\.face/, "attacks resolve in the player's facing direction");
  assert.match(game, /g\.checkpoint=3820/, "the boss arena has a dedicated retry checkpoint");
  assert.match(game, /gateLocked/, "the revealed boss encounter remains inside the gate arena");
  assert.match(game, /KeyM/, "keyboard audio toggle is available");
  assert.match(game, /emberwake-muted/, "audio preference persists between sessions");
  assert.match(game, /onPointerCancel/, "touch controls release safely when gestures are interrupted");
  assert.match(game, /g\.keys\.clear\(\)/, "focus loss clears held inputs before pausing");
  assert.match(game, /aria-label="Pause"/, "touch players can pause and resume");
  assert.match(game, /aria-describedby="game-instructions"/, "the canvas exposes nonvisual control instructions");
  assert.match(game, /disabled={!ready}/, "play cannot begin before animation assets are ready");
  assert.match(game, /PRESS ENTER OR JUMP TO WALK AGAIN/, "victory cannot be skipped by continued attack inputs");
  assert.match(game, /emberwake-best-time/, "field records persist between runs");
  assert.match(game, /FIELD GRADE/, "victory presents a replayable performance grade");
  assert.match(game, /if\(!g\.practice\).*emberwake-best-time/s, "boss practice cannot overwrite full-route records");
  assert.match(game, /g\.practice=true;g\.embers=3/, "boss practice starts with a representative training blade");
  assert.match(game, /PERFECT DODGES RESTORE VIGOR/, "the skill-reward mechanic is taught in game");
  assert.match(game, /const dodgeCancel=/, "late attack recovery can be cancelled into a dodge");
  assert.match(game, /b\.hp=b\.maxHp/, "boss retries restart the duel cleanly");
  assert.match(game, /if\(g\.victory\).*g\.pressed\.clear\(\);return/s, "the final clear time freezes on victory");
  assert.match(css, /max-width:760px/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /pointer:coarse/, "touch controls are available on coarse-pointer tablets");
  assert.match(page, /Polished prototype · v3/);
  assert.match(layout, /og\.png/);
  assert.match(layout, /viewportFit: "cover"/, "mobile safe areas are included in the viewport contract");
  for (const asset of ["adventurer-core-spritesheet-v1.png", "enemy-goblin-scout-spritesheet-v1.png", "enemy-forest-slime-spritesheet-v1.png", "boss-goblin-warchief-core-spritesheet-v1.png", "mossbound-road-background-v2.png", "mossbound-forest-loop-v2.png"]) {
    await access(new URL(`../public/assets/${asset}`, import.meta.url));
  }
});
