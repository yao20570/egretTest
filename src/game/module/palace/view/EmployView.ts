/*
 * @Author: Liuxn 
 * @Date: 2018-04-12 19:44:57 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-13 13:59:52
 */
/**
 * 雇佣文官界面
*/
class EmployView extends BaseEuiView{

    public btnclose:components.Button;
    public viewNodeList:ViewNodeManager;

    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer){
          super(controller, parent);      
          this.skinName = EmployInfoView;
          this.viewNodeList = new ViewNodeManager(this);
         
    }
    public open():void{
      this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
    }
    public initUI():void{
         this.initEmployInfo();
    }

    public close(){
      App.ViewManager.closeView(this);
    }

    
    /**
     *      初始化文官信息
     */
    public initEmployInfo(){
          let strName:string = "idxEmpl_";
          let strGName:string = "idxHead_";
          let _data = ConfigDb.palaceConfig.loadCivilData();
          for(let i=1;i<4;i++){
            // 文官头像
            let headGroup = this.viewNodeList.getUINodeByName(strGName+i.toString());
            let headImg = <eui.Image>headGroup.getChildByName("headImg");
            headImg.source = _data[i+10]["icon"]+"_png";
            // 文官介绍
            let item = this.viewNodeList.getUINodeByName(strName+i.toString());
            let emplName = <eui.Label>item.getChildByName("title");
            let increase = <eui.Label>item.getChildByName("increase");
            let condition = <eui.Label>item.getChildByName("condition");
            emplName.text = _data[i+10]["name"];
            increase.text =  "+"+(_data[i+10]["rate"]*100).toString() + "%";
            condition.text = "王宫"+(_data[i+10]["palacelevel"]).toString() + "解锁";
            condition.textColor = 0XF40E0E;
          }
    }

} 