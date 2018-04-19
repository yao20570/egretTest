/*
 * @Author: lzf 
 * @data: 2018-3-27 17:34:33 
 * @Description: 结算页面
 */
class WindUp extends BaseEuiView {
	private starGroup: eui.Group;//星星组
	private lord: eui.Component;//主公信息
	private workHeroData: eui.DataGroup;//上阵武将信息
	private heroCollection: eui.ArrayCollection;//武将数据结构包装器
	private propData: eui.DataGroup;//获得道具信息
	private propCollection: eui.ArrayCollection;//道具数据结构包装器
	private liftWayData: eui.DataGroup;//提战途径信息
	private liftCollection: eui.ArrayCollection;//提战数据结构包装器
	private expendPow: eui.Label;//消耗体力
	private closeView: components.Button;//关闭view按钮
	private goOn: components.Button;//继续挑战按钮
	private data: any;//战斗结算数据
	private powGrop: eui.Group;//消耗体力按钮组

	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = WindUpSkin;
	}
	public initUI() {
		super.initUI();
		this.workHeroData.dataProvider = this.heroCollection = new eui.ArrayCollection();
		this.workHeroData.itemRenderer = workHeroDataItem;
		this.propData.dataProvider = this.propCollection = new eui.ArrayCollection();
		this.propData.itemRenderer = propDataItem;
		// this.liftWayData.dataProvider = this.liftCollection = new eui.ArrayCollection();
		this.liftWayData.itemRenderer = liftWayDataItem;
	}
	public open(data) {
		this.data = data;
		console.log(data);
		if (!data.win) {
			this.currentState = "lost";
		} else {
			this.goOn.visible =
				this.powGrop.visible
			this.goOn.includeInLayout = data.chapters[0].x == 6;
		}
		for (let i = 0; i < this.starGroup.numChildren; i++) {
			this.starGroup.getChildAt(i).visible = data.star > i;
		}
		for (let i = 0; i < 4; i++) {
			if (data.heroExps.length <= i) {
				data.heroExps.push({});
			}
		}
		this.heroCollection.replaceAll(data.heroExps);
		let awards = [];
		for (let i = 0; i < data.awards.length; i++) {
			if (data.awards[i].k !== 12) {
				awards.push(data.awards[i]);
			}
		}
		this.propCollection.replaceAll(awards);
		this.closeView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeWindView, this);
		this.goOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.comBatView, this);
		let roleModel: RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
		this.lord["headImg"].source = roleModel.iconImg;
		this.lord["quality"].source = "v2_img_kapaiygwc_png";
		this.lord["nameGrade"].text = "主公";
		this.lord["gradePro"].labelDisplay.visible =
			this.lord["troopType"].visible = false;
		this.lord["level"].text = `Lv:${roleModel.level}`;
		this.lord["addSuffer"].text = `+${roleModel.exp}`;
	}
	public close() {
		this.closeView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeWindView, this);
		this.goOn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.comBatView, this);
	}
	//关闭面板
	private closeWindView() {
		App.ViewManager.closeView(this);
		this.applyFunc(EctpyeConst.SETTLE_RES, this.data.openOps);
	}
	//继续挑战按钮
	private comBatView() {
		let mycoData = this.heroCollection.source;
		let hsIdsAny: string;
		mycoData.forEach((val, i, arr) => {
			if (val.h) {
				if (hsIdsAny) {
					if (i == mycoData.length - 1) {
						hsIdsAny += val.h;
					} else {
						hsIdsAny += val.h + ";";
					}
				} else {
					if (mycoData[i + 1].h) {
						hsIdsAny = val.h + ";"
					} else {
						hsIdsAny = val.h;
					}
				}
			}
		})
		this.applyFunc(EctpyeConst.COMBAT_REQ, { oid: this.data.openOps[0] - 1, hsIds: hsIdsAny });
		App.ViewManager.closeView(this);
	}
}
class workHeroDataItem extends eui.ItemRenderer {
	public rect: eui.Rect;//遮罩
	private quality: eui.Image;//品质
	private headImg: eui.Image;//武将头像
	private gradePro: components.Progress;//等级进度条
	private nameGrade: eui.Label;//武将名
	private level: eui.Label;//等级
	private heroData: any;//hero单个配表数据
	private troopType: eui.Image;//步兵类型
	private addSuffer: eui.Label;//增加经验
	public constructor() {
		super();
	}
	protected childrenCreated(): void {
		super.createChildren();
		this.initUI();
	}
	private initUI() {
		this.headImg.mask = this.rect;
		this.gradePro.labelDisplay.visible = false;
	}

	public dataChanged(): void {
		if (this.data.h) {
			this.currentState = "be";
			this.heroData = ConfigDb.heroConfig.getHeroData()[this.data.h];
			this.nameGrade.text = this.heroData.name;
			this.level.text = "Lv:" + this.data.l;
			this.headImg.source = this.heroData.img + "5_png";
			this.quality.source = hero.getBox(this.heroData.quality);
			this.troopType.source = hero.getKindImage(this.heroData.kind);
			this.addSuffer.text = "+" + this.data.a;
			// getHeroExpData
			// this.updataExp(this.data.e,this.data.a);
		} else {
			this.currentState = "no";
		}
	}
	/**
	 * 更新武将经验等级进度条 
	 * @param  {number} e 升级前等级值
	 * @param  {number} a 增加经验值
	 */
	private updataExp(e: number, a: number) {

	}
}
class propDataItem extends eui.ItemRenderer {
	private quality: eui.Image;//品质
	private goodsText: eui.Label;//获取奖品文字描述
	private headImg: eui.Image;//奖品图标
	public constructor() {
		super();
	}
	protected childrenCreated(): void {
		super.createChildren();
		this.initUI();
	}
	private initUI() {
	}
	public dataChanged(): void {
		let goodsData = ConfigDb.ectypeConfig.getGoodsData()[this.data.k];
		this.headImg.source = goodsData.icon + "_png";
		this.quality.source = hero.getBox(goodsData.quality);
		this.goodsText.text = `${goodsData.name}*${this.data.v}`
	}
}
class liftWayDataItem extends eui.ItemRenderer {
	private typeText: eui.Label;
	public constructor() {
		super();
	}
	protected childrenCreated(): void {
		super.createChildren();
		this.initUI();
	}
	private initUI() {
	}
	public dataChanged(): void {
		// switch (this.itemIndex){
		// 	case 0:
		Toast.showTipsDownToUp(`打开view ${this.typeText.text}`);
		// }
	}
}