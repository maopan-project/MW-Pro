
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Shop1_BasicUI.ui
*/



@UIBind('UI/BasicUI/Shop1_BasicUI.ui')
export default class Shop1_BasicUI_Generate extends UIScript {
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
	private mCanvas_Item_IllstratedSmall_Internal: mw.Canvas
	public get mCanvas_Item_IllstratedSmall(): mw.Canvas {
		if(!this.mCanvas_Item_IllstratedSmall_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_IllstratedSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall') as mw.Canvas
		}
		return this.mCanvas_Item_IllstratedSmall_Internal
	}
	private mImg_Item_IllSmallBG_Internal: mw.Image
	public get mImg_Item_IllSmallBG(): mw.Image {
		if(!this.mImg_Item_IllSmallBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_IllSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallBG') as mw.Image
		}
		return this.mImg_Item_IllSmallBG_Internal
	}
	private mImg_Item_IllSmallIcon_Internal: mw.Image
	public get mImg_Item_IllSmallIcon(): mw.Image {
		if(!this.mImg_Item_IllSmallIcon_Internal&&this.uiWidgetBase) {
			this.mImg_Item_IllSmallIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallIcon') as mw.Image
		}
		return this.mImg_Item_IllSmallIcon_Internal
	}
	private mImg_Item_IllSmallFrame_Internal: mw.Image
	public get mImg_Item_IllSmallFrame(): mw.Image {
		if(!this.mImg_Item_IllSmallFrame_Internal&&this.uiWidgetBase) {
			this.mImg_Item_IllSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mImg_Item_IllSmallFrame') as mw.Image
		}
		return this.mImg_Item_IllSmallFrame_Internal
	}
	private mBtn_Item_IllSmall_Internal: mw.Button
	public get mBtn_Item_IllSmall(): mw.Button {
		if(!this.mBtn_Item_IllSmall_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_IllSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_IllstratedSmall/mBtn_Item_IllSmall') as mw.Button
		}
		return this.mBtn_Item_IllSmall_Internal
	}
	private mCanvas_Item_ShopSmall_Internal: mw.Canvas
	public get mCanvas_Item_ShopSmall(): mw.Canvas {
		if(!this.mCanvas_Item_ShopSmall_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall') as mw.Canvas
		}
		return this.mCanvas_Item_ShopSmall_Internal
	}
	private mImg_Item_ShopSmallBG_Internal: mw.Image
	public get mImg_Item_ShopSmallBG(): mw.Image {
		if(!this.mImg_Item_ShopSmallBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallBG') as mw.Image
		}
		return this.mImg_Item_ShopSmallBG_Internal
	}
	private mImg_Item_ShopSmallPic_Internal: mw.Image
	public get mImg_Item_ShopSmallPic(): mw.Image {
		if(!this.mImg_Item_ShopSmallPic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallPic') as mw.Image
		}
		return this.mImg_Item_ShopSmallPic_Internal
	}
	private mTxt_Item_ShopSCount_Internal: mw.TextBlock
	public get mTxt_Item_ShopSCount(): mw.TextBlock {
		if(!this.mTxt_Item_ShopSCount_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCount') as mw.TextBlock
		}
		return this.mTxt_Item_ShopSCount_Internal
	}
	private mImg_Item_ShopSTxt_Internal: mw.Image
	public get mImg_Item_ShopSTxt(): mw.Image {
		if(!this.mImg_Item_ShopSTxt_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSTxt') as mw.Image
		}
		return this.mImg_Item_ShopSTxt_Internal
	}
	private mTxt_Item_ShopSCash_Internal: mw.TextBlock
	public get mTxt_Item_ShopSCash(): mw.TextBlock {
		if(!this.mTxt_Item_ShopSCash_Internal&&this.uiWidgetBase) {
			this.mTxt_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mTxt_Item_ShopSCash') as mw.TextBlock
		}
		return this.mTxt_Item_ShopSCash_Internal
	}
	private mImg_Item_ShopSCash_Internal: mw.Image
	public get mImg_Item_ShopSCash(): mw.Image {
		if(!this.mImg_Item_ShopSCash_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSCash_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSCash') as mw.Image
		}
		return this.mImg_Item_ShopSCash_Internal
	}
	private mImg_Item_ShopSmallFrame_Internal: mw.Image
	public get mImg_Item_ShopSmallFrame(): mw.Image {
		if(!this.mImg_Item_ShopSmallFrame_Internal&&this.uiWidgetBase) {
			this.mImg_Item_ShopSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mImg_Item_ShopSmallFrame') as mw.Image
		}
		return this.mImg_Item_ShopSmallFrame_Internal
	}
	private mBtn_Item_ShopSmall_Internal: mw.Button
	public get mBtn_Item_ShopSmall(): mw.Button {
		if(!this.mBtn_Item_ShopSmall_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_ShopSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_ShopSmall/mBtn_Item_ShopSmall') as mw.Button
		}
		return this.mBtn_Item_ShopSmall_Internal
	}
	private mCanvas_Item_BagSmall_Internal: mw.Canvas
	public get mCanvas_Item_BagSmall(): mw.Canvas {
		if(!this.mCanvas_Item_BagSmall_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall') as mw.Canvas
		}
		return this.mCanvas_Item_BagSmall_Internal
	}
	private mImg_Item_BagSmallBG_Internal: mw.Image
	public get mImg_Item_BagSmallBG(): mw.Image {
		if(!this.mImg_Item_BagSmallBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagSmallBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mImg_Item_BagSmallBG') as mw.Image
		}
		return this.mImg_Item_BagSmallBG_Internal
	}
	private mImg_Item_BagSmallPic_Internal: mw.Image
	public get mImg_Item_BagSmallPic(): mw.Image {
		if(!this.mImg_Item_BagSmallPic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagSmallPic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mImg_Item_BagSmallPic') as mw.Image
		}
		return this.mImg_Item_BagSmallPic_Internal
	}
	private mBag_Item_ShopSCount_Internal: mw.TextBlock
	public get mBag_Item_ShopSCount(): mw.TextBlock {
		if(!this.mBag_Item_ShopSCount_Internal&&this.uiWidgetBase) {
			this.mBag_Item_ShopSCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mBag_Item_ShopSCount') as mw.TextBlock
		}
		return this.mBag_Item_ShopSCount_Internal
	}
	private mImg_Item_BagSmallFrame_Internal: mw.Image
	public get mImg_Item_BagSmallFrame(): mw.Image {
		if(!this.mImg_Item_BagSmallFrame_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BagSmallFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mImg_Item_BagSmallFrame') as mw.Image
		}
		return this.mImg_Item_BagSmallFrame_Internal
	}
	private mBtn_Item_BagSmall_Internal: mw.Button
	public get mBtn_Item_BagSmall(): mw.Button {
		if(!this.mBtn_Item_BagSmall_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_BagSmall_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_PopUp/mScrollBox_PopUp/mCanvas_AutoSet_PopUp/mCanvas_Item_BagSmall/mBtn_Item_BagSmall') as mw.Button
		}
		return this.mBtn_Item_BagSmall_Internal
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
	private mCanvas_Item_Details_Internal: mw.Canvas
	public get mCanvas_Item_Details(): mw.Canvas {
		if(!this.mCanvas_Item_Details_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Details_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details') as mw.Canvas
		}
		return this.mCanvas_Item_Details_Internal
	}
	private mBtn_ItemDetails_Internal: mw.StaleButton
	public get mBtn_ItemDetails(): mw.StaleButton {
		if(!this.mBtn_ItemDetails_Internal&&this.uiWidgetBase) {
			this.mBtn_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mBtn_ItemDetails') as mw.StaleButton
		}
		return this.mBtn_ItemDetails_Internal
	}
	private mImg_ItemDetailsBG_Internal: mw.Image
	public get mImg_ItemDetailsBG(): mw.Image {
		if(!this.mImg_ItemDetailsBG_Internal&&this.uiWidgetBase) {
			this.mImg_ItemDetailsBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mImg_ItemDetailsBG') as mw.Image
		}
		return this.mImg_ItemDetailsBG_Internal
	}
	private mCanvas_ItemDetails_Internal: mw.Canvas
	public get mCanvas_ItemDetails(): mw.Canvas {
		if(!this.mCanvas_ItemDetails_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails') as mw.Canvas
		}
		return this.mCanvas_ItemDetails_Internal
	}
	private mImg_ItemDetails_BG_Internal: mw.Image
	public get mImg_ItemDetails_BG(): mw.Image {
		if(!this.mImg_ItemDetails_BG_Internal&&this.uiWidgetBase) {
			this.mImg_ItemDetails_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails/mImg_ItemDetails_BG') as mw.Image
		}
		return this.mImg_ItemDetails_BG_Internal
	}
	private mImg_ItemDetails_Pic_Internal: mw.Image
	public get mImg_ItemDetails_Pic(): mw.Image {
		if(!this.mImg_ItemDetails_Pic_Internal&&this.uiWidgetBase) {
			this.mImg_ItemDetails_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails/mImg_ItemDetails_Pic') as mw.Image
		}
		return this.mImg_ItemDetails_Pic_Internal
	}
	private mTxt_ItemDetails_Count_Internal: mw.TextBlock
	public get mTxt_ItemDetails_Count(): mw.TextBlock {
		if(!this.mTxt_ItemDetails_Count_Internal&&this.uiWidgetBase) {
			this.mTxt_ItemDetails_Count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mCanvas_ItemDetails/mTxt_ItemDetails_Count') as mw.TextBlock
		}
		return this.mTxt_ItemDetails_Count_Internal
	}
	private mTxt_ItemDetails_Name_Internal: mw.TextBlock
	public get mTxt_ItemDetails_Name(): mw.TextBlock {
		if(!this.mTxt_ItemDetails_Name_Internal&&this.uiWidgetBase) {
			this.mTxt_ItemDetails_Name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mTxt_ItemDetails_Name') as mw.TextBlock
		}
		return this.mTxt_ItemDetails_Name_Internal
	}
	private mTxt_ItemDetails_Details_Internal: mw.TextBlock
	public get mTxt_ItemDetails_Details(): mw.TextBlock {
		if(!this.mTxt_ItemDetails_Details_Internal&&this.uiWidgetBase) {
			this.mTxt_ItemDetails_Details_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_PopUp/mCanvas_Item_Details/mTxt_ItemDetails_Details') as mw.TextBlock
		}
		return this.mTxt_ItemDetails_Details_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 