# Shop App

`apps/shop` owns the Shop application layer, controller, client DTOs, presentation mapping, generation Prompt runtime, and Vue interface. `application/` contains root reconciliation, Economy integration, and the application service; `host/` contains only SillyTavern/iframe adapters.

Persistent catalog, inventory, activation, and replay rules belong to `domains/shop`. Payments remain owned by `domains/economy`; the application service commits both domains through the shared story action runner.

Remove the app by deleting this directory, deleting the Shop registration from the host and shell registries, removing `domains/shop`, and explicitly deleting or migrating `domains.shop` plus linked `shop_purchase` transactions.
