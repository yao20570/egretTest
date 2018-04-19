/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 武将招募页面
 */
class Recruit extends BaseEuiView {
	public freeRecruil: components.Button;
	public heroData: eui.DataGroup;

	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = RecruitSkin;
	}
	public initUI() {
		super.initUI();
	}
	public open() {

	}
	public close() {

	}
}