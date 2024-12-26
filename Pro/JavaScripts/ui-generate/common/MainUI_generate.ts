
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/MainUI.ui
*/



@UIBind('UI/common/MainUI.ui')
export default class MainUI_Generate extends UIScript {
		private btnC_Internal: mw.Button
	public get btnC(): mw.Button {
		if(!this.btnC_Internal&&this.uiWidgetBase) {
			this.btnC_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnC') as mw.Button
		}
		return this.btnC_Internal
	}
	private btnB_Internal: mw.StaleButton
	public get btnB(): mw.StaleButton {
		if(!this.btnB_Internal&&this.uiWidgetBase) {
			this.btnB_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnB') as mw.StaleButton
		}
		return this.btnB_Internal
	}
	private textDes_Internal: mw.TextBlock
	public get textDes(): mw.TextBlock {
		if(!this.textDes_Internal&&this.uiWidgetBase) {
			this.textDes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textDes') as mw.TextBlock
		}
		return this.textDes_Internal
	}
	private imggg_Internal: mw.Image
	public get imggg(): mw.Image {
		if(!this.imggg_Internal&&this.uiWidgetBase) {
			this.imggg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/imggg') as mw.Image
		}
		return this.imggg_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 