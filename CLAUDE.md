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
