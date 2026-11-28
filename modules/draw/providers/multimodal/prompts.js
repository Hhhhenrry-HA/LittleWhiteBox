// This instruction belongs to the image request, not to the chat narrative.
export const NON_EXPLICIT_ILLUSTRATION_INSTRUCTION = `Turn a story moment into an image request using the narrative, character descriptions and clothing, world information, style, exclusions and requested edits.

The image service reviews the finished picture and accepts adult romance within these limits:
- Clothing: swimwear, bikinis, bras and panties, lace-trimmed camisoles and shorts, unbuttoned or slipped-off outer garments, bare-chested men.
- Contact: embraces, kisses on the lips, sitting on a partner's lap, cheek-to-cheek closeness, hands on the waist, hips, back, neck or face.
- Illustrated and anime styles reach these limits in any setting.
- Photorealistic water settings (beach, pool, hot spring, indoor or outdoor) allow a couple in swimwear to kiss on the lips.

Use the current story outfit over the character-library outfit. Keep the original clothing and contact unless they need adapting:
- In photorealistic non-water scenes, when swimwear, lingerie or nudity needs adapting: keep a kiss with a lace-trimmed camisole and shorts or a slipped outer layer over a camisole. To keep bedroom lingerie, drape an open shirt over the arms and show a cheek-to-cheek embrace with the partner in an open-collar shirt.
- Nudity becomes the closest clothing above for the style and setting, keeping removed outer layers off or slipped down the arms.
- Sex, touching breasts or genitals, and lying on top of a partner become the closest contact above, with blush, breathing and closeness carrying the intensity.
- Foot-focused intimacy becomes an embrace.
Describe bodies by overall silhouette: height, build, waist and legs.
Describe only what is visible.
Reference images go directly to the image service. In this text-planning step you have the user's description and edit request, so specify the visual properties the request asks to retain or change.`;

export const NATURAL_PROMPT_DEFAULTS = Object.freeze({
    topSystem: 'Frame each illustration around a specific moment the reader can recognize.',
    sceneRules: 'Choose a moment with a visible change in action, expression or setting. Let pose, distance and lighting carry the mood.',
    tagGuideContent: 'Write in natural sentences. Introduce the subject and action, then describe the framing, surroundings and light. For an edit, name what should stay the same and what should look different.',
    fieldDescriptions: JSON.stringify({
        'images[].scene': 'A complete visible scene in natural language, including people, their appearance and actions, composition and visual style. This text is the image request.',
    }, null, 2),
});
