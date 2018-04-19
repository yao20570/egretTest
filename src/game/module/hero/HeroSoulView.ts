class HeroSoulView extends BaseEuiView {	
	public closeBtn:components.Button;

	public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = HeroSoulSkin;		    
    }

	public initUI(): void {
		super.initUI();		
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			App.ViewManager.close(ViewConst.HeroSoul);
		},this);
	}
}