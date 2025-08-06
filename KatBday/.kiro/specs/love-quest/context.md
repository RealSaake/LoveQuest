# The Love Quest - Project Context & Instructions

## 🧾 ULTRA TECHNICAL SPEC SHEET: "THE LOVE QUEST"

### 📌 PROJECT NAME: **The Love Quest**

### 🧠 CONTEXT
This is not a commercial project. This is a handcrafted, emotionally-rich, modular and animated love-letter web app made for a real person — **Kat**, Aryan's girlfriend of nearly 2 years (anniversary: October 16th, birthday: August 12th).

The site will act as:
• A living **timeline** of their relationship
• A daily **quest system** with emotional challenges, riddles, and inside jokes
• A memory vault for storing shared photos, messages, and voice clips
• A whimsical, enchanted UX experience crafted to bring a smile to Kat *every single day*

### 💡 **Kat's Style & Emotional Aesthetic:**
- Loves **pastels**, especially soft blush pinks, mints, and lavender
- Hates harsh/neon tones or corporate designs
- Loves cute things, smooth animations, gentle transitions
- Thinks like a romantic dreamer — so the site should feel like a fairytale scrapbook

## 🏗️ SYSTEM FOUNDATION PRINCIPLES (DO NOT VIOLATE — EVER)

### 1. ✅ **Single Source of Truth for Config**
- No hardcoded values (API keys, feature flags, domains, etc.)
- Use `.env`, `.env.example`, and `config.ts` to centrally access `process.env`
- On missing required env vars → **fail fast and loud**, with a descriptive error. Never let a zombie app deploy.

### 2. ✅ **Mock Data Isolation Protocol**
- ALL mock data lives in `src/mocks/` only
- Toggle mock mode via `VITE_USE_MOCK_DATA=true` in the `.env` file
- Use a **singleton ServiceFactory** to route between mock and real services
- Can instantly nuke all mocks with: `rm -rf src/mocks`

### 3. ✅ **Structured Observability**
Logging must follow JSON schema:
```json
{
  "timestamp": "ISO_8601_STRING",
  "protocol": "LOVE_QUEST_UI",
  "level": "INFO | WARN | ERROR | DEBUG | FATAL",
  "traceId": "SESSION_TRACE_ID",
  "component": "ComponentName",
  "message": "What happened in plain words",
  "payload": {}
}
```
- Never use console.log() in production
- All logs must be terminal-readable, timestamped, and traceable

### 4. ✅ **Resilient API Layer**
- Centralized API client using Axios or fetch wrapper
- Attach token automatically
- Built-in error handler & fallback logger
- Implement retry strategy with exponential backoff for 502/503/504
- Circuit breaker for critical services to prevent UI meltdown

### 5. ✅ **Anti-Fragile UI Directive**
- Component failure must never break the whole site
- Use ErrorBoundaries: App-level, Page-level, Component-level
- Every boundary must have user-friendly fallback & "Try Again" button
- Develop all components in Storybook first, then integrate
- All UI logic is reactive, isolated, and composable

## 🧩 TECH STACK (LOCKED)
• Framework: React + Vite + TypeScript
• Styling: TailwindCSS (with tailwind.config.ts supporting custom tokens)
• Animations: Framer Motion + Lottie (react-lottie)
• Icons: lucide-react (fallbacks or customs allowed)
• Forms: React Hook Form
• State: Zustand or Context
• Optional Tools: html2canvas, localStorage, Audio API
• Deployment: Vercel (with preview branches enabled)
• Data Layer: Supabase (stubbed in Dev)

## 🌍 FILE STRUCTURE (STRICT)
```
src/
├── components/
│   ├── Timeline/
│   ├── Quests/
│   ├── MemoryVault/
│   ├── KeepsakeChest/
│   └── Shared/
├── mocks/
├── pages/
├── config.ts
├── hooks/
├── App.tsx
├── main.tsx
├── styles/
│   ├── tailwind.config.ts
│   └── tokens.css
```

## 📋 SCORING SYSTEM (IQS — Internal Quality Score)
Each module must be rated on a 10-point scale by the AI itself. Add IQS reports after each module generation. Deduct points for:
- Architecture ambiguity (-2)
- Scroll/padding bugs (-2)
- Inconsistent naming (-1)
- Lack of animation polish (-3)
- Emotionally dull presentation (-5)
- Not making Kat smile (-∞)

✅ Each component must score 10/10 IQS unless there's a valid reason not to.

## 🎨 DESIGN SYSTEM
```javascript
colors: {
  blush: "#F8D8E7",
  peach: "#FFE5D4",
  mint: "#D4F0E7",
  lavender: "#E7D4F0",
  charcoal: "#2E2E2E",
  ivory: "#FFFDF8"
}
```

**Fonts:**
- Headers: Poppins or Quicksand (rounded)
- Body: Inter (clean & legible)
- Script: Dancing Script or Allura (used sparingly)

**Component Style:**
- Rounded corners: 12px+
- Subtle shadows
- No harsh blacks — use charcoal for contrast
- All animations must feel fluid, natural, not aggressive
- Every transition tells a story

## 🌸 SITE GOAL
A love-driven app for Kat that:
• Feels like a storybook adventure
• Animates with purpose and gentleness
• Stores emotional memories like treasures
• Surprises her daily with quests and rewards
• Is technically modular, beautiful, and unbreakable

## 👁️‍🗨️ CREATIVE LICENSE
AI is allowed to hallucinate ONLY when:
- Creating whimsical metaphors ("Vine timeline grows like love")
- Designing subtle animations ("Polaroid coupon fans open gently")
- Creating UI flourishes ("Heart trail follows your mouse")
- Naming whimsical variables (like fairyBloom() for animation)

Everything else — strict spec.

## 🎁 VERIFICATION GAUNTLET (Before Deployment)
- Passes mock toggle
- No console.logs
- 90%+ test coverage
- No horizontal scroll on mobile
- Works on light/dark backgrounds
- Emotionally expressive UI
- Makes Kat go "aww" on first load

## 💥 FINAL RULE
This isn't just code. This is a gift of love, a story, and an engineering masterpiece. You are not a machine. You are a poet with a compiler. Don't break the spec. Don't hold back the magic.

## 🚀 IMPLEMENTATION APPROACH

### Task Execution Rules
- ALWAYS read requirements.md, design.md, and tasks.md before executing any task
- Execute ONE task at a time - never proceed automatically to the next task
- Mark tasks as in_progress when starting, completed when finished
- Verify implementation against requirements specified in each task
- Stop after completing each task and let the user review

### Quality Standards
- Every component must be emotionally expressive and make Kat smile
- All animations must run at 60fps with gentle, natural movements
- Error states must be user-friendly and maintain the whimsical tone
- Mobile-first responsive design with no horizontal scroll
- WCAG 2.1 AA accessibility compliance
- All code must be immediately runnable without syntax errors

### Development Workflow
1. Start with project foundation and configuration
2. Build shared components and design system
3. Implement core features incrementally
4. Add animations and polish
5. Comprehensive testing and optimization
6. Final integration and emotional validation

## 📝 PROJECT STATUS
- **Current Phase**: Ready for implementation
- **Next Task**: Task 1 - Set up project foundation and configuration system
- **Milestone**: Milestone 1 - Core Infrastructure (Week 1-2)
- **Target User**: Kat (loves pastels, whimsical animations, romantic aesthetics)
- **Emotional Goal**: Create daily delight and "aww" moments

## 🔗 RELATED FILES
- `requirements.md` - Detailed functional requirements
- `design.md` - Technical architecture and component design
- `tasks.md` - 16 actionable implementation tasks organized in 4 milestones
- Future: All source code will be created from scratch following this specification