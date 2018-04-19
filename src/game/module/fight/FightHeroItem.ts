/*
 * @Author: jrc 
 * @Date: 2018-4-2 10:35:28 
 * @Description: 
 */
let tFilters3 = [new egret.ColorMatrixFilter([
    0.33,0,0,0,0,
    0,0.33,0,0,0,
    0,0,0.33,0,0,
    0,0,0,1,0
])]
let tFilters4 = [new egret.ColorMatrixFilter([
    1,0,0,0,0,
    0,1,0,0,0,
    0,0,1,0,0,
    0,0,0,1,0
])]
class FightHeroItem extends eui.Component  {
	public grpIcon: eui.Group; // 图标层
	public imgIcon: eui.Image; // 图标 
	public lbName: eui.Label; // 名字

	//
	public tData: any; // 武将数据

	public constructor() {
		super();
		this.initData();
		this.setupViews();
	}

	/** 初始化数据 */
	public initData(): void {
		this.tData = null;
	}
	/** 初始化数据 */
	public setupViews(): void {
		this.skinName = FightHeroItemSkin;
		this.grpIcon.mask = new egret.Rectangle(0, 0, 108, 108);
	}
	/** 刷新组件 */
	public updateViews(): void {
		if (this.tData == null) return;
		this.lbName.text = this.tData.sName;
		this.imgIcon.source = this.tData.sIcon;
		
        ColorUtils.setTextColorByQuality(this.lbName, this.tData.nQuality);
	}
	
	/**
	 * 设置武将数据
	 * @param  {any} _tData 武将数据
	 * @returns void
	 */
	public setData(_tData: any): void {
		this.tData = _tData;
		this.updateViews();
	}
	/** 获取当前设置的武将数据 */
	public getData(): any {
		return this.tData;
	}
	/** 设置名字是否显示 */
	public setNameVisible(_isVisible:boolean): void {
		this.lbName.visible = _isVisible;
	}
	public setScale(_fScale:number=1): void {
		this.scaleX = this.scaleY = _fScale;
	}
	public setToGray(_bG:boolean):void {
		if (_bG) {
			this.lbName.filters = tFilters3;
			this.imgIcon.filters = tFilters3;
		} else {
			this.lbName.filters = tFilters4;
			this.imgIcon.filters = tFilters4;
		}
	}
}