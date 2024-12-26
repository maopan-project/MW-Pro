import { UIType as UIType } from "./UIConfig";
import { UI, UI_CLASS } from "./UIManager";

export function UIClass(type: UIType) {
    return (target: Function) => {
        console.log('注册UI---', target.name);

        if (!UI_CLASS[type]) {
            UI_CLASS[type] = target;
        }

        target.prototype.hide = () => {
            UI.hide(type);
        }

        target.prototype.type = type;

        registerCommonFunc(target);
    }

}

export function ItemClass(target: Function) {
    registerCommonFunc(target);
}

export function registerCommonFunc(target: Function) {
    target.prototype.setText = function (text: StaleButton | TextBlock, str: string) {
        text.text = str;
    }
}