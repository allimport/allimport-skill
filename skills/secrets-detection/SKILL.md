---
name: secrets-detection
description: Use when scanning a codebase for hardcoded secrets, API keys, passwords, or credentials. Runs detect-secrets, git-secrets, and TruffleHog to find and prevent secret leaks.
---
# Secrets Detection

```bash
# Install detect-secrets
pip install detect-secrets

# Scan repository
detect-secrets scan --all-files --force-use-all-plugins

# Check for hardcoded secrets
git secrets --scan

# TruffleHog for git history
trufflehog git https://github.com/user/repo --only-verified
```
