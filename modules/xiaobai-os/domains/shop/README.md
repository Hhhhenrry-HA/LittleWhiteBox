# Shop pure domain

This directory owns the ordinary Xiaobai OS Shop catalog and its pure event-chain rules. It has no Tavern, Economy, store, host-runtime, Vue, or SillyTavern dependency.

## Persisted fact

`ShopDomainV1` stores only a contiguous `events` array. Each purchase, activation, or manual close appends one event carrying its story anchor, completed-Assistant count, action ID, and normalized business input. Inventory and effects are always rebuilt by `projectShopState`; no current-state snapshot, balance, countdown, lock, or cache is persisted.

The empty CAS token is `{ expectedRevision: 0, expectedEventId: '' }`. Later tokens are obtained with `getShopCasToken`. An exact normalized `actionId` retry returns `created: false` before CAS checking; reuse for another action is a conflict.

## Assistant turns

An action recorded after `N` completed main-RP Assistant replies starts or transitions at target reply `N + 1`. Turn effects use the half-open interval `[start, start + rounds)`. `resolveShopGenerationTimeline` keeps the current turn for continue and removes the replaced Assistant reply for regenerate/swipe; callers must reconcile the returned virtual story prefix before projecting a prompt.

## Prompt trust boundary

Catalog `trustedRule` strings are reviewed instructions. User values are normalized by NFKC, control-character removal, whitespace folding, and Unicode code-point limits, then emitted only under `<parameters>`. XML metacharacters are escaped and braces are encoded so SillyTavern cannot expand `{{...}}` macros. Rules never interpolate user text and the prompt omits internal IDs, prices, revisions, and story hashes.

`buildShopPromptBlock` is read-only. It emits active effects and only the catalog's explicit one-boundary expiration/manual-close rules; an empty projection returns an empty string.

## Integration boundary

`apps/shop/application/` owns story reconciliation, generation guards, Economy payment, root mutation, persistence, and read-back confirmation. A purchase event and its Economy transaction are committed in one root write, while this pure domain neither reads nor writes Economy.

Removing Shop means deleting this directory, `apps/shop/`, its tests and registrations, then explicitly deleting or migrating `domains.shop` and linked Shop transactions; Economy itself remains independent.
