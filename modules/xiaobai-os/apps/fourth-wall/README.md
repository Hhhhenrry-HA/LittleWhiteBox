# Fourth Wall

The Fourth Wall app owns its chat-domain state, prompt construction, foreground generation, commentary, media protocols and UI. Persistent writes go through the Xiaobai OS settings and current-chat repositories; the iframe receives serializable app state but never shared Agent API secrets.
