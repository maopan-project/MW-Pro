
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/SmallItem2_BasicUI.ui
*/



@UIBind('UI/BasicUI/SmallItem2_BasicUI.ui')
export default class SmallItem2_BasicUI_Generate extends UIScript {
		private mCanvas_Item_IllstratedSmall_Internal: mw.Canvas
	public get mCanvas_Item_IllstratedSmall(): mw.Canvas {
		if(!this.mCanvas_Item_IllstratedSmall_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_IllstratedSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall') as mw.Canvas
		}
		return this.mCanvas_Item_IllstratedSmall_Internal
	}
	private mImg_Item_IllSmallBG_Internal: mw.Image
	public get mImg_Item_IllSmallBG(): mw.Image {
		if(!this.mImg_Item_IllSmallBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_IllSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallBG') as mw.Image
		}
		return this.mImg_Item_IllSmallBG_Internal
	}
	private mImg_Item_IllSmallIcon_Internal: mw.Image
	public get mImg_Item_IllSmallIcon(): mw.Image {
		if(!this.mImg_Item_IllSmallIcon_Internal&&this.uiWidgetBase) {
			this.mImg_Item_IllSmallIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallIcon') as mw.Image
		}
		return this.mImg_Item_IllSmallIcon_Internal
	}
	private mImg_Item_IllSmallFrame_Internal: mw.Image
	public get mImg_Item_IllSmallFrame(): mw.Image {
		if(!this.mImg_Item_IllSmallFrame_Internal&&this.uiWidgetBase) {
			this.mImg_Item_IllSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallFrame') as mw.Image
		}
		return this.mImg_Item_IllSmallFrame_Internal
	}
	private mBtn_Item_IllSmall_Internal: mw.Button
	public get mBtn_Item_IllSmall(): mw.Button {
		if(!this.mBtn_Item_IllSmall_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_IllSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_IllstratedSmall/mBtn_Item_IllSmall') as mw.Button
		}
		return this.mBtn_Item_IllSmall_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 