# Practical Git Exercise - Learn by Doing! 🎯

## Exercise 1: Your First Feature Branch

### Goal
Create a branch, make changes, and merge back to main.

### Steps to Follow

#### Step 1: Check Current Status
```bash
cd /workspaces/NewGitTest
git status
git log --oneline  # See commit history
```

**What you should see:**
- You're on `main` branch
- Working directory is clean (nothing to commit)

---

#### Step 2: Create Your Feature Branch
```bash
# Always fetch first to get latest changes
git fetch origin

# Update your main branch
git pull origin main

# Create new feature branch
git checkout -b feature/user-profile
```

**Verify:**
```bash
git branch          # See you're on feature/user-profile
git status          # Should show: "On branch feature/user-profile"
```

---

#### Step 3: Make Your First Changes
```bash
# Create a new file
cat > user-profile.txt << 'EOF'
User Profile Feature
====================

This feature adds user profile functionality.

Components:
- Profile page
- Edit profile
- Avatar upload
- Settings

Status: In Development
EOF

# Check what changed
git status
```

**You should see:**
```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        user-profile.txt
```

---

#### Step 4: Stage Changes
```bash
# Add the file
git add user-profile.txt

# Verify it's staged
git status
```

**You should see:**
```
Changes to be committed:
  (use "git add" ...)
        new file:   user-profile.txt
```

---

#### Step 5: Commit Changes
```bash
# Commit with a meaningful message
git commit -m "feat: Add user profile feature documentation"

# View your commit
git log --oneline -1
```

**Output:**
```
abc123def (HEAD -> feature/user-profile) feat: Add user profile feature documentation
```

---

#### Step 6: Make Another Change
```bash
# Add more content to simulate development
cat >> user-profile.txt << 'EOF'

API Endpoints:
- GET /api/users/:id - Get user profile
- PUT /api/users/:id - Update profile
- POST /api/users/:id/avatar - Upload avatar
- DELETE /api/users/:id - Delete account
EOF

# Check status
git status

# Add and commit
git add user-profile.txt
git commit -m "feat: Add API endpoints for user profile"
```

---

#### Step 7: View Your Commit History
```bash
# See all commits on your branch that aren't on main
git log main..HEAD --oneline

# Or see a nice visual tree
git log --graph --oneline -n 10 --all
```

---

#### Step 8: Make changes to README.md too
```bash
# Edit README
cat >> README.md << 'EOF'

## User Profile Feature
New feature for managing user profiles with edit and delete functionality.
EOF

git add README.md
git commit -m "docs: Update README with feature info"
```

---

#### Step 9: Push Your Branch to Remote
```bash
# Push for the first time (with tracking)
git push -u origin feature/user-profile

# Or you'll use this for future pushes
git push origin feature/user-profile

# Verify on GitHub
# Visit: https://github.com/sachinG549/NewGitTest/branches
# You should see your feature/user-profile branch there
```

---

#### Step 10: Simulate Code Review - Make More Changes
```bash
# Let's say your team asked for improvements
cat >> user-profile.txt << 'EOF'

## Database Schema
- users table
  - id (primary key)
  - username
  - email
  - avatar_url
  - created_at
  - updated_at
EOF

git add user-profile.txt
git commit -m "feat: Add database schema design"

# Push the new commit
git push origin feature/user-profile
```

---

## Exercise 2: Merge Your Branch Back to Main

### Goal
Learn how to properly merge your feature into main.

#### Step 1: Update Your Branch with Latest Main
```bash
# Fetch latest changes
git fetch origin

# Check if main has new commits
git log origin/main ^HEAD

# Rebase your branch with main (if there were changes)
# This keeps history clean
git rebase origin/main

# If conflicts, resolve them:
# git status  # to see conflicts
# (edit files manually)
# git add .
# git rebase --continue
```

---

#### Step 2: Verify Your Branch is Ahead
```bash
# See commits only on your branch
git log origin/main..HEAD --oneline

# Should show your commits:
# abc123def feat: Add database schema design
# xyz789abc feat: Add API endpoints for user profile
# def456abc feat: Add user profile feature documentation
```

---

#### Step 3: Merge to Main (Two Options)

**Option A: Merge via GitHub (Recommended in Companies)**
1. Go to https://github.com/sachinG549/NewGitTest
2. Click "Pull requests"
3. Click "New pull request"
4. Base: `main`, Compare: `feature/user-profile`
5. Click "Create pull request"
6. Add title: "feat: Add user profile feature"
7. Add description
8. Click "Create pull request"
9. Scroll down and click "Merge pull request"
10. Click "Confirm merge"
11. Click "Delete branch"

**Option B: Merge Locally (for learning)**
```bash
# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Merge your feature branch
git merge feature/user-profile

# Push to remote
git push origin main

# Delete local branch
git branch -d feature/user-profile

# Delete remote branch
git push origin --delete feature/user-profile
```

---

## Exercise 3: Working with Multiple Changes

### Goal
Learn how to handle multiple branches and different scenarios.

#### Scenario: You're working on multiple features

```bash
# You're on main (already merged feature/user-profile)
git checkout main
git pull origin main

# Start Feature 2
git checkout -b feature/notification-system

# Make changes
cat > notifications.txt << 'EOF'
Notification System
===================
- Email notifications
- In-app notifications
- Push notifications
EOF

git add notifications.txt
git commit -m "feat: Add notification system framework"
git push -u origin feature/notification-system

# Meanwhile, you're told to fix a critical bug
# You CANNOT commit to main, so create a bugfix branch

# First, save your current work (if needed)
git stash  # Temporarily save uncommitted changes

# Switch to main
git checkout main
git pull origin main

# Create bugfix branch
git checkout -b bugfix/login-error

# Fix the bug
cat > bug-fix.txt << 'EOF'
Fixed: Login error when email has uppercase letters
EOF

git add bug-fix.txt
git commit -m "fix: Handle uppercase letters in login email"
git push -u origin bugfix/login-error

# After bugfix is merged, come back to your notification feature
git checkout feature/notification-system
git stash pop  # Restore your work

# Continue development
cat >> notifications.txt << 'EOF'

API:
- POST /api/notifications - Send notification
- GET /api/notifications - Get user notifications
EOF

git add notifications.txt
git commit -m "feat: Add notification APIs"
git push origin feature/notification-system
```

---

## Exercise 4: Handling Merge Conflicts

### Goal
Learn how to resolve conflicts (a real company scenario).

#### Create Conflict Scenario
```bash
# Switch to main
git checkout main
git pull origin main

# Create a branch that will conflict
git checkout -b feature/user-settings

# Edit README (we'll change same area as another branch)
cat > settings.txt << 'EOF'
User Settings
=============
These are the user settings features.

1. Privacy Settings
2. Notification Preferences
3. Email Settings
EOF

git add settings.txt
git commit -m "feat: Add user settings feature"
git push -u origin feature/user-settings

# Meanwhile, another developer also edits same area
# Simulate this by going to main and making a different change
git checkout main
git pull origin main

git checkout -b feature/privacy-controls

# Edit same file differently
cat > settings.txt << 'EOF'
User Settings Management
========================
Core settings features:

1. Account Settings
2. Privacy Controls
3. Two-Factor Authentication
EOF

git add settings.txt
git commit -m "feat: Add privacy and security settings"
git push -u origin feature/privacy-controls

# Merge privacy-controls to main first (it's the "other developer's" branch)
git checkout main
git pull origin main
git merge feature/privacy-controls
git push origin main
git branch -d feature/privacy-controls

# Now try to merge your feature/user-settings
# This will create a conflict!
git checkout feature/user-settings
git fetch origin
git rebase origin/main

# You'll see: CONFLICT (content conflict in settings.txt)
```

#### Resolve the Conflict
```bash
# See the conflict
git status

# Open settings.txt and you'll see:
# <<<<<<< HEAD
# Your changes here
# =======
# Their changes here
# >>>>>>> origin/main

# Manually edit to combine both changes
cat > settings.txt << 'EOF'
User Settings Management
========================
These are the user settings features.

1. Account Settings
2. Privacy Controls
3. Privacy Settings
4. Notification Preferences
5. Email Settings
6. Two-Factor Authentication
EOF

# Mark as resolved
git add settings.txt

# Continue rebase
git rebase --continue

# Push your branch
git push origin feature/user-settings
```

---

## Exercise 5: Advanced Git Operations

### A: Cherry Pick (Copy a commit from another branch)

```bash
# You need a specific commit from another branch
# But not the whole branch

# First, find the commit you want
git log feature/some-other-branch --oneline

# Let's say you found commit abc123def and want it

git checkout your-branch
git cherry-pick abc123def

# If conflicts, resolve then:
git add .
git cherry-pick --continue

# Or abort
git cherry-pick --abort
```

### B: Squash Commits (Combine multiple commits into one)

```bash
# You made 5 small commits, but want to combine them

# Check your commits
git log main..HEAD --oneline

# Interactive rebase
git rebase -i origin/main

# In the editor that opens:
# pick   abc123def first commit
# squash xyz789abc second commit (combines with first)
# squash def456abc third commit (combines with second)
# ...

# Save file
# It will ask for new combined commit message
# Update the message and save

# Push (if you already pushed before, use --force-with-lease)
git push --force-with-lease origin feature/your-branch
```

### C: View Who Changed What

```bash
# See author of each line in a file
git blame filename.js

# See what changed in a commit
git show abc123def

# See commits touching specific lines
git log -p -S "specific text" filename.js
```

### D: Check Out Old Version of File

```bash
# Restore file from specific commit
git checkout abc123def -- filename.js

# This brings that version into your current branch
# You can then commit this change
git add filename.js
git commit -m "docs: Restore old version of file"
```

---

## Real Company Scenarios

### Scenario 1: Urgent Production Hotfix

```bash
# You're working on feature/new-dashboard
# But production has a critical bug

# Save your current work
git stash

# Go to main and update
git checkout main
git pull origin main

# Create hotfix branch
git checkout -b hotfix/payment-crash

# Fix the critical issue
# (edit files)

git add .
git commit -m "fix: Resolve payment page crash on checkout"
git push -u origin hotfix/payment-crash

# Merge to main immediately
git checkout main
git pull origin main
git merge hotfix/payment-crash
git push origin main
git push origin v1.0.1 # Maybe tag as release

# Delete hotfix branch
git branch -d hotfix/payment-crash
git push origin --delete hotfix/payment-crash

# Go back to your feature
git checkout feature/new-dashboard
git stash pop
```

### Scenario 2: Large Feature - Team Collaboration

```bash
# Main branch is protected (no direct commits)
# Team of 3 developers on same feature

# All start from same base
git checkout main
git pull origin main

# Each creates own branch (from feature team branch or main)
git checkout -b feature/dashboard-backend  # Dev 1
git checkout -b feature/dashboard-ui       # Dev 2
git checkout -b feature/dashboard-tests    # Dev 3

# Each works independently
# Each pushes their branch
# Each creates their own PR

# PRs are reviewed separately
# Merged in order (or might need rebasing)

# Final dashboard merge might need:
git fetch origin
git rebase origin/main
# (resolve any conflicts from other PRs merged first)
git push origin feature/dashboard-backend
```

### Scenario 3: Accidental Commit to Main

```bash
# Oh no! You did work on main by mistake
# You did: git add . && git commit -m "oops"
# But didn't push yet

# Get the commit hash
git log --oneline -3

# abc123def oops
# def456abc some other commit
# xyz789abc another

# Option 1: Create new branch from your commit
git branch feature/recover-changes abc123def

# Reset main to before your commit
git reset --soft def456abc

# Now your changes are uncommitted on main
git stash

# Switch to your feature branch
git checkout feature/recover-changes

# Pop your changes
git stash pop

# Push your branch
git push -u origin feature/recover-changes

# Option 2: If already pushed (scary!)
# Contact your team - you might need to force reset
git reset --hard def456abc
git push --force-with-lease origin main
# ☝️ DANGEROUS - only if you have permission!
```

---

## Debugging Commands

```bash
# Lost a commit?
git reflog  # Find it here

# Find who deleted a branch
git reflog -n 20

# See all uncommitted changes
git diff
git diff --staged

# Find when a line was deleted
git log -p -S "specific text"

# Find which branch has your commit
git branch -a --contains abc123def

# See what would merge without actually merging
git merge --no-commit --no-ff feature/branch
git merge --abort

# Test if branch can merge cleanly
git merge-base --is-ancestor feature/branch main && echo "Can merge" || echo "Cannot merge"
```

---

## Your Learning Path

### Day 1 - Master These
- [ ] Create and switch branches
- [ ] Stage and commit changes
- [ ] Push to remote
- [ ] Merge branches
- [ ] Delete branches

### Day 2 - Get Comfortable With
- [ ] Resolving merge conflicts
- [ ] Rebasing branches
- [ ] Viewing commit history
- [ ] Undoing changes

### Day 3 - Become Advanced
- [ ] Cherry picking
- [ ] Squashing commits
- [ ] Interactive rebase
- [ ] Stashing and applying
- [ ] Dealing with multiple branches

### Day 4+ - Master Edge Cases
- [ ] Complex rebases
- [ ] Recovering lost commits
- [ ] Force pushing safely
- [ ] Complex merges
- [ ] Team workflows

---

## Tips to Remember

✅ **DO:**
- Commit often with good messages
- Always pull before starting work
- Always rebase before pushing
- Always review what you're committing
- Always create descriptive commit messages
- Always delete branches after merging
- Always keep main branch clean

❌ **DON'T:**
- Commit directly to main
- Force push to shared branches
- Make huge commits with many changes
- Skip reviewing diffs
- Commit secrets or passwords
- Commit node_modules or build files
- Use vague commit messages like "update"

---

## Commands Cheat Sheet For Exercises

```bash
# Create and work
git checkout -b feature/name
git add file
git commit -m "message"
git push -u origin feature/name

# Update
git fetch origin
git pull origin main
git rebase origin/main

# Merge
git checkout main
git merge feature/name
git push origin main

# Cleanup
git branch -d feature/name
git push origin --delete feature/name

# Undo
git reset --soft HEAD~1
git reset --hard HEAD~1
git checkout -- file

# History
git log --oneline --graph --all
git show abc123def
git diff main feature/name

# Emergency
git stash
git stash pop
git reflog
```

---

Now go do Exercise 1! Start with Step 1 and follow along. Come back to this guide anytime you need help! 🚀

