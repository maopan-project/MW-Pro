
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/skill/AbilityRelease.ui
*/



@UIBind('UI/skill/AbilityRelease.ui')
export default class AbilityRelease_Generate extends UIScript {
		private controller_Internal: mw.Canvas
	public get controller(): mw.Canvas {
		if(!this.controller_Internal&&this.uiWidgetBase) {
			this.controller_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/controller') as mw.Canvas
		}
		return this.controller_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/controller/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private point_Internal: mw.Image
	public get point(): mw.Image {
		if(!this.point_Internal&&this.uiWidgetBase) {
			this.point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/controller/point') as mw.Image
		}
		return this.point_Internal
	}
	private tt_Internal: mw.TextBlock
	public get tt(): mw.TextBlock {
		if(!this.tt_Internal&&this.uiWidgetBase) {
			this.tt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/tt') as mw.TextBlock
		}
		return this.tt_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 