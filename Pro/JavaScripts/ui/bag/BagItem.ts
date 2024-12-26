import { ItemClass } from "../base/UIBase";
import { IItemRender } from "../common/list/ScrollerView";

@ItemClass
export class BagItem implements IItemRender<number> {
    index: number;

    clickSuccess?: (index: number) => void;

    refreshItem(data: number): void {
        throw new Error("Method not implemented.");
    }

    setSelect(isSelect: boolean): void {
        throw new Error("Method not implemented.");
    }
}   