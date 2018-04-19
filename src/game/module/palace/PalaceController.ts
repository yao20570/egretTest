/*
 * @Author: Liuxn 
 * @Date: 2018-04-12 19:56:55 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-13 11:36:21
 */
/**
 *  王宫 controller
*/
class PalaceController extends BaseController{

    private palaceProxy:PalaceProxy;
    
    private palaceInfoView:BuildPalaceView;
    private resYieldDlg:ResYieldDlg;
    private employView:EmployView;

    public constructor(){
        super();
        ConfigDb.palaceConfig = new PalaceConfig(["build_palace_json"]);

        // 注册UI
        this.palaceInfoView = new BuildPalaceView(this,LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Build_PalaceUI,this.palaceInfoView);

        this.resYieldDlg = new ResYieldDlg(this,LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Build_Palace_YieldInfo,this.resYieldDlg);

        this.employView = new EmployView(this,LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Build_Palace_Employ,this.employView);

    }

}