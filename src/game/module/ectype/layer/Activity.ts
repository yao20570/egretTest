/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 活动页面
 */
class Activity extends BaseEuiView {
	public text1: eui.Label;
	public text2: eui.Label;
	public goLook: components.Button;
	public closeGroup:eui.Group;
	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = ActivitySkin;
	}
	public initUI() {
		super.initUI();
		this.goLook.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goLookView, this);
		this.closeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			App.ViewManager.closeView(this);
		}, this);
		this.text1.textFlow = <Array<egret.ITextElement>>[
			{ text: "1、活动期间中，主公通过挑战后扫荡任意副本关卡，都有记录活动", style: { "textColor": 0xC6C7DA } },
			{ text: "行军加速", style: { "textColor": 0xfeba29 } },
			{ text: "道具哦；", style: { "textColor": 0xC6C7DA } }
		];
		this.text2.textFlow = <Array<egret.ITextElement>>[
			{ text: "2、", style: { "textColor": 0xC6C7DA } },
			{ text: "行军加速", style: { "textColor": 0xfeba29 } },
			{ text: "道具效果为：使用后，立刻减少剩余行军时间的50%;", style: { "textColor": 0xC6C7DA } }
		];
	}
	public open(){

	}
	public close(){
		
	}
	private goLookView() {
		console.log("前往查看！");
	}
}