class ChartModel extends BaseModel {
    public lastChart: any;
    public shijieChart: any[];
    public guojiaChart: any[];
    public siliaoChart: { [key: number]: Array<any> } = {};
    public labaContent: any[];

    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller: BaseController) {
        super($controller);
        this.shijieChart = new Array<any>();
        this.guojiaChart = new Array<any>();
        this.labaContent = new Array<any>();
    }

    public addMsg(msg: any) {
        let types: Array<number> = msg.aid;
        types.forEach((value: number, index: number, array: number[]) => {
            switch (value) {
                case ChartConst.SHIJIE:
                    this.shijieChart.push(msg);
                    this.lastChart = msg;
                    break;
                case ChartConst.GUOJIA:
                    this.guojiaChart.push(msg);
                    break;
                case ChartConst.SILIAO:
                    let list: Array<any> = this.shijieChart[msg.sid];
                    if (!list) {
                        list = new Array<any>();
                        this.shijieChart[msg.sid] = list;
                    }
                    list.push(msg);
                    break;
                case ChartConst.LABA:
                    this.labaContent.push(msg);
                    break;
            }
        });
    }

}