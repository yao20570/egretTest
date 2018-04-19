/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 是否充值页面
 */
class PayGlod extends BaseEuiView {
	public cancel: components.Button;
	public ensure: components.Button;

	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = PayGoldSkin;
	}
	public initUI() {
		super.initUI();
		this.cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goCancel, this);
		this.ensure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goEnsure, this);

	}
	public open() {

	}
	public close() {

	}
	private goCancel() {
		console.log("Cancel！");
	}
	private goEnsure() {
		console.log("Ensure!");
	}
}