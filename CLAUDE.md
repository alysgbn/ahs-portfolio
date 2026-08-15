# CLAUDE.md

## Commit strategy

Use **atomic** and **conventional commits**.

- **Atomic**: one logical change per commit. Don't bundle unrelated edits — split them into separate commits so each can be reviewed, reverted, or cherry-picked independently.
- **Conventional Commits**: format messages as `<type>(<optional scope>): <description>`.
  - Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
  - Description in imperative mood, lowercase, no trailing period.
  - Breaking changes: append `!` after the type/scope (e.g. `feat!:`) or add a `BREAKING CHANGE:` footer.

Examples:
- `feat(nav): add mobile hamburger menu`
- `fix(hero): correct image aspect ratio on Safari`
- `refactor(projects): extract card component`
- `chore: bump dependencies`

**Do not add a `Co-Authored-By:` trailer to commits.**

## Design skills

When making UI, styling, animation, or visual-polish changes, consult these skills before writing code:

- **`emil-design-eng`** — Emil Kowalski's design-engineering playbook (motion, micro-interactions, typography, spacing rhythm).
- **`gpt-taste`** — general taste guardrails ("Taste"): what reads as polished vs. AI-generic.
- **`impeccable`** — deterministic design-quality hook that flags common tells (gradient text on headings, over-decorated UI, etc.); its post-edit hooks will prompt on real findings.

Prefer these over ad-hoc styling instincts. If a skill's guidance conflicts with an intentional design choice already in this repo, keep the intentional design and record why (suppress the specific rule via `impeccable`'s `hook-admin.mjs ignore-value` when applicable).
