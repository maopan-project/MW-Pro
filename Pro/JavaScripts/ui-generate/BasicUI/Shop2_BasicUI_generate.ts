
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Shop2_BasicUI.ui
*/



@UIBind('UI/BasicUI/Shop2_BasicUI.ui')
export default class Shop2_BasicUI_Generate extends UIScript {
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
	private mCanvas_PopUp_Internal: mw.Canvas
	public get mCanvas_PopUp(): mw.Canvas {
		if(!this.mCanvas_PopUp_Internal&&this.uiWidgetBase) {
			this.mCanvas_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp') as mw.Canvas
		}
		return this.mCanvas_PopUp_Internal
	}
	private mImg_PopUp_BG_Internal: mw.Image
	public get mImg_PopUp_BG(): mw.Image {
		if(!this.mImg_PopUp_BG_Internal&&this.uiWidgetBase) {
			this.mImg_PopUp_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mImg_PopUp_BG') as mw.Image
		}
		return this.mImg_PopUp_BG_Internal
	}
	private mScrollBox_PopUp_Internal: mw.ScrollBox
	public get mScrollBox_PopUp(): mw.ScrollBox {
		if(!this.mScrollBox_PopUp_Internal&&this.uiWidgetBase) {
			this.mScrollBox_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp') as mw.ScrollBox
		}
		return this.mScrollBox_PopUp_Internal
	}
	private mCanvas_AutoSet_PopUp_Internal: mw.Canvas
	public get mCanvas_AutoSet_PopUp(): mw.Canvas {
		if(!this.mCanvas_AutoSet_PopUp_Internal&&this.uiWidgetBase) {
			this.mCanvas_AutoSet_PopUp_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp') as mw.Canvas
		}
		return this.mCanvas_AutoSet_PopUp_Internal
	}
	private mCanvas_Item_Illustrated_Internal: mw.Canvas
	public get mCanvas_Item_Illustrated(): mw.Canvas {
		if(!this.mCanvas_Item_Illustrated_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated') as mw.Canvas
		}
		return this.mCanvas_Item_Illustrated_Internal
	}
	private mImg_Item_BG_Internal: mw.Image
	public get mImg_Item_BG(): mw.Image {
		if(!this.mImg_Item_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mImg_Item_BG') as mw.Image
		}
		return this.mImg_Item_BG_Internal
	}
	private mImg_Item_NameBG_Internal: mw.Image
	public get mImg_Item_NameBG(): mw.Image {
		if(!this.mImg_Item_NameBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_NameBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mImg_Item_NameBG') as mw.Image
		}
		return this.mImg_Item_NameBG_Internal
	}
	private mTxt_Item_Name_Internal: mw.TextBlock
	public get mTxt_Item_Name(): mw.TextBlock {
		if(!this.mTxt_Item_Name_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mTxt_Item_Name') as mw.TextBlock
		}
		return this.mTxt_Item_Name_Internal
	}
	private mImg_Item_Pic_Internal: mw.Image
	public get mImg_Item_Pic(): mw.Image {
		if(!this.mImg_Item_Pic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mImg_Item_Pic') as mw.Image
		}
		return this.mImg_Item_Pic_Internal
	}
	private mBtn_Item_Illustrated_Internal: mw.Button
	public get mBtn_Item_Illustrated(): mw.Button {
		if(!this.mBtn_Item_Illustrated_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_Illustrated_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Illustrated/mBtn_Item_Illustrated') as mw.Button
		}
		return this.mBtn_Item_Illustrated_Internal
	}
	private mCanvas_Item_Shop_Internal: mw.Canvas
	public get mCanvas_Item_Shop(): mw.Canvas {
		if(!this.mCanvas_Item_Shop_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop') as mw.Canvas
		}
		return this.mCanvas_Item_Shop_Internal
	}
	private mImg_Item_ShopBG_Internal: mw.Image
	public get mImg_Item_ShopBG(): mw.Image {
		if(!this.mImg_Item_ShopBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopBG') as mw.Image
		}
		return this.mImg_Item_ShopBG_Internal
	}
	private mImg_Item_ShopTxt_Internal: mw.Image
	public get mImg_Item_ShopTxt(): mw.Image {
		if(!this.mImg_Item_ShopTxt_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopTxt') as mw.Image
		}
		return this.mImg_Item_ShopTxt_Internal
	}
	private mTxt_Item_ShoPrice_Internal: mw.TextBlock
	public get mTxt_Item_ShoPrice(): mw.TextBlock {
		if(!this.mTxt_Item_ShoPrice_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShoPrice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mTxt_Item_ShoPrice') as mw.TextBlock
		}
		return this.mTxt_Item_ShoPrice_Internal
	}
	private mImg_Item_ShopPic_Internal: mw.Image
	public get mImg_Item_ShopPic(): mw.Image {
		if(!this.mImg_Item_ShopPic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopPic') as mw.Image
		}
		return this.mImg_Item_ShopPic_Internal
	}
	private mTxt_Item_ShopName_Internal: mw.TextBlock
	public get mTxt_Item_ShopName(): mw.TextBlock {
		if(!this.mTxt_Item_ShopName_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShopName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mTxt_Item_ShopName') as mw.TextBlock
		}
		return this.mTxt_Item_ShopName_Internal
	}
	private mImg_Item_ShopCash_Internal: mw.Image
	public get mImg_Item_ShopCash(): mw.Image {
		if(!this.mImg_Item_ShopCash_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mImg_Item_ShopCash') as mw.Image
		}
		return this.mImg_Item_ShopCash_Internal
	}
	private mBtn_Item_Shop_Internal: mw.Button
	public get mBtn_Item_Shop(): mw.Button {
		if(!this.mBtn_Item_Shop_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Shop/mBtn_Item_Shop') as mw.Button
		}
		return this.mBtn_Item_Shop_Internal
	}
	private mCanvas_Item_Bag_Internal: mw.Canvas
	public get mCanvas_Item_Bag(): mw.Canvas {
		if(!this.mCanvas_Item_Bag_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag') as mw.Canvas
		}
		return this.mCanvas_Item_Bag_Internal
	}
	private mImg_Item_BagBG_Internal: mw.Image
	public get mImg_Item_BagBG(): mw.Image {
		if(!this.mImg_Item_BagBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mImg_Item_BagBG') as mw.Image
		}
		return this.mImg_Item_BagBG_Internal
	}
	private mImg_Item_BagTxt_Internal: mw.Image
	public get mImg_Item_BagTxt(): mw.Image {
		if(!this.mImg_Item_BagTxt_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mImg_Item_BagTxt') as mw.Image
		}
		return this.mImg_Item_BagTxt_Internal
	}
	private mTxt_Item_Name1_Internal: mw.TextBlock
	public get mTxt_Item_Name1(): mw.TextBlock {
		if(!this.mTxt_Item_Name1_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_Name1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mTxt_Item_Name1') as mw.TextBlock
		}
		return this.mTxt_Item_Name1_Internal
	}
	private mImg_Item_BagPoc_Internal: mw.Image
	public get mImg_Item_BagPoc(): mw.Image {
		if(!this.mImg_Item_BagPoc_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagPoc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mImg_Item_BagPoc') as mw.Image
		}
		return this.mImg_Item_BagPoc_Internal
	}
	private mTxt_Item_Count_Internal: mw.TextBlock
	public get mTxt_Item_Count(): mw.TextBlock {
		if(!this.mTxt_Item_Count_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mTxt_Item_Count') as mw.TextBlock
		}
		return this.mTxt_Item_Count_Internal
	}
	private mBtn_Item_Bag_Internal: mw.Button
	public get mBtn_Item_Bag(): mw.Button {
		if(!this.mBtn_Item_Bag_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_Bag/mBtn_Item_Bag') as mw.Button
		}
		return this.mBtn_Item_Bag_Internal
	}
	private mCanvas_Btn_Close_Internal: mw.Canvas
	public get mCanvas_Btn_Close(): mw.Canvas {
		if(!this.mCanvas_Btn_Close_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mCanvas_Btn_Close') as mw.Canvas
		}
		return this.mCanvas_Btn_Close_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mCanvas_Btn_Close/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mTxt_Title_Internal: mw.TextBlock
	public get mTxt_Title(): mw.TextBlock {
		if(!this.mTxt_Title_Internal&&this.uiWidgetBase) {
			this.mTxt_Title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mTxt_Title') as mw.TextBlock
		}
		return this.mTxt_Title_Internal
	}
	private mCanvas_Tab_Internal: mw.Canvas
	public get mCanvas_Tab(): mw.Canvas {
		if(!this.mCanvas_Tab_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab') as mw.Canvas
		}
		return this.mCanvas_Tab_Internal
	}
	private mCanvas_TabChosen_Internal: mw.Canvas
	public get mCanvas_TabChosen(): mw.Canvas {
		if(!this.mCanvas_TabChosen_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen') as mw.Canvas
		}
		return this.mCanvas_TabChosen_Internal
	}
	private mBtn_TabChosen_Internal: mw.Button
	public get mBtn_TabChosen(): mw.Button {
		if(!this.mBtn_TabChosen_Internal&&this.uiWidgetBase) {
			this.mBtn_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen/mBtn_TabChosen') as mw.Button
		}
		return this.mBtn_TabChosen_Internal
	}
	private mTxt_TabChosen_Internal: mw.TextBlock
	public get mTxt_TabChosen(): mw.TextBlock {
		if(!this.mTxt_TabChosen_Internal&&this.uiWidgetBase) {
			this.mTxt_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabChosen/mTxt_TabChosen') as mw.TextBlock
		}
		return this.mTxt_TabChosen_Internal
	}
	private mCanvas_TabNormal_Internal: mw.Canvas
	public get mCanvas_TabNormal(): mw.Canvas {
		if(!this.mCanvas_TabNormal_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal') as mw.Canvas
		}
		return this.mCanvas_TabNormal_Internal
	}
	private mBtn_TabNormal1_Internal: mw.Button
	public get mBtn_TabNormal1(): mw.Button {
		if(!this.mBtn_TabNormal1_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal/mBtn_TabNormal1') as mw.Button
		}
		return this.mBtn_TabNormal1_Internal
	}
	private mTxt_TabNormal1_Internal: mw.TextBlock
	public get mTxt_TabNormal1(): mw.TextBlock {
		if(!this.mTxt_TabNormal1_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal/mTxt_TabNormal1') as mw.TextBlock
		}
		return this.mTxt_TabNormal1_Internal
	}
	private mCanvas_TabNormal_1_Internal: mw.Canvas
	public get mCanvas_TabNormal_1(): mw.Canvas {
		if(!this.mCanvas_TabNormal_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1') as mw.Canvas
		}
		return this.mCanvas_TabNormal_1_Internal
	}
	private mBtn_TabNormal2_Internal: mw.Button
	public get mBtn_TabNormal2(): mw.Button {
		if(!this.mBtn_TabNormal2_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1/mBtn_TabNormal2') as mw.Button
		}
		return this.mBtn_TabNormal2_Internal
	}
	private mTxt_TabNormal2_Internal: mw.TextBlock
	public get mTxt_TabNormal2(): mw.TextBlock {
		if(!this.mTxt_TabNormal2_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_1/mTxt_TabNormal2') as mw.TextBlock
		}
		return this.mTxt_TabNormal2_Internal
	}
	private mCanvas_TabNormal_2_Internal: mw.Canvas
	public get mCanvas_TabNormal_2(): mw.Canvas {
		if(!this.mCanvas_TabNormal_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2') as mw.Canvas
		}
		return this.mCanvas_TabNormal_2_Internal
	}
	private mBtn_TabNormal3_Internal: mw.Button
	public get mBtn_TabNormal3(): mw.Button {
		if(!this.mBtn_TabNormal3_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2/mBtn_TabNormal3') as mw.Button
		}
		return this.mBtn_TabNormal3_Internal
	}
	private mTxt_TabNormal3_Internal: mw.TextBlock
	public get mTxt_TabNormal3(): mw.TextBlock {
		if(!this.mTxt_TabNormal3_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_2/mTxt_TabNormal3') as mw.TextBlock
		}
		return this.mTxt_TabNormal3_Internal
	}
	private mCanvas_TabNormal_3_Internal: mw.Canvas
	public get mCanvas_TabNormal_3(): mw.Canvas {
		if(!this.mCanvas_TabNormal_3_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3') as mw.Canvas
		}
		return this.mCanvas_TabNormal_3_Internal
	}
	private mBtn_TabNormal4_Internal: mw.Button
	public get mBtn_TabNormal4(): mw.Button {
		if(!this.mBtn_TabNormal4_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3/mBtn_TabNormal4') as mw.Button
		}
		return this.mBtn_TabNormal4_Internal
	}
	private mTxt_TabNormal4_Internal: mw.TextBlock
	public get mTxt_TabNormal4(): mw.TextBlock {
		if(!this.mTxt_TabNormal4_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Tab/mCanvas_TabNormal_3/mTxt_TabNormal4') as mw.TextBlock
		}
		return this.mTxt_TabNormal4_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 