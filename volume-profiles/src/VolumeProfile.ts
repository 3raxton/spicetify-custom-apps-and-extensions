import u from "umbrellajs"
import { SettingsSection } from "spcr-settings";
var arrive = require("arrive");
export class VolumeProfile {
    private static ToggleSettingsId = "volume-profile-toggle-on-left-click";
    public static get ToggleSettings() : boolean{
        let toggle = Spicetify.LocalStorage.get(VolumeProfile.ToggleSettingsId);
        if (toggle != "true" && toggle != "false"){
            Spicetify.LocalStorage.set(VolumeProfile.ToggleSettingsId, "true");
            return true;
        }else{
            return toggle == "true";
        }
    }
    public static set ToggleSettings(value : boolean){
        Spicetify.LocalStorage.set(VolumeProfile.ToggleSettingsId, value.toString())
    }
    private static SettingsRegistered: boolean = false;
    public static SettingsSection = new SettingsSection("Volume Profile Settings", "volume-profile-settings");
    public static SettingsSectionRegister(){
        if (!VolumeProfile.SettingsRegistered){
            VolumeProfile.SettingsRegistered = true;
            VolumeProfile.SettingsSection.pushSettings();
        }else{
            throw "Settings already registered"
        }
    }
    private static localStorageIdPref = 'localStorage-volume-profile-';
    private static settingIdPref = "settings-volume-profile-"

    private readonly _id : string;
    public buttonElement : any;
    constructor(id : string, defaultVolume : number, buttonElement : string) {
        this._id = id;
        this.buttonElement = u(buttonElement)
        if (isNaN(this.volume)) this.volume = defaultVolume;
    }
    public get settingId() : string {
        return VolumeProfile.settingIdPref + this._id;
    }
    public get localStorageId() : string {
        return VolumeProfile.localStorageIdPref + this._id;
    }
    public toString() : string {
        return this.volume.toFixed(2).toString();
    }
    public get volume() : number {
        let volume = Spicetify.LocalStorage.get(this.localStorageId);
        if (isNaN(Number(volume))) {
            return NaN
        }
        return Number(volume);
    }
    public set volume(value : number){
        Spicetify.LocalStorage.set(this.localStorageId, value.toString());
    }
    public static isValidVolume(value : string) : boolean{
        return !(value == "" || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100);
    }
    public registerSetting(){
        VolumeProfile.SettingsSection.addInput(this.settingId,`Volume of Profile "${this._id}"`,this.toString(), () => {
            var changedVolume = VolumeProfile.SettingsSection.getFieldValue(this.settingId) as string
            if (VolumeProfile.isValidVolume(changedVolume)){
                Spicetify.LocalStorage.set(this.localStorageId, changedVolume)
                Spicetify.showNotification(`Saved Volume Profile "${this._id}" to ${this.toString()}`)
            }
        });
    }

    public registerButton(){
        document.arrive(".main-nowPlayingBar-right > *", {existing:  true, onceOnly : true}, (element : HTMLElement) => {
            this.buttonElement.on("click", () => {
                Spicetify.Player.setVolume(this.volume / 100);
            })
            this.buttonElement.on("contextmenu", () => {
                if (VolumeProfile.ToggleSettings){
                    this.volume = Spicetify.Player.getVolume() * 100;
                    Spicetify.showNotification('Volume of "' + this._id + '" changed to ' + this.toString())
                    VolumeProfile.SettingsSection.setFieldValue(this.settingId, this.volume.toString()) //here it should not be fixed
                    VolumeProfile.SettingsSection.rerender()
                }
            })
            u(element).prepend(this.buttonElement);
        })
    }
    public registerProfile(){
        this.registerButton();
        this.registerSetting();
    }
}
