/*
 * @Author: lzf 
 * @Date: 2018-4-12 20:35:46 
 * @Description:序列帧特效管理类 
 */
class ParticleUtils extends BaseClass {
	public constructor() {
		super();
	}
	/**
	 * 创建序列帧
	 * @param object 附加对象
	 * @param jsonName json文件名
	 * @param pngName 对应图片名
	 * @param x 相对位置X
	 * @param y 相对位置y
	 * @param movieClipName 根据名字生成一个MovieClipData实例
	 * @param tier 设置创建层级 默认顶层
	 * @returns void
	 */
	public createEffect(object: egret.DisplayObjectContainer, jsonName: string, pngName: string,
		x: number, y: number, movieClipName: string = "Action", rotation: number = 0, tier: number = -1): void {
		let data = RES.getRes(jsonName);
		let txtr = RES.getRes(pngName);
		let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let effect = new egret.MovieClip(mcFactory.generateMovieClipData(movieClipName));
		effect.name = movieClipName;
		effect.x = x;
		effect.y = y;
		effect.rotation = rotation;
		effect.anchorOffsetX = effect.width * 0.5;
		effect.anchorOffsetY = effect.height * 0.5;
		object.addChild(effect);
		if (tier !== -1) {
			object.setChildIndex(effect, 0);
		}
		effect.gotoAndPlay(0, -1);
	}
	/**
	 * @param  {egret.DisplayObjectContainer} object 附加对象
	 * @param  {string} name 序列帧对象name
	 */
	public removeEffect(object: egret.DisplayObjectContainer, name: string) {
		let movieChip = <egret.MovieClip>object.getChildByName(name);
		App.DisplayUtils.removeFromParent(movieChip);
	}
	/**
	 * @param  {egret.DisplayObjectContainer} object 附加对象
	 * @param  {string} movieClipName 序列帧对象name
	 */
	public playEffect(object: egret.DisplayObjectContainer, name: string) {
		let movieChip = <egret.MovieClip>object.getChildByName(name);
		movieChip.play();
	}
	/**
	 * @param  {egret.DisplayObjectContainer} object 附加对象
	 * @param  {string} name 序列帧对象name
	 */
	public stopEffect(object: egret.DisplayObjectContainer, name: string) {
		let movieChip = <egret.MovieClip>object.getChildByName(name);
		movieChip.stop();
	}
}
