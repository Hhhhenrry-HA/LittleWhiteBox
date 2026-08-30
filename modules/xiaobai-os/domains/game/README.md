# Game domain

This directory owns Game rules, event replay, persisted private state, and safe projections. It has no Bank, Economy, host-runtime, controller, or UI dependency; story trimming accepts only a minimal immutable prefix lookup. Root reconciliation, Economy integration, persistence, and write-state handling belong to `apps/game/application/`, while iframe/SillyTavern adaptation belongs to `apps/game/host/`.

- `types.ts` owns the schema-v1 event contracts, private state, terminal activity, public DTOs, story boundary types, and Game errors.
- `money.ts` owns integer payout calculations and the 50,000 payout cap.
- `random.ts` validates synchronous random draws and provides production and deterministic sources.
- `games/` contains the dice bluff, push-your-luck, and risk ladder state machines.
- `invariants.ts` validates exact serialized shapes and every transition in an event chain.
- `timeline.ts` owns replay, immutable CAS/idempotent append, terminal activity flattening, and story reconciliation.
- `view.ts` creates deep-copied public snapshots and strips hidden dealer dice, shuffled decks, and story anchors.

Persistence has exactly this top-level shape:

```ts
{ schemaVersion: 1, events: GameEvent[] }
```

Replay permits at most one active game. A terminal transition ends that game and embeds its complete auditable result in the same event. Private dealer dice and decks are persisted only where deterministic validation requires them and never cross the public-view boundary.
