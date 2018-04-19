/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 购买体力页面
 */
class BuyPower extends BaseEuiView {
	public cancel: components.Button;
	public ensure: components.Button;
	public text: eui.Label;
	public remainGold: eui.Label;
	public hsilderView: components.HSliderView;
	public closeGroup: eui.Group;
	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = BuyPowerSkin;
	}
	public initUI() {
		super.initUI();
		this.closeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			App.ViewManager.closeView(this);
		}, this);
		// this._text.textFlow = <Array<egret.ITextElement>>[
		// 	{ text: "主公是否愿意花费黄金购买100体力？\n", style: { "textColor": 0xC6C7DA } },
		// 	{ text: "(今日还可以购买2/7次，升级VIP可增加次数)\n", style: { "textColor": 0xfeba29 } },
		// 	{ text: "活动赠送剩余次数：3次;", style: { "textColor": 0xC6C7DA } }
		// ];
		// this.text.textFlow =(new egret.HtmlTextParser).parser("<font>主公是否愿意花费黄金购买<font color='#ffffff'>$1</font>体力？\n</font>".format(11))

		// this._text.verticalAlign
	}
	public open(){

	}
	public close(){
		
	}
}