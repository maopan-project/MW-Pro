
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/SmallItem3_BasicUI.ui
*/



@UIBind('UI/BasicUI/SmallItem3_BasicUI.ui')
export default class SmallItem3_BasicUI_Generate extends UIScript {
		private mCanvas_Item_BagSmall_Internal: mw.Canvas
	public get mCanvas_Item_BagSmall(): mw.Canvas {
		if(!this.mCanvas_Item_BagSmall_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall') as mw.Canvas
		}
		return this.mCanvas_Item_BagSmall_Internal
	}
	private mImg_Item_BagSmallBG_Internal: mw.Image
	public get mImg_Item_BagSmallBG(): mw.Image {
		if(!this.mImg_Item_BagSmallBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mImg_Item_BagSmallBG') as mw.Image
		}
		return this.mImg_Item_BagSmallBG_Internal
	}
	private mImg_Item_BagSmallPic_Internal: mw.Image
	public get mImg_Item_BagSmallPic(): mw.Image {
		if(!this.mImg_Item_BagSmallPic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mImg_Item_BagSmallPic') as mw.Image
		}
		return this.mImg_Item_BagSmallPic_Internal
	}
	private mBag_Item_ShopSCount_Internal: mw.TextBlock
	public get mBag_Item_ShopSCount(): mw.TextBlock {
		if(!this.mBag_Item_ShopSCount_Internal&&this.uiWidgetBase) {
			this.mBag_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mBag_Item_ShopSCount') as mw.TextBlock
		}
		return this.mBag_Item_ShopSCount_Internal
	}
	private mImg_Item_BagSmallFrame_Internal: mw.Image
	public get mImg_Item_BagSmallFrame(): mw.Image {
		if(!this.mImg_Item_BagSmallFrame_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mImg_Item_BagSmallFrame') as mw.Image
		}
		return this.mImg_Item_BagSmallFrame_Internal
	}
	private mBtn_Item_BagSmall_Internal: mw.Button
	public get mBtn_Item_BagSmall(): mw.Button {
		if(!this.mBtn_Item_BagSmall_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_BagSmall/mBtn_Item_BagSmall') as mw.Button
		}
		return this.mBtn_Item_BagSmall_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 