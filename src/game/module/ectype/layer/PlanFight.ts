/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 准备对战页面
 */
class PlanFight extends BaseEuiView {
	private panelView: components.PanelView;
	private myPower: eui.Label;//我方战力
	private foePower: eui.Label;//敌方战力
	private mopUp: components.Button;//扫荡按钮
	private comBat: components.Button;//战斗按钮
	private overPower: eui.Label;//剩余体力
	private addUndergo: eui.Label;//预计获取经验值
	private myPowerData: eui.DataGroup;//我方武将数据
	private foePowerData: eui.DataGroup;//敌方武将数据
	private forCollection: eui.ArrayCollection;
	private myCollection: eui.ArrayCollection;
	private outpostsOneData: any;//章节id数据组
	private replayData: Array<dragon.ChapterVo>//副本加载数据
	private heroModel: any;//英雄数据
	private dragText: eui.Label;//提示可拖动和消耗
	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = PlanFightSkin;
	}
	public initUI() {
		super.initUI();
		this.panelView.btnHelp.visible = false;
		this.myPowerData.dataProvider = this.myCollection = new eui.ArrayCollection();
		this.myPowerData.itemRenderer = myPowerDataItem;
		this.foePowerData.dataProvider = this.forCollection = new eui.ArrayCollection();
		this.foePowerData.itemRenderer = foePowerDataItem;
		this.dragText.textFlow =
			(new egret.HtmlTextParser)
				.parser(`<font>拖拽可更换出战顺序：若<font color="#d72322">战败</font>只消耗<font color="#31d840">2点</font>体力</font>`);
	}
	public open() {
		this.mopUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mopUpView, this);
		this.comBat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.comBatView, this);
		let ectpyeModel: EctpyeModel = <EctpyeModel>App.ControllerManager.getControllerModel(ControllerConst.Ectpye);
		let roleModel: RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
		let heroModel: HeroModel = <HeroModel>App.ControllerManager.getControllerModel(ControllerConst.Hero);
		this.heroModel = heroModel.hs.concat();
		this.replayData = ectpyeModel.replayData;
		this.myPower.text = "" + roleModel.score;
	}
	public close(){
		this.mopUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mopUpView, this);
		this.comBat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.comBatView, this);
	}
	/** 获取配置战力数据 */
	public getFoeData(foePowerData: any, monstersData: any, outpostsOneData: any) {
		this.forCollection.replaceAll(monstersData);
		let kinds = [];
		for (let i = 0; i < monstersData.length; i++) {
			kinds.push(monstersData[i].kind);
		}
		for (let i = 0; i < 4; i++) {
			if (this.heroModel.length <= i) {
				this.heroModel.push({});
			} else {
				this.heroModel[i].kinds = kinds;
			}
		}
		this.myCollection.replaceAll(this.heroModel);
		this.foePower.text = foePowerData.score;
		this.panelView.title = outpostsOneData.name;
		this.outpostsOneData = outpostsOneData;
		if (!outpostsOneData.normalexp) {
			this.addUndergo.text = outpostsOneData.firstexp;
		} else if (outpostsOneData.chapterid === this.replayData.length) {
			this.addUndergo.text = outpostsOneData.firstexp;
		} else {
			this.addUndergo.text = outpostsOneData.normalexp;
		}
	}
	//  扫荡按钮 
	private mopUpView() {
		App.ViewManager.open(ViewConst.Ectpye_Sweep);

	}
	//  战斗按钮
	private comBatView() {
		let mycoData = this.myCollection.source;
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
		console.log(this.outpostsOneData.id, hsIdsAny);
		this.applyFunc(EctpyeConst.COMBAT_REQ, { oid: this.outpostsOneData.id, hsIds: hsIdsAny });
		App.ViewManager.closeView(this);
	}
}
class myPowerDataItem extends eui.ItemRenderer {
	private rect: eui.Rect;//遮罩
	private nameGrade: eui.Label;//武将名
	private troopsNum: eui.Label;//兵力
	private headImg: eui.Image;//武将头像
	private bgImg: eui.Image;//属性克制
	private nature: eui.Label;//属性克制字体
	private hisY: number;//Y轴历史位置
	private hisName: string;//历史itemName
	private ability: eui.Group;//属性克制组
	private kindImg: any;//克制图像数组
	private quality: eui.Image;//品质
	private level: eui.Label;//等级
	private troops: eui.Label;//兵力文字
	private troopType: eui.Image;//步兵类型
	private heroData: any;//hero单个配表数据
	private hint: eui.Label;//未添加武将提示语
	private heros: eui.Group;//武将组


	public constructor() {
		super();
	}
	protected childrenCreated(): void {
		super.createChildren();
		this.initUI();
	}
	private initUI() {
		this.touchChildren = false;
		this.kindImg = [
			"v1_img_hongjiantou_png",
			"v1_img_lanjiantou_png",
			"v1_img_bukezhi_png"
		];
		this.headImg.mask = this.rect;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragEvent, this);
	}
	private playSwopAui() {
		let childAt: number;
		let canDragY: number = -30;
		let arrayData = <eui.DataGroup>this.parent;
		let source: any[] = arrayData.dataProvider["source"];
		for (let i = 0; i <= source.length; i++) {
			if (!source[i] || !source[i].h) {
				canDragY = (this.height + 12) * (i - 1);
				break
			}
		}
		if (this.x >= this.width / 2
			|| (this.x == 0 && this.y == this.hisY)
			|| this.y < -30 || this.y > this.parent.height + this.height / 2
			|| (this.hisY + this.height / 2 > this.y && this.y > this.hisY)
			|| (this.hisY - this.height / 2 < this.y && this.y < this.hisY)
			|| this.y > canDragY) {
			this.x = 0;
			this.y = this.hisY;
			this.alpha = 1;
			this.removeStageEvent();
			return
		}
		childAt = Math.floor(this.y / (this.height + 12));
		if (childAt < 0) {
			childAt = 0;
		}
		if (this.y % (this.height + 12) >= this.height / 2) {
			childAt += 1
		}
		if ((this.y < this.parent.height + this.height / 2 && this.y >= this.parent.height) || childAt > 3) {
			childAt = 3;
		}
		var objectAt = <eui.ItemRenderer>this.parent.getChildByName(childAt + "");
		objectAt.includeInLayout = false;
		this.hisName = this.name;
		egret.Tween.get(this).to({ x: 0, y: objectAt.y }, 100).call(() => {
			this.name = childAt + "";
			this.getKindImg(this.data.h, this.name);
		});
		egret.Tween.get(objectAt).to({ y: this.hisY }, 100).call(() => {
			objectAt.name = this.hisName;
			this.getKindImg(objectAt.data.h, objectAt.name);
			this.removeStageEvent();
		});
		this.alpha = 1;
	}
	//删除舞台触摸事件
	private removeStageEvent() {
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragEvent, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.dragEvent, this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragEvent, this);
	}
	//添加舞台触摸事件
	private addStageEvent() {
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.dragEvent, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.dragEvent, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragEvent, this);
	}
	private dragEvent(event: egret.TouchEvent) {
		switch (event.type) {
			case egret.TouchEvent.TOUCH_MOVE:
				this.parent.setChildIndex(this, this.parent.numChildren - 1);
				this.includeInLayout = false;
				this.x = event.stageX - this.width / 2;
				this.y = event.stageY - this.parent.y - this.height / 2;
				if (this.x <= -this.width / 2 || this.x >= this.width * 1.5 || this.y <= -60 || this.y >= 640) {
					this.x = 0;
					this.y = this.hisY;
					this.alpha = 1;
					this.removeStageEvent();
				}
				break;
			case egret.TouchEvent.TOUCH_END:
				this.playSwopAui();
				break;
			case egret.TouchEvent.TOUCH_BEGIN:
				this.alpha = 0.75;
				this.hisY = this.y;
				this.addStageEvent();
				break;
		}
	}
	//修改克制属性图片 id 武将id name 获取this.name
	private getKindImg(id: number, name: string) {
		let itemRan = <eui.ItemRenderer>this.parent.getChildByName(name);
		this.heroData = ConfigDb.heroConfig.getHeroData()[id];
		let forKind = this.data.kinds[parseInt(name)];
		let myKind = this.heroData.kind;
		if (this.data.kinds.length - 1 >= parseInt(name)) {
			itemRan["ability"].visible = true;
			if (forKind == myKind) {
				itemRan["bgImg"].source = this.kindImg[2];
			} else if ((myKind == 1 && forKind == 3)
				|| (myKind == 2 && forKind == 1)
				|| (myKind == 3 && forKind == 2)) {
				itemRan["bgImg"].source = this.kindImg[1];
			} else {
				itemRan["bgImg"].source = this.kindImg[0];
			}

			if (itemRan["bgImg"].source == this.kindImg[2]) {
				itemRan["nature"].text = "";
			} else {
				itemRan["nature"].text = "克制";
			}
		} else {
			itemRan["ability"].visible = false;
		}

	}
	public dataChanged(): void {
		this.heroData = ConfigDb.heroConfig.getHeroData()[this.data.h];
		if (this.name == "") {
			this.name = this.itemIndex + "";
		}
		if (this.data.h) {
			this.getKindImg(this.data.h, this.name);
			this.nameGrade.text = this.heroData.name;
			this.level.text = "Lv:" + this.data.l;
			ColorUtils.setTextColorByQuality(this.nameGrade, this.heroData.quality);
			ColorUtils.setTextColorByQuality(this.troops, this.heroData.quality);
			this.troopsNum.text = this.data.lt + "";
			this.headImg.source = this.heroData.img + "5_png";
			this.quality.source = hero.getBox(this.heroData.quality);
			this.troopType.source = hero.getKindImage(this.heroData.kind);
		} else {
			this.hint.visible = true;
			this.heros.visible = false;
			switch (this.itemIndex) {
				case 1:
					this.hint.text = "点击选择上阵武将";
					this.headImg.source = "v1_btn_tianjia_png";
					this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
						Toast.showTipsDownToUp("点击选择上阵武将");
					}, this)
					break;
				case 2:
					this.hint.text = `研究"中级军势"解锁`;
					break;
				case 3:
					this.hint.text = `研究"高级军势"解锁`;
					break

			}
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.dragEvent, this);
		}
	}
}
class foePowerDataItem extends eui.ItemRenderer {
	private rect: eui.Rect;//遮罩
	private nameGrade: eui.Label;//武将名和等级
	private troopsNum: eui.Label;//兵力
	private headImg: eui.Image;//武将头像
	private bgImg: eui.Image;//属性克制
	private nature: eui.Label;//属性克制字体
	private ability: eui.Group;//属性克制组
	private quality: eui.Image;//品质
	private level: eui.Label;//等级
	private troops: eui.Label;//兵力文字
	private troopType: eui.Image;//步兵类型
	public constructor() {
		super();
	}
	protected childrenCreated(): void {
		super.createChildren();
		this.initUI();
	}
	private initUI() {
		this.headImg.mask = this.rect;
	}
	public dataChanged(): void {
		this.nameGrade.text = this.data.name;
		this.level.text = "Lv:" + this.data.level;
		ColorUtils.setTextColorByQuality(this.nameGrade, this.data.quality);
		ColorUtils.setTextColorByQuality(this.troops, this.data.quality);
		this.headImg.source = this.data.icon + "_png";
		this.quality.source = hero.getBox(this.data.quality);
		this.troopType.source = hero.getKindImage(this.data.kind);
	}
}