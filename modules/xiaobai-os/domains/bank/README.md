# Bank domain

This directory owns the pure rules of the Xiaobai OS Bank domain. It does not import Economy, host runtimes, controllers, or UI; `apps/bank/application/` combines these rules with the shared root and Economy protocols.

- `types.ts` defines persistence, product, position, action, result, activity, and public-view contracts.
- `products.ts` owns the immutable registry of three deposits and three funds, including current shelf membership and frozen contract calculations.
- `money.ts` is the sole integer-money boundary. Calculations floor their result, reject unsafe values, and enforce the 50,000 payout cap.
- `random.ts` validates every synchronous `nextInt` call and supplies the production `Math.random` source plus deterministic helpers.
- `invariants.ts` validates the current serialized event chain and frozen contracts.
- `timeline.ts` owns replay, immutable CAS/idempotent append, and story-prefix trimming.
- `view.ts` creates deep-copied public projections and omits unresolved fund outcomes.

Bank contains no game types, state machines, routes, or UI. Those belong exclusively to `domains/game` and `apps/game`.

Economy transactions, cross-domain validation, root reconciliation, persistence, and write-state handling belong to `apps/bank/application/`; iframe and SillyTavern adaptation belong to `apps/bank/host/`.

Specifications:

- [Target design](../../docs/bank-app-target-design.md)
- [Implementation plan](../../docs/bank-app-implementation-plan.md)
