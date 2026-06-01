# Git Quick Reference - Keep Handy! ⚡

## 🚀 Your Daily Workflow (Copy/Paste)

### Morning - Start Your Day
```bash
git checkout main
git pull origin main
```

### Start New Feature
```bash
git checkout -b feature/what-you're-building
```

### Development Loop (Repeat)
```bash
# Make changes, then:
git status                          # See what changed
git add .                          # Stage all changes
git commit -m "feat: Your message" # Commit
git push origin feature/branch     # Push to remote
```

### Before Pushing
```bash
git fetch origin
git rebase origin/main             # Update with latest main
git push origin feature/branch
```

### Create Pull Request
Go to: https://github.com/sachinG549/NewGitTest/pull/new

### End of Day - After Merge
```bash
git checkout main
git pull origin main
git branch -d feature/branch
git push origin --delete feature/branch
```

---

## 📋 Common Operations

| What You Need | Command |
|---|---|
| See what you changed | `git status` or `git diff` |
| Add file | `git add filename` |
| Add everything | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push origin branch-name` |
| Pull latest | `git pull origin main` |
| Switch branch | `git checkout branch-name` |
| Create branch | `git checkout -b feature/name` |
| Delete branch | `git branch -d branch-name` |
| See commits | `git log --oneline` |
| Merge branch | `git merge branch-name` |
| Undo changes | `git restore file.js` |
| Unstage file | `git restore --staged file.js` |
| Undo commit (keep changes) | `git reset --soft HEAD~1` |
| Undo commit (delete changes) | `git reset --hard HEAD~1` |

---

## 🎯 Branch Naming Quick Reference

```
feature/feature-name           # New features
bugfix/bug-name               # Bug fixes  
hotfix/critical-issue         # Emergency fixes
refactor/component            # Code cleanup
docs/update-name              # Documentation
```

---

## 💬 Commit Message Quick Reference

```
feat:      New feature
fix:       Bug fix
docs:      Documentation
refactor:  Code reorganization
test:      Adding/updating tests
chore:     Maintenance work
style:     Code style changes
perf:      Performance improvements
```

**Examples:**
- `feat: Add user authentication`
- `fix: Resolve login page crash`
- `docs: Update API documentation`
- `refactor: Simplify payment logic`

---

## 🔄 Sync With Main Branch

### When you haven't pushed yet:
```bash
git fetch origin
git rebase origin/main
git push origin feature/branch
```

### When you've already pushed:
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature/branch
```

### If you prefer merge (creates merge commit):
```bash
git fetch origin
git merge origin/main
git push origin feature/branch
```

---

## ⚠️ Merge Conflicts

### When you see "CONFLICT":
```bash
# 1. Check which files have conflicts
git status

# 2. Open each conflicted file
# Look for: <<<<<<< HEAD
#           your changes
#           =======
#           their changes
#           >>>>>>>

# 3. Edit manually to keep what you want

# 4. Mark as resolved
git add filename

# 5. Continue if rebasing:
git rebase --continue

# 6. Or just commit if merging:
git commit -m "Merge conflict resolved"
```

---

## 🚨 Oh No! Recovery

| Problem | Solution |
|---|---|
| Changed wrong file | `git restore filename` |
| Staged wrong file | `git restore --staged filename` |
| Made wrong commit | `git reset --soft HEAD~1` |
| Need to undo pushed commit | `git revert abc123def` |
| Lost my commits | `git reflog` then `git checkout abc123def` |
| Deleted branch accidentally | `git reflog` then `git checkout -b branch-name abc123def` |
| Committed to main by accident | `git reset --soft HEAD~1` then create new branch |

---

## 🔍 Viewing History

```bash
git log --oneline                    # Simple list
git log --oneline -5                 # Last 5 commits
git log --graph --all --oneline      # Visual tree
git log --author="Your Name"         # Your commits
git log --since="2024-01-01"        # By date range
git log --grep="search"             # Search messages
git log main..feature/branch        # Commits only on feature
git show abc123def                  # Details of commit
git diff main feature/branch        # Compare branches
```

---

## 📚 Useful Commands By Scenario

### "I need to save work temporarily"
```bash
git stash
# (switch branches)
git stash pop
```

### "I want to copy one commit from another branch"
```bash
git cherry-pick abc123def
```

### "I want to combine my small commits into one"
```bash
git rebase -i origin/main
# Mark commits as 'squash'
```

### "I need to see who changed this line"
```bash
git blame filename.js
```

### "I want to see all my branches"
```bash
git branch -a
```

### "I want to fetch but not merge"
```bash
git fetch origin
```

### "I want to see uncommitted changes"
```bash
git diff                 # vs your last commit
git diff --staged        # what you've staged
```

### "I want to tag a release"
```bash
git tag v1.0.0
git push origin v1.0.0
```

### "I accidentally worked on wrong branch"
```bash
# Check which branch has your commits
git branch -a --contains abc123def

# Or create branch from current state
git branch feature/where-i-should-be
git reset --hard HEAD~3    # Or however many commits
git checkout feature/where-i-should-be
```

---

## 🎓 Company Standard Checklist

Before pushing each time, do this:

- [ ] `git status` - Check what you're pushing
- [ ] `git fetch origin` - Get latest
- [ ] `git rebase origin/main` - Update with main
- [ ] `git log origin/main..HEAD --oneline` - Review your commits
- [ ] Read each commit message - Are they clear?
- [ ] `git diff origin/main` - Review all changes
- [ ] `git push origin feature/branch` - Finally push

---

## 🛠️ Config (One Time Setup)

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# View your config
git config --global -l

# Pretty log by default
git config --global alias.lg "log --graph --oneline --all --decorate"
# Then use: git lg
```

---

## 💡 Pro Tips

1. **Commit often** - Small commits are easier to review and debug
2. **Pull before pushing** - Always sync first: `git pull origin main`
3. **Rebase not merge** - `git rebase origin/main` keeps history clean
4. **Meaningful messages** - "fix: resolve X" not "fixed"
5. **Delete branches** - Keep repo clean: `git push origin --delete branch`
6. **Use `--force-with-lease`** - Safer than `--force`
7. **Review before committing** - `git diff` and `git diff --staged`
8. **Stash when switching** - Don't commit WIP: `git stash`

---

## 🔐 Never Commit These

- Passwords, API keys, secrets
- node_modules/
- .env files
- build/ or dist/ folders
- IDE folders (.idea/, .vscode/)
- OS files (.DS_Store, Thumbs.db)

Use .gitignore to prevent accidental commits!

---

## 🎮 Practice Commands Right Now

Try these to get comfortable:

```bash
# Check status
git status

# See branches
git branch -a

# See commits
git log --oneline -5

# See differences
git diff main HEAD

# Create a test branch
git checkout -b test/learning
echo "test" > test.txt
git add test.txt
git commit -m "test: practice commit"
git log --oneline -1

# Go back to main
git checkout main

# Delete test branch
git branch -d test/learning
```

---

## 📞 When You're Stuck

| If you see... | It means... | Solution |
|---|---|---|
| "detached HEAD" | You're not on a branch | `git checkout -b recovery-branch` |
| "commit is not a merge commit" | Trying to abort wrong operation | Check what you're doing |
| "CONFLICT" in rebase | Two changes to same area | Edit files, `git add .`, `git rebase --continue` |
| "Permission denied (publickey)" | SSH key issue | Check GitHub SSH key setup |
| "fatal: not a git repository" | You're not in a git folder | `cd` to the right folder |
| "Your branch is ahead by X commits" | You haven't pushed yet | `git push origin branch-name` |

---

## 🌟 Remember

- **Main branch** = Production code (always working!)
- **Your branch** = Safe place to experiment
- **Commit messages** = Future you will thank you
- **Pull requests** = Code review, quality gate
- **Merge** = Combining branches officially

**Start simple, practice often, become expert!** 🚀

