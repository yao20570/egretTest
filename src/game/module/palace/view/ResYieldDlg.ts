/**
 * 产量信息
 * @author lxn
 * @time    2018/03/27 
 */
class ResYieldDlg extends BaseEuiView{

    public btnclose:components.Button;
    public ok:components.Button;



    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer){
          super(controller, parent);      
          this.skinName = ResYieldDlgView;

          this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
          this.ok.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
    }

    public close(){
          App.ViewManager.closeView(this);
    }
}