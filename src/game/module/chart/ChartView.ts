// TypeScript file
class ChartView extends BaseEuiView {
    public switchBar: components.SwitchTabBar;
    public viewStack: eui.ViewStack;
    public shijie: eui.Scroller;
    public shijieMsgData: eui.DataGroup;
    public shijieCollection: eui.ArrayCollection;
    public guojia: eui.Scroller;
    public guojiaGroup: eui.Group;
    public shiliao: eui.Scroller;
    public shiliaoGroup: eui.Group;

    public sjBtn: components.Button;
    public sendBtn: components.Button;
    public input: eui.TextInput;
    public biaoqing: eui.Image;

    private sjChartList: ChartLable[] = [];



    public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
        super($controller, $parent);
        this.skinName = ChartSkin;
    }

    /**
     * initUI
     */
    public initUI() {
        super.initUI();
        this.switchBar.addEventListener(egret.Event.CHANGE, () => {
            this.viewStack.selectedIndex = this.switchBar.selectedIndex;
        }, this)
        this.switchBar.selectedIndex = 0;
        this.viewStack.selectedIndex = 0;
        this.sjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFriendView, this);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendChart, this);
        this.shijieMsgData.dataProvider = this.shijieCollection = new eui.ArrayCollection();
        this.shijieMsgData.itemRenderer = shijieItem;

        
    }

    public childrenCreated(){
        
    }


    private openFriendView() {

    }

    private sendChart() {
        if (this.input.text) {
            // Log.trace("发送内容:" + this.input.text);
            this.applyFunc(ChartConst.CHART_MSG_REQ, this.switchBar.selectedIndex + 1, this.input.text);
        } else {
            Toast.showTipsFromCenter("发送内容不能为空")
        }
        let item1 = this.shijieMsgData.getElementAt(2);
        item1.x = 1;
    }

    public receiveChart(msg: any) {
        // this.shijieCollection.addItem(msg);
        // console.log("shijieMsgData", (<eui.ItemRenderer>this.shijieMsgData.$children[this.shijieMsgData.numChildren - 1]).currentState, this.shijieMsgData, this.shijieMsgData.getElementAt(this.shijieMsgData.numChildren - 1));
        // // this.shijieMsgData.getElementAt[this.shijieMsgData.numChildren].currentState="right";
        // (<eui.ItemRenderer>this.shijieMsgData.$children[this.shijieMsgData.numChildren - 1]).currentState = "right";
        // this.shijie.viewport.scrollV += 125;
    }
    /** 整个世界聊天记录 */
    public receiveAllChartMsg(guojiaChart: any) {
        console.log("guojiaChart", guojiaChart);
        this.shijieCollection.replaceAll(guojiaChart);
        this.shijie.viewport.scrollV = guojiaChart.length * 125;
    }
}
class shijieItem extends eui.ItemRenderer {
    private tuxiang: eui.Image;
    private kuang: eui.Image;
    private guojia: eui.Image;
    private zhiwei: eui.Image;
    private roleName: eui.Label;
    private vipImg: eui.Image;
    private vip: eui.Label;
    private zone: eui.Label;
    private shijian: eui.Label;
    private chartGroup: eui.Group;
    private bg: eui.Image;
    private context: eui.Label;


    public constructor() {
        super();
    }
    protected childrenCreated(): void {
        super.createChildren();
        this.initUI();
    }
    private initUI() {

    }
    public dataChanged(): void {
        this.shijian.text = App.DateUtils.formatByType(this.data.st, 3)
    }

    public get x():number{
        return 0;
    }
    public set x(posX){
        let sss = posX
    }
}
