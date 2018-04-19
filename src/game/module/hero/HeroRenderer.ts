/*
 * 上阵武将数据源渲染类	
 * @Author: hjielong 
 * @Date: 2018-04-04 10:30:06 
 * @Last Modified by: hjielong
 * @Last Modified time: 2018-04-08 21:12:15
 */
class HeroRenderer extends eui.ItemRenderer {
	public bg1:eui.Image;
	public bg2:eui.Image;
	public box:eui.Image;
	public icon:components.Button;
	public tip:eui.Image;
	public troopType:eui.Image;
	public nameLb:eui.Label;
	public lvLb:eui.Label;
	public atkNote:eui.Label;
	public atkLb:eui.Label;
	public defNote:eui.Label;
	public defLb:eui.Label;
	public troopsNote:eui.Label;
	public troops:components.Progress;
	public troopsLb:eui.Label;
	public addTroops:components.Button;
	public warState:eui.Image;
	public changeBtn:components.Button;
	public noteLb:eui.Label;
	public _rect:eui.Rect;

	public constructor() {
		super();
	}	

	
	/**
	 * @description 组件初始化完成后操作 
	 * @returns void
	 */
	protected childrenCreated(): void {
		super.createChildren();
		this.icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onIconClickBegin, this);
		this.addTroops.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
			evt.stopPropagation();
		}, this);
		this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
			evt.stopPropagation();
		}, this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onItemClickBegin,this);		
	}

	protected dataChanged(): void{
		super.dataChanged();
		if(this.data.showNote == false){
			this.noteLb.visible = false;
			if(this.troops){
				this.troops.maximum = this.data.maxTroops;
				this.troops.value = this.data.troops;
				this.troops.labelDisplay.visible =false;//屏蔽默认的进度条文本
			}
			if(this.troopsLb){
				this.troopsLb.textFlow = <Array<egret.ITextElement>>[ 
				{ text:String(this.troops.value), style:{"textColor":0x77d4fd} },
				{ text:" / "+this.troops.maximum, style:{"textColor":0xffffff} }
				];
			}
		}else{
			let removeArray = [];
			for(let child of this.$children){
				if(child == this.bg1){
					continue;
				}
				if(child == this.bg2){
					continue;
				}
				if(child == this.box){
					continue;
				}
				if(child == this.icon){
					continue;
				}
				if(child == this.noteLb){
					continue;
				}
				if(child == this._rect){
					continue;
				}
				removeArray.push(child);
			}
			for(let child of removeArray){
				this.removeChild(child);
			}		
		}
	}

	/**
	 * 武将图标点击开始(注意防止冒泡)
	 * @param  {egret.TouchEvent} evt
	 * @returns void
	 */
	private onIconClickBegin(evt: egret.TouchEvent): void{		
		this.icon.addEventListener(egret.TouchEvent.TOUCH_END,this.onIconClickEnd,this);		
		evt.stopPropagation();//防止冒泡
	}	
	
	/**
	 * 武将图标点击结束(注意防止冒泡)
	 * @param  {egret.TouchEvent} evt
	 * @returns void
	 */
	private onIconClickEnd(evt: egret.TouchEvent): void{
		this.icon.removeEventListener(egret.TouchEvent.TOUCH_END,this.onIconClickEnd,this);
		//业务逻辑
		this.openHeroInfo();
		evt.stopPropagation();//防止冒泡
	}
	
	private onChangeBtnClickBegin(evt: egret.TouchEvent): void{		
		this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onChangeBtnClickEnd,this);		
		evt.stopPropagation();
	}

	private onChangeBtnClickEnd(evt: egret.TouchEvent): void{
		this.changeBtn.removeEventListener(egret.TouchEvent.TOUCH_END,this.onChangeBtnClickEnd,this);		
		//..业务逻辑
		evt.stopPropagation();
	}
	
	/**
	 * 数据源每一项点击触发处理(开始)
	 * @param  {egret.TouchEvent} evt
	 * @returns void
	 */
	private onItemClickBegin(evt: egret.TouchEvent): void{
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onItemClickEnd,this);	
		evt.stopPropagation();//防止冒泡
	}

	
	/**
	 * 数据源每一项点击触发处理(结束)
	 * @param  {egret.TouchEvent} evt
	 * @returns void
	 */
	private onItemClickEnd(evt: egret.TouchEvent): void{
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onItemClickEnd,this);
		//业务逻辑
		this.openHeroInfo();
		evt.stopPropagation();//防止冒泡
	}

	private openHeroInfo(): void{
		if(this.data.showNote == false){
			App.ViewManager.open(ViewConst.HeroInfo,this.data.type,this.data.p);
		}else{
			switch(this.data.p){
				case 2:					
					App.ViewManager.open(ViewConst.HeroInfo,"i200391");
					break;
				case 3:					
					App.ViewManager.open(ViewConst.HeroInfo,"i200061");
					break;
				case 4:				
					App.ViewManager.open(ViewConst.HeroInfo,"i200241");
					break;
				default:
					break;
			}
		}
	}
}