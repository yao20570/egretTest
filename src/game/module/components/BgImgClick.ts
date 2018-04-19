/**
 *
 * @author 
 *
 */
namespace components {
    export class BgImgClick extends eui.Panel{
		// public _bgClick:eui.Rect;
    	public constructor() {
            super();
            this.skinName=BgImgSkin;
			// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeView,this);
    	}  
		public close(){
			if(this.parent instanceof BaseEuiView){
                let p:BaseEuiView = <BaseEuiView>this.parent;
                // p.close();
                App.ViewManager.closeView(p);
            }
		}   
    }
}