# Emberwake

Emberwake is a playable fantasy action-platformer vertical slice set on the Mossbound Road. Guide the Wayfarer through a ruined forest, bind six hidden ember shards, defeat goblin and slime encounters, and break Gorrak, Warchief of the Briar, at the old gate.

## Play

- `A` / `D` or arrow keys: move
- `Space`, `W`, or up arrow: jump
- `J`: quick slash
- `K`: heavy attack (uses vigor)
- `L`: invulnerable dodge (uses vigor)
- `M`: toggle sound
- `Esc`: pause

Gamepads and touch controls are supported. The title screen also includes a Warchief practice option for jumping directly into the boss encounter.

## Included in the vertical slice

- Responsive movement with coyote time, jump buffering, and variable jump height
- Light and heavy combat, hitstop, screen shake, damage numbers, combo pressure, stamina, and directional attack arcs
- Invulnerable dodge, enemy telegraphs, checkpoint respawns, and low-health feedback
- Goblin scouts, hopping forest slimes, and a three-phase boss with charge and ground-wave attacks
- Six optional ember shards, three road regions, multiple platform routes, hazards, and wayside checkpoints
- Original sprite sheets, forest and gate scenes, ambient motes, synthesized sound effects, touch controls, and gamepad input
- Responsive portrait and landscape layouts plus reduced-motion-friendly page styling

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Validate

```bash
npm test
npm run lint
```

The test command creates a production build, verifies the rendered playable shell, checks core combat and responsive features, and confirms the required visual assets are present.
