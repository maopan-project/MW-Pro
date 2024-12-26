import MainUI_Generate from "../../ui-generate/common/MainUI_generate";
import { UIClass } from "../base/UIBase";
import { UIType } from "../base/UIConfig";

@UIClass(UIType.MAIN_UI)
export default class MainUI extends MainUI_Generate {
    onClick = () => {
        console.log("click");
    }

    onAwake(): void {
        super.onAwake();
        // this.layer = mw.UILayerBottom;

        this.btnC.onClicked.add(this.onClick);

        this.btnB.onClicked.add(() => {
            console.log("移除");
            this.btnC.onClicked.remove(this.onClick);
        });
    }

    onShow(...param: any[]): void {
        setTimeout(() => {
            console.log("aaaaa" + localToAbsolute(this.imggg.parent.cachedGeometry, this.imggg.position));
        }, 100);
    }

    onHide(): void {
        console.log("22222");
    }
}