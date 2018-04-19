/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 扫荡页面
 */
class Sweep extends BaseEuiView {
	public switchBar: components.SwitchTabBar;
	public viewStack: eui.ViewStack;
	public closeGroup: eui.Group;
	public closeBtn: components.Button;
	public startSweep: components.Button;
	public nowPower: eui.Label;

	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = SweepSkin;
	}
	public initUI() {
		super.initUI();
		this.closeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			App.ViewManager.closeView(this);
		}, this);
		this.switchBar.addEventListener(egret.Event.CHANGE, () => {
			this.viewStack.selectedIndex = this.switchBar.selectedIndex;
		}, this)
		this.switchBar.selectedIndex = this.viewStack.selectedIndex = 0;
		this.startSweep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sweepNow, this);
	}
	public open() {

	}
	public close() {

	}
	public sweepNow() {
		// this.applyFunc(EctpyeConst.SWEEP_REQ, obj);
	}
}