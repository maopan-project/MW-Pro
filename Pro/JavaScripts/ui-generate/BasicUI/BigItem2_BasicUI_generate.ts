
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/BigItem2_BasicUI.ui
*/



@UIBind('UI/BasicUI/BigItem2_BasicUI.ui')
export default class BigItem2_BasicUI_Generate extends UIScript {
		private mCanvas_Item_Illustrated_Internal: mw.Canvas
	public get mCanvas_Item_Illustrated(): mw.Canvas {
		if(!this.mCanvas_Item_Illustrated_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated') as mw.Canvas
		}
		return this.mCanvas_Item_Illustrated_Internal
	}
	private mImg_Item_BG_Internal: mw.Image
	public get mImg_Item_BG(): mw.Image {
		if(!this.mImg_Item_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mImg_Item_BG') as mw.Image
		}
		return this.mImg_Item_BG_Internal
	}
	private mImg_Item_NameBG_Internal: mw.Image
	public get mImg_Item_NameBG(): mw.Image {
		if(!this.mImg_Item_NameBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_NameBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mImg_Item_NameBG') as mw.Image
		}
		return this.mImg_Item_NameBG_Internal
	}
	private mTxt_Item_Name_Internal: mw.TextBlock
	public get mTxt_Item_Name(): mw.TextBlock {
		if(!this.mTxt_Item_Name_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mTxt_Item_Name') as mw.TextBlock
		}
		return this.mTxt_Item_Name_Internal
	}
	private mImg_Item_Pic_Internal: mw.Image
	public get mImg_Item_Pic(): mw.Image {
		if(!this.mImg_Item_Pic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mImg_Item_Pic') as mw.Image
		}
		return this.mImg_Item_Pic_Internal
	}
	private mBtn_Item_Illustrated_Internal: mw.Button
	public get mBtn_Item_Illustrated(): mw.Button {
		if(!this.mBtn_Item_Illustrated_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Illustrated/mBtn_Item_Illustrated') as mw.Button
		}
		return this.mBtn_Item_Illustrated_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 