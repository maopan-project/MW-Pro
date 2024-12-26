
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/BigItem3_BasicUI.ui
*/



@UIBind('UI/BasicUI/BigItem3_BasicUI.ui')
export default class BigItem3_BasicUI_Generate extends UIScript {
		private mCanvas_Item_Bag_Internal: mw.Canvas
	public get mCanvas_Item_Bag(): mw.Canvas {
		if(!this.mCanvas_Item_Bag_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag') as mw.Canvas
		}
		return this.mCanvas_Item_Bag_Internal
	}
	private mImg_Item_BagBG_Internal: mw.Image
	public get mImg_Item_BagBG(): mw.Image {
		if(!this.mImg_Item_BagBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mImg_Item_BagBG') as mw.Image
		}
		return this.mImg_Item_BagBG_Internal
	}
	private mImg_Item_BagTxt_Internal: mw.Image
	public get mImg_Item_BagTxt(): mw.Image {
		if(!this.mImg_Item_BagTxt_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mImg_Item_BagTxt') as mw.Image
		}
		return this.mImg_Item_BagTxt_Internal
	}
	private mTxt_Item_Name_Internal: mw.TextBlock
	public get mTxt_Item_Name(): mw.TextBlock {
		if(!this.mTxt_Item_Name_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mTxt_Item_Name') as mw.TextBlock
		}
		return this.mTxt_Item_Name_Internal
	}
	private mImg_Item_BagPoc_Internal: mw.Image
	public get mImg_Item_BagPoc(): mw.Image {
		if(!this.mImg_Item_BagPoc_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagPoc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mImg_Item_BagPoc') as mw.Image
		}
		return this.mImg_Item_BagPoc_Internal
	}
	private mTxt_Item_Count_Internal: mw.TextBlock
	public get mTxt_Item_Count(): mw.TextBlock {
		if(!this.mTxt_Item_Count_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mTxt_Item_Count') as mw.TextBlock
		}
		return this.mTxt_Item_Count_Internal
	}
	private mBtn_Item_Bag_Internal: mw.Button
	public get mBtn_Item_Bag(): mw.Button {
		if(!this.mBtn_Item_Bag_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Bag/mBtn_Item_Bag') as mw.Button
		}
		return this.mBtn_Item_Bag_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 