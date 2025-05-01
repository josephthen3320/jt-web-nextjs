---
title: 'Node.js Installation Guide for Windows Using fnm'
author: 'Joseph Then'
publishedAt: '2025-04-30'
description: 'A comprehensive guide to installing Node.js on Windows using fnm (Fast Node Manager), with options for npm and pnpm package managers.'
tags: "Node.js, JavaScript, Windows, Development, Tools"
category: 'tech guide'
---

This guide will walk you through installing Node.js on Windows using fnm (Fast Node Manager), a fast and simple Node.js version manager. We'll also cover how to set up either npm or pnpm as your package manager.

## Why Use fnm?
- 🚀 Faster than nvm (Node Version Manager)
- ✨ Simple installation and usage
- 🔄 Easy switching between Node.js versions
- 🏷️ Supports `.nvmrc` and `.node-version` files

## Prerequisites
- Windows 10/11
- PowerShell (comes pre-installed)
- Winget (Windows Package Manager, included in modern Windows versions)

## Installation Steps
### 1. Install fnm (Fast Node Manager)
Open PowerShell as Administrator and run:
```shell
winget install Schniz.fnm
```
After installation, close and reopen your PowerShell window to ensure fnm is in your PATH.

### 2. Install Node.js
To install the latest LTS version (recommended for most users):
```shell
fnm install --lts
```
For a specific version (replace `[version]` with the desired version number, e.g., `22`):
```shell
fnm install [version]
```

### 3. Set Default Node.js Version
To make your installed version the default: 
```shell
fnm default [version]
```

### 4. Verify Installation
Check that Node.js (and npm) is properly installed:
```shell
node -v   # should output something like v22.15.0
npm -v    # should output the npm version that comes with your Node.js installation
```

## Package Manager Options
### Using npm (default)
npm comes bundled with Node.js. You can start using it immediately:
```shell
npm init -y   # initialise a new project in the working directory
npm install [package-name]  # install packages
```

### Using pnpm (recommended for disk space efficiency)
To enable pnpm (a faster, disk-space efficient alternative):
```shell
corepack enable pnpm
```

Verify pnpm installation:
```shell
pnpm -v   # should output the pnpm version
```

## Switching Node.js Versions
With fnm, you can easily switch between Node.js versions:
1. List available versions:
    ```shell
   fnm list
   ```
   
2. Use a specific version:
    ```shell
   fnm use [version]
   ```

## Troubleshooting
If you encounter issues:
1. Ensure you've restarted PowerShell after fnm installation
2. Verify fnm is in your PATH: `Get-Command fnm`
3. Check for Windows updates
4. Verify node directory has been added to PATH

## Additional Resources
- [Official Node.js Downloads](https://nodejs.org/en/download)
- [fnm GitHub Repository](https://github.com/Schniz/fnm)
- [pnpm Documentation](https://pnpm.io/)

## Conclusion
You now have Node.js installed with fnm on your Windows machine, giving you flexibility to switch between versions easily.
Whether you choose npm or pnpm, you're ready to start building JavaScript applications!

Happy coding!