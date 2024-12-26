
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/SmallItem1_BasicUI.ui
*/



@UIBind('UI/BasicUI/SmallItem1_BasicUI.ui')
export default class SmallItem1_BasicUI_Generate extends UIScript {
		private mCanvas_Item_ShopSmall_Internal: mw.Canvas
	public get mCanvas_Item_ShopSmall(): mw.Canvas {
		if(!this.mCanvas_Item_ShopSmall_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall') as mw.Canvas
		}
		return this.mCanvas_Item_ShopSmall_Internal
	}
	private mImg_Item_ShopSmallBG_Internal: mw.Image
	public get mImg_Item_ShopSmallBG(): mw.Image {
		if(!this.mImg_Item_ShopSmallBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallBG') as mw.Image
		}
		return this.mImg_Item_ShopSmallBG_Internal
	}
	private mImg_Item_ShopSmallPic_Internal: mw.Image
	public get mImg_Item_ShopSmallPic(): mw.Image {
		if(!this.mImg_Item_ShopSmallPic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallPic') as mw.Image
		}
		return this.mImg_Item_ShopSmallPic_Internal
	}
	private mTxt_Item_ShopSCount_Internal: mw.TextBlock
	public get mTxt_Item_ShopSCount(): mw.TextBlock {
		if(!this.mTxt_Item_ShopSCount_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCount') as mw.TextBlock
		}
		return this.mTxt_Item_ShopSCount_Internal
	}
	private mImg_Item_ShopSTxt_Internal: mw.Image
	public get mImg_Item_ShopSTxt(): mw.Image {
		if(!this.mImg_Item_ShopSTxt_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSTxt') as mw.Image
		}
		return this.mImg_Item_ShopSTxt_Internal
	}
	private mTxt_Item_ShopSCash_Internal: mw.TextBlock
	public get mTxt_Item_ShopSCash(): mw.TextBlock {
		if(!this.mTxt_Item_ShopSCash_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCash') as mw.TextBlock
		}
		return this.mTxt_Item_ShopSCash_Internal
	}
	private mImg_Item_ShopSCash_Internal: mw.Image
	public get mImg_Item_ShopSCash(): mw.Image {
		if(!this.mImg_Item_ShopSCash_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSCash') as mw.Image
		}
		return this.mImg_Item_ShopSCash_Internal
	}
	private mImg_Item_ShopSmallFrame_Internal: mw.Image
	public get mImg_Item_ShopSmallFrame(): mw.Image {
		if(!this.mImg_Item_ShopSmallFrame_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallFrame') as mw.Image
		}
		return this.mImg_Item_ShopSmallFrame_Internal
	}
	private mBtn_Item_ShopSmall_Internal: mw.Button
	public get mBtn_Item_ShopSmall(): mw.Button {
		if(!this.mBtn_Item_ShopSmall_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_ShopSmall/mBtn_Item_ShopSmall') as mw.Button
		}
		return this.mBtn_Item_ShopSmall_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 