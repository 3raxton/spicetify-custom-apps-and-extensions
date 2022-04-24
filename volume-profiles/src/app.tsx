import { VolumeProfile } from "./VolumeProfile";
async function main() {
    while (!Spicetify?.Player || !Spicetify?.PopupModal || !Spicetify.LocalStorage) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    VolumeProfile.SettingsSection.addToggle("toggle-left-click-volume-profile", "Set Volume Profile on left click", VolumeProfile.ToggleSettings, () => {
      VolumeProfile.ToggleSettings = VolumeProfile.SettingsSection.getFieldValue("toggle-left-click-volume-profile") as boolean;
    });
    var left = new VolumeProfile("left", 30, '<button class="volume-bar__icon-button control-button" aria-label="Volume profile medium" aria-describedby="volume-icon" aria-expanded="false"><svg role="presentation" height="16" width="16" aria-label="Volume medium" id="volume-icon" viewBox="0 0 16 16" class="Svg-sc-1bi12j5-0 hDgDGI"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path></svg></button>');
    var middle = new VolumeProfile("middle", 50, '<button class="volume-bar__icon-button control-button" aria-label="Volume profile low" aria-describedby="volume-icon" aria-expanded="false"><svg role="presentation" height="16" width="16" aria-label="Volume low" id="volume-icon" viewBox="0 0 16 16" class="Svg-sc-1bi12j5-0 hDgDGI"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path></svg></button>');
    var right = new VolumeProfile("right", 80, '<button class="volume-bar__icon-button control-button" aria-label="Volume profile high" aria-describedby="volume-icon"><svg role="presentation" height="16" width="16" aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16" class="Svg-sc-1bi12j5-0 hDgDGI"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg></button>');
    for (const profile of [right, middle, left]){
      profile.registerProfile();
    }
    VolumeProfile.SettingsSectionRegister();
}
  
export default main;