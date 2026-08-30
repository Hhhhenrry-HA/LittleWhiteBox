# Bank app

Bank is the standalone Xiaobai OS interface for fixed deposits, managed funds, open positions, due settlement, and financial activity. Game and game concerns are intentionally absent.

## Boundaries

- `domains/bank/` owns only Bank products, event rules, replay, validation, randomness, and safe projections.
- `application/` owns the Economy/root protocol, story reconciliation, command orchestration, application service, CAS coordination, and write state.
- `host/presentation.ts` rebuilds an explicit iframe-safe DTO. Locked funds never expose their frozen return or settlement amount.
- `host/controller.ts` owns chat activation, iframe request parsing, foreground request serialization, generation subscriptions, and save-confirmation routing.
- `ui/` owns only navigation, forms, dialogs, request state, and rendering. It does not calculate fund outcomes or persist state.

## Protocol

The iframe can request only:

- `bank/refresh`
- `bank/deposit/open`
- `bank/deposit/withdraw`
- `bank/fund/open`
- `bank/settle-due`
- `bank/records/load-more`
- `bank/confirm-save`

Write commands accept chat identity, CAS, action ID, and only their required intent fields. Contract terms, payout values, frozen outcomes, and randomness are never accepted from the iframe.

## Lifecycle

Activation opens Economy when needed or reconciles an existing story-backed root before presenting Bank state. Deactivation, chat changes, and a newer activation invalidate pending foreground results without changing Bank data. An unconfirmed root save freezes writes until `bank/confirm-save` resolves it.

## Verification

```text
node --import tsx --test modules/xiaobai-os/tests/bank-controller.test.js
npx vue-tsc --noEmit -p tsconfig.xiaobai-os.json
npx eslint "modules/xiaobai-os/apps/bank/**/*.{ts,vue}" "modules/xiaobai-os/domains/bank/**/*.ts" "modules/xiaobai-os/tests/bank-controller.test.js"
```
