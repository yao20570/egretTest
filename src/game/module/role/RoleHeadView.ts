class RoleHeadView extends BaseEuiView {
    public switchBar:components.SwitchTabBar;
    public viewStack:eui.ViewStack;
    public headScroller:eui.Scroller;
    public headDataGroup:eui.DataGroup;

    public frameScroller:eui.Scroller;




    public constructor(controller:BaseController, parent:egret.DisplayObjectContainer) {
        super(controller, parent);   
        this.skinName = RoleHeadSkin;    
    }

    public initUI(): void {
        super.initUI();
        this.switchBar.addEventListener(egret.Event.CHANGE,()=>{
            this.viewStack.selectedIndex=this.switchBar.selectedIndex;
        },this)   
        this.switchBar.selectedIndex = 0;  
        this.viewStack.selectedIndex = 0;        
        // this.headScroller.horizontalScrollBar.autoVisibility = false;
        // this.headScroller.horizontalScrollBar.visible = false;
        // this.headScroller.verticalScrollBar.autoVisibility = false;
        // this.headScroller.verticalScrollBar.visible = false; 

        // this.frameScroller.horizontalScrollBar.autoVisibility = false;
        // this.frameScroller.horizontalScrollBar.visible = false;
        // this.frameScroller.verticalScrollBar.autoVisibility = false;
        // this.frameScroller.verticalScrollBar.visible = false; 
    }

    public initData(): void {
        let array = [{title:"普通头像"},{title:"V1以上专用"},{title:"V2以上专用"},{title:"V4以上专用"},{title:"V7以上专用"},{title:"V8以上专用"},{title:"V9以上专用"}];
        let collection = new eui.ArrayCollection(array);
        this.headDataGroup.dataProvider = collection;
    }
}