/**
 *
 * @author 
 *
 */
namespace components {
    export class PanelView extends eui.Panel {
        public bgImg: string = "v1_bg_1_png";
        public title: string = "邮件";
        public closeImg:string="v1_btn_closebig_png";
        public btnHelp: Button; 
        public constructor() {
            super();
            this.skinName = skins.PanelSkin;
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.help, this);
        }
        public help(): void{
            App.ViewManager.open(ViewConst.GameHelp);                        
        }

        public close(): void{
            if(this.parent instanceof BaseEuiView){
                let p:BaseEuiView = <BaseEuiView>this.parent;
                App.ViewManager.closeView(p);
            }            
        }

    }
}