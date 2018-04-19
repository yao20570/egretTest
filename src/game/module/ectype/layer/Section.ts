/*
 * @Author: lzf 
 * @Date: 2018-3-27 17:34:33 
 * @Description: 章节页面
 */
class Section extends BaseEuiView {
	private sectionList: eui.DataGroup;//章节列表数据源
	private myCollection: eui.ArrayCollection;
	private chapterData: any[];//关卡数据配表
	public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
		super($controller, $parent);
		this.skinName = SectionSkin;
	}
	public initUI() {
		this.sectionList.itemRenderer = sectionListItem;
		this.sectionList.dataProvider = this.myCollection = new eui.ArrayCollection();
	}
	public open() {
		let ectpyeModel: EctpyeModel = <EctpyeModel>App.ControllerManager.getControllerModel(ControllerConst.Ectpye);
		this.chapterData = RES.getRes("dragon_chapter_json");
		let data = this.chapterData.concat().splice(0, ectpyeModel.replayData.length + 1).reverse();
		this.myCollection.replaceAll(data);
	}
	public close() {
		this.myCollection.replaceAll([]);
	}
}

class sectionListItem extends eui.ItemRenderer {
	private sectionName: eui.Label;//章节名字
	private rects: eui.Rect[];//遮罩组
	private rect1: eui.Rect;
	private rect2: eui.Rect;
	private rect3: eui.Rect;
	private imgs: eui.Image[];//遮罩参照物组
	private img1: eui.Image;
	private img2: eui.Image;
	private img3: eui.Image;
	private passGroup: eui.Group;//通过显示组
	private rays: eui.Image[];//通关星级组
	private ray1: eui.Image;
	private ray2: eui.Image;
	private ray3: eui.Image;
	private bg: eui.Image;//顶层阴影图
	public constructor() {
		super();
	}
	protected childrenCreated(): void {
		super.createChildren();
		this.imgs = [this.img1, this.img2, this.img3];
		this.rects = [this.rect1, this.rect2, this.rect3];
		this.rays = [this.ray1, this.ray2, this.ray3];
		this.initUI();
	}
	private initUI() {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.bgIsShow, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.openSelection, this);
		this.imgs.forEach((v, i, array) => {
			this.imgs[i].mask = this.rects[i];
		});
	}
	//是否显示遮罩图片
	private bgIsShow() {
		if (this.currentState != "0") {
			this.bg.visible = true;
		}
	}
	//选择对应章节跳转
	private openSelection() {
		if (this.currentState == "0") {
			Toast.showTipsDownToUp("通过上个章节解锁");
		} else {
			this.bg.visible = false;
			if (this.parent.parent.parent.parent instanceof BaseEuiView) {
				let p: BaseEuiView = <BaseEuiView>this.parent.parent.parent.parent;
				p.applyFunc(EctpyeConst.SKIP_RES, this.data.id);
			}
			App.ViewManager.close(ViewConst.Ectpye_section);
		}

	}
	public dataChanged(): void {
		if (this.data.s && this.data.s !== 0) {
			this.passGroup.visible = true;
			for (let i = 0; i < this.rays.length; i++) {
				this.rays[i].visible = this.data.s > i
			};
		} else {
			this.passGroup.visible = false;
		}
		if (!this.itemIndex) {
			this.currentState = "0";
		} else {
			this.currentState = "1";
			this.bg.visible = false;
		}
		if (!this.data.icon.length && this.itemIndex) {
			this.currentState = "4";
		} else {
			let icons = this.data.icon;
			this.currentState = icons.length + "";
			for (let i = 0; i < icons.length; i++) {
				switch (this.data.type[i]) {
					case 1:
						this.imgs[i].source = `i${icons[i]}_5_png`;
						break;
					case 3:
					case 4:
						this.imgs[i].source = `${icons[i]}_png`;
						break;
				}
			}
		}
	}
}