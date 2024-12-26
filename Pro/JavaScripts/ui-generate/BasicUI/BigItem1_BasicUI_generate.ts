
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/BigItem1_BasicUI.ui
*/



@UIBind('UI/BasicUI/BigItem1_BasicUI.ui')
export default class BigItem1_BasicUI_Generate extends UIScript {
		private mCanvas_Item_Shop_Internal: mw.Canvas
	public get mCanvas_Item_Shop(): mw.Canvas {
		if(!this.mCanvas_Item_Shop_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop') as mw.Canvas
		}
		return this.mCanvas_Item_Shop_Internal
	}
	private mImg_Item_ShopBG_Internal: mw.Image
	public get mImg_Item_ShopBG(): mw.Image {
		if(!this.mImg_Item_ShopBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopBG') as mw.Image
		}
		return this.mImg_Item_ShopBG_Internal
	}
	private mImg_Item_ShopTxt_Internal: mw.Image
	public get mImg_Item_ShopTxt(): mw.Image {
		if(!this.mImg_Item_ShopTxt_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopTxt') as mw.Image
		}
		return this.mImg_Item_ShopTxt_Internal
	}
	private mTxt_Item_ShoPrice_Internal: mw.TextBlock
	public get mTxt_Item_ShoPrice(): mw.TextBlock {
		if(!this.mTxt_Item_ShoPrice_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShoPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mTxt_Item_ShoPrice') as mw.TextBlock
		}
		return this.mTxt_Item_ShoPrice_Internal
	}
	private mImg_Item_ShopPic_Internal: mw.Image
	public get mImg_Item_ShopPic(): mw.Image {
		if(!this.mImg_Item_ShopPic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopPic') as mw.Image
		}
		return this.mImg_Item_ShopPic_Internal
	}
	private mTxt_Item_ShopName_Internal: mw.TextBlock
	public get mTxt_Item_ShopName(): mw.TextBlock {
		if(!this.mTxt_Item_ShopName_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShopName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mTxt_Item_ShopName') as mw.TextBlock
		}
		return this.mTxt_Item_ShopName_Internal
	}
	private mImg_Item_ShopCash_Internal: mw.Image
	public get mImg_Item_ShopCash(): mw.Image {
		if(!this.mImg_Item_ShopCash_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mImg_Item_ShopCash') as mw.Image
		}
		return this.mImg_Item_ShopCash_Internal
	}
	private mBtn_Item_Shop_Internal: mw.Button
	public get mBtn_Item_Shop(): mw.Button {
		if(!this.mBtn_Item_Shop_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Item_Shop/mBtn_Item_Shop') as mw.Button
		}
		return this.mBtn_Item_Shop_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 