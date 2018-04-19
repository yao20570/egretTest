/**
 * 仓库信息展示界面
 * @author lxn
 * @time    2018/03/28 
 */
class BuildWarehouseView extends BaseEuiView {
  /** 帮助按钮 */
    public btnhelp:components.Button;

    public preGroup:eui.Group;

    
    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = BuildWarehouseInfoView;   

        this.btnhelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showHelpInfo,this);
    }
 
 /** 帮助信息 */
    public showHelpInfo(){
        App.ViewManager.open(ViewConst.GameHelp);
    }
}