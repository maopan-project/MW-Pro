
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Window_BasicUI.ui
*/



@UIBind('UI/BasicUI/Window_BasicUI.ui')
export default class Window_BasicUI_Generate extends UIScript {
		private mBtn_Mask_Internal: mw.Button
	public get mBtn_Mask(): mw.Button {
		if(!this.mBtn_Mask_Internal&&this.uiWidgetBase) {
			this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask') as mw.Button
		}
		return this.mBtn_Mask_Internal
	}
	private mCanvas_UI_PopUp_Internal: mw.Canvas
	public get mCanvas_UI_PopUp(): mw.Canvas {
		if(!this.mCanvas_UI_PopUp_Internal&&this.uiWidgetBase) {
			this.mCanvas_UI_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp') as mw.Canvas
		}
		return this.mCanvas_UI_PopUp_Internal
	}
	private mImg_PopUp_BG_Internal: mw.Image
	public get mImg_PopUp_BG(): mw.Image {
		if(!this.mImg_PopUp_BG_Internal&&this.uiWidgetBase) {
			this.mImg_PopUp_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mImg_PopUp_BG') as mw.Image
		}
		return this.mImg_PopUp_BG_Internal
	}
	private mTxt_PopUp_Internal: mw.TextBlock
	public get mTxt_PopUp(): mw.TextBlock {
		if(!this.mTxt_PopUp_Internal&&this.uiWidgetBase) {
			this.mTxt_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mTxt_PopUp') as mw.TextBlock
		}
		return this.mTxt_PopUp_Internal
	}
	private mCanvas_Btn_Close_Internal: mw.Canvas
	public get mCanvas_Btn_Close(): mw.Canvas {
		if(!this.mCanvas_Btn_Close_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Btn_Close') as mw.Canvas
		}
		return this.mCanvas_Btn_Close_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Btn_Close/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 