export namespace UIUtils {

    /**
     * 转换UI坐标
     * @param target 目标UI组件
     * @param origin 当前UI组件
     * @returns 
     */
    export function convertLoc<T extends Widget, U extends Widget>(target: T, origin: U) {
        let tParentGeometry = target.parent.cachedGeometry;
        let oParentGeometry = origin.parent.cachedGeometry;
        let absPos = localToAbsolute(tParentGeometry, target.position);
        let targetPos = absoluteToLocal(oParentGeometry, absPos);
        return targetPos;
    }


    /**
     * 设置UI组件的可见性
     * @param ui UI组件
     * @param isShow 是否显示
     */
    export function setVisible<T extends mw.Widget>(ui: T, isShow: boolean) {
        let isBlock = (ui instanceof Button)
            || (ui instanceof StaleButton)
            || (ui instanceof ScrollBox)
            || (ui instanceof VirtualJoystickPanel);

        ui.visibility = isShow ?
            isBlock ? mw.SlateVisibility.Visible : mw.SlateVisibility.SelfHitTestInvisible
            : mw.SlateVisibility.Collapsed;
    }

    /**
     * 查找ui对象的上级rootcanvas
     * @param ui 控件对象
     * @param level 查找层级
     * @returns rootcanvas
     */
    export function findRootCanvas(ui: mw.Widget, level: number = 1) {
        if (!ui || !ui.parent) {
            return null;
        }

        if (ui.parent instanceof mw.UserWidget) {// uiObject
            level--;
            if (level === 0) {
                return ui;
            }
        }

        return findRootCanvas(ui.parent, level);
    }

    /**
     * 关闭容器子节点显影
     * @param canvas 容器 
     */
    export function closeChildrenWidget(canvas: mw.Canvas) {
        let len = canvas.getChildrenCount();
        for (let i = 0; i < len; i++) {
            setVisible(canvas.getChildAt(i), false);
        }
    }
}
