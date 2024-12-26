import { UIType } from "./UIConfig";
enum UILayer {
    UILayerScene = 0,
    UILayerBottom = 1,
    UILayerMiddle = 2,
    UILayerOwn = 3,
    UILayerTop = 4,
    UILayerDialog = 5,
    UILayerSystem = 6,
}

type UIPanel = UIScript & { type: UIType };

class UIManager {
    private static _instance: UIManager;
    public static get instance(): UIManager {
        if (!UIManager._instance) {
            UIManager._instance = new UIManager();
        }
        return UIManager._instance;
    }

    private _uiLayer: Map<string, UILayer> = new Map();

    private _uiPool: Map<string, UIPanel> = new Map();

    private _uiStack: Map<UILayer, UIPanel[]> = new Map();

    /**
     * 展示一个UI
     * @param type UI的名称
     * @param params 打开需要传递的参数
     */
    show(type: UIType, ...params: any[]): void {
        console.log('准备打开界面---' + type);

        let ui: UIPanel;

        if (this._uiPool.has(type)) {
            ui = this._uiPool.get(type);
            console.log('界面处于显示中---' + type);
            if (ui.visible) return;

            mw.UIService.showUI(ui, ui.layer, ...params);
        } else {
            if (UI_CLASS[type]) {
                ui = mw.UIService.show(UI_CLASS[type], ...params);
                this._uiLayer.set(type, ui.layer);
                this._uiPool.set(type, ui);
            } else {
                throw new Error("UI_CLASS[" + type + "] is not defined");
            }
        }

        let stack = this._uiStack.get(ui.layer);
        if (!stack) {
            stack = [];
            this._uiStack.set(ui.layer, stack);
        }

        stack.push(ui);
    }

    /**
     * 隐藏一个UI（以堆栈的形式隐藏）
     * @param type UI的名称
     */
    hide(type: UIType): void {
        let layer = this._uiLayer.get(type);
        if (!layer) {
            console.error(`ui ${type} undefined`);
            return;
        }


        let uis = this._uiStack.get(layer);
        if (!uis || uis.length === 0) {// 空判断
            console.error(`ui stack is empty`);
            return;
        }

        if (uis[uis.length - 1].type !== type) {
            console.error(`top ui type === ${uis[uis.length - 1].type}`);
            return;
        }

        mw.UIService.hideUI(uis.pop());
    }

    /**
     * 获取UI对象
     * @param type 
     */
    getUI<T extends UIPanel>(type: UIType) {
        let ui = this._uiPool.get(type);
        if (!ui.visible) {
            throw new Error("UI is not visible");
        }

        return ui as T;
    }

    /**
     * 隐藏所有UI
     */
    hideAll() {
        for (const [layer, uis] of this._uiStack) {
            for (let i = uis.length - 1; i >= 0; i--) {
                mw.UIService.hideUI(uis[i]);
            }
        }

        this._uiStack.clear();
    }
}

export const UI_CLASS = {};

export const UI = UIManager.instance;