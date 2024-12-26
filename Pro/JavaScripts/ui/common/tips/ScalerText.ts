import ScalerText_Generate from "../../../ui-generate/common/ScalerText_generate";
import { TempUtils } from "../../../utils/TempUtils";

export default class ScalerText extends ScalerText_Generate {
    set textContent(text: string) {
        this.text.text = text;
        setTimeout(() => {
            this.setTextPos();
            this.setImgSize();
        }, 0);
    }

    private setTextPos() {
        TempUtils.V2.set((this.rootCanvas.size.x - this.text.size.x) / 2, this.text.position.y);
        this.text.position = TempUtils.V2;
    }

    private setImgSize() {
        TempUtils.V2.set(this.text.size.x / this.rootCanvas.size.x + 0.2, 1);
        this.img.renderScale = TempUtils.V2;
    }
}