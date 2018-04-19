/**
 * 王宫信息展示展示
 * @author lxn
 * @time    2018/03/27 
 */
class BuildPalaceView extends BaseEuiView {

    public panelView:components.PanelView;

   /** 帮助按钮 */
    public btnhelp:components.Button;
   /** 银币产量按钮 */
    public btnSilverYeild:components.Button;  
   /** 木材产量按钮 */      
    public btnWoodYeild:components.Button;
   /** 粮食产量按钮 */    
    public btnCerealYield:components.Button;
   /** 铁矿产量按钮 */    
    public btnIronYield:components.Button;
    /** 头像按钮 */
    public head:components.Button;


    //public title:string;

    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = BuildPalaceInfoView;    
        

    }
    public open():void{
        this.panelView["title"] = "palace";
        this.btnhelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showHelpInfo,this);
        this.btnSilverYeild.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showYield,this);
        this.btnWoodYeild.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showYield,this);
        this.btnCerealYield.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showYield,this);
        this.btnIronYield.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showYield,this);
        this.head.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showEmployee,this);
    }
 /** 显示产量信息  */
    public showYield(event: egret.TouchEvent){
         let Name = parseInt(event.target.name);
         switch(Name){
            
             case 1:
             case 2:
             case 3:
             case 4:
                App.ViewManager.open(ViewConst.Build_Palace_YieldInfo);
                break;
             default:
                break;
         }   
    }
private showEmployee(){
    App.ViewManager.open(ViewConst.Build_Palace_Employ);
}

 /** 更新产量信息  */
    public updataYieldByKey(key:number){
        var YieldDlg = <ResYieldDlg>App.ViewManager.getView(ViewConst.Build_Palace_YieldInfo);
         // TODO  根据选择按钮更新信息
    }
 /** 帮助信息 */
    public showHelpInfo(){
        App.ViewManager.open(ViewConst.GameHelp);
    }


}