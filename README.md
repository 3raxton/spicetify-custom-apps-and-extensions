<p align="center"><a href="https://github.com/3raxton/spicetify-custom-apps/"
target="_blank"><br><img width="100" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/fire_1f525.png"></a></p>
<h1 align="center">Spicetify Custom Apps and Extensions</h1>
<p align="center">A repository to help users find custom apps and extensions for  <a href="https://github.com/khanhas/spicetify-cli" target="_blank"> spicetify-cli</a></p>
<p align="center">
</a>
<a><img src="https://img.shields.io/badge/more-Custom%20Apps%20&amp;%20Extensions-orange.svg" alt="More Custom Apps and Extensions"></a>
<a><img src="https://img.shields.io/badge/for-spicetify-E71A0E.svg" alt="For Spicetify"></a>
<a href="https://3raxton.github.io/license"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2F3raxton%2Fspicetify-customapps%2F&count_bg=%23E71A0E&title_bg=%23000000&icon=spotify.svg&icon_color=%23E71A0E&title=hits&edge_flat=false"/></a></p>

## Summary
- 🔥 A central location for custom apps and extensions for spicetify-cli
- 👀 More features
- 🎉 Open source

## How to add Custom Apps or Extensions to Spicetify

1. [Install spicetify-cli using the instructions found here](https://github.com/khanhas/spicetify-cli/wiki/Installation)
2.  Click on the green `Clone or download` button at the <b>top right</b> this repo  and choose ```Download ZIP```
3.  Unzip the .zip file 
4. Choose the app that you want and drag it out of the folder
5. Open the spicetify-cli CustomApps folder (paths can be found below)
6. Drag the custom app into the CustomApps folder
7. Open ```config.ini``` and add the name of the custom app to the ```custom_apps``` line separated by the ```|``` character
```
[AdditionalOptions]
...
custom_apps = reddit|genius|yourownapp
```
- OR add the respective apps / extension by typing:
```
spicetify config extensions CustomAppOrExtensionName.js
```
8. Run ```spicetify backup apply``` in the command line and Spicetify will install the app
9. You're set! 🎉

### CustomApps Folder Paths

| **Platform**|**Path**                                                                                    |
| ------------|--------------------------------------------------------------------------------------------|
| **macOS**   |~/spicetify_data/Themes <br> **OR**<br>$SPICETIFY_CONFIG/CustomApps                         |
| **Windows** |%userprofile%\\.spicetify\CustomApps\                                                        |
| **Linux**   |~/.config/spicetify/CustomApps <br> **OR**<br>$XDG_CONFIG_HOME/.config/spicetify/CustomApps/|


## Want to contribute your custom app(s) to this repo? 
Follow the instructions below or read the <a href="https://github.com/3raxton/spicetify-custom-apps/blob/main/CONTRIBUTING.md"  target="_blank">CONTRIBUTING.md file</a>!

1. Fork this repository
2. Create another folder with your custom app name **in all lower case with no symbols (dashes and underscores are okay) or spaces.**
     - **Ensure the files and folders don't contain the word spicetify**
3. Copy the necessary files into the folder
4. Create a README.md in it with the following structure
```
# App Name

## Screenshots

[Put at least one image of the app working here]

## More

[Specify any dependencies, author name, and any other info about the custom app]
```
5. **(Optional)** Add your name and custom apps or extensions to the <a href="https://github.com/3raxton/spicetify-custom-apps/blob/main/AUTHORS.md"  target="_blank">AUTHORS.md</a> file 
     - **If you decide to add your name, please use the following format**
```
# Authors
...
### [Your name](link to website, GitHub profile, donation page, etc.)

- [Your custom app](link to repo)
     - Your custom app description and other info
```
6. Open a Pull Request

## Support

* If you run into any issues or need help troubleshooting any custom apps or extensions reach out to the Spicetify community on [Spectrum](https://spectrum.chat/spicetify)

* If there are bugs or you'd like to request a feature, open an issue using the respective template.

## License
Licensed under the [MIT License](https://3raxton.github.io/license) by [Braxton Huff](https://github.com/3raxton) 

### **If there is any other problem, please refer to the <a href="https://github.com/khanhas/spicetify-cli/wiki"  target="_blank">spicetify-cli wiki</a> to help troubleshoot your problem.**

### **Hopefully this helps improve your use of Spotifty and treats you well! Cheers!**
