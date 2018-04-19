/**
 * 工坊信息展示界面
 * @author lxn
 * @time    2018/03/28 
 */
class BuildWorkView extends BaseEuiView {
  /** 帮助按钮 */
    public btnhelp:components.Button;

    public preGroup:eui.Group;
    public btnpre:components.Button;

    
    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = BuildWorkInfoView;   

        this.btnhelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showHelpInfo,this);
        this.preGroup.x = 0;
        this.preGroup.y = App.StageUtils.getHeight();
    }
 
 /** 帮助信息 */
    public showHelpInfo(){
        App.ViewManager.open(ViewConst.GameHelp);
    }
}