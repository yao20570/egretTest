class HeroView extends BaseEuiView {
	public topBg: eui.Image;
	public heroTroops: eui.Label;
	public autoFarm: eui.ToggleSwitch;
	public tabBar: eui.TabBar;
	public infantryLb: eui.Label;
	public archerLb: eui.Label;
	public sowarLb: eui.Label;
	public viewStack: eui.ViewStack;
	public mainHero:eui.DataGroup;
	public colHero:eui.DataGroup;

	public constructor(controller: BaseController, parent: egret.DisplayObjectContainer) {
		super(controller, parent);
		this.skinName = HeroViewSkin;
	}

	public initUI(): void {
		super.initUI();
		let mask = new egret.Rectangle(0, 25, 640, 192);
		this.topBg.mask = mask;
		this.topBg.x = 0;
		this.topBg.y = 60;
	}

	public open(): void {
		//可移除的事件侦听部分
		this.tabBar.addEventListener(egret.Event.CHANGE,this.onTabBarChange, this);
		this.tabBar.selectedIndex = 0;
		this.viewStack.selectedIndex = 0;
		this.refreshData();
	}

	private refreshData(): void {
		let roleModel: RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
		let heroModel: HeroModel = <HeroModel>App.ControllerManager.getControllerModel(ControllerConst.Hero);
		this.autoFarm.selected = heroModel.auto == 1;
		this.infantryLb.text = String(roleModel.it);
		this.archerLb.text = String(roleModel.ac);
		this.sowarLb.text = String(roleModel.sw);
		let typeHeros:any;
		switch(this.tabBar.selectedIndex){
			case 0:
				typeHeros = hero.getMainHero(heroModel.hs);
				this.mainHero.dataProvider = hero.getMainHeroDataSource(heroModel.hs);
				this.mainHero.itemRenderer = HeroRenderer;
				break;
			case 1:
				typeHeros = hero.getColHero(heroModel.hs);
				this.colHero.dataProvider = hero.getColHeroDataSource(heroModel.hs);
				this.colHero.itemRenderer = HeroRenderer;
				break;
			case 2:
				break;
			default:
				break;
		}
		//计算主力武将出征兵力
		let mainHeros = hero.getMainHero(heroModel.hs);
		let curTroops:number = 0;
		let totalTroops:number = 0;
		for(let p in mainHeros){
			let hvo:hero.HeroVo = mainHeros[p];
			curTroops = curTroops + hvo.lt;
			totalTroops = totalTroops + Number(hero.getTotalTroops(hvo.ab,hvo.aa));
		}		
		this.heroTroops.textFlow = <Array<egret.ITextElement>>[
			{ text: "主力武将出征兵力: ", style: { "textColor": 0xffffff } },
			{ text: String(curTroops), style: { "textColor": 0x31d840 } },
			{ text: "/"+totalTroops, style: { "textColor": 0xffffff } }
		];		
	}

	private onTabBarChange(evt:egret.Event): void{
		this.viewStack.selectedIndex = this.tabBar.selectedIndex;
		this.refreshData();
	}

	public close(): void{
		//移除open时侦听的事件
		this.tabBar.removeEventListener(egret.Event.CHANGE,this.onTabBarChange, this)
	}
}