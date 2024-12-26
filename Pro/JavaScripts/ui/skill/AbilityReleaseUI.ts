import AbilityRelease_Generate from "../../ui-generate/skill/AbilityRelease_generate";
import { TempUtils } from "../../utils/TempUtils";
import { UIUtils } from "../../utils/UIUtils";
import { HyperText } from "../../utils/kit/GToolkit";
import { UIClass } from "../base/UIBase";
import { UIType } from "../base/UIConfig";
import TextPrinter from "../common/printer/TextPrinter";

@UIClass(UIType.ABILITY_RELEASE_UI)
export class AbilityReleaseUI extends AbilityRelease_Generate {
    private _bgSize: mw.Vector2 = new mw.Vector2(0, 0);
    private _pointSize: mw.Vector2 = new mw.Vector2(0, 0);
    private _touch: mw.TouchInputUtil = null;

    onStart(): void {
        this._touch = new mw.TouchInputUtil();
        // this._touch.setPlayerController
        this._bgSize = this.bg.size.multiply(0.5);
        this._pointSize = this.point.size.multiply(0.5);
        UIUtils.setVisible(this.controller, false);
    }

    onShow(...param: any[]): void {
        this._touch.onTouchBegin.add(this.onTouchBegin);
        this._touch.onTouchMove.add(this.onTouchMove);
        this._touch.onTouchEnd.add(this.onTouchEnd);
    }

    onHide(): void {
        this._touch.onTouchBegin.remove(this.onTouchBegin);
        this._touch.onTouchMove.remove(this.onTouchMove);
        this._touch.onTouchEnd.remove(this.onTouchEnd);
    }

    private onTouchBegin = (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
        let loc = screenToViewport(location);
        loc.subtract(this._bgSize);
        this.controller.position = loc;
        UIUtils.setVisible(this.controller, true);
        UIUtils.setVisible(this.point, false);
    }

    private onTouchMove = (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
        if (this.controller.visible) {
            let loc = screenToWidgetAbsolute(location);
            let pos = absoluteToLocal(this.controller.tickSpaceGeometry, loc).subtract(this._bgSize);

            const ratio = pos.length / this._bgSize.x;
            if (ratio > 1) {
                pos.multiply(1 / ratio);
            }

            const radians = MathUtil.degreesToRadians(Vector2.signAngle(Vector2.unitX, pos));
            const x = pos.length * Math.cos(radians) + this._bgSize.x - this._pointSize.x;
            const y = pos.length * Math.sin(radians) + this._bgSize.y - this._pointSize.y;
            this.point.position = TempUtils.V2.set(x, y);
            !this.point.visible && UIUtils.setVisible(this.point, true);
        }
    }

    private onTouchEnd = (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
        UIUtils.setVisible(this.controller, false);
    }
}