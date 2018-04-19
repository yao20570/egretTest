/*
* 游戏控制器
* @author lxn       TODO
* @since 2018年3月19日
*/
class HomeController extends BaseController{

    /**  主界面Button */
    private gameMainUiView:HomeUiView;
  

    public constructor() {
        super();
        // 主城内UI 
        this.gameMainUiView = new HomeUiView(this,LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.GameUI,this.gameMainUiView);        

        // 注册方法
        this.registerFunc(HomeConst.CHART_UPDATE, this.updateChartContent, this);
    }

   private updateChartContent(text: Array<egret.ITextElement>): void {
        this.gameMainUiView.updateChartContent(text);
    }
}
