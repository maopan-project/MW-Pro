
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Resource_BasicUI.ui
*/



@UIBind('UI/BasicUI/Resource_BasicUI.ui')
export default class Resource_BasicUI_Generate extends UIScript {
		private mCanvasResources_Internal: mw.Canvas
	public get mCanvasResources(): mw.Canvas {
		if(!this.mCanvasResources_Internal&&this.uiWidgetBase) {
			this.mCanvasResources_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources') as mw.Canvas
		}
		return this.mCanvasResources_Internal
	}
	private mImg_BG_Internal: mw.Image
	public get mImg_BG(): mw.Image {
		if(!this.mImg_BG_Internal&&this.uiWidgetBase) {
			this.mImg_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mImg_BG') as mw.Image
		}
		return this.mImg_BG_Internal
	}
	private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mTxt_Count_Internal: mw.TextBlock
	public get mTxt_Count(): mw.TextBlock {
		if(!this.mTxt_Count_Internal&&this.uiWidgetBase) {
			this.mTxt_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mTxt_Count') as mw.TextBlock
		}
		return this.mTxt_Count_Internal
	}
	private mBtn_Add_Internal: mw.Button
	public get mBtn_Add(): mw.Button {
		if(!this.mBtn_Add_Internal&&this.uiWidgetBase) {
			this.mBtn_Add_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvasResources/mBtn_Add') as mw.Button
		}
		return this.mBtn_Add_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 