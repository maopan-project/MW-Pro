import CommonTips_Generate from "../../../ui-generate/common/CommonTips_generate";
import { UIClass } from "../../base/UIBase";
import { UIType } from "../../base/UIConfig";
import { UI } from "../../base/UIManager";
import ScalerText from "./ScalerText";

@UIClass(UIType.COMMON_TIPS)
export default class CommonTips extends CommonTips_Generate {
    private scalerTexts: ScalerText[] = [];
    private broadcastTexts: string[] = [];
    private scalerAndTween: Map<mw.Widget, Tween<any>> = new Map();

    static openTips(text: string) {
        let ui = UI.getUI(UIType.COMMON_TIPS);
        if (!ui) UI.show(UIType.COMMON_TIPS);

        Event.dispatchToLocal("TIPS", text);
    }

    onAwake(): void {
        super.onAwake();

        this.layer = mw.UILayerTop;
        this.onEvent();
    }

    onStart(): void {
        for (let i = 0; i < 3; i++) {
            this.scalerTexts.push(UIService.create(ScalerText));
        }
    }

    onEvent() {
        Event.addLocalListener("TIPS", (text: string) => {
            this.broadcastTexts.push(text);
            this.startBroadcast();
        });
    }

    public onDestroy(): void {
        this.scalerTexts.length = 0;
        this.broadcastTexts.length = 0;
    }

    private startBroadcast() {
        if (this.scalerTexts.length === 0) {
            let widget = this.canvas.getChildAt(0);
            widget.removeObject();
            let scalerText = mw.findUIScript(widget) as ScalerText;
            this.scalerTexts.push(scalerText);

            if (this.scalerAndTween.has(widget)) {
                this.scalerAndTween.get(widget).stop();
                this.scalerAndTween.delete(widget);
            }
        }

        let item = this.scalerTexts.pop();
        this.canvas.addChild(item.uiObject);
        item.textContent = this.broadcastTexts.shift();

        let anim = this.getAnim(item.uiObject);
        anim.start();
        this.scalerAndTween.set(item.uiObject, anim);
    }

    private getAnim(widget: mw.Widget) {
        let anim1 = this.appearAnim(widget);
        let anim2 = this.disappearAnim(widget);
        anim1.chain(anim2.delay(3000));
        return anim1;
    }

    private appearAnim(widget: mw.Widget) {
        return new Tween({ renderScale: mw.Vector2.zero })
            .to({ renderScale: new mw.Vector2(1.2, 1.2) }, 200)
            .to({ renderScale: mw.Vector2.one }, 200)
            .onUpdate((obj) => {
                widget.renderScale = obj.renderScale;
            });
    }

    private disappearAnim(widget: mw.Widget) {
        return new Tween({ renderOpacity: 1 })
            .to({ renderScale: 0 }, 1000)
            .onUpdate((obj) => {
                widget.renderOpacity = obj.renderOpacity;
            })
            .onComplete(() => {
                let scalerText = mw.findUIScript(widget) as any;
                this.scalerTexts.push(scalerText);
                this.scalerAndTween.delete(widget);

                widget.removeObject();
            });
    }
}