---
title: 'How to Switch Pico 4 VR Headset from China to Global Firmware'
author: 'Joseph Then'
publishedAt: '2025-04-28'
description: 'Step-by-step guide to converting your Pico 4 VR headset from China region firmware to the global version, including important precautions and troubleshooting tips.'
tags: "VR, Pico 4, Firmware, Tutorial, Virtual Reality"
category: "Tech Guide"
---

**This article is for reference only. Do this at your own risk.**

This guide will walk you through the process of changing your Pico 4 VR headset's operating system from the China region firmware to the global version.

---
## Important Notes Before Proceeding

⚠️ **Warning:**
- This process will factory reset your device
- All locally stored data will be erased
- Some China-specific apps and features may no longer be available
- Ensure your headset has at least 50% battery before starting

---
## Preparation

1. **Backup your data**:
   - Sync important saves to the cloud
   - Note down your installed apps
   - Save any personal files to a computer

2. **Download the correct firmware**:
   ![Pico OS Website](/blog-data/pico4u-region-switch/pico-os-web.png)
   - Visit [Pico Global OS Download](https://www.picoxr.com/global/software/pico-os)
   - Select the latest global version for your Pico headset model
   - The file should be a `.zip` file

3. **Download SDK Platform Tools**:
   ![Android Platform Tools](/blog-data/pico4u-region-switch/platform-tools.png)
   - Visit [SDK Platform Tools](https://developer.android.com/tools/releases/platform-tools#downloads)
   - Download SDK Platform-Tools for your platform
   - This tool includes `adb`

---
## Installation Steps
Reference: [PicoVR FAQ - Offline Upgrade System](https://sdk.picovr.com/docs/FAQ/chapter_ninepointone.html)
### 1. Transfer the Firmware

1. Connect your Pico headset to your computer via USB cable
2. On your computer:
    - Navigate to the Pico's root directory
    - Create a folder named `dload` if it doesn't exist (case-sensitive)
    - Copy the downloaded `.zip` file directly into this folder
        - **Do not unzip** the file
        - **Do not rename** the file

### 2. Initiate the Update

1. On your Pico headset:
    - Go to **Settings** > **System Update**
2. In the top right corner, tap the menu button
3. Select **Offline Update**
4. Your Pico headset should start the update process

### 3. Complete the OS Update Process

1. Wait for the update to complete (typically 15-30 minutes)
    - The device will reboot several times
    - Do not interrupt the process
2. After completion, you'll need to:
    - Go through initial setup

Congratulations, your Pico should now be using the Global firmware version.

---
## Replacing Chinese Version of Apps with the Global Version
After completing the firmware update/switching process, you may notice that you are still unable to login using your global 
Pico account nor connect through the Pico Connect app. 
This is because the `User Center` app and a few other app are still using the Chinese version. 

We need to **manually** replace and overwrite them with the global version.

### Enabling Developer Mode and USB Debugging on Pico
To allow sideloading apps on our Pico using the ADB tool, we need to enable developer settings on the Pico and enable USB debugging.
1. Open **Settings** on your Pico headset
   ![](/blog-data/pico4u-region-switch/ss_pico_settings.jpeg)
2. Go to the **About** menu and **click on the `Software Version` 10 times** until the Developer option appears on the left panel
   ![](/blog-data/pico4u-region-switch/ss_pico_about.jpeg)
3. Go to the **Developer** menu and **toggle USB Debug on**
   ![](/blog-data/pico4u-region-switch/ss_pico_devsettings.jpeg)


### Installing Global Apps

#### Downloading the Global APKs
Download the global versions of the apps here: [Global APK Package Download](https://www.mediafire.com/file/zh8e9iln179uncn/pico_global_apk.zip/file)

After downloading, you should have the file `pico_global_apk.zip`. Extract this to a folder on your computer. The package contains these 5 essential APK files:
![List of global apps](/blog-data/pico4u-region-switch/global-apks.png)

#### Installation Steps

1. **Connect Your Pico Headset**
   - Use a USB cable to connect your Pico to your computer
   - Ensure USB debugging is enabled on your headset

2. **Prepare the Installation Environment**
   - Open a terminal (Command Prompt or PowerShell) in the directory where you extracted the APKs
   - Verify ADB connectivity with:
     ```shell
     adb devices
     ```
     Expected output (your device ID will differ):
     ```shell
     List of devices attached
     PA921AMGK3030054G       device
     ```
   - **Troubleshooting**: If multiple devices appear, either:
      - Disconnect other Android devices, or
      - Specify your Pico device with each command using `-s [deviceID]`

3. **Install the APKs**
   Run these commands one-by-one (the flags ensure proper installation):
   ```shell
   adb install -t -r -d matrix.apk
   adb install -t -r -d VRUserCenter2.apk
   adb install -t -r -d PVRHome.apk
   adb install -t -r -d store2d.apk
   adb install -t -r -d AvatarEditor.apk
   ```
   - `-t`: Allows test packages
   - `-r`: Replaces existing application
   - `-d`: Allows version code downgrade

4. **Verification**
   - Wait for "Success" messages for each APK
   - **Restart** your headset to complete the process

#### Completion
Your Pico headset should now be running the Global OS with all international apps available!

---
## Post-Installation

✔️ **Verify successful conversion**:
- Check for global store access
- Confirm language options include English and other global languages
- Verify your OS version in Settings > About Device

---
## Conclusion

By following these steps, you've successfully converted your Pico to the global firmware, giving you access to the international app store and global features. Enjoy your newly region-free VR experience!

For official support, visit [Pico Global Support](https://www.picoxr.com/global/support).

---
## Other Guides
[Owomushi](https://owomushi.com/): A Pico VR Resource Site - it has a guide on how to switch regions and other resources like APK packages. 