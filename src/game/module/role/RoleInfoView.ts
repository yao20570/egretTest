/**
 * 角色视图
 */
class RoleInfoView extends BaseEuiView {
    private role_img:eui.Image;//主公图片
	private contry_img:eui.Image;//国家图片
	private role_name:eui.Label;//主公名字
	private rank:eui.Label;//主公世界排名
	private vip:eui.Label;//主公vip等级
    private levelLabel:eui.Label;//主公等级
    private score:eui.BitmapLabel;//主公战力
	private knight:eui.Label;//主公爵位
	private war_work:eui.Label;//主公战功
    private egProgress:components.Progress;//体力进度条
    private egLabel:eui.Label;
    private expProgress:components.Progress;//经验进度条
    public expLabel:eui.Label;
    public rename:eui.Image;//改名按钮

    private set_head_btn:components.Button;//头像设置按钮
    private help_btn:components.Button;//帮助设置按钮
    private set_btn:components.Button;//设置按钮 

    

    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);        
        this.skinName = RoleInfoSkin;     
    }

    public initUI(): void {
        super.initUI();
        this.rename.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openRename, this);
        this.set_head_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setHead, this);
        this.help_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.help, this);
        this.set_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameSet, this);
    }    

    

    public open(): void {
        let roleModel:RoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
        this.refreshData(roleModel);
    }

    public refreshData(roleModel:RoleModel):void{
        this.role_name.text = roleModel.roleName;
        if(roleModel.country == 1){
            this.contry_img.source = "v2_img_hanz_png";
        }else if(roleModel.country == 2){
            this.contry_img.source = "v2_img_qingz_png";
        }else if(roleModel.country == 3){
            this.contry_img.source = "v2_img_chuz_png";
        }
        if(roleModel.rank <= 0){
            this.rank.text = "未上榜";
            this.rank.textColor = 0xd72322;
        }else{
            this.rank.text = String(roleModel.rank);
        } 
        this.vip.text = String(roleModel.vip);
        this.levelLabel.text = "Lv."+roleModel.level;
        this.score.text = String(roleModel.score);   
        let banneretData:any = ConfigDb.roleConfig.getBanneretData();     
        this.knight.text = banneretData[""+roleModel.knight]["name"];        
        this.egProgress.maximum = 100;
        this.egProgress.value = Number(roleModel.eg);   
        this.egProgress.labelDisplay.visible = false;
        this.egLabel.textFlow = <Array<egret.ITextElement>>[ 
        { text:String(roleModel.eg), style:{"textColor":0x77d4fd} },
        { text:" / 100", style:{"textColor":0xffffff} }
        ];    
        let levelData = ConfigDb.roleConfig.getLevelData();
        this.expProgress.maximum = levelData[""+roleModel.level]["exp"];
        this.expProgress.value = Number(roleModel.exp);
        this.expProgress.labelDisplay.visible = false;
        this.expLabel.textFlow = <Array<egret.ITextElement>>[ 
        { text:String(roleModel.exp), style:{"textColor":0x77d4fd} },
        { text:" / "+this.expProgress.maximum, style:{"textColor":0xffffff} }
        ];

        this.war_work.text = Number(roleModel.warWork/1000).toFixed(1)+"K";
    }

    private openRename():void {
        App.ViewManager.open(ViewConst.RoleRename);
    }

    private setHead():void {
        App.ViewManager.open(ViewConst.RoleHead);
    }

    private help():void {
        App.ViewManager.open(ViewConst.GameHelp); 
    }

    private gameSet():void {
        App.ViewManager.open(ViewConst.GameSet);
    }
    
}