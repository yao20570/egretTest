class HeroInfoView extends BaseEuiView {
	public tabBar:eui.TabBar;
	public qualifi:eui.Image;
	public kindImg:eui.Image;
	public nameLb:eui.Label;

	public _hero_img_group: eui.Group;
	public p1Hero: HeroImage;
	public p2Hero: HeroImage;
	public p3Hero: HeroImage;
	public p4Hero: HeroImage;


	/**图片轮播滑动计算手指移动时候用 */
	private offsetX: number = 0;
	private lastX: number = 0;
	private tmp: number = 0;
	private curImageTween: egret.Tween;
	private nextImageTween: egret.Tween;	
	private curGroupTween: egret.Tween;
	private nextGroupTween: egret.Tween;
	private totalLength: number;
	private currentP: number;
	private currentGroup: string = "base";

	private ulTw: egret.Tween;
	private urTw: egret.Tween;
	private dlTw: egret.Tween;
	private drTw: egret.Tween;

	public qulifiLb:eui.Label;
	public gongProBar:components.Progress;
	public gongLb:eui.Label;
	public fangProBar:components.Progress;
	public fangLb:eui.Label;
	public bingProBar:components.Progress;
	public bingLb:eui.Label;
	public lvProBar:components.Progress;
	public atkLb:eui.Label;
	public defLb:eui.Label;
	public troopsLb:eui.Label;
	public addLv:eui.Image;

	public attrAtkLb:eui.Label;
	public attrHardAtkLb:eui.Label;
	public attrGuardLb:eui.Label;
	public attrCritLb:eui.Label;
	public attrDefLb:eui.Label;
	public attrHardDefLb:eui.Label;
	public attrHitfLb:eui.Label;
	public attrToughLb:eui.Label;
	public attrTroopsLb:eui.Label;
	public attrAtkCityLb:eui.Label;
	public attrDodgeLb:eui.Label;

	public base:eui.Group;
	public detail:eui.Group;

	public _arrow_up_left: eui.Image;
	public _arrow_up_right: eui.Image;
	public _arrow_down_left: eui.Image;
	public _arrow_down_right: eui.Image;
	public _hero_attribute: eui.Image;

	public _hero_train: components.Button;
	public _hero_soul: components.Button;
	public _hero_forward: components.Button;

	public constructor(controller: BaseController, parent: egret.DisplayObjectContainer) {
		super(controller, parent);
		this.skinName = HeroInfoSkin;
	}

	public initUI(): void {
		super.initUI();
		//箭头缓动效果
		//上左
		egret.Tween.removeTweens(this._arrow_up_left);
		this.ulTw = egret.Tween.get(this._arrow_up_left, { loop: true });
		let ulBfx = this._arrow_up_left.x - 5;
		let ulAfx = ulBfx + 5;
		this.ulTw.to({ x: ulBfx }, 300).to({ x: ulAfx }, 300);
		
		//上右
		egret.Tween.removeTweens(this._arrow_up_right);
		this.urTw = egret.Tween.get(this._arrow_up_right, { loop: true });
		let urBfx = this._arrow_up_right.x + 5;
		let urAfx = urBfx - 5;
		this.urTw.to({ x: urBfx }, 300).to({ x: urAfx }, 300);
		
		//下左
		egret.Tween.removeTweens(this._arrow_down_left);
		this.dlTw = egret.Tween.get(this._arrow_down_left, { loop: true });
		let dlBfx = this._arrow_down_left.x - 5;
		let dlAfx = dlBfx + 5;
		this.dlTw.to({ x: dlBfx }, 300).to({ x: dlAfx }, 300);
		//下右
		egret.Tween.removeTweens(this._arrow_down_right);
		this.drTw = egret.Tween.get(this._arrow_down_right, { loop: true });
		let drBfx = this._arrow_down_right.x + 5;
		let drAfx = drBfx - 5;
		this.drTw.to({ x: drBfx }, 300).to({ x: drAfx }, 300);
		
		this.base.touchChildren = false;
		this.detail.touchChildren = false;
	}

	public open(type: string, currentP: number): void {
		this.refresh(type, currentP);
		//事件侦听
		if (this.p1Hero) {			
			this.p1Hero.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		if (this.p2Hero) {			
			this.p2Hero.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		if (this.p3Hero) {
			this.p3Hero.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		if (this.p4Hero) {
			this.p4Hero.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		this.tabBar.addEventListener(egret.Event.CHANGE,this.onTabBarChange, this);
		this._arrow_up_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upArrowClick, this);
		this._arrow_up_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upArrowClick, this);
		this._arrow_down_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.downArrowClick, this);
		this._arrow_down_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.downArrowClick, this);

		this.base.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchGroupHandler, this);
		this.detail.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchGroupHandler, this);

		this._hero_attribute.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroAttributeView, this);
		this._hero_train.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroTrainView, this);
		this._hero_soul.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroSoulView, this);
		this._hero_forward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroForwardView, this);
	}

	private onTabBarChange(evt:egret.Event): void{
		let idx = this.tabBar.selectedIndex;		
		switch(idx){
			case 0:
				this.refresh("main",1);
				break;
			case 1:
				this.refresh("collect",1);
				break;
			case 2:
				this.refresh("defend",1);
				break;
			default:
				break;
		}		
	}

	private openHeroAttributeView(): void {
		App.ViewManager.open(ViewConst.HeroAttribute, "i200381");
	}

	private openHeroTrainView(): void {
		App.ViewManager.open(ViewConst.HeroTrain);
	}

	private openHeroSoulView(): void {
		App.ViewManager.open(ViewConst.HeroSoul);
	}

	private openHeroForwardView(): void {
		App.ViewManager.open(ViewConst.HeroForward);
	}

	private refresh(type: string, currentP: number): void {
		//先进行数据刷新
		let roleModel: RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
		let heroModel: HeroModel = <HeroModel>App.ControllerManager.getControllerModel(ControllerConst.Hero);
		this.currentP = currentP;
		let hs = heroModel.hs;	
		let typeHeros:any;	
		//选中打开的TabBar
		switch(type){
			case "main":
				this.tabBar.selectedIndex = 0;
				typeHeros = hero.getMainHero(hs);
				break;
			case "collect":
				this.tabBar.selectedIndex = 1;
				typeHeros = hero.getColHero(hs);
				break;
			case "defend":
				//this.tabBar.selectedIndex = 2;
				//typeHeros = hero.getDefHero(hs);
				break;
			default:
				break;
		}		
		this.totalLength = Object.keys(typeHeros).length;
		if (!this.p1Hero) {
			let hvo: hero.HeroVo = typeHeros[1];
			this.p1Hero = new HeroImage();
			this.p1Hero.x = 0;
			this.p1Hero.y = 0;
			this.p1Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
			this._hero_img_group.addChild(this.p1Hero);						
		}else if(typeHeros[1]){
			let hvo: hero.HeroVo = typeHeros[1];
			this.p1Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
		}

		if (!this.p2Hero && typeHeros[2]) {
			let hvo: hero.HeroVo = typeHeros[2];
			this.p2Hero = new HeroImage();
			this.p2Hero.x = this.p1Hero.x + this.p1Hero.width;
			this.p2Hero.y = 0;
			this.p2Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
			this._hero_img_group.addChild(this.p2Hero);			
		}else if(typeHeros[2]){
			let hvo: hero.HeroVo = typeHeros[2];
			this.p2Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
		}

		if (!this.p3Hero && typeHeros[3]) {
			let hvo: hero.HeroVo = typeHeros[3];
			this.p3Hero = new HeroImage();
			this.p3Hero.x = this.p2Hero.x + this.p2Hero.width;
			this.p3Hero.y = 0;
			this.p3Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
			this._hero_img_group.addChild(this.p3Hero);			
		}else if(typeHeros[3]){
			let hvo: hero.HeroVo = typeHeros[3];
			this.p3Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
		}

		if (!this.p4Hero && typeHeros[4]) {
			let hvo: hero.HeroVo = typeHeros[4];
			this.p4Hero = new HeroImage();
			this.p4Hero.x = this.p3Hero.x + this.p3Hero.width;
			this.p4Hero.y = 0;
			this.p4Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
			this._hero_img_group.addChild(this.p4Hero);			
		}else if(typeHeros[4]){
			let hvo: hero.HeroVo = typeHeros[4];
			this.p4Hero.changeHero(hero.getHeroImg(hvo.h).split("_")[0]);
		}
		switch (currentP) {
			case 1:
				this.p1Hero.x = 0;
				this.calMainImagePosition(this.tmp, this.p1Hero, this.totalLength);
				break;
			case 2:
				this.p2Hero.x = 0;
				this.calMainImagePosition(this.tmp, this.p2Hero, this.totalLength);
				break;
			case 3:
				this.p3Hero.x = 0;
				this.calMainImagePosition(this.tmp, this.p3Hero, this.totalLength);
				break;
			case 4:
				this.p4Hero.x = 0;
				this.calMainImagePosition(this.tmp, this.p4Hero, this.totalLength);
				break;
			default:
				break;
		}
		let curHvo:hero.HeroVo = typeHeros[this.currentP];
		this.qualifi.source = hero.getHeroQulifi(curHvo.h);
		this.kindImg.source = hero.getHeroKindImage(curHvo.h);
		this.nameLb.text = hero.getHeroName(curHvo.h);

		let baseAtkQulify = hero.getHeroBaseAtkQulify(curHvo.h);
		let baseDefQulify = hero.getHeroBaseDefQulify(curHvo.h);
		let baseTrpQulify = hero.getHeroBaseTrpQulify(curHvo.h);
		let baseQulify = baseAtkQulify+baseDefQulify+baseTrpQulify;
		let curQulify = curHvo.ta+curHvo.td+curHvo.tr;
		this.qulifiLb.textFlow = <Array<egret.ITextElement>>[
			{ text: String(baseQulify), style: { "textColor": 0xffffff } },
			{ text: "+"+(curQulify-baseQulify), style: { "textColor": 0x31d840 } }
		];	
		
		this.gongProBar.labelDisplay.visible =false;
		this.gongProBar.minimum = 0;
		this.gongProBar.maximum = hero.getHeroBaseAtkQulifyLimit(curHvo.h);
		this.gongProBar.value = curHvo.ta;
		this.gongLb.text = String(curHvo.ta);

		this.fangProBar.labelDisplay.visible =false;
		this.fangProBar.minimum = 0;
		this.fangProBar.maximum = hero.getHeroBaseDefQulifyLimit(curHvo.h);
		this.fangProBar.value = curHvo.td;
		this.fangLb.text = String(curHvo.td);

		this.bingProBar.labelDisplay.visible =false;
		this.bingProBar.minimum = 0;
		this.bingProBar.maximum = hero.getHeroBaseTrpQulifyLimit(curHvo.h);
		this.bingProBar.value = curHvo.tr;
		this.bingLb.text = String(curHvo.tr);

		this.lvProBar.minimum = 0;
		this.lvProBar.maximum = roleModel.level;
		this.lvProBar.value = curHvo.l;

		this.atkLb.text = hero.getTotalAtk(curHvo.ab,curHvo.aa);
		this.defLb.text = hero.getTotalDef(curHvo.ab,curHvo.aa);
		this.troopsLb.text = hero.getTotalTroops(curHvo.ab,curHvo.aa);
	}

	private startMove(e: egret.TouchEvent): void {
		let img: eui.Image = e.target;
		this.lastX = img.x;
		//计算手指和要拖动的对象的距离       
		this.offsetX = e.stageX - img.x;
	}

	private touchHandler(evt: egret.TouchEvent) {
		let img: HeroImage = evt.target;
		this.tmp = img.x - this.lastX;
		switch (evt.type) {
			case egret.TouchEvent.TOUCH_MOVE:
				//通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
				img.x = evt.stageX - this.offsetX;
				this.calMainImagePosition(this.tmp, img, this.totalLength);
				break;
			case egret.TouchEvent.TOUCH_BEGIN:
				img.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
				img.once(egret.TouchEvent.TOUCH_END, this.touchHandler, this);

				this.startMove(evt);
				break;
			case egret.TouchEvent.TOUCH_END:
				img.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
				this.dealImageTween(this.tmp, img, this.totalLength);				
				break;

		}
	}

	private calMainImagePosition(tmp: number, img: HeroImage, totalLength: number): void {
		if (totalLength == 1) {
			return;
		} else if (totalLength == 2) {
			switch (img) {
				case this.p1Hero:
					this.p2Hero.x = tmp > 0 ? (this.p1Hero.x - this.p2Hero.width) : (this.p1Hero.x + this.p1Hero.width);
					break;
				case this.p2Hero:
					this.p1Hero.x = tmp > 0 ? (this.p2Hero.x - this.p1Hero.width) : (this.p2Hero.x + this.p2Hero.width);
					break;
				default:
					break;
			}
		} else if (totalLength == 3) {
			switch (img) {
				case this.p1Hero:
					this.p3Hero.x = this.p1Hero.x - this.p3Hero.width;				
					this.p2Hero.x = this.p1Hero.x + this.p1Hero.width;
					break;
				case this.p2Hero:					
					this.p1Hero.x = this.p2Hero.x - this.p1Hero.width;					
					this.p3Hero.x = this.p2Hero.x + this.p2Hero.width;					
					break;
				case this.p3Hero:					
						this.p2Hero.x = this.p3Hero.x - this.p2Hero.width;					
						this.p1Hero.x = this.p3Hero.x + this.p3Hero.width;					
					break;
				default:
					break;
			}
		} else if (totalLength == 4) {
			switch (img) {
				case this.p1Hero:					
					this.p4Hero.x = this.p1Hero.x - this.p4Hero.width;
					this.p2Hero.x = this.p1Hero.x + this.p1Hero.width;
					this.p3Hero.x = this.p2Hero.x + this.p2Hero.width;					
					break;
				case this.p2Hero:
					this.p1Hero.x = this.p2Hero.x - this.p1Hero.width;
					this.p3Hero.x = this.p2Hero.x + this.p2Hero.width;
					this.p4Hero.x = this.p3Hero.x + this.p3Hero.width;
					break;
				case this.p3Hero:
					this.p2Hero.x = this.p3Hero.x - this.p2Hero.width;
					this.p1Hero.x = this.p2Hero.x - this.p1Hero.width;
					this.p4Hero.x = this.p3Hero.x + this.p3Hero.width;
					break;
				case this.p4Hero:
					this.p3Hero.x = this.p4Hero.x - this.p3Hero.width;
					this.p2Hero.x = this.p3Hero.x - this.p2Hero.width;
					this.p1Hero.x = this.p4Hero.x + this.p1Hero.width;
					break;
				default:
					break;
			}
		}

	}

	private dealImageTween(tmp: number, img: HeroImage, totalLength: number): void {
		if (totalLength == 1) {
			egret.Tween.removeTweens(img);
			this.curImageTween = egret.Tween.get(img);
			this.curImageTween.to({ x: 0 }, 500);			
			return;
		}
		let leftToRight: boolean = true;//标志下从哪个方向拖往哪个方向，默认从左到右
		if (tmp < 0) {//右边往左边拖拽
			tmp = tmp * -1;
			leftToRight = false;
		}
		egret.Tween.removeTweens(img);
		this.curImageTween = egret.Tween.get(img);
		if (tmp < this._hero_img_group.width / 3) {
			this.curImageTween.to({ x: 0 }, 500);
			if (leftToRight) {
				if (totalLength == 2) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: -this.p2Hero.width }, 500);
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: -this.p1Hero.width }, 500);
							break;
						default:
							break;
					}
				} else if (totalLength == 3) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: -this.p3Hero.width }, 500);
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: -this.p1Hero.width }, 500);
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: -this.p2Hero.width }, 500);
							break;
						default:
							break;
					}
				} else if (totalLength == 4) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p4Hero);
							this.nextImageTween = egret.Tween.get(this.p4Hero);
							this.nextImageTween.to({ x: -this.p4Hero.width }, 500);
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: -this.p1Hero.width }, 500);
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: -this.p2Hero.width }, 500);
							break;
						case this.p4Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: -this.p3Hero.width }, 500);
							break;
						default:
							break;
					}
				}
			} else {
				if (totalLength == 2) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: this.p2Hero.width }, 500);
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: this.p1Hero.width }, 500);
							break;
						default:
							break;
					}
				} else if (totalLength == 3) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: this.p2Hero.width }, 500);
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: this.p3Hero.width }, 500);
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: this.p1Hero.width }, 500);
							break;
						default:
							break;
					}
				} else if (totalLength == 4) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: this.p2Hero.width }, 500);
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: this.p3Hero.width }, 500);
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p4Hero);
							this.nextImageTween = egret.Tween.get(this.p4Hero);
							this.nextImageTween.to({ x: this.p4Hero.width }, 500);
							break;
						case this.p4Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: this.p1Hero.width }, 500);
							break;
						default:
							break;
					}
				}
			}
		} else {
			if (leftToRight) {
				this.curImageTween.to({ x: (this.lastX + img.width) }, 500);
				if (totalLength == 2) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p2Hero,this.totalLength]);
							this.currentP = 2;
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p1Hero,this.totalLength]);
							this.currentP = 1;
							break;
						default:
							break;
					}
				} else if (totalLength == 3) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p3Hero,this.totalLength]);
							this.currentP = 3;
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p1Hero,this.totalLength]);
							this.currentP = 1;
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p2Hero,this.totalLength]);
							this.currentP = 2;
							break;
						default:
							break;
					}
				} else if (totalLength == 4) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p4Hero);
							this.nextImageTween = egret.Tween.get(this.p4Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p4Hero,this.totalLength]);
							this.currentP = 4;
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p1Hero,this.totalLength]);
							this.currentP = 1;
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p2Hero,this.totalLength]);
							this.currentP = 2;
							break;
						case this.p4Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p3Hero,this.totalLength]);
							this.currentP = 3;
							break;
						default:
							break;
					}
				}
			} else {
				this.curImageTween.to({ x: (this.lastX - img.width) }, 500);
				if (totalLength == 2) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p2Hero,this.totalLength]);
							this.currentP = 2;
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p1Hero,this.totalLength]);
							this.currentP = 1;
							break;
						default:
							break;
					}
				} else if (totalLength == 3) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p2Hero,this.totalLength]);
							this.currentP = 2;
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p3Hero,this.totalLength]);
							this.currentP = 3;
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p1Hero,this.totalLength]);
							this.currentP = 1;
							break;
						default:
							break;
					}
				} else if (totalLength == 4) {
					switch (img) {
						case this.p1Hero:
							egret.Tween.removeTweens(this.p2Hero);
							this.nextImageTween = egret.Tween.get(this.p2Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p2Hero,this.totalLength]);
							this.currentP = 2;
							break;
						case this.p2Hero:
							egret.Tween.removeTweens(this.p3Hero);
							this.nextImageTween = egret.Tween.get(this.p3Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p3Hero,this.totalLength]);
							this.currentP = 3;
							break;
						case this.p3Hero:
							egret.Tween.removeTweens(this.p4Hero);
							this.nextImageTween = egret.Tween.get(this.p4Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p4Hero,this.totalLength]);
							this.currentP = 4;
							break;
						case this.p4Hero:
							egret.Tween.removeTweens(this.p1Hero);
							this.nextImageTween = egret.Tween.get(this.p1Hero);
							this.nextImageTween.to({ x: 0 }, 500).call(this.calMainImagePosition,this,[this.tmp,this.p1Hero,this.totalLength]);
							this.currentP = 1;
							break;
						default:
							break;
					}
				}
			}
		}
	}

	private upArrowClick(evt: egret.TouchEvent): void {
		let arrow: eui.Image = evt.target;
		let tmp = this._hero_img_group.width / 3 + 5;
		let img:HeroImage;
		switch(this.currentP){
			case 1:
				img = this.p1Hero;
				break;
			case 2:
				img = this.p2Hero;
				break;
			case 3:
				img = this.p3Hero;
				break;
			case 4:
				img = this.p4Hero;
				break;
			default:
				break;
		}		
		if (arrow == this._arrow_up_left) {			
			this.dealImageTween(tmp,img,this.totalLength);			
		} else if (arrow == this._arrow_up_right) {			
			this.dealImageTween(-tmp,img,this.totalLength);			
		}
		
	}

	public close(): void {
		//页面关闭时清除Tween缓动动画
		egret.Tween.removeTweens(this.ulTw);
		egret.Tween.removeTweens(this.urTw);
		egret.Tween.removeTweens(this.dlTw);
		egret.Tween.removeTweens(this.drTw);
		if (this.p1Hero) {
			egret.Tween.removeTweens(this.p1Hero);
			this.p1Hero.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		if (this.p2Hero) {
			egret.Tween.removeTweens(this.p2Hero);
			this.p2Hero.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		if (this.p3Hero) {
			egret.Tween.removeTweens(this.p3Hero);
			this.p3Hero.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		if (this.p4Hero) {
			egret.Tween.removeTweens(this.p4Hero);
			this.p4Hero.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		}
		//清除各种事件侦听
		this.tabBar.removeEventListener(egret.Event.CHANGE,this.onTabBarChange, this);
		this._arrow_up_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.upArrowClick, this);
		this._arrow_up_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.upArrowClick, this);
		this._arrow_down_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.downArrowClick, this);
		this._arrow_down_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.downArrowClick, this);
		this.base.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchGroupHandler, this);
		this.detail.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchGroupHandler, this);
		this._hero_attribute.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroAttributeView, this);
		this._hero_train.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroTrainView, this);
		this._hero_soul.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroSoulView, this);
		this._hero_forward.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroForwardView, this);
	}

	//下面的group切换功能
	private touchGroupHandler(evt: egret.TouchEvent) {
		let group: eui.Group = evt.target;
		this.tmp = group.x - this.lastX;
		switch (evt.type) {
			case egret.TouchEvent.TOUCH_MOVE:
				//通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
				group.x = evt.stageX - this.offsetX;
				this.calGroupPosition(this.tmp, group);
				break;
			case egret.TouchEvent.TOUCH_BEGIN:
				group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchGroupHandler, this);
				group.once(egret.TouchEvent.TOUCH_END, this.touchGroupHandler, this);

				this.startGroupMove(evt);
				break;
			case egret.TouchEvent.TOUCH_END:
				group.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchGroupHandler, this);
				this.dealGroupTween(this.tmp, group);				
				break;

		}
	}

	private startGroupMove(e: egret.TouchEvent): void {
		let group: eui.Group = e.target;
		this.lastX = group.x;
		//计算手指和要拖动的对象的距离       
		this.offsetX = e.stageX - group.x;
	}

	private calGroupPosition(tmp: number, group: eui.Group): void {
		switch (group) {
			case this.base:
				this.detail.x = tmp > 0 ? (this.base.x - this.detail.width) : (this.base.x + this.base.width);
				break;
			case this.detail:
				this.base.x = tmp > 0 ? (this.detail.x - this.base.width) : (this.detail.x + this.detail.width);
				break;
			default:
				break;
		}
	}

	private dealGroupTween(tmp: number, group: eui.Group): void {		
		let leftToRight: boolean = true;//标志下从哪个方向拖往哪个方向，默认从左到右
		if (tmp < 0) {//右边往左边拖拽
			tmp = tmp * -1;
			leftToRight = false;
		}
		egret.Tween.removeTweens(group);
		this.curGroupTween = egret.Tween.get(group);
		if (tmp < this._hero_img_group.width / 3) {
			this.curGroupTween.to({ x: 0 }, 500);
			if (leftToRight) {
				switch (group) {
					case this.base:
						egret.Tween.removeTweens(this.detail);
						this.nextGroupTween = egret.Tween.get(this.detail);
						this.nextGroupTween.to({ x: -this.detail.width }, 500);
						break;
					case this.detail:
						egret.Tween.removeTweens(this.base);
						this.nextGroupTween = egret.Tween.get(this.base);
						this.nextGroupTween.to({ x: -this.base.width }, 500);
						break;
					default:
						break;				
				} 
			} else {
				switch (group) {
					case this.base:
						egret.Tween.removeTweens(this.detail);
						this.nextGroupTween = egret.Tween.get(this.detail);
						this.nextGroupTween.to({ x: this.detail.width }, 500);
						break;
					case this.detail:
						egret.Tween.removeTweens(this.base);
						this.nextGroupTween = egret.Tween.get(this.base);
						this.nextGroupTween.to({ x: this.base.width }, 500);
						break;
					default:
						break;
				}				
			}
		} else {
			if (leftToRight) {
				this.curGroupTween.to({ x: (this.lastX + group.width) }, 500);
				switch (group) {
					case this.base:
						egret.Tween.removeTweens(this.detail);
						this.nextGroupTween = egret.Tween.get(this.detail);
						this.nextGroupTween.to({ x: 0 }, 500).call(this.calGroupPosition,this,[this.tmp,this.detail]);						
						this.currentGroup = "detail";
						break;
					case this.detail:
						egret.Tween.removeTweens(this.base);
						this.nextGroupTween = egret.Tween.get(this.base);
						this.nextGroupTween.to({ x: 0 }, 500).call(this.calGroupPosition,this,[this.tmp,this.base]);
						this.currentGroup = "base";
						break;
					default:
						break;
				}				
			} else {
				this.curGroupTween.to({ x: (this.lastX - group.width) }, 500);
				switch (group) {
					case this.base:
						egret.Tween.removeTweens(this.detail);
						this.nextGroupTween = egret.Tween.get(this.detail);
						this.nextGroupTween.to({ x: 0 }, 500).call(this.calGroupPosition,this,[this.tmp,this.detail]);
						this.currentGroup = "detail";
						break;
					case this.detail:
						egret.Tween.removeTweens(this.base);
						this.nextGroupTween = egret.Tween.get(this.base);
						this.nextGroupTween.to({ x: 0 }, 500).call(this.calGroupPosition,this,[this.tmp,this.base]);
						this.currentGroup = "base";
						break;
					default:
						break;
				}				
			}
		}
	}

	private downArrowClick(evt: egret.TouchEvent): void {
		let arrow: eui.Image = evt.target;
		let tmp = this._hero_img_group.width / 3 + 5;
		let group:eui.Group;
		switch(this.currentGroup){
			case "base":
				group = this.base;
				break;
			case "detail":
				group = this.detail;
				break;			
			default:
				break;
		}		
		
		if (arrow == this._arrow_down_left) {
			this.calGroupPosition(tmp,group);			
			this.dealGroupTween(tmp,group);			
		} else if (arrow == this._arrow_down_right) {
			this.calGroupPosition(-tmp,group);			
			this.dealGroupTween(-tmp,group);			
		}
		
	}
}