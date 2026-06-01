# 🚀 Advanced Git Commands - Company Pro Level

## Table of Contents
1. [Advanced Branching](#advanced-branching)
2. [Commit Management](#commit-management)
3. [History & Investigation](#history--investigation)
4. [Conflict Resolution](#conflict-resolution)
5. [Stashing & Recovery](#stashing--recovery)
6. [Rewriting History](#rewriting-history)
7. [Debugging with Git](#debugging-with-git)
8. [Performance Tips](#performance-tips)

---

## Advanced Branching

### 1. Create Branch from Specific Commit

```bash
# Create branch from a specific commit
git checkout -b feature/ENG-789-hotfix abc1234

# Or create from another branch's specific point
git checkout -b feature/new origin/main~3
# This creates a branch 3 commits back from origin/main
```

### 2. Rename a Branch

```bash
# Rename local branch
git branch -m old-name new-name

# Rename and push
git push origin -u new-name
git push origin --delete old-name

# Full sequence:
git branch -m feature/ENG-123-typo feature/ENG-123-weather-api
git push origin -u feature/ENG-123-weather-api
git push origin --delete feature/ENG-123-typo
```

### 3. Track Remote Branch Changes

```bash
# See all branches with tracking info
git branch -vv

# Set upstream for existing branch
git branch -u origin/feature/ENG-123
git branch --set-upstream-to=origin/feature/ENG-123

# See what's ahead/behind
git status
```

### 4. Delete Multiple Branches

```bash
# Delete all branches matching pattern
git branch | grep "feature/" | xargs git branch -d

# Delete all merged branches
git branch --merged | grep -v "main\|master" | xargs git branch -d

# Force delete (even if not merged)
git branch -D old-branch
```

### 5. Interactive Branch Management

```bash
# List branches with last commit date
git branch -v --sort=-committerdate

# See branch creation date
git log --all --oneline --graph --decorate

# Find branches that contain a specific commit
git branch --contains abc1234
```

---

## Commit Management

### 1. Amend Last Commit

```bash
# Fix typo in last commit message
git commit --amend -m "ENG-123: Fixed typo in message"

# Add forgotten file to last commit
git add forgotten-file.js
git commit --amend --no-edit

# Change author of last commit
git commit --amend --author="John Doe <john@company.com>"
```

### 2. Multiple Commits Amend (Rebase)

```bash
# Show last 5 commits
git log --oneline -5

# Interactive rebase to modify last 5 commits
git rebase -i HEAD~5

# In the editor:
# pick   abc1234 ENG-123: First change
# reword def5678 ENG-124: Second change  <- Change message
# squash ghi9101 ENG-125: Third change   <- Merge with previous
# edit   jkl1121 ENG-126: Fourth change  <- Stop to edit
# pick   mno3141 ENG-127: Fifth change

# After saving:
# Git will prompt you to reword, squash, or edit each commit

# Options in interactive rebase:
# pick (p)   - Use commit
# reword (r) - Use commit, but edit message
# edit (e)   - Use commit, but stop for amending
# squash (s) - Use commit, but meld into previous
# fixup (f)  - Like squash, but discard message
# exec (x)   - Run shell command
```

### 3. Cherry-pick Specific Commits

```bash
# Apply specific commit from another branch
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678 ghi9101

# Cherry-pick a range
git cherry-pick abc1234..def5678

# Cherry-pick without committing (dry run)
git cherry-pick -n abc1234

# Cherry-pick with custom message
git cherry-pick abc1234
git commit --amend -m "ENG-789: Cherry-picked from ENG-123"
```

### 4. Create Commit with No Parent (Orphan Branch)

```bash
# Create a new branch with no history (for docs, builds, etc.)
git checkout --orphan release-builds

# Remove all files
git rm -rf .

# Create new content
echo "Build artifacts" > README.md

# Commit
git commit -m "Initial release builds"

git push -u origin release-builds
```

---

## History & Investigation

### 1. View Detailed Commit History

```bash
# One-line compact view
git log --oneline

# With graph and all branches
git log --all --oneline --graph --decorate

# Pretty formatted
git log --pretty=format:"%h %an %ar %s" -n 10

# See author email and date
git log --pretty=fuller

# Show statistics (files changed, additions, deletions)
git log --stat
```

### 2. Find Specific Commits

```bash
# Find commits by author
git log --author="John Doe"

# Find commits in date range
git log --since="2026-05-01" --until="2026-06-01"

# Find commits with specific keyword
git log --grep="ENG-123"

# Find commits that changed a specific file
git log -- weather-api.js

# Find commits that added/removed a line
git log -S "validateLocation"

# See who deleted a file
git log -- weather-api.js | head -20
```

### 3. Blame - Who Changed What

```bash
# See who changed each line
git blame weather-api.js

# Blame specific line range
git blame -L 10,20 weather-api.js

# Show date with blame
git blame --date=relative weather-api.js

# Show email instead of name
git blame -e weather-api.js

# Ignore whitespace changes
git blame -w weather-api.js
```

### 4. Diff Commands

```bash
# Diff between branches
git diff main feature/ENG-123

# Diff with statistics
git diff --stat main feature/ENG-123

# Diff only filenames changed
git diff --name-only main feature/ENG-123

# Diff specific file
git diff main feature/ENG-123 -- weather-api.js

# Diff with word-level changes (easier to read)
git diff --word-diff main feature/ENG-123

# Diff with color words
git diff --color-words main feature/ENG-123

# Diff staged changes
git diff --staged

# Diff unstaged changes
git diff
```

### 5. Show Commit Details

```bash
# Show specific commit
git show abc1234

# Show specific file from a commit
git show abc1234:weather-api.js

# Show commit statistics
git show --stat abc1234

# Show namestat (additions/deletions per file)
git show --name-status abc1234
```

---

## Conflict Resolution

### 1. During Merge

```bash
# Start merge
git merge feature/ENG-123

# If conflicts occur, Git pauses the merge
git status

# View conflicted files
git diff --name-only --diff-filter=U

# View conflicts in file
cat weather-api.js
# Shows:
# <<<<<<< HEAD
# ... your code ...
# =======
# ... incoming code ...
# >>>>>>> feature/ENG-123

# Resolve manually or use tools
# Option 1: Keep ours
git checkout --ours weather-api.js

# Option 2: Keep theirs
git checkout --theirs weather-api.js

# Option 3: Use mergetool
git mergetool

# After resolution
git add weather-api.js
git commit -m "Resolved merge conflict in weather-api.js"
git push origin main
```

### 2. Abort Merge

```bash
# Undo merge completely
git merge --abort

# Verify you're back to pre-merge state
git status
```

### 3. Conflict Markers Explained

```
<<<<<<< HEAD          # Your current branch
  your code
=======               # Separator
  incoming code
>>>>>>> branch-name   # Branch being merged
```

---

## Stashing & Recovery

### 1. Stash Changes

```bash
# Stash current changes (working directory & staging)
git stash

# Stash with message
git stash save "WIP: Working on ENG-123"

# Stash only staged changes
git stash --staged

# Stash untracked files too
git stash -u

# Stash specific file
git stash push weather-api.js

# List all stashes
git stash list
# Output:
# stash@{0}: WIP on feature/ENG-123: abc1234 Last commit
# stash@{1}: WIP: Working on ENG-123
```

### 2. Restore Stashed Changes

```bash
# Apply latest stash
git stash pop

# Apply without removing stash
git stash apply

# Apply specific stash
git stash apply stash@{1}

# Create new branch from stash
git stash branch feature/new-stash-branch

# Show stash content
git stash show stash@{0}

# Show stash diff
git stash show -p stash@{0}
```

### 3. Delete Stashes

```bash
# Delete latest stash
git stash drop

# Delete specific stash
git stash drop stash@{1}

# Delete all stashes
git stash clear
```

### 4. Recover Lost Commits

```bash
# See all commits even deleted branches
git reflog
# Output shows: commit refs, deletions, rebases, etc.

# Recover deleted branch
git reflog show feature/ENG-123
# Find the commit hash
git checkout -b feature/ENG-123-recovered abc1234

# View dangling commits
git fsck --lost-found
```

---

## Rewriting History

### 1. Rebase (Clean History)

```bash
# Rebase current branch on main
git rebase main

# If conflicts occur during rebase
# 1. Resolve conflicts
# 2. git add .
# 3. git rebase --continue
# Or abort with: git rebase --abort

# Interactive rebase (modify commits)
git rebase -i main

# Force push after rebase (ONLY on your branch!)
git push --force-with-lease origin feature/ENG-123
```

### 2. Squash Commits Before Merge

```bash
# Squash all commits into main
git merge --squash feature/ENG-123
git commit -m "ENG-123: Implement Weather API"

# Or use rebase to squash
git rebase -i main
# Mark all commits as 'squash' except first
# Git will combine them
```

### 3. Reset - Move Back in History

```bash
# Soft reset (keeps changes staged)
git reset --soft HEAD~1
# After: changes remain staged, can re-commit

# Mixed reset (default, keeps changes unstaged)
git reset --mixed HEAD~1
git reset HEAD~1  # Same as above

# Hard reset (DESTRUCTIVE - loses changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard abc1234

# Reset specific file to HEAD
git reset HEAD weather-api.js
```

### 4. Revert (Undo commit safely)

```bash
# Create new commit that undoes the changes
git revert abc1234

# Edit revert message
git revert abc1234 --edit

# Revert without committing
git revert -n abc1234

# Revert multiple commits
git revert abc1234 def5678 ghi9101
```

---

## Debugging with Git

### 1. Bisect - Find Breaking Commit

```bash
# Start bisect
git bisect start

# Mark current as bad (broken)
git bisect bad

# Mark known good commit
git bisect good abc1234

# Git checks out middle commit
# Test if broken
# If broken: git bisect bad
# If working: git bisect good

# Continue until git narrows down
# Git will tell you the exact breaking commit

# End bisect
git bisect reset
```

### 2. Find Commit with Problem

```bash
# Search for commits that broke something
git log -S "functionName" -- file.js

# Find who deleted a line
git log -p -- weather-api.js | grep -B 5 "function"

# Show commits with specific pattern
git log --grep="ENG-" --author="John"
```

### 3. See File History

```bash
# Full history of file
git log -- weather-api.js

# See all versions
git log -p -- weather-api.js

# See specific version
git show abc1234:weather-api.js

# Compare file across branches
git diff main feature/ENG-123 -- weather-api.js
```

---

## Performance Tips

### 1. Optimize Repository

```bash
# Run garbage collection
git gc

# Aggressive optimization (takes longer, better compression)
git gc --aggressive

# See repository size
du -sh .git

# Check object count
git count-objects
```

### 2. Shallow Clone (Faster for Large Repos)

```bash
# Clone only recent history
git clone --depth 1 https://github.com/user/repo.git

# Later, get full history
git fetch --unshallow

# Limit history to specific branches
git clone --single-branch --branch main https://github.com/user/repo.git
```

### 3. Sparse Checkout (Clone Only Specific Folders)

```bash
# Clone but don't checkout yet
git clone --sparse https://github.com/user/repo.git

# Specify which folders to checkout
git sparse-checkout set src/components tests/

# Only those folders are checked out
```

---

## Quick Command Reference

| Goal | Command |
|------|---------|
| Create feature branch | `git checkout -b feature/ENG-123-name` |
| Commit with ticket ID | `git commit -m "ENG-123: Description"` |
| Push new branch | `git push -u origin feature/ENG-123-name` |
| See commits vs main | `git log main..feature/ENG-123-name` |
| Compare branches | `git diff main feature/ENG-123-name` |
| Merge with squash | `git merge --squash feature/ENG-123-name` |
| Rebase on main | `git rebase main` |
| Interactive rebase | `git rebase -i main` |
| Cherry-pick commit | `git cherry-pick abc1234` |
| Undo last commit | `git reset --soft HEAD~1` |
| Delete branch (local) | `git branch -d feature/ENG-123-name` |
| Delete branch (remote) | `git push origin --delete feature/ENG-123-name` |
| View commit details | `git show abc1234` |
| Blame file | `git blame weather-api.js` |
| Stash changes | `git stash` |
| Apply stash | `git stash pop` |
| Abort merge | `git merge --abort` |
| See commit history | `git log --oneline --graph --all` |
| Find commits | `git log --grep="ENG-123"` |
| Recover deleted branch | `git reflog` + `git checkout -b branch hash` |

