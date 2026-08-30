# Game App

`apps/game` owns the standalone Game application layer, controller, public client DTOs, presentation mapping, and Vue interface. `application/` contains the root protocol, command orchestration, and atomic Economy integration; `host/` contains only SillyTavern/iframe adapters. It has no Bank dependency and does not write prompts or chat messages.

The controller binds every request to one chat activation, serializes foreground operations, and forwards only explicit action fields. The application layer reconciles story state and commits writes; the presentation layer copies the service's public view field-by-field, so private game state never reaches the iframe.

Game rules, randomness, replay, persisted events, and terminal activities belong to `domains/game`. Player balance and escrow transactions remain owned by `domains/economy` and are committed atomically by the Game service.

Removal requires settling or explicitly discarding active escrow first, then removing this directory, the Game host and shell registrations, `domains/game`, `domains.game` chat data, and linked Economy transactions according to the chosen migration policy.
