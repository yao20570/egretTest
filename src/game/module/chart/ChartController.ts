/**
 * 聊天模块控制类
 */
class ChartController extends BaseController {
    private chartView: ChartView;
    private chartProxy: ChartProxy;

    public constructor() {
        super();
        //初始化Model
        new ChartModel(this);
        //初始化UI
        this.chartView = new ChartView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Chart, this.chartView);

        //初始化Proxy
        this.chartProxy = new ChartProxy(this);

        //注册模块间、模块内部事件监听
        this.registerFunc(ChartConst.CHART_DATA_PUSH, this.msgPushRes, this);
        this.registerFunc(ChartConst.CHART_LOAD_REQ, this.loadReq, this);
        this.registerFunc(ChartConst.CHART_LOAD_RES, this.loadRes, this);
        this.registerFunc(ChartConst.CHART_MSG_REQ, this.sendChartMsg, this);
        this.registerFunc(ChartConst.CHART_MSG_RES, this.sendChartMsgRes, this);
        this.registerFunc(ChartConst.CHART_WORLD_RES, this.sendChartWordMsg, this);

    }

    private msgPushRes(data: any) {
        let chartModel = this.getModel() as ChartModel;
        chartModel.addMsg(data);
        // TODO 不能来一条都去刷新
        this.updateHomeChartMsg(chartModel.lastChart);
        this.chartView.receiveChart(chartModel.lastChart);
    }

    private updateHomeChartMsg(data: any) {
        if (data) {
            let chartCnt: Array<egret.ITextElement> = [
                { text: data.sn + ": ", style: { "textColor": 0x336699, "size": 18 } },
                { text: data.cnt, style: { "size": 18 } }];
            this.applyControllerFunc(ControllerConst.Home, HomeConst.CHART_UPDATE, chartCnt);
        }
    }

    private loadReq() {
        return this.chartProxy.loadReq();
    }

    private loadRes(body: any) {
        let chartModel = this.getModel() as ChartModel;
        if (body.rec) {
            let recList: Array<any> = body.rec;
            recList.forEach((value: any, index: number, array: any[]) => {
                chartModel.addMsg(value);
            });
        }
        this.updateHomeChartMsg(chartModel.lastChart);
        Log.trace("聊天加载完毕", body, chartModel.guojiaChart);
    }

    private sendChartMsg(accId: number, content: string, accName?: string) {
        this.chartProxy.sendChartMsg(accId, content, accName);
    }
    private sendChartWordMsg() {
        let chartModel = this.getModel() as ChartModel;
        this.chartView.receiveAllChartMsg(chartModel.guojiaChart);
    }
    // 个人与世界聊天
    private sendChartMsgRes(msg) {
        this.chartView.receiveChart(msg);
        // let chartModel = this.getModel() as ChartModel;
        // this.chartView.receiveAllChartMsg(chartModel.guojiaChart);
    }
}