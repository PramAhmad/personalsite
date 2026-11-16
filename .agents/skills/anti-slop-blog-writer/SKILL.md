---
name: anti-slop-blog-writer
description: >-
  Strict rules and guidelines for writing authentic, human developer blog posts and technical articles. Prevents AI slop, eliminates artificial dashes/em-dashes, rejects robotic formatting, and preserves genuine developer voice in both Indonesian and English.
---

# Anti-Slop Blog Writer Skill

This skill enforces strict standards to ensure every article, blog post, and technical essay sounds genuinely written by a real software engineer, without the robotic hallmarks and stylistic quirks of synthetic AI writing ("AI slop").

---

## 1. Absolute Punctuation Rules

### ❌ Never Use Em-Dashes (`—`), En-Dashes (`–`), or Spaced Hyphens (` - `)
- **Problem**: AI models habitually insert em-dashes (`—`) or spaced hyphens (` - `) mid-sentence to create artificial pauses or articulate transitions (e.g., *"it wasn't just code — it was an art"*). Real developers rarely write like this, and it immediately flags the content as AI-generated.
- **Rule**: Absolutely zero `—`, `–`, or ` - ` used as sentence pauses.
- **Fix**:
  - Replace with a simple comma `,`
  - Wrap in parentheses `(...)`
  - Use a semicolon `;`
  - Break into two natural, distinct sentences.
- **Allowed Hyphens**: Hyphens are strictly allowed **only** inside valid technical words (e.g., `utility-first`, `read-only`, `utf-8`, `HTML5-compliant`) or CSS class names.

---

## 2. Banned AI Slop Vocabulary & Phrasing

### English Forbidden Clichés
Never use the following AI marker phrases:
- *"In today's fast-paced digital world / landscape..."*
- *"Delve into / Let's delve into..."*
- *"A testament to..."*
- *"Tapestry"*
- *"Game-changer"*
- *"Crucial / Paramount / Indispensable"*
- *"It's not just about X, it's about Y"*
- *"Embark on a journey"*
- *"At the end of the day..."*
- *"It's funny to think about how everything comes full circle..."*
- *"Moving forward with clarity..."*
- *"Let's dive right in"*
- *"Seamlessly / Effortless"*
- *"Look no further"*

### Indonesian Forbidden Clichés
- *"Di era digital yang serba cepat ini..."*
- *"Mari kita selami lebih dalam..."*
- *"Bukan hanya sekadar X, melainkan Y..."*
- *"Menjadi bukti nyata bahwa..."*
- *"Sangat krusial untuk dipahami..."*
- *"Tanpa berlama-lama lagi, mari kita..."*

---

## 3. Preserving Authentic Human Voice

### Indonesian Developer Tone
- Write like a real Indonesian programmer sharing knowledge on Discord, Telegram, or personal notes.
- Use natural, conversational phrasing: `nggak ada`, `cuma`, `bisa dibilang`, `intinya`, `buat apa`, `santai`, `btw`.
- Use standard industry developer terms as they are commonly spoken. Do **not** use overly formal or pedantic dictionary translations:
  - Use `memory`, `pointer`, `array`, `null terminator`, `buffer overflow`, `stack`, `heap`, `string literal`.
  - Avoid artificial translations like *"larik"* (for array) or *"untaian"* (for string) unless specifically requested.

### English Developer Tone
- Preserve the author's authentic personality, informal expressions, and quirks (`lol`, `loller`, `+_+`, `thanks god i really love vue`).
- Do not sanitize or homogenize casual remarks into corporate PR speak.

---

## 4. Anti-Slop Formatting & Structure

1. **No Robotic Bullet Points**:
   - Do **not** format lists where every bullet is `**Bold Term:** Generic one-sentence explanation`. Write flowing, cohesive paragraphs instead.
2. **Clean Code Blocks**:
   - Provide clean, minimal, runnable code.
   - Avoid long boilerplate that obscures the concept.
   - Show direct outputs and real compiler/runtime behavior (e.g. Segmentation Fault).
3. **No Platform Clutter**:
   - Never copy-paste Medium subscription promos, clap banners, author follower counts, or "Join The Writer's Circle" spam.
4. **Visual Aids**:
   - Use clean ASCII/monospace memory layouts when illustrating low-level memory structures (like character arrays and `\0`).

---

## 5. Verification Checklist Before Publishing

Before saving any blog post or article HTML:
1. Run `grep -rn "—" <file>` → Must return **0 matches**.
2. Run `grep -rn " - " <file>` → Must return **0 matches**.
3. Check headings and transitions: Are there any cheesy corporate transitions? If yes, cut them.
4. Read aloud: Does it sound like an honest, passionate engineer talking to a peer?
