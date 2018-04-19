/**
 * 科技园信息展示界面
 * @author lxn
 * @time    2018/03/27 
 */
class BuildScienceView extends BaseEuiView {
  /** 推荐技能 */
    public recommend:eui.Group;     
  /** 技能列表 */
    public techList:eui.Group;

  /** 帮助按钮 */
    public btnhelp:components.Button;

    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = BuildScienceInfoView;    

       
    }
    public open():void{
        this.recommend.x = 0;
        this.recommend.y = App.StageUtils.getHeight();
        this.btnhelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showHelpInfo,this);
    }
    public initUI():void{
        this.initTechList();
    }

    public initTechList(){
        let baseData = ConfigDb.scienceConfig.getScienceBaseParam();
        let lvData =  ConfigDb.scienceConfig.getScienceLvParam();
    }
 
 /** 帮助信息 */
    public showHelpInfo(){
        App.ViewManager.open(ViewConst.GameHelp);
    }
}