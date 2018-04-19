class HeroAttributeView extends BaseEuiView {
	public _hero_img_group:eui.Group;
	public _hero_part1:eui.Image;
	public _hero_part2:eui.Image;
	public _hero_part9:eui.Image;
	public _hero_part7:eui.Image;
	public _hero_part4:eui.Image;
	public _hero_part5:eui.Image;
	public _hero_part6:eui.Image;
	public _hero_part3:eui.Image;
	public _hero_part8:eui.Image;
	private _initSource:Array<string> = [];	



	public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = HeroAttributeSkin;     
    }

	public initUI(): void {
		super.initUI();
		this._hero_part1.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part2.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part9.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part7.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part4.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part5.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part6.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part3.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part8.addEventListener(egret.Event.COMPLETE,this.onSourceComplete,this);
		
	}

	private onSourceComplete(event:egret.Event){
		let target:eui.Image = event.currentTarget;
		this._initSource.push(<string>target.source);
		this.initHeroImage();
	}

	private initHeroImage(): void {
		if(this._initSource.length < 9){
			return;
		}
		//计算各个图片的坐标
		
		this._hero_part1.x = 0;
		this._hero_part1.y = this._hero_img_group.height - this._hero_part1.texture.textureHeight;
		
		this._hero_part2.x = 0;
		this._hero_part2.y = this._hero_part1.y - this._hero_part2.texture.textureHeight;
		
		this._hero_part9.x = 0;
		this._hero_part9.y = 0;
		
		this._hero_part7.x = this._hero_part2.texture.textureWidth;
		this._hero_part7.y = this._hero_part9.texture.textureHeight;
		
		this._hero_part4.x = this._hero_part2.texture.textureWidth;
		this._hero_part4.y = this._hero_part7.y + this._hero_part7.texture.textureHeight;
		
		this._hero_part5.x = this._hero_part4.x + this._hero_part4.texture.textureWidth;
		this._hero_part5.y = this._hero_part7.y + this._hero_part7.texture.textureHeight;
		
		this._hero_part6.x = this._hero_part5.x + this._hero_part5.texture.textureWidth;
		this._hero_part6.y = this._hero_part7.y + this._hero_part7.texture.textureHeight;
		
		this._hero_part3.x = this._hero_part2.texture.textureWidth;
		this._hero_part3.y = this._hero_part4.y + this._hero_part4.texture.textureHeight;
		
		this._hero_part8.x = this._hero_part7.x + this._hero_part7.texture.textureWidth;
		this._hero_part8.y = this._hero_part7.y;	
		
	}

	public open(_hero_id:string): void {
		super.open(_hero_id);	
		if(this._initSource.length > 0) {
            this._initSource.splice(0,this._initSource.length);
        }	
		this._hero_part1.source = _hero_id + "_1_png";
		this._hero_part2.source = _hero_id + "_2_png";
		this._hero_part9.source = _hero_id + "_9_png";
		this._hero_part7.source = _hero_id + "_7_png";
		this._hero_part4.source = _hero_id + "_4_png";
		this._hero_part5.source = _hero_id + "_5_png";
		this._hero_part6.source = _hero_id + "_6_png";
		this._hero_part3.source = _hero_id + "_3_png";
		this._hero_part8.source = _hero_id + "_8_png";
    }

	public close(): void {
        
    }
}