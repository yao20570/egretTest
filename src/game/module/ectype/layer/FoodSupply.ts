/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 补给页面
 */

class FoodSupply extends BaseEuiView {
	private supply: eui.Label;//补给类型
	private remainNum: eui.Label;//剩余购买次数
	private supplyText: eui.Label;//补给文本
	private remainGold: eui.Label;//剩余黄金
	private imgHeard: eui.Image;//补给类型图片
	private supplyData: {
		nowNum: number,
		allNum: number,
		imgHead: string,
		goldNum: number,
		name: string
	};//军资补给数据

	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = FoodSupplySkin;
	}

	public initUI() {
		super.initUI();
	}
	/** 获取基本数据 */
	public updateInitUI(supplyData) {
		this.supplyData = supplyData;
		this.remainNum.text = `剩余购买次数:${this.supplyData.nowNum}/${this.supplyData.allNum}`;
		this.remainGold.textFlow =
			(new egret.HtmlTextParser).parser(
				`<font><font color="#77d4fd">${this.supplyData.goldNum}</font>/9999</font>`);
		this.supply.text = this.supplyData.name;
		this.imgHeard.source = this.supplyData.imgHead;
	}
	public open() {

	}
	public close() {

	}
}
