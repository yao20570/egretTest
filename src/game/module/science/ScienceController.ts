/**
 * @Author: Liuxn 
 * @Date: 2018-04-16 10:56:20 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-16 11:28:29
 */
class ScienceController extends BaseController {

    private buildScienceView: BuildScienceView;

    public constructor() {
        super();
        //初始化模块相关读表DB
        ConfigDb.scienceConfig = new ScienceConfig(["scicence_base_json", "science_lv_up_json"]);

        this.buildScienceView = new BuildScienceView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Build_ScienceUI, this.buildScienceView);

    }

}