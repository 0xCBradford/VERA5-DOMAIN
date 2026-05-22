# Vera5 Typography System
Version: 1.0
Purpose: Typography governance and font hierarchy for Vera5.

---

# Typography Philosophy

Vera5 typography should feel:

- operational
- modern
- technical
- clean
- intelligent
- readable
- slightly futuristic
- low-fatigue
- terminal-aware
- OSS-native

The typography system should support:

- analyst workflows
- dense information
- hover-card readability
- documentation clarity
- extension UI
- CLI visuals
- dashboards
- screenshots
- terminal snippets
- GitHub Pages
- future graphing interfaces

Typography should avoid:

- overly corporate SaaS fonts
- overly futuristic unreadable fonts
- gamer aesthetics
- “hacker movie” fonts
- novelty monospace fonts
- compressed cyberpunk fonts
- excessive stylistic typography

The goal is:

> Precision-first typography with restrained futuristic personality.

---

# Font Categories

## 1. Primary UI Font

### INTER

Primary font for:
- UI
- body text
- buttons
- cards
- navigation
- documentation
- settings pages
- hover cards
- descriptions

Why:
Inter is:
- modern
- extremely readable
- technical without being cold
- OSS-friendly
- highly scalable
- low-fatigue

Usage:
- default UI font
- primary reading font
- most of the application

Recommended Weights:
- 400
- 500
- 600
- 700

Example CSS:

font-family:
"Inter",
system-ui,
sans-serif;

---

# 2. Monospace / Analyst Font

### JETBRAINS MONO

Primary monospace font for:
- IOC values
- hashes
- IP addresses
- terminal snippets
- code blocks
- logs
- CLI outputs
- enrichment details
- JSON panels

Why:
JetBrains Mono:
- looks modern
- remains highly readable
- has excellent differentiation between characters
- feels engineering-focused
- works beautifully in dark interfaces

Recommended Weights:
- 400
- 500
- 600

Example CSS:

font-family:
"JetBrains Mono",
monospace;

---

# 3. CLI / Terminal Style Font

### IBM PLEX MONO

Used for:
- terminal simulations
- CLI previews
- command examples
- analyst shell screenshots
- tactical overlays
- developer snippets

Why:
IBM Plex Mono feels:
- authentic
- professional
- operational
- less “gamer terminal”
- more real-world engineering

Usage should be LIMITED.

Do not use this font for:
- large body sections
- navigation
- long-form reading

Example CSS:

font-family:
"IBM Plex Mono",
monospace;

---

# 4. Techy Signature Font

### SPACE GROTESK

Used for:
- hero titles
- branding
- section headers
- major callouts
- product identity moments
- large landing page typography

Why:
Space Grotesk provides:
- futuristic personality
- technical energy
- modern OSS-tool feel
- strong visual identity

WITHOUT:
- becoming unreadable
- looking gimmicky
- looking like crypto branding

This is the “personality” font.

Use sparingly.

Recommended:
- headlines only
- hero text only
- major section labels only

Example CSS:

font-family:
"Space Grotesk",
sans-serif;

---

# 5. Documentation / Technical Reading Font

### MANROPE

Used for:
- long-form docs
- product vision pages
- installation guides
- educational content
- onboarding documentation

Why:
Manrope:
- softens dense technical reading
- feels modern but human
- reduces fatigue
- pairs extremely well with Inter

Optional usage category.

Example CSS:

font-family:
"Manrope",
sans-serif;

---

# 6. Tactical / Intelligence Accent Font

### SYNE

Used ONLY for:
- special branding moments
- marketing callouts
- launch graphics
- key visual highlights
- subtle cyberpunk energy

Why:
Syne introduces:
- futuristic identity
- intelligence-platform energy
- memorable visual style

WITHOUT:
- looking like a hacking movie

Usage should remain rare.

Never use Syne for:
- paragraphs
- settings
- heavy UI
- dashboards
- logs

Example CSS:

font-family:
"Syne",
sans-serif;

---

# Recommended Typography Hierarchy

## Hero Title

Font:
Space Grotesk

Weight:
700

Tracking:
-0.03em

Usage:
Landing page hero only.

---

## Main UI Headers

Font:
Inter

Weight:
600–700

Usage:
Cards, settings, sections.

---

## Body Text

Font:
Inter

Weight:
400–500

Usage:
Default reading experience.

---

## IOC Values / Hashes / Technical Data

Font:
JetBrains Mono

Weight:
500

Usage:
Technical content only.

---

## CLI / Terminal Areas

Font:
IBM Plex Mono

Weight:
400–500

Usage:
Shell examples and command previews.

---

## Branding Accent Moments

Font:
Syne

Weight:
600–700

Usage:
Rare visual identity accents.

---

# Font Personality Roles

| Font | Role |
|---|---|
| Inter | Operational readability |
| JetBrains Mono | Technical precision |
| IBM Plex Mono | Authentic terminal feel |
| Space Grotesk | Modern technical identity |
| Manrope | Documentation readability |
| Syne | Futuristic accent personality |

---

# Typography Rules

## DO

- prioritize readability
- maintain hierarchy consistency
- keep line lengths reasonable
- preserve low-fatigue reading
- use monospace only where useful
- use signature fonts sparingly

---

## DO NOT

- mix too many fonts in one screen
- use futuristic fonts for paragraphs
- use all-caps excessively
- use glowing typography
- use neon text
- use gimmicky hacker fonts
- use distorted typography
- use ultra-thin font weights

---

# Font Loading Strategy

Recommended:
- self-host fonts later
- use Google Fonts initially
- preload critical fonts
- avoid excessive font families loaded simultaneously

Recommended initial load:
- Inter
- JetBrains Mono
- Space Grotesk

Optional later:
- IBM Plex Mono
- Manrope
- Syne

---

# Recommended UI Pairings

## Main Product UI

Primary:
Inter

Technical:
JetBrains Mono

Accent:
Space Grotesk

---

## Landing Page

Primary:
Inter

Hero:
Space Grotesk

Technical:
JetBrains Mono

Accent:
Syne

---

## CLI Documentation

Primary:
Inter

CLI:
IBM Plex Mono

Technical:
JetBrains Mono

---

# Visual Personality Summary

The Vera5 typography system should feel like:

- a modern analyst workstation
- a trusted OSS security tool
- a clean engineering platform
- a tactical intelligence utility
- a restrained futuristic interface

NOT:
- a gaming UI
- a crypto dashboard
- a hacker movie
- a noisy cyberpunk poster

---

# Final Typography Keywords

- precise
- readable
- technical
- operational
- modern
- restrained
- futuristic
- low-fatigue
- intelligent
- tactical
- engineering-focused
- analyst-native