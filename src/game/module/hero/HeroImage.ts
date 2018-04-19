class HeroImage extends eui.Component{
	public _hero_part1:eui.Image;
	public _hero_part2:eui.Image;
	public _hero_part9:eui.Image;
	public _hero_part7:eui.Image;
	public _hero_part4:eui.Image;
	public _hero_part5:eui.Image;
	public _hero_part6:eui.Image;
	public _hero_part3:eui.Image;
	public _hero_part8:eui.Image;
	private _initSource:Array<string>;

	public constructor() {
		super();		
		this._initSource = [];	
		this.skinName = HeroImageSkin;
	}

	protected childrenCreated(): void {
        super.childrenCreated();
        
    }

	private onSourceComplete(event:egret.Event){
		let target:eui.Image = event.currentTarget;
		this._initSource.push(<string>target.source);
		this.initHeroImage();
	}

	private initHeroImage() :void{
		if(this._initSource.length < 9){
			return;
		}
		//计算各个图片的坐标
		
		this._hero_part1.x = 0;
		this._hero_part1.y = this.height - this._hero_part1.texture.textureHeight;
		this._hero_part1.touchEnabled =false;

		this._hero_part2.x = 0;
		this._hero_part2.y = this._hero_part1.y - this._hero_part2.texture.textureHeight;
		this._hero_part2.touchEnabled =false;

		this._hero_part9.x = 0;
		this._hero_part9.y = 0;
		this._hero_part9.touchEnabled =false;

		this._hero_part7.x = this._hero_part2.texture.textureWidth;
		this._hero_part7.y = this._hero_part9.texture.textureHeight;
		this._hero_part7.touchEnabled =false;

		this._hero_part4.x = this._hero_part2.texture.textureWidth;
		this._hero_part4.y = this._hero_part7.y + this._hero_part7.texture.textureHeight;
		this._hero_part4.touchEnabled =false;

		this._hero_part5.x = this._hero_part4.x + this._hero_part4.texture.textureWidth;
		this._hero_part5.y = this._hero_part7.y + this._hero_part7.texture.textureHeight;
		this._hero_part5.touchEnabled =false;

		this._hero_part6.x = this._hero_part5.x + this._hero_part5.texture.textureWidth;
		this._hero_part6.y = this._hero_part7.y + this._hero_part7.texture.textureHeight;
		this._hero_part6.touchEnabled =false;

		this._hero_part3.x = this._hero_part2.texture.textureWidth;
		this._hero_part3.y = this._hero_part4.y + this._hero_part4.texture.textureHeight;
		this._hero_part3.touchEnabled =false;

		this._hero_part8.x = this._hero_part7.x + this._hero_part7.texture.textureWidth;
		this._hero_part8.y = this._hero_part7.y;	
		this._hero_part8.touchEnabled =false;

		this._initSource.splice(0,this._initSource.length);
		
	}

	 public changeHero(id:string): void{
		this._hero_part1.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part2.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part9.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part7.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part4.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part5.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part6.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part3.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		this._hero_part8.once(egret.Event.COMPLETE,this.onSourceComplete,this);
		if(RES.hasRes(id + "_1_png")){
			this._hero_part1.source = id + "_1_png";
			this._hero_part2.source = id + "_2_png";
			this._hero_part9.source = id + "_9_png";
			this._hero_part7.source = id + "_7_png";
			this._hero_part4.source = id + "_4_png";
			this._hero_part5.source = id + "_5_png";
			this._hero_part6.source = id + "_6_png";
			this._hero_part3.source = id + "_3_png";
			this._hero_part8.source = id + "_8_png";			
		}else{
			this._hero_part1.source = id + "_1_jpg";
			this._hero_part2.source = id + "_2_jpg";
			this._hero_part9.source = id + "_9_jpg";
			this._hero_part7.source = id + "_7_jpg";
			this._hero_part4.source = id + "_4_jpg";
			this._hero_part5.source = id + "_5_jpg";
			this._hero_part6.source = id + "_6_jpg";
			this._hero_part3.source = id + "_3_jpg";
			this._hero_part8.source = id + "_8_jpg";
		}
	}
}