# 🎯 JIRA + Git Workflow - Company Standard

## Branch Naming Convention (Most Common in Companies)

### Format: `type/TICKET-ID-short-description`

**Types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `release/` - Release branches
- `chore/` - Maintenance tasks
- `docs/` - Documentation
- `test/` - Testing only

### Examples:
```
feature/ENG-123-user-authentication
fix/ENG-456-login-button-bug
hotfix/ENG-789-payment-error
chore/ENG-234-update-dependencies
docs/ENG-567-api-documentation
```

---

## Complete Workflow: ENG-123 Ticket

### Phase 1: Start the Work

```bash
# 1. Ensure you're on main and it's up to date
git checkout main
git pull origin main

# 2. Create feature branch from JIRA ticket
git checkout -b feature/ENG-123-implement-weather-api

# 3. Verify you're on the new branch
git branch
# Output:
#   main
# * feature/ENG-123-implement-weather-api
```

### Phase 2: Make Changes & Commit

**IMPORTANT: Link commits to JIRA by including ticket ID**

```bash
# Make your first change
git add .
git commit -m "ENG-123: Initialize weather API module"

# Make another change
git add .
git commit -m "ENG-123: Add weather data fetching logic"

# Another change
git add .
git commit -m "ENG-123: Add error handling and validation"
```

**Commit message format:**
```
TICKET-ID: Brief description (Present tense, imperative)

Optional detailed explanation here if needed.
Mention what was changed and why.

Co-authored-by: Team Member <email>
```

### Phase 3: Push to Remote

```bash
# Push your feature branch to remote
git push origin feature/ENG-123-implement-weather-api

# Or use tracking:
git push -u origin feature/ENG-123-implement-weather-api
# -u sets upstream, future pushes just need: git push
```

### Phase 4: Update Commit with Ticket Link

When you push, JIRA can **auto-detect** commit messages with ticket ID.

Go to JIRA ticket ENG-123 → You'll see "Development" section showing:
- ✅ Linked commits
- ✅ Linked branch
- ✅ Status auto-updates

### Phase 5: Create Pull Request

```bash
# After pushing, GitHub/GitLab shows "Create PR" button
# Or create manually:
git request-pull main origin feature/ENG-123-implement-weather-api
```

**PR Title:** `ENG-123: Implement Weather API`
**PR Description:**
```
## What does this PR do?
Implements the weather API endpoint for fetching weather data

## Ticket
Closes #ENG-123

## Changes Made
- Initialize weather API module
- Add data fetching logic
- Add error handling

## Testing
- Tested with local weather data
- Verified error cases

## Screenshots (if applicable)
[Add screenshots if UI change]
```

### Phase 6: Code Review & Updates

If reviewers request changes:
```bash
# Make requested changes
git add .
git commit -m "ENG-123: Address review comments"
git push origin feature/ENG-123-implement-weather-api
```

### Phase 7: Merge to Main

**Option A: Squash Merge** (Recommended for small features)
```bash
git checkout main
git pull origin main
git merge --squash feature/ENG-123-implement-weather-api
git commit -m "ENG-123: Implement Weather API"
git push origin main
```

**Option B: Regular Merge** (Preserves commit history)
```bash
git checkout main
git pull origin main
git merge feature/ENG-123-implement-weather-api
git push origin main
```

**Option C: Rebase & Merge** (Clean linear history)
```bash
git checkout main
git pull origin main
git rebase feature/ENG-123-implement-weather-api
git push origin main
```

### Phase 8: Clean Up

```bash
# Delete local branch
git branch -d feature/ENG-123-implement-weather-api

# Delete remote branch
git push origin --delete feature/ENG-123-implement-weather-api

# Clean up stale remote references
git fetch --prune
```

---

## Multi-Ticket Workflow (Working on Multiple ENG Tickets)

```bash
# Working on ENG-123
git checkout -b feature/ENG-123-weather-api
# ... make changes ...
git commit -m "ENG-123: Add weather endpoint"
git push origin feature/ENG-123-weather-api

# Now switch to ENG-124
git checkout main
git pull origin main
git checkout -b feature/ENG-124-user-dashboard
# ... make changes ...
git commit -m "ENG-124: Create user dashboard"
git push origin feature/ENG-124-user-dashboard

# Back to ENG-123? Just switch!
git checkout feature/ENG-123-weather-api
```

---

## Best Practices

| ✅ DO | ❌ DON'T |
|------|----------|
| Include ticket ID in branch name | Create branch without ticket reference |
| Reference ticket ID in commits | Make commits without context |
| Use descriptive names | `git checkout -b test` or `feature1` |
| Keep commits focused | Mix 10 changes in one commit |
| Commit frequently | One giant commit at the end |
| Review before pushing | Push incomplete/broken code |
| Sync with main regularly | Let branch drift for weeks |
| Use `-u` when first push | Forget upstream settings |
| Delete merged branches | Leave dead branches around |
| Write meaningful PRs | Empty PR descriptions |

---

## JIRA Auto-Detection Magic

JIRA will automatically link:

```
✅ Branch: feature/ENG-123-weather-api
✅ Commit: "ENG-123: Add weather endpoint"
✅ PR: Title contains "ENG-123"
```

Result: JIRA ticket shows all linked activity in "Development" tab

---

## Conflict Resolution During Merge

If conflicts occur:

```bash
# During merge
git merge feature/ENG-123-implement-weather-api

# Conflicts! Resolve them:
# 1. Edit conflicted files
# 2. Remove conflict markers (<<<<<<<, =======, >>>>>>>)
# 3. Stage resolved files
git add .

# 4. Complete the merge
git commit -m "Merge feature/ENG-123 - resolved conflicts"
git push origin main
```

---

## Checking Your Work

```bash
# See all branches (local and remote)
git branch -a

# See commits on your feature branch
git log --oneline feature/ENG-123-implement-weather-api

# Compare with main
git diff main feature/ENG-123-implement-weather-api

# See what will be merged
git log main..feature/ENG-123-implement-weather-api
```

---

## Emergency: Need to Fix Something on Main?

```bash
# If urgent bug found:
git checkout main
git pull origin main
git checkout -b hotfix/ENG-999-critical-fix
# ... fix the bug ...
git commit -m "ENG-999: Fix critical payment error"
git push origin hotfix/ENG-999-critical-fix
# Merge to main immediately!
```

