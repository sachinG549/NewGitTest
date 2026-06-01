# Complete Git Workflow Guide - Company Standards 🚀

## Table of Contents
1. [Git Basics](#git-basics)
2. [Branching Strategy](#branching-strategy)
3. [Common Workflows](#common-workflows)
4. [Advanced Commands](#advanced-commands)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Git Basics

### What is Git?
Git is a distributed version control system that tracks changes to your code. Every developer has a complete copy of the project history.

### Key Concepts
- **Repository (Repo)**: Your project folder with Git history
- **Branch**: An independent line of development
- **Commit**: A snapshot of your changes with a message
- **Remote**: A central repository (like GitHub)
- **Local**: Your computer's repository

---

## Branching Strategy

### Why Branches?
Branches allow multiple developers to work on features simultaneously without conflicts.

### Main Branch Types (Company Standard)
```
main/master
├── production-ready code
├── should be stable
└── protected from direct commits

develop (in some companies)
├── integration branch
├── where features merge
└── tested before main

feature/feature-name
├── your work branches
├── created from develop or main
└── merged via Pull Request (PR)
```

---

## Common Workflows

### 1. Basic Setup - First Time
```bash
# Clone the repository
git clone https://github.com/username/project.git
cd project

# Check current branch
git branch

# Check remote branches
git branch -a

# Set your Git identity (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
```

### 2. Create & Switch to a Feature Branch
```bash
# Always update main first
git checkout main
git pull origin main

# Create new branch from main
git checkout -b feature/user-authentication

# Shorthand (Git 2.23+)
git switch -c feature/user-authentication

# Create and set tracking branch
git push -u origin feature/user-authentication
```

**Branch Naming Convention (Company Standard):**
```
feature/feature-name           # New features
bugfix/bug-description         # Bug fixes
hotfix/critical-issue          # Emergency fixes
refactor/component-name        # Code refactoring
docs/documentation-update      # Documentation
```

### 3. Make Changes & Commit
```bash
# Check what changed
git status

# Stage specific files
git add filename1 filename2

# Stage all changes
git add .

# View changes before committing
git diff              # Unstaged changes
git diff --staged     # Staged changes

# Commit with meaningful message
git commit -m "feat: Add user authentication system"

# Commit convention (Company Standard - Semantic Commits):
# feat:      new feature
# fix:       bug fix
# docs:      documentation
# refactor:  code refactoring
# test:      adding tests
# chore:     maintenance
```

### 4. Push Changes to Remote
```bash
# Push to your branch
git push origin feature/user-authentication

# Push and set upstream (first time)
git push -u origin feature/user-authentication

# Push specific commits
git push origin HEAD

# Push with force (USE CAREFULLY - never on main!)
git push --force-with-lease origin feature/user-authentication
```

### 5. Create Pull Request (PR)
```bash
# You can do this via GitHub UI or CLI

# Using GitHub CLI (if installed)
gh pr create --title "Add user authentication" \
             --body "Implements login/logout functionality" \
             --base main

# View all your PRs
gh pr list --author @me
```

**PR Description Template (Company Standard):**
```markdown
## Description
Brief description of what this PR does

## Changes Made
- Change 1
- Change 2
- Change 3

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How to Test
1. Step 1
2. Step 2
3. Expected result

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] Documentation updated
```

### 6. Keep Your Branch Updated
```bash
# While you're developing, main might get updates
# Fetch latest changes from remote
git fetch origin

# See if main has new commits
git log origin/main ^HEAD

# Update your branch with latest main
git rebase origin/main       # Linear history (preferred in companies)
git merge origin/main        # Creates merge commit (alternative)

# Handle conflicts if any
# Edit files manually, then:
git add .
git rebase --continue
# or
git rebase --abort (to cancel)
```

### 7. Merge Pull Request
```bash
# Locally merge your branch into main (after PR approval)

# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Merge your feature branch
git merge feature/user-authentication

# Push to remote
git push origin main

# Delete local feature branch
git branch -d feature/user-authentication

# Delete remote feature branch
git push origin --delete feature/user-authentication
# or
git branch -dr origin/feature/user-authentication
```

---

## Advanced Commands

### 1. View Commit History
```bash
# Simple log
git log

# One line per commit
git log --oneline

# Show last 10 commits
git log -10 --oneline

# Show commits with graph (very useful!)
git log --graph --oneline --all --decorate

# Show commits by specific author
git log --author="Your Name"

# Show commits since date
git log --since="2024-01-01" --until="2024-12-31"

# Search commit messages
git log --grep="authentication"

# Show commits for specific file
git log filename

# Show what changed in each commit
git log -p

# Show statistics
git log --stat
```

### 2. Stashing (Temporary Save)
```bash
# You're on a branch with uncommitted changes
# But need to switch branch urgently

# Save changes temporarily
git stash

# Now you can switch branches
git checkout main

# Switch back
git checkout feature/user-authentication

# Restore stashed changes
git stash pop

# View all stashes
git stash list

# Apply specific stash (without removing)
git stash apply stash@{0}

# Delete stash
git stash drop stash@{0}
```

### 3. Rebasing (Clean History)
```bash
# Interactive rebase - modify your last N commits
git rebase -i HEAD~3

# In interactive rebase, you can:
# pick   - keep commit
# reword - change commit message
# squash - combine with previous
# fixup  - combine without message
# drop   - remove commit

# Rebase against main (recommended over merge)
git rebase origin/main

# If conflict occurs
git status  # see conflicts
# Edit files manually
git add .
git rebase --continue
# or abort
git rebase --abort
```

### 4. Cherry Pick (Apply Specific Commits)
```bash
# Copy a commit from another branch
git cherry-pick abc123def

# Multiple commits
git cherry-pick abc123def xyz789abc

# Range of commits
git cherry-pick abc123def^..xyz789abc

# If conflicts
git cherry-pick --abort
```

### 5. Reset & Undo Changes
```bash
# Discard changes in working directory
git restore filename
# or (older Git)
git checkout -- filename

# Unstage file
git restore --staged filename
git reset filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
# WARNING: This deletes your work!

# Go back to specific commit (safe)
git checkout abc123def

# Go back but keep as new branch
git checkout -b recovery-branch abc123def

# View all changes you've made
git reflog
```

### 6. Tagging (Mark Versions)
```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag (with message)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin v1.0.0
git push origin --tags

# List tags
git tag -l

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### 7. Comparing Branches
```bash
# See what's different
git diff main feature/user-authentication

# See commits on feature but not on main
git log main..feature/user-authentication

# See commits on main but not on feature
git log feature/user-authentication..main

# See all commits different between branches
git log main...feature/user-authentication
```

---

## Best Practices

### 1. Commit Messages (Company Standard)
```
✅ GOOD:
feat: Add user authentication system
fix: Resolve null pointer exception in payment handler
docs: Update API documentation
refactor: Simplify database query logic

❌ BAD:
fixed bugs
update
work in progress
asdf
```

### 2. Before Pushing
```bash
# Always do this checklist:

# 1. Update your branch with main
git fetch origin
git rebase origin/main

# 2. Run tests (if available)
npm test

# 3. Check your commits
git log origin/main..HEAD --oneline

# 4. Ensure code follows standards
npm run lint

# 5. Then push
git push origin feature/user-authentication
```

### 3. PR Review Checklist
- [ ] Code is clean and follows style guide
- [ ] No hardcoded values
- [ ] Comments where logic is complex
- [ ] Tests added/updated
- [ ] No console.logs or debug code
- [ ] Performance considered
- [ ] Security reviewed

### 4. Branch Cleanup
```bash
# Regular maintenance
git fetch origin
git branch -r --merged origin/main | grep -v main | xargs -I {} git push origin --delete {}

# Delete old local branches
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d
```

---

## Troubleshooting

### Problem 1: Accidentally Committed to Main
```bash
# If you haven't pushed yet
git log --oneline (find your commit hash)
git checkout main
git rebase -i abc123def^ (where abc123def is your commit)
# Mark commit as "drop"

# If already pushed to main
# Contact your team lead - might need force push
git reset --soft HEAD~1
git checkout -b feature/recover-changes
git push origin feature/recover-changes
# Then create PR and fix main
```

### Problem 2: Merge Conflicts
```bash
# When merging/rebasing and conflicts occur
git status  # see files with conflicts

# Files show:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> branch-name

# Edit files manually to resolve
# Then:
git add .
git rebase --continue  # if rebasing
git commit -m "Merge conflict resolved"  # if merging
```

### Problem 3: Lost Commits
```bash
# Don't panic! Git saves everything
git reflog  # see all actions

# Find your lost commit
git show abc123def

# Create a branch from it
git checkout -b recovery-branch abc123def
```

### Problem 4: Need to Change Last Commit Message
```bash
# Last commit not pushed
git commit --amend -m "New commit message"

# Already pushed (avoid if not your branch)
git commit --amend -m "New message"
git push --force-with-lease origin feature/branch
```

### Problem 5: Accidentally Deleted Branch
```bash
git reflog  # find the commit hash
git checkout -b recovered-branch abc123def
```

---

## Complete Practical Workflow (Step by Step)

### Scenario: You're assigned to add a new feature

```bash
# Step 1: Start fresh
cd your-project
git status  # Should be clean
git checkout main
git pull origin main

# Step 2: Create feature branch
git checkout -b feature/add-search-functionality

# Step 3: Make changes
echo "// Search logic" > src/search.js
# Edit and save files...

# Step 4: Check status
git status

# Step 5: Stage changes
git add src/search.js

# Step 6: Review before commit
git diff --staged

# Step 7: Commit
git commit -m "feat: Add search functionality to dashboard"

# Step 8: Push
git push -u origin feature/add-search-functionality

# Step 9: Create PR on GitHub
# - Go to your repo
# - Click "Compare & pull request"
# - Add description
# - Submit PR

# Step 10: Wait for reviews
# - Colleagues review your code
# - They might request changes

# Step 11: If changes requested, make them
git add .
git commit -m "feat: Add search functionality - improve performance"
git push origin feature/add-search-functionality
# PR auto-updates!

# Step 12: After approval, merge on GitHub
# or locally:
git checkout main
git pull origin main
git merge feature/add-search-functionality
git push origin main

# Step 13: Cleanup
git branch -d feature/add-search-functionality
git push origin --delete feature/add-search-functionality
```

---

## Commands Cheat Sheet

```bash
# Setup
git config --global user.name "Name"
git config --global user.email "email@company.com"

# Branches
git branch                          # List local branches
git branch -a                       # List all branches
git checkout -b feature/name        # Create and switch
git switch -c feature/name          # Modern way
git checkout main                   # Switch branch
git switch main                     # Modern way
git branch -d feature/name          # Delete branch

# Changes
git status                          # See what changed
git add file.js                     # Stage file
git add .                           # Stage all
git commit -m "message"             # Commit
git push origin main                # Push to remote
git pull origin main                # Pull from remote

# History
git log --oneline                   # View commits
git log --graph --all               # Visual tree
git show abc123def                  # Show commit details
git diff main feature/branch        # Compare branches

# Undo
git restore file.js                 # Discard changes
git reset --soft HEAD~1             # Undo commit (keep changes)
git reset --hard HEAD~1             # Undo commit (delete changes)
git revert abc123def                # Create opposite commit

# Advanced
git rebase origin/main              # Update with main
git cherry-pick abc123def           # Copy commit
git stash                           # Save temporarily
git stash pop                       # Restore stash
git tag v1.0.0                      # Create release tag

# Search
git log --author="Name"             # By author
git log --since="2024-01-01"        # By date
git log --grep="search term"        # In messages
git log -- filename                 # For specific file
```

---

## Company Standard Workflow Summary

### Day-to-Day as a Developer

1. **Start of day**: `git pull origin main`
2. **Create feature**: `git checkout -b feature/my-feature`
3. **Code**: Edit files, test locally
4. **Commit often**: `git add .` → `git commit -m "..."`
5. **Before push**: `git rebase origin/main`
6. **Push**: `git push origin feature/my-feature`
7. **Create PR**: Through GitHub UI
8. **Respond to reviews**: Make changes, push again
9. **Merge**: Merge via PR (usually GitHub UI)
10. **Cleanup**: Delete branch

### What NOT to do
❌ Never commit to main directly
❌ Never force push to shared branches
❌ Never commit secrets/passwords
❌ Never merge without code review
❌ Never use meaningless commit messages
❌ Never commit node_modules or build files

---

## Resources
- Git Official Docs: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Interactive Git Learning: https://learngitbranching.js.org

Happy coding! 🚀
