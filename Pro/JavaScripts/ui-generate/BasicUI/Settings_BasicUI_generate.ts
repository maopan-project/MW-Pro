
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/BasicUI/Settings_BasicUI.ui
*/



@UIBind('UI/BasicUI/Settings_BasicUI.ui')
export default class Settings_BasicUI_Generate extends UIScript {
		private mBtn_Mask_Internal: mw.Button
	public get mBtn_Mask(): mw.Button {
		if(!this.mBtn_Mask_Internal&&this.uiWidgetBase) {
			this.mBtn_Mask_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Mask') as mw.Button
		}
		return this.mBtn_Mask_Internal
	}
	private mCanvas_UI_Setting_Internal: mw.Canvas
	public get mCanvas_UI_Setting(): mw.Canvas {
		if(!this.mCanvas_UI_Setting_Internal&&this.uiWidgetBase) {
			this.mCanvas_UI_Setting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting') as mw.Canvas
		}
		return this.mCanvas_UI_Setting_Internal
	}
	private mImg_Setting_BG_Internal: mw.Image
	public get mImg_Setting_BG(): mw.Image {
		if(!this.mImg_Setting_BG_Internal&&this.uiWidgetBase) {
			this.mImg_Setting_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mImg_Setting_BG') as mw.Image
		}
		return this.mImg_Setting_BG_Internal
	}
	private mTxt_Setting_Internal: mw.TextBlock
	public get mTxt_Setting(): mw.TextBlock {
		if(!this.mTxt_Setting_Internal&&this.uiWidgetBase) {
			this.mTxt_Setting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mTxt_Setting') as mw.TextBlock
		}
		return this.mTxt_Setting_Internal
	}
	private mCanvas_Btn_Close_Internal: mw.Canvas
	public get mCanvas_Btn_Close(): mw.Canvas {
		if(!this.mCanvas_Btn_Close_Internal&&this.uiWidgetBase) {
			this.mCanvas_Btn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_Btn_Close') as mw.Canvas
		}
		return this.mCanvas_Btn_Close_Internal
	}
	private mBtn_Close_Internal: mw.Button
	public get mBtn_Close(): mw.Button {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_Btn_Close/mBtn_Close') as mw.Button
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_AutoSet_Internal: mw.Canvas
	public get mCanvas_AutoSet(): mw.Canvas {
		if(!this.mCanvas_AutoSet_Internal&&this.uiWidgetBase) {
			this.mCanvas_AutoSet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet') as mw.Canvas
		}
		return this.mCanvas_AutoSet_Internal
	}
	private mCanvas_Bar_MusicVolume_Internal: mw.Canvas
	public get mCanvas_Bar_MusicVolume(): mw.Canvas {
		if(!this.mCanvas_Bar_MusicVolume_Internal&&this.uiWidgetBase) {
			this.mCanvas_Bar_MusicVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume') as mw.Canvas
		}
		return this.mCanvas_Bar_MusicVolume_Internal
	}
	private mTxt_MusicVolume_Internal: mw.TextBlock
	public get mTxt_MusicVolume(): mw.TextBlock {
		if(!this.mTxt_MusicVolume_Internal&&this.uiWidgetBase) {
			this.mTxt_MusicVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume/mTxt_MusicVolume') as mw.TextBlock
		}
		return this.mTxt_MusicVolume_Internal
	}
	private mBar_MusicVolume_Internal: mw.ProgressBar
	public get mBar_MusicVolume(): mw.ProgressBar {
		if(!this.mBar_MusicVolume_Internal&&this.uiWidgetBase) {
			this.mBar_MusicVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume/mBar_MusicVolume') as mw.ProgressBar
		}
		return this.mBar_MusicVolume_Internal
	}
	private mTxt_MusicVolume_Value_Internal: mw.TextBlock
	public get mTxt_MusicVolume_Value(): mw.TextBlock {
		if(!this.mTxt_MusicVolume_Value_Internal&&this.uiWidgetBase) {
			this.mTxt_MusicVolume_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_MusicVolume/mTxt_MusicVolume_Value') as mw.TextBlock
		}
		return this.mTxt_MusicVolume_Value_Internal
	}
	private mCanvas_Bar_SFXVolume_Internal: mw.Canvas
	public get mCanvas_Bar_SFXVolume(): mw.Canvas {
		if(!this.mCanvas_Bar_SFXVolume_Internal&&this.uiWidgetBase) {
			this.mCanvas_Bar_SFXVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume') as mw.Canvas
		}
		return this.mCanvas_Bar_SFXVolume_Internal
	}
	private mTxt_SFXVolume_Internal: mw.TextBlock
	public get mTxt_SFXVolume(): mw.TextBlock {
		if(!this.mTxt_SFXVolume_Internal&&this.uiWidgetBase) {
			this.mTxt_SFXVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume/mTxt_SFXVolume') as mw.TextBlock
		}
		return this.mTxt_SFXVolume_Internal
	}
	private mBar_SFXVolume_Internal: mw.ProgressBar
	public get mBar_SFXVolume(): mw.ProgressBar {
		if(!this.mBar_SFXVolume_Internal&&this.uiWidgetBase) {
			this.mBar_SFXVolume_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume/mBar_SFXVolume') as mw.ProgressBar
		}
		return this.mBar_SFXVolume_Internal
	}
	private mTxt_SFXVolume_Value_Internal: mw.TextBlock
	public get mTxt_SFXVolume_Value(): mw.TextBlock {
		if(!this.mTxt_SFXVolume_Value_Internal&&this.uiWidgetBase) {
			this.mTxt_SFXVolume_Value_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Bar_SFXVolume/mTxt_SFXVolume_Value') as mw.TextBlock
		}
		return this.mTxt_SFXVolume_Value_Internal
	}
	private mCanvas_Switch_Vibration_Internal: mw.Canvas
	public get mCanvas_Switch_Vibration(): mw.Canvas {
		if(!this.mCanvas_Switch_Vibration_Internal&&this.uiWidgetBase) {
			this.mCanvas_Switch_Vibration_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration') as mw.Canvas
		}
		return this.mCanvas_Switch_Vibration_Internal
	}
	private mTxt_Vibration_Internal: mw.TextBlock
	public get mTxt_Vibration(): mw.TextBlock {
		if(!this.mTxt_Vibration_Internal&&this.uiWidgetBase) {
			this.mTxt_Vibration_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration/mTxt_Vibration') as mw.TextBlock
		}
		return this.mTxt_Vibration_Internal
	}
	private mBar_Vibration_Internal: mw.ProgressBar
	public get mBar_Vibration(): mw.ProgressBar {
		if(!this.mBar_Vibration_Internal&&this.uiWidgetBase) {
			this.mBar_Vibration_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration/mBar_Vibration') as mw.ProgressBar
		}
		return this.mBar_Vibration_Internal
	}
	private mTxt_Vibration_State_Internal: mw.TextBlock
	public get mTxt_Vibration_State(): mw.TextBlock {
		if(!this.mTxt_Vibration_State_Internal&&this.uiWidgetBase) {
			this.mTxt_Vibration_State_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_UI_Setting/mCanvas_AutoSet/mCanvas_Switch_Vibration/mTxt_Vibration_State') as mw.TextBlock
		}
		return this.mTxt_Vibration_State_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 