/*
* 城内游戏按钮
* @author lxn         TODO
* @since 2018年3月19日
*/
class HomeUiView extends BaseEuiView {

  public btn_worldMap: components.Button;  // 世界地图
  public btn_hd: components.Button;     // 活动按钮
  public btn_fl: components.Button;     // 福利按钮
  public btn_sd: components.Button;     // 商店按钮
  public btn_gg: components.Button;     // 公告按钮


  public MenuDlg: eui.Group;               // 菜单

  public _MenuList: eui.Group;             // 菜单列表
  private chartGroup: eui.Group;

  public img_HeadKuan: eui.Image;          //角色信息入口

  //主UI顶部角色信息组件相关开始
  public lGold_num: eui.Label;//黄金
  public Lab_bubingNum: eui.Label;//步兵数量
  public Lab_qibingNum: eui.Label;//骑兵数量
  public Lab_gongbingNum: eui.Label;//弓兵数量
  public Lab_zhanliNum: eui.Label;//战力
  public lcereals_num: eui.Label;//粮食
  public lcoin_num: eui.Label;//银币
  public lwood_num: eui.Label;//木材
  public lmineral_num: eui.Label;//铁矿
  public lpower_num: eui.Label;//体力
  public exp_bar: components.Progress;
  public vip: eui.Label;
  //主UI顶部角色信息组件相关结束

  //低部UI组件相关
  public chartLabel: eui.Label;


  public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
    super($controller, $parent);
    //this.setResources(["Home", "build"]);
    this.skinName = GameMainUi;

  }

  public initUI(): void {
    this.createMenu();
  }


  public open(): void {
    let roleModel: RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
    this.refreshData(roleModel);
    this.BindingEvent();
  }


  /*
   *  绑定按钮事件 
   */
  public BindingEvent(): void {
    this.btn_worldMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventWorldMap, this);
    this.btn_hd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventHD, this);
    this.btn_fl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventFL, this);
    this.btn_sd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventSD, this);
    this.btn_gg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eventGG, this);
    this.img_HeadKuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roleInfo, this);
    this.chartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openChartView, this);
  }

  /*
   *  创建菜单按钮
   */
  public createMenu(): void {
    this.MenuDlg.x = 0;
    this.MenuDlg.y = App.StageUtils.getHeight();

    // 资源名称
    var strSourceName: string[] = ["v2_img_zjm_wujiang_png", "v2_img_zjm_fuben_png", "v2_img_zjm_renwu_png",
      "v2_img_zjm_beibao_png", "v2_img_zjm_youjian_png", "v2_img_zjm_haoyou_png",
      "v2_img_zjm_paihang_png", "v2_img_zjm_shangdui_png", "v2_img_zjm_shezhi_png"];
    // 创建菜单按钮
    for (let i = 0; i < 9; i++) {
      let btn3 = new components.Button();
      btn3.skinName = skins.ButtonASkin;
      btn3.bgStr = strSourceName[i];
      this._MenuList.addChild(btn3);
      btn3.name = i.toString();
      btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuEvent, this);
    }

  }
  private menuEvent(event: egret.TouchEvent) {
    let menuName = parseInt(event.target.name);
    switch (menuName) {
      case 0:
        App.ViewManager.open(ViewConst.Hero);
        break;
      case 1:
        //跨模块通知EctpyeController执行加载副本协议
        App.ControllerManager.applyFunc(ControllerConst.Ectpye, EctpyeConst.LOAD_REQ);
        break;
      default:
        break;
    }
  }
  private eventWorldMap(event: egret.TouchEvent): void {
    console.log("====>>>>  世界地图");
  }

  private eventHD(): void {
    console.log("====>>>>  活动");
  }
  private eventFL(): void {
    console.log("====>>>>  福利");
  }
  private eventSD(): void {
    console.log("====>>>>  商店");
  }
  private eventGG(): void {
    console.log("====>>>>  公告");
  }

  private eventMenu() {

  }

  private roleInfo(): void {
    App.ViewManager.open(ViewConst.RoleInfo);
  }



  public refreshData(roleModel: RoleModel): void {
    this.lGold_num.text = String(roleModel.gold);
    this.Lab_bubingNum.text = this.dealSoldierNum(roleModel.it);
    this.Lab_qibingNum.text = this.dealSoldierNum(roleModel.sw);
    this.Lab_gongbingNum.text = this.dealSoldierNum(roleModel.ac);
    this.Lab_zhanliNum.text = String(roleModel.score);
    this.lcereals_num.text = this.dealResNum(roleModel.food);
    this.lcoin_num.text = this.dealResNum(roleModel.coin);
    this.lwood_num.text = this.dealResNum(roleModel.wood);
    this.lmineral_num.text = this.dealResNum(roleModel.iron);

    this.lpower_num.textFlow = <Array<egret.ITextElement>>[
      { text: String(roleModel.eg), style: { "textColor": 0x31d840 } },
      { text: "/100", style: { "textColor": 0x4E8DDB } }
    ];
    let levelData = ConfigDb.roleConfig.getLevelData();
    this.exp_bar.labelDisplay.visible = false;
    this.exp_bar.maximum = levelData["" + roleModel.level]["exp"];
    this.exp_bar.value = roleModel.exp;
    this.exp_bar.onUStr = "v2_ing_dibanditu_jpg";
    this.exp_bar.onStr = "v2_bar_green_zjm_png";
    this.vip.text = String(roleModel.vip);
  }

  private dealSoldierNum(sNum: number): string {
    if (sNum == NaN || sNum <= 0) {
      return "0";
    } else if (sNum < 1000) {
      return String(sNum);
    } else if (sNum == 1000) {
      return "1k";
    } else if (sNum > 1000) {
      return Number(sNum / 1000).toFixed(2) + "k";
    }
    return "0";
  }

  private dealResNum(resNum: number): string {
    if (resNum == NaN || resNum <= 0) {
      return "0";
    } else if (resNum < 1000) {
      return String(resNum);
    } else if (resNum == 1000) {
      return "1k";
    } else if (resNum > 1000) {
      return Math.floor(resNum / 1000) + "k";
    }
    return "0";
  }

  /**
   * 打开聊天
   */
  public openChartView() {
    App.ViewManager.open(ViewConst.Chart);
    App.ControllerManager.applyFunc(ControllerConst.Chart, ChartConst.CHART_WORLD_RES);
    // this.applyFunc(ChartConst.CHART_WORLD_RES);
  }

  /** 更新主页聊天信息 */
  public updateChartContent(text: Array<egret.ITextElement>): void {
    this.chartLabel.textFlow = text;
  }

}