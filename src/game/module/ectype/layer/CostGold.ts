/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 花费黄金招募页面
 */
class CostGold extends BaseEuiView {
	public cancel: components.Button;
	public ensure: components.Button;

	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = CostGoldSkin;
	}
	public initUI() {
		super.initUI();
		this.cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goCancel, this);
		this.ensure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goEnsure, this);

	}
	public open(){
		
	}
	public close(){
		this.cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goCancel, this);
		this.ensure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goEnsure, this);
	}
	private goCancel() {
		console.log("Cancel！");
	}
	private goEnsure() {
		console.log("Ensure!");
	}
}