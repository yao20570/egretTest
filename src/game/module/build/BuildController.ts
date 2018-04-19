/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 16:21:04 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-12 20:11:05
 */
/**
 * 建筑控制器
 * @author lxn
 * @time    2018/03/27 
 */

class BuildController extends BaseController{
      /**  主城内地图  */
    private GameMainMapView:HomeMapView;

  
    private buildScienceView:BuildScienceView;
    private buildGeneralView:BuildGeneralView;
    private buildXiLianView:BuildXiLianView;
    private buildIronsView:BuildIronsView;
    private buildWorkView:BuildWorkView;
    private buildGenMansionView:BuildGenMansionView;
    private buildWarehouseView:BuildWarehouseView;
    private buildBarracksView:BuildBarracksView;
    private buildGateView:BuildGateView;
    /** 建筑代理层 */
    private buildProxy:BuildProxy;

  

    public constructor() {
         super();
         new BuildModel(this);
         this.registerProxyMsg();
         ConfigDb.buildConfig = new BuildConfig(["build_init_json", "build_building_json"]);

        // 主城内地图
         this.GameMainMapView = new HomeMapView(this,LayerManager.Game_Main);
         App.ViewManager.register(ViewConst.Game,this.GameMainMapView);

        

         this.buildScienceView = new BuildScienceView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_ScienceUI,this.buildScienceView);

         this.buildGeneralView = new BuildGeneralView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_GeneralUI,this.buildGeneralView);

         this.buildXiLianView = new BuildXiLianView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_XiLianUI,this.buildXiLianView);

         //this.buildIronsView = new BuildIronsView(this,LayerManager.UI_Main);
         //App.ViewManager.register(ViewConst.Build_IronsUI,this.buildIronsView);

         this.buildWorkView = new BuildWorkView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_WorkUI,this.buildWorkView);

         this.buildGenMansionView = new BuildGenMansionView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_GenMansionUI,this.buildGenMansionView);

          this.buildWarehouseView = new BuildWarehouseView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_WarehouseUI,this.buildWarehouseView);

         this.buildBarracksView = new BuildBarracksView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_BarracksUI,this.buildBarracksView);

         this.buildGateView = new BuildGateView(this,LayerManager.UI_Main);
         App.ViewManager.register(ViewConst.Build_GateUI,this.buildGateView);


      

    }
    /**
     * 注册代理消息
     */
    public registerProxyMsg(){
        this.buildProxy = new BuildProxy(this);
        //注册代理消息
        this.registerFunc(BuildConst.BUILD_LOAD_REQ, this.buildLoadReq, this);
        this.registerFunc(BuildConst.BUILD_LOAD_RES, this.buildLoadRes, this);
    }
    public buildLoadReq(){
        return this.buildProxy.buildLoadReq();
    }
    public buildLoadRes(obj: any){
        let buildModel:BuildModel = <BuildModel>this.getModel();
        buildModel.initData(obj);
    }

}