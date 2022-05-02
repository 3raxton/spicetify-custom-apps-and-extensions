import { VolumeProfile } from "./VolumeProfile";
async function main() {
    while (!Spicetify?.Player || !Spicetify?.LocalStorage) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    VolumeProfile.SettingsSection.addToggle("toggle-left-click-volume-profile", "Set Volume Profile on left click", VolumeProfile.ToggleSettings, () => {
      VolumeProfile.ToggleSettings = VolumeProfile.SettingsSection.getFieldValue("toggle-left-click-volume-profile") as boolean;
    });
    var middle = new VolumeProfile("middle", 50, "medium");
    var left = new VolumeProfile("left", 30, "low");
    var right = new VolumeProfile("right", 80,"high" );
    for (const profile of [right, middle, left]){
      profile.registerProfile();
    }
    VolumeProfile.SettingsSectionRegister();
}
export default main;