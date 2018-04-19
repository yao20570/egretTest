/**
 * 铁匠铺信息展示界面
 * @author wzy
 * @time    2018/04/8 
 */
class BuildIronsView extends BaseEuiView {  


    public tabBar:eui.TabBar;
    public viewStack:eui.ViewStack;
    public viewSkin:components.PanelView;

    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);                 
        this.skinName = IronShopSkin; 
        
		
		this.tabBar.selectedIndex = 0;
		this.viewStack.selectedIndex = 0;

    }
 
    public initUI(): void {
        super.initUI();

        this.viewSkin.title = TextUtils.getText("10001");
        

        this.tabBar.dataProvider = new eui.ArrayCollection([
            {name:TextUtils.getText("10002"), upStr:"v1_btn_biaoqian_png", downStr:"v1_btn_selected_biaoqian_png"}, 
            {name:TextUtils.getText("10003"), upStr:"v1_btn_biaoqian_png", downStr:"v1_btn_selected_biaoqian_png"},
            {name:TextUtils.getText("10004"), upStr:"v1_btn_biaoqian_png", downStr:"v1_btn_selected_biaoqian_png"}
            ]);
        this.tabBar.addEventListener(egret.Event.CHANGE, this.selectTab, this);
    }

    public destroy(): void {
        super.destroy();
    }

    public open(...param: any[]): void {
        super.open(param);
        this.tabBar.selectedIndex = 0;
		this.viewStack.selectedIndex = 0;
    }

    public close(...param: any[]): void {
        super.close(param);
    }

    public selectTab(...param:any[]){
		this.viewStack.selectedIndex = this.tabBar.selectedIndex;    
    }
}