/**
 * 将军府信息展示界面
 * @author lxn
 * @time    2018/03/28 
 */
class BuildGenMansionView extends BaseEuiView {   

  /** 帮助按钮 */
    public btnhelp:components.Button;

    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = BuildGenMansionInfoView;    

        this.btnhelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showHelpInfo,this);
    }
 
 /** 帮助信息 */
    public showHelpInfo(){
        App.ViewManager.open(ViewConst.GameHelp);
    }
}