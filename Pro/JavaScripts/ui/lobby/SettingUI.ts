import SettingUI_Generate from "../../ui-generate/common/SettingUI_generate";
import { UIClass } from "../base/UIBase";
import { UIType } from "../base/UIConfig";

@UIClass(UIType.SETTING_UI)
export default class SettingUI extends SettingUI_Generate {
    onAwake(): void {
        super.onAwake();

        // this.layer = mw.UILayerMiddle;
    }
}