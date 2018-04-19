/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 特殊关卡按钮
 */
class FeedItem extends eui.Component {
	private static DEFAUIT: string = "default";//默认基本状态
	private static CLEAR: string = "clear";//待解锁状态
	private static OPEN: string = "open";//解锁状态
	public bgImg: eui.Image;
	public rect1: eui.Rect;
	public imgHead: eui.Image;
	public isShow: eui.Group;
	public action: eui.Label;
	public timeGroup: eui.Group;
	public count: eui.Label;
	public time: eui.Label;
	public clearText: eui.Label;
	public passId:eui.Group;
	public buyGlod:eui.Group;
	public goldNum:eui.Label;
	public effectGroup:eui.Group;
	public run: egret.tween.TweenGroup;
	private colorFlilter: egret.ColorMatrixFilter;
	public constructor() {
		super();
		this.skinName = FeedItemSkin;
		this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.touchHandler, this);
		//颜色矩阵数组
		let colorMatrix = [
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0, 0, 0, 1, 0
		];
		this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
	}
	private touchHandler() {
		this.imgHead.mask = this.rect1;
	}

}