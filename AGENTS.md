<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git, multi-device, and deployment state

This repository follows these durable rules across Codex, Claude, Kimi, and every development device:

- GitHub is the code source of truth. `origin/main` must be sufficient to reproduce the current production site.
- `main` represents production. Use one short-lived branch per task: task branch → push → pull request → Vercel Preview → merge to `main` → Vercel Production.
- Start work by fetching and pruning, updating `main` with `git pull --ff-only`, and creating or switching to the task branch. Never begin new work from a stale device branch.
- Before handing work to another device, commit and push it. `git stash`, uncommitted files, and local-only branches are not cross-device state.
- Never synchronize a Git working directory with iCloud, Dropbox, OneDrive, Nutstore, or similar file-sync tools.
- Never deploy production from a dirty working tree or an unpushed commit. Every production deployment must be traceable to a Git commit SHA.
- Direct `vercel --prod` deployment is an emergency exception only. If used, put the exact deployed tree into Git and reconcile it with `main` in the same work session.
- Stage and commit only files relevant to the current task; do not use `git add -A` in a dirty shared worktree.
- Before merging or deploying f1composite, run `npm run lint` and `npm run build`. Required checks and the Vercel Preview must pass.
- Do not merge stale remote branches wholesale. Review their unique commits, resolve conflicts against current `main`, and cherry-pick or reimplement only still-needed changes.
- After a successful production deployment, verify the canonical domain and record or report the commit SHA and Vercel deployment ID.

When the user says “deploy” for this site, that means completing the scoped Git-to-production workflow above, not only running a local or untracked Vercel deployment.
