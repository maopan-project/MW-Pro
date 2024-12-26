
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/CreateRole_BasicUI.ui
*/



@UIBind('UI/BasicUI/CreateRole_BasicUI.ui')
export default class CreateRole_BasicUI_Generate extends UIScript {
		private mCanvas_UI_Create_Internal: mw.Canvas
	public get mCanvas_UI_Create(): mw.Canvas {
		if(!this.mCanvas_UI_Create_Internal&&this.uiWidgetBase) {
			this.mCanvas_UI_Create_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create') as mw.Canvas
		}
		return this.mCanvas_UI_Create_Internal
	}
	private mBtn_Define_Internal: mw.Button
	public get mBtn_Define(): mw.Button {
		if(!this.mBtn_Define_Internal&&this.uiWidgetBase) {
			this.mBtn_Define_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mBtn_Define') as mw.Button
		}
		return this.mBtn_Define_Internal
	}
	private mCanvas_ItemChose_Internal: mw.Canvas
	public get mCanvas_ItemChose(): mw.Canvas {
		if(!this.mCanvas_ItemChose_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemChose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose') as mw.Canvas
		}
		return this.mCanvas_ItemChose_Internal
	}
	private mImg_ItemChose_BG_Internal: mw.Image
	public get mImg_ItemChose_BG(): mw.Image {
		if(!this.mImg_ItemChose_BG_Internal&&this.uiWidgetBase) {
			this.mImg_ItemChose_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mImg_ItemChose_BG') as mw.Image
		}
		return this.mImg_ItemChose_BG_Internal
	}
	private mScrollBox_TabIcon_Internal: mw.ScrollBox
	public get mScrollBox_TabIcon(): mw.ScrollBox {
		if(!this.mScrollBox_TabIcon_Internal&&this.uiWidgetBase) {
			this.mScrollBox_TabIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon') as mw.ScrollBox
		}
		return this.mScrollBox_TabIcon_Internal
	}
	private mCanvas_TabIcon_AutoSet_Internal: mw.Canvas
	public get mCanvas_TabIcon_AutoSet(): mw.Canvas {
		if(!this.mCanvas_TabIcon_AutoSet_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabIcon_AutoSet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet') as mw.Canvas
		}
		return this.mCanvas_TabIcon_AutoSet_Internal
	}
	private mCanvas_TabIcon_Item_Internal: mw.Canvas
	public get mCanvas_TabIcon_Item(): mw.Canvas {
		if(!this.mCanvas_TabIcon_Item_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabIcon_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item') as mw.Canvas
		}
		return this.mCanvas_TabIcon_Item_Internal
	}
	private mImg_TabIcon_Pic1_Internal: mw.Image
	public get mImg_TabIcon_Pic1(): mw.Image {
		if(!this.mImg_TabIcon_Pic1_Internal&&this.uiWidgetBase) {
			this.mImg_TabIcon_Pic1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item/mImg_TabIcon_Pic1') as mw.Image
		}
		return this.mImg_TabIcon_Pic1_Internal
	}
	private mBtn_TabIcon_Item1_Internal: mw.Button
	public get mBtn_TabIcon_Item1(): mw.Button {
		if(!this.mBtn_TabIcon_Item1_Internal&&this.uiWidgetBase) {
			this.mBtn_TabIcon_Item1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item/mBtn_TabIcon_Item1') as mw.Button
		}
		return this.mBtn_TabIcon_Item1_Internal
	}
	private mCanvas_TabIcon_Item2_Internal: mw.Canvas
	public get mCanvas_TabIcon_Item2(): mw.Canvas {
		if(!this.mCanvas_TabIcon_Item2_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabIcon_Item2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item2') as mw.Canvas
		}
		return this.mCanvas_TabIcon_Item2_Internal
	}
	private mImg_TabIcon_Pic2_Internal: mw.Image
	public get mImg_TabIcon_Pic2(): mw.Image {
		if(!this.mImg_TabIcon_Pic2_Internal&&this.uiWidgetBase) {
			this.mImg_TabIcon_Pic2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item2/mImg_TabIcon_Pic2') as mw.Image
		}
		return this.mImg_TabIcon_Pic2_Internal
	}
	private mBtn_TabIcon_Item2_Internal: mw.Button
	public get mBtn_TabIcon_Item2(): mw.Button {
		if(!this.mBtn_TabIcon_Item2_Internal&&this.uiWidgetBase) {
			this.mBtn_TabIcon_Item2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item2/mBtn_TabIcon_Item2') as mw.Button
		}
		return this.mBtn_TabIcon_Item2_Internal
	}
	private mCanvas_TabIcon_Item3_Internal: mw.Canvas
	public get mCanvas_TabIcon_Item3(): mw.Canvas {
		if(!this.mCanvas_TabIcon_Item3_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabIcon_Item3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3') as mw.Canvas
		}
		return this.mCanvas_TabIcon_Item3_Internal
	}
	private mImg_TabIcon_BG3_Internal: mw.Image
	public get mImg_TabIcon_BG3(): mw.Image {
		if(!this.mImg_TabIcon_BG3_Internal&&this.uiWidgetBase) {
			this.mImg_TabIcon_BG3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3/mImg_TabIcon_BG3') as mw.Image
		}
		return this.mImg_TabIcon_BG3_Internal
	}
	private mImg_TabIcon_Pic3a_Internal: mw.Image
	public get mImg_TabIcon_Pic3a(): mw.Image {
		if(!this.mImg_TabIcon_Pic3a_Internal&&this.uiWidgetBase) {
			this.mImg_TabIcon_Pic3a_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3/mImg_TabIcon_Pic3a') as mw.Image
		}
		return this.mImg_TabIcon_Pic3a_Internal
	}
	private mBtn_TabIcon_Item3_Internal: mw.Button
	public get mBtn_TabIcon_Item3(): mw.Button {
		if(!this.mBtn_TabIcon_Item3_Internal&&this.uiWidgetBase) {
			this.mBtn_TabIcon_Item3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item3/mBtn_TabIcon_Item3') as mw.Button
		}
		return this.mBtn_TabIcon_Item3_Internal
	}
	private mCanvas_TabIcon_Item4_Internal: mw.Canvas
	public get mCanvas_TabIcon_Item4(): mw.Canvas {
		if(!this.mCanvas_TabIcon_Item4_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabIcon_Item4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item4') as mw.Canvas
		}
		return this.mCanvas_TabIcon_Item4_Internal
	}
	private mImg_TabIcon_Pic3b_Internal: mw.Image
	public get mImg_TabIcon_Pic3b(): mw.Image {
		if(!this.mImg_TabIcon_Pic3b_Internal&&this.uiWidgetBase) {
			this.mImg_TabIcon_Pic3b_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item4/mImg_TabIcon_Pic3b') as mw.Image
		}
		return this.mImg_TabIcon_Pic3b_Internal
	}
	private mBtn_TabIcon_Item4_Internal: mw.Button
	public get mBtn_TabIcon_Item4(): mw.Button {
		if(!this.mBtn_TabIcon_Item4_Internal&&this.uiWidgetBase) {
			this.mBtn_TabIcon_Item4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item4/mBtn_TabIcon_Item4') as mw.Button
		}
		return this.mBtn_TabIcon_Item4_Internal
	}
	private mCanvas_TabIcon_Item5_Internal: mw.Canvas
	public get mCanvas_TabIcon_Item5(): mw.Canvas {
		if(!this.mCanvas_TabIcon_Item5_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabIcon_Item5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item5') as mw.Canvas
		}
		return this.mCanvas_TabIcon_Item5_Internal
	}
	private mImg_TabIcon_Pic3c_Internal: mw.Image
	public get mImg_TabIcon_Pic3c(): mw.Image {
		if(!this.mImg_TabIcon_Pic3c_Internal&&this.uiWidgetBase) {
			this.mImg_TabIcon_Pic3c_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item5/mImg_TabIcon_Pic3c') as mw.Image
		}
		return this.mImg_TabIcon_Pic3c_Internal
	}
	private mBtn_TabIcon_Item5_Internal: mw.Button
	public get mBtn_TabIcon_Item5(): mw.Button {
		if(!this.mBtn_TabIcon_Item5_Internal&&this.uiWidgetBase) {
			this.mBtn_TabIcon_Item5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_TabIcon/mCanvas_TabIcon_AutoSet/mCanvas_TabIcon_Item5/mBtn_TabIcon_Item5') as mw.Button
		}
		return this.mBtn_TabIcon_Item5_Internal
	}
	private mScrollBox_ItemChose_Internal: mw.ScrollBox
	public get mScrollBox_ItemChose(): mw.ScrollBox {
		if(!this.mScrollBox_ItemChose_Internal&&this.uiWidgetBase) {
			this.mScrollBox_ItemChose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose') as mw.ScrollBox
		}
		return this.mScrollBox_ItemChose_Internal
	}
	private mCanvas_ItemContent_Internal: mw.Canvas
	public get mCanvas_ItemContent(): mw.Canvas {
		if(!this.mCanvas_ItemContent_Internal&&this.uiWidgetBase) {
			this.mCanvas_ItemContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent') as mw.Canvas
		}
		return this.mCanvas_ItemContent_Internal
	}
	private mCanvas_Item_Internal: mw.Canvas
	public get mCanvas_Item(): mw.Canvas {
		if(!this.mCanvas_Item_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item') as mw.Canvas
		}
		return this.mCanvas_Item_Internal
	}
	private mBtn_Item_Internal: mw.Button
	public get mBtn_Item(): mw.Button {
		if(!this.mBtn_Item_Internal&&this.uiWidgetBase) {
			this.mBtn_Item_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mBtn_Item') as mw.Button
		}
		return this.mBtn_Item_Internal
	}
	private mImg_Item_BG_Internal: mw.Image
	public get mImg_Item_BG(): mw.Image {
		if(!this.mImg_Item_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mImg_Item_BG') as mw.Image
		}
		return this.mImg_Item_BG_Internal
	}
	private mImg_Item_Pic_Internal: mw.Image
	public get mImg_Item_Pic(): mw.Image {
		if(!this.mImg_Item_Pic_Internal&&this.uiWidgetBase) {
			this.mImg_Item_Pic_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mImg_Item_Pic') as mw.Image
		}
		return this.mImg_Item_Pic_Internal
	}
	private mImg_Item_Frame_Internal: mw.Image
	public get mImg_Item_Frame(): mw.Image {
		if(!this.mImg_Item_Frame_Internal&&this.uiWidgetBase) {
			this.mImg_Item_Frame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mScrollBox_ItemChose/mCanvas_ItemContent/mCanvas_Item/mImg_Item_Frame') as mw.Image
		}
		return this.mImg_Item_Frame_Internal
	}
	private mCanvas_Tab_Internal: mw.Canvas
	public get mCanvas_Tab(): mw.Canvas {
		if(!this.mCanvas_Tab_Internal&&this.uiWidgetBase) {
			this.mCanvas_Tab_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab') as mw.Canvas
		}
		return this.mCanvas_Tab_Internal
	}
	private mCanvas_TabChosen_Internal: mw.Canvas
	public get mCanvas_TabChosen(): mw.Canvas {
		if(!this.mCanvas_TabChosen_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabChosen') as mw.Canvas
		}
		return this.mCanvas_TabChosen_Internal
	}
	private mBtn_TabChosen_Internal: mw.Button
	public get mBtn_TabChosen(): mw.Button {
		if(!this.mBtn_TabChosen_Internal&&this.uiWidgetBase) {
			this.mBtn_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabChosen/mBtn_TabChosen') as mw.Button
		}
		return this.mBtn_TabChosen_Internal
	}
	private mTxt_TabChosen_Internal: mw.TextBlock
	public get mTxt_TabChosen(): mw.TextBlock {
		if(!this.mTxt_TabChosen_Internal&&this.uiWidgetBase) {
			this.mTxt_TabChosen_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabChosen/mTxt_TabChosen') as mw.TextBlock
		}
		return this.mTxt_TabChosen_Internal
	}
	private mCanvas_TabNormal_Internal: mw.Canvas
	public get mCanvas_TabNormal(): mw.Canvas {
		if(!this.mCanvas_TabNormal_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal') as mw.Canvas
		}
		return this.mCanvas_TabNormal_Internal
	}
	private mBtn_TabNormal1_Internal: mw.Button
	public get mBtn_TabNormal1(): mw.Button {
		if(!this.mBtn_TabNormal1_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal/mBtn_TabNormal1') as mw.Button
		}
		return this.mBtn_TabNormal1_Internal
	}
	private mTxt_TabNormal1_Internal: mw.TextBlock
	public get mTxt_TabNormal1(): mw.TextBlock {
		if(!this.mTxt_TabNormal1_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal/mTxt_TabNormal1') as mw.TextBlock
		}
		return this.mTxt_TabNormal1_Internal
	}
	private mCanvas_TabNormal_1_Internal: mw.Canvas
	public get mCanvas_TabNormal_1(): mw.Canvas {
		if(!this.mCanvas_TabNormal_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_1') as mw.Canvas
		}
		return this.mCanvas_TabNormal_1_Internal
	}
	private mBtn_TabNormal2_Internal: mw.Button
	public get mBtn_TabNormal2(): mw.Button {
		if(!this.mBtn_TabNormal2_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_1/mBtn_TabNormal2') as mw.Button
		}
		return this.mBtn_TabNormal2_Internal
	}
	private mTxt_TabNormal2_Internal: mw.TextBlock
	public get mTxt_TabNormal2(): mw.TextBlock {
		if(!this.mTxt_TabNormal2_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_1/mTxt_TabNormal2') as mw.TextBlock
		}
		return this.mTxt_TabNormal2_Internal
	}
	private mCanvas_TabNormal_2_Internal: mw.Canvas
	public get mCanvas_TabNormal_2(): mw.Canvas {
		if(!this.mCanvas_TabNormal_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_2') as mw.Canvas
		}
		return this.mCanvas_TabNormal_2_Internal
	}
	private mBtn_TabNormal3_Internal: mw.Button
	public get mBtn_TabNormal3(): mw.Button {
		if(!this.mBtn_TabNormal3_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_2/mBtn_TabNormal3') as mw.Button
		}
		return this.mBtn_TabNormal3_Internal
	}
	private mTxt_TabNormal3_Internal: mw.TextBlock
	public get mTxt_TabNormal3(): mw.TextBlock {
		if(!this.mTxt_TabNormal3_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_2/mTxt_TabNormal3') as mw.TextBlock
		}
		return this.mTxt_TabNormal3_Internal
	}
	private mCanvas_TabNormal_3_Internal: mw.Canvas
	public get mCanvas_TabNormal_3(): mw.Canvas {
		if(!this.mCanvas_TabNormal_3_Internal&&this.uiWidgetBase) {
			this.mCanvas_TabNormal_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_3') as mw.Canvas
		}
		return this.mCanvas_TabNormal_3_Internal
	}
	private mBtn_TabNormal4_Internal: mw.Button
	public get mBtn_TabNormal4(): mw.Button {
		if(!this.mBtn_TabNormal4_Internal&&this.uiWidgetBase) {
			this.mBtn_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_3/mBtn_TabNormal4') as mw.Button
		}
		return this.mBtn_TabNormal4_Internal
	}
	private mTxt_TabNormal4_Internal: mw.TextBlock
	public get mTxt_TabNormal4(): mw.TextBlock {
		if(!this.mTxt_TabNormal4_Internal&&this.uiWidgetBase) {
			this.mTxt_TabNormal4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_ItemChose/mCanvas_Tab/mCanvas_TabNormal_3/mTxt_TabNormal4') as mw.TextBlock
		}
		return this.mTxt_TabNormal4_Internal
	}
	private mCanvas_Gender_Men_Internal: mw.Canvas
	public get mCanvas_Gender_Men(): mw.Canvas {
		if(!this.mCanvas_Gender_Men_Internal&&this.uiWidgetBase) {
			this.mCanvas_Gender_Men_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Men') as mw.Canvas
		}
		return this.mCanvas_Gender_Men_Internal
	}
	private mBtn_Gender_Men_Internal: mw.Button
	public get mBtn_Gender_Men(): mw.Button {
		if(!this.mBtn_Gender_Men_Internal&&this.uiWidgetBase) {
			this.mBtn_Gender_Men_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Men/mBtn_Gender_Men') as mw.Button
		}
		return this.mBtn_Gender_Men_Internal
	}
	private mCanvas_GendeMen_ICon_Internal: mw.Image
	public get mCanvas_GendeMen_ICon(): mw.Image {
		if(!this.mCanvas_GendeMen_ICon_Internal&&this.uiWidgetBase) {
			this.mCanvas_GendeMen_ICon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Men/mCanvas_GendeMen_ICon') as mw.Image
		}
		return this.mCanvas_GendeMen_ICon_Internal
	}
	private mCanvas_Gender_Women_Internal: mw.Canvas
	public get mCanvas_Gender_Women(): mw.Canvas {
		if(!this.mCanvas_Gender_Women_Internal&&this.uiWidgetBase) {
			this.mCanvas_Gender_Women_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Women') as mw.Canvas
		}
		return this.mCanvas_Gender_Women_Internal
	}
	private mBtn_Gender_Women_Internal: mw.Button
	public get mBtn_Gender_Women(): mw.Button {
		if(!this.mBtn_Gender_Women_Internal&&this.uiWidgetBase) {
			this.mBtn_Gender_Women_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Women/mBtn_Gender_Women') as mw.Button
		}
		return this.mBtn_Gender_Women_Internal
	}
	private mCanvas_GendeWomen_Icon_Internal: mw.Image
	public get mCanvas_GendeWomen_Icon(): mw.Image {
		if(!this.mCanvas_GendeWomen_Icon_Internal&&this.uiWidgetBase) {
			this.mCanvas_GendeWomen_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Gender_Women/mCanvas_GendeWomen_Icon') as mw.Image
		}
		return this.mCanvas_GendeWomen_Icon_Internal
	}
	private mTxt_ItemDetails_Internal: mw.TextBlock
	public get mTxt_ItemDetails(): mw.TextBlock {
		if(!this.mTxt_ItemDetails_Internal&&this.uiWidgetBase) {
			this.mTxt_ItemDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mTxt_ItemDetails') as mw.TextBlock
		}
		return this.mTxt_ItemDetails_Internal
	}
	private mTxt_ItemName_Internal: mw.TextBlock
	public get mTxt_ItemName(): mw.TextBlock {
		if(!this.mTxt_ItemName_Internal&&this.uiWidgetBase) {
			this.mTxt_ItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mTxt_ItemName') as mw.TextBlock
		}
		return this.mTxt_ItemName_Internal
	}
	private mCanvas_Clean_Internal: mw.Canvas
	public get mCanvas_Clean(): mw.Canvas {
		if(!this.mCanvas_Clean_Internal&&this.uiWidgetBase) {
			this.mCanvas_Clean_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Clean') as mw.Canvas
		}
		return this.mCanvas_Clean_Internal
	}
	private mBtn_Clean_Internal: mw.Button
	public get mBtn_Clean(): mw.Button {
		if(!this.mBtn_Clean_Internal&&this.uiWidgetBase) {
			this.mBtn_Clean_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Clean/mBtn_Clean') as mw.Button
		}
		return this.mBtn_Clean_Internal
	}
	private mImg_Clean_Icon_Internal: mw.Image
	public get mImg_Clean_Icon(): mw.Image {
		if(!this.mImg_Clean_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Clean_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Create/mCanvas_Clean/mImg_Clean_Icon') as mw.Image
		}
		return this.mImg_Clean_Icon_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 