
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Rankings_BasicUI.ui
*/



@UIBind('UI/BasicUI/Rankings_BasicUI.ui')
export default class Rankings_BasicUI_Generate extends UIScript {
		private mBtn_Mask_Internal: mw.Button
	public get mBtn_Mask(): mw.Button {
		if(!this.mBtn_Mask_Internal&&this.uiWidgetBase) {
			this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask') as mw.Button
		}
		return this.mBtn_Mask_Internal
	}
	private mCanvas_UI_Rank_Internal: mw.Canvas
	public get mCanvas_UI_Rank(): mw.Canvas {
		if(!this.mCanvas_UI_Rank_Internal&&this.uiWidgetBase) {
			this.mCanvas_UI_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank') as mw.Canvas
		}
		return this.mCanvas_UI_Rank_Internal
	}
	private mImg_Rank_BG_Internal: mw.Image
	public get mImg_Rank_BG(): mw.Image {
		if(!this.mImg_Rank_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Rank_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mImg_Rank_BG') as mw.Image
		}
		return this.mImg_Rank_BG_Internal
	}
	private mTxt_Rank_Internal: mw.TextBlock
	public get mTxt_Rank(): mw.TextBlock {
		if(!this.mTxt_Rank_Internal&&this.uiWidgetBase) {
			this.mTxt_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mTxt_Rank') as mw.TextBlock
		}
		return this.mTxt_Rank_Internal
	}
	private mCanvas_Btn_Close_Internal: mw.Canvas
	public get mCanvas_Btn_Close(): mw.Canvas {
		if(!this.mCanvas_Btn_Close_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Btn_Close') as mw.Canvas
		}
		return this.mCanvas_Btn_Close_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Btn_Close/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mScrollBox_Rank_Internal: mw.ScrollBox
	public get mScrollBox_Rank(): mw.ScrollBox {
		if(!this.mScrollBox_Rank_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank') as mw.ScrollBox
		}
		return this.mScrollBox_Rank_Internal
	}
	private mCanvas_AutoSet_Internal: mw.Canvas
	public get mCanvas_AutoSet(): mw.Canvas {
		if(!this.mCanvas_AutoSet_Internal&&this.uiWidgetBase) {
			this.mCanvas_AutoSet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet') as mw.Canvas
		}
		return this.mCanvas_AutoSet_Internal
	}
	private mCanvas_Item_Rank_Internal: mw.Canvas
	public get mCanvas_Item_Rank(): mw.Canvas {
		if(!this.mCanvas_Item_Rank_Internal&&this.uiWidgetBase) {
			this.mCanvas_Item_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank') as mw.Canvas
		}
		return this.mCanvas_Item_Rank_Internal
	}
	private mImg_Item_RankBG_Internal: mw.Image
	public get mImg_Item_RankBG(): mw.Image {
		if(!this.mImg_Item_RankBG_Internal&&this.uiWidgetBase) {
			this.mImg_Item_RankBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mImg_Item_RankBG') as mw.Image
		}
		return this.mImg_Item_RankBG_Internal
	}
	private mCanvas_Rank_Internal: mw.Canvas
	public get mCanvas_Rank(): mw.Canvas {
		if(!this.mCanvas_Rank_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank') as mw.Canvas
		}
		return this.mCanvas_Rank_Internal
	}
	private mImg_Rank_BG1_Internal: mw.Image
	public get mImg_Rank_BG1(): mw.Image {
		if(!this.mImg_Rank_BG1_Internal&&this.uiWidgetBase) {
			this.mImg_Rank_BG1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank/mImg_Rank_BG1') as mw.Image
		}
		return this.mImg_Rank_BG1_Internal
	}
	private mTxt_Rank1_Internal: mw.TextBlock
	public get mTxt_Rank1(): mw.TextBlock {
		if(!this.mTxt_Rank1_Internal&&this.uiWidgetBase) {
			this.mTxt_Rank1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank/mTxt_Rank1') as mw.TextBlock
		}
		return this.mTxt_Rank1_Internal
	}
	private mImg_Rank_Mark_Internal: mw.Image
	public get mImg_Rank_Mark(): mw.Image {
		if(!this.mImg_Rank_Mark_Internal&&this.uiWidgetBase) {
			this.mImg_Rank_Mark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mImg_Rank_Mark') as mw.Image
		}
		return this.mImg_Rank_Mark_Internal
	}
	private mTxt_Rank_PlayerName_Internal: mw.TextBlock
	public get mTxt_Rank_PlayerName(): mw.TextBlock {
		if(!this.mTxt_Rank_PlayerName_Internal&&this.uiWidgetBase) {
			this.mTxt_Rank_PlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mTxt_Rank_PlayerName') as mw.TextBlock
		}
		return this.mTxt_Rank_PlayerName_Internal
	}
	private mCanvas_Rank_Value_Internal: mw.Canvas
	public get mCanvas_Rank_Value(): mw.Canvas {
		if(!this.mCanvas_Rank_Value_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank_Value') as mw.Canvas
		}
		return this.mCanvas_Rank_Value_Internal
	}
	private mImg_Rank_ValueBG_Internal: mw.Image
	public get mImg_Rank_ValueBG(): mw.Image {
		if(!this.mImg_Rank_ValueBG_Internal&&this.uiWidgetBase) {
			this.mImg_Rank_ValueBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank_Value/mImg_Rank_ValueBG') as mw.Image
		}
		return this.mImg_Rank_ValueBG_Internal
	}
	private mTxt_Rank_Value_Internal: mw.TextBlock
	public get mTxt_Rank_Value(): mw.TextBlock {
		if(!this.mTxt_Rank_Value_Internal&&this.uiWidgetBase) {
			this.mTxt_Rank_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mScrollBox_Rank/mCanvas_AutoSet/mCanvas_Item_Rank/mCanvas_Rank_Value/mTxt_Rank_Value') as mw.TextBlock
		}
		return this.mTxt_Rank_Value_Internal
	}
	private mCanvas_Rank_Myself_Internal: mw.Canvas
	public get mCanvas_Rank_Myself(): mw.Canvas {
		if(!this.mCanvas_Rank_Myself_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_Myself_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself') as mw.Canvas
		}
		return this.mCanvas_Rank_Myself_Internal
	}
	private mCanvas_Rank_MyselfBG_Internal: mw.Image
	public get mCanvas_Rank_MyselfBG(): mw.Image {
		if(!this.mCanvas_Rank_MyselfBG_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_MyselfBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfBG') as mw.Image
		}
		return this.mCanvas_Rank_MyselfBG_Internal
	}
	private mCanvas_Rank_MyselfItem_Internal: mw.Canvas
	public get mCanvas_Rank_MyselfItem(): mw.Canvas {
		if(!this.mCanvas_Rank_MyselfItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_MyselfItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfItem') as mw.Canvas
		}
		return this.mCanvas_Rank_MyselfItem_Internal
	}
	private mImg_Rank_MyselfItemBG_Internal: mw.Image
	public get mImg_Rank_MyselfItemBG(): mw.Image {
		if(!this.mImg_Rank_MyselfItemBG_Internal&&this.uiWidgetBase) {
			this.mImg_Rank_MyselfItemBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfItem/mImg_Rank_MyselfItemBG') as mw.Image
		}
		return this.mImg_Rank_MyselfItemBG_Internal
	}
	private mTxt_Rank_MyselfItem_Internal: mw.TextBlock
	public get mTxt_Rank_MyselfItem(): mw.TextBlock {
		if(!this.mTxt_Rank_MyselfItem_Internal&&this.uiWidgetBase) {
			this.mTxt_Rank_MyselfItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfItem/mTxt_Rank_MyselfItem') as mw.TextBlock
		}
		return this.mTxt_Rank_MyselfItem_Internal
	}
	private mCanvas_Rank_MyselfValue_Internal: mw.Canvas
	public get mCanvas_Rank_MyselfValue(): mw.Canvas {
		if(!this.mCanvas_Rank_MyselfValue_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_MyselfValue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfValue') as mw.Canvas
		}
		return this.mCanvas_Rank_MyselfValue_Internal
	}
	private mImg_Rank_MyselfValueBG_Internal: mw.Image
	public get mImg_Rank_MyselfValueBG(): mw.Image {
		if(!this.mImg_Rank_MyselfValueBG_Internal&&this.uiWidgetBase) {
			this.mImg_Rank_MyselfValueBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfValue/mImg_Rank_MyselfValueBG') as mw.Image
		}
		return this.mImg_Rank_MyselfValueBG_Internal
	}
	private mTxt_Rank_MyselfValue_Internal: mw.TextBlock
	public get mTxt_Rank_MyselfValue(): mw.TextBlock {
		if(!this.mTxt_Rank_MyselfValue_Internal&&this.uiWidgetBase) {
			this.mTxt_Rank_MyselfValue_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfValue/mTxt_Rank_MyselfValue') as mw.TextBlock
		}
		return this.mTxt_Rank_MyselfValue_Internal
	}
	private mImg_Rank_MyselfMark_Internal: mw.Image
	public get mImg_Rank_MyselfMark(): mw.Image {
		if(!this.mImg_Rank_MyselfMark_Internal&&this.uiWidgetBase) {
			this.mImg_Rank_MyselfMark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mImg_Rank_MyselfMark') as mw.Image
		}
		return this.mImg_Rank_MyselfMark_Internal
	}
	private mCanvas_Rank_MyselfPlayerName_Internal: mw.TextBlock
	public get mCanvas_Rank_MyselfPlayerName(): mw.TextBlock {
		if(!this.mCanvas_Rank_MyselfPlayerName_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rank_MyselfPlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Rank/mCanvas_Rank_Myself/mCanvas_Rank_MyselfPlayerName') as mw.TextBlock
		}
		return this.mCanvas_Rank_MyselfPlayerName_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 