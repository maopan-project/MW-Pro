
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/common/ScalerText.ui
*/



@UIBind('UI/common/ScalerText.ui')
export default class ScalerText_Generate extends UIScript {
		private canvas1_Internal: mw.Canvas
	public get canvas1(): mw.Canvas {
		if(!this.canvas1_Internal&&this.uiWidgetBase) {
			this.canvas1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas1') as mw.Canvas
		}
		return this.canvas1_Internal
	}
	private img_Internal: mw.Image
	public get img(): mw.Image {
		if(!this.img_Internal&&this.uiWidgetBase) {
			this.img_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas1/img') as mw.Image
		}
		return this.img_Internal
	}
	private text_Internal: mw.TextBlock
	public get text(): mw.TextBlock {
		if(!this.text_Internal&&this.uiWidgetBase) {
			this.text_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas1/text') as mw.TextBlock
		}
		return this.text_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 