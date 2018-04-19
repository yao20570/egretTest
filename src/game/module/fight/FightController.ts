/*
* 战斗场景控制器
* @author jrc     
* @since 2018年3月22日
*/
class FightController extends BaseController{

    private fightGroundView:FightLayer; // 战斗主场景

    public constructor() {
        super();
        // 战斗主场景
        this.fightGroundView = new FightLayer(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.FightLayer, this.fightGroundView);

        // 注册消息
        this.registerFunc(FightConst.FIGHT, this.playFightReport, this);
    }

    /**
     * 播放战报
     * @param _tReport 战报数据
     * @param _nCallback 播放结束回调
     */
    public playFightReport(_tReport:any, _nCallback:Function): void {
        if (_tReport == null) return;
        this.fightGroundView.setReport(_tReport);
        this.fightGroundView.setFightCallback(()=>{
            this.fightGroundView.onCloseFight();
            if (_nCallback) _nCallback();
        });
        
        // 打开战斗界面
        App.ViewManager.open(ViewConst.FightLayer); 
    }
}