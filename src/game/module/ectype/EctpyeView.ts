/*
 * @Author: lzf 
 * @Date: 2018-3-20 17:34:33 
 * @Description: 副本主界面
 */
class EctpyeView extends BaseEuiView {
    private openActivity: eui.Image;//活动页面
    private openSection: components.Button;//章节页面
    private overVit: eui.Label; //当前体力
    private buyVit: components.Button;//购买体力
    private selData: eui.DataGroup;//章节数据源
    private via0: eui.Group;
    private via1: eui.Group;
    private via2: eui.Group;
    private via3: eui.Group;
    private via4: eui.Group;
    private via5: eui.Group;
    private viaList: eui.Group[];
    private pass0: eui.Component;
    private pass1: eui.Component;
    private pass2: eui.Component;
    private pass3: eui.Component;
    private pass4: eui.Component;
    private pass5: eui.Component;
    private passList: eui.Component[];
    private outpostsData: any[];
    private outpostsOneData: any[];
    private chapterData: any[];
    private ectpyeModel: EctpyeModel;
    private colorFlilter: egret.ColorMatrixFilter;
    private rollSel: eui.Scroller;//章节滚动条
    private rollNum: number;//保存初始滚动位置
    // private _extraData: eui.DataGroup;//特殊
    private myCollection: eui.ArrayCollection;
    private feed1: FeedItem;//特殊关卡
    private feed2: FeedItem;
    private feed3: FeedItem;
    private feeds: FeedItem[];
    private curveFeed: any[];//当前关卡数据
    private leftBtn: eui.Image;//左右箭头
    private rightBtn: eui.Image;
    private historyId: number;//历史章节暂时保存
    private replayData: Array<dragon.ChapterVo>;
    private timerArray: TimerHandler[] = [];
    private tweenList: any[] = [];//缓动动画对象列表
    private heroData: any[];//英雄配表数据
    private supplyData: {
        nowNum?: number,
        allNum?: number,
        imgHead?: string,
        goldNum?: number,
        name?: string
    }[] = [];//军资补给数据
    public constructor(controller: BaseController, parent: eui.Group) {
        super(controller, parent);
        this.setResources(["baseAni"]);
        this.skinName = EctypeMainSkin;
    }
    public updateReplayData() {
        this.ectpyeModel = <EctpyeModel>App.ControllerManager.getControllerModel(ControllerConst.Ectpye);
        this.replayData = this.ectpyeModel.replayData;
        let data = this.chapterData.concat().splice(0, this.replayData.length + 1);
        for (let i = 0; i < data.length; i++) {
            data[i].icon = [];
            data[i].type = [];
            if (!this.replayData[i]) {
                data[i].s = 0;
            } else {
                data[i].s = this.replayData[i].s;//添加星级参数
                let soData = [];
                let so = this.replayData[i].so;
                if (so) {
                    so = so.sort(function (a, b) {
                        return a.id - b.id; //按id从小到大排序
                    });
                    for (let j = 0; j < so.length; j++) {
                        // if (so[j].rf == 5) {
                        // console.log("iiiii",i,so[j]);
                        data[i].icon.push(this.outpostsData[so[j].id + ""].icon);//拿到章节缩略图参数图片名
                        data[i].type.push(this.outpostsData[so[j].id + ""].type);//拿到章节关卡类型
                        // }
                    }
                }
            }
        }
        return data
    }
    public open(): void {
        this.openActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
        this.openSection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
        this.feed1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.feedPass, this);
        this.feed2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.feedPass, this);
        this.feed3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.feedPass, this);
        this.buyVit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
        this.rollSel.addEventListener(egret.Event.CHANGE, this.gorollSel, this);
        this.rollSel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hisRollNum, this);
        for (let i = 0; i < this.passList.length; i++) {
            this.passList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.passEvent.bind(this, i), this);
        }
        this.updateInitUI();

    }
    // 保留初始位置
    public close() {
        this.openActivity.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
        this.openSection.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
        this.feed1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.feedPass, this);
        this.feed2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.feedPass, this);
        this.feed3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.feedPass, this);
        this.buyVit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleEvent, this);
        this.rollSel.removeEventListener(egret.Event.CHANGE, this.gorollSel, this);
        this.rollSel.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.hisRollNum, this);
        this.passList.forEach((val, i) => {
            this.passList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.passEvent.bind(this, i), this);
        });
        this.myCollection.replaceAll([]);
        this.tweenList.forEach((val, i) => {
            egret.Tween.removeTweens(this.tweenList[i]);
        });
        this.feeds.forEach((val, i) => {
            if (this.feeds[i].getChildByName("hint")) {
                App.ParticleUtils.stopEffect(this.feeds[i], "hint");
            }
        });
        this.tweenList = [];
    }
    //刷新数据
    private updateInitUI() {
        this.myCollection.replaceAll(this.updateReplayData());
        this.selData.name = this.replayData.length + "";
        this.updateData(this.replayData.length);
        this.updateExtraData(this.replayData.length);
        this.updaterollSel(this.replayData.length, true);
    }
    /** 更新章节关卡数据 */
    public updateSection() {
        this.myCollection.replaceAll(this.updateReplayData());
        this.updateExtraData(this.replayData.length);
    }
    //记录滚动位置
    private hisRollNum() {
        this.rollNum = this.rollSel.viewport.scrollH;
    }
    // 关卡解锁状态
    private passEvent(i: number) {
        if (this.passList[i].filters) {
            return
        } else {
            if (this.passList[i]["stateImg"].source == "v1_weijiesuo_fb_png") {
                Toast.showTipsDownToUp(App.StringUtils.format("通过$0解锁", this.passList[i - 1]["sectionName"].text));
                return
            }
            // this.playAui(i + 1);//测试用
            this.applyFunc(EctpyeConst.FOE_RES, this.passList[i].name, this.outpostsOneData[i]);
        }
    }
    //对面板进行显示初始化，用于子类继承
    public initUI(): void {
        super.initUI();
        this.viaList = [this.via0, this.via1, this.via2, this.via3, this.via4, this.via5];
        this.passList = [this.pass0, this.pass1, this.pass2, this.pass3, this.pass4, this.pass5];
        this.feeds = [this.feed1, this.feed2, this.feed3];
        // this.outpostsData = RES.getRes("dragon_outposts_json");
        this.chapterData = RES.getRes("dragon_chapter_json");
        // this.heroData = ConfigDb.heroConfig.getHeroData();
        //颜色矩阵数组
        let colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        this.selData.dataProvider = this.myCollection = new eui.ArrayCollection();
        this.selData.itemRenderer = selDataItem;
        this.outpostsData = ConfigDb.ectypeConfig.getOutpostsData();
    }
    //刷新通过星级
    public updateStar(s: number) {
        if (!s) {
            this.pass5["startNum"].visible = false;
        } else {
            this.pass5["startNum"].visible = true;
            for (let i = 1; i <= 3; i++) {
                this.pass5[`ray${i}`].visible = i <= s ? true : false;
            }
        }
    }
    // 更新章节滚动条位置 
    private updaterollSel(id: number, isInit: boolean) {
        let num = isInit ? 200 : 50;
        egret.Tween.get(this.rollSel.viewport).to({ scrollH: (id - 1) * 286 }, 3).wait(num).call(() => {
            this.changeSection(id - 1, true);
            if (id - 1 == 0) {
                this.changeSection(id, false);
            }
            this.pushTweenList(this.rollSel.viewport);
        });
    }
    //添加缓动对象到列表中
    private pushTweenList(obj) {
        if (this.tweenList.indexOf(obj) == -1) {
            this.tweenList.push(obj);
        }
    }
    // 更新特定章节的数据 
    private updateData(id: number) {
        switch (id) {
            case 1:
                this.leftBtn.visible = false;
                this.rightBtn.visible = true;
                break;
            case this.selData.numElements - 1:
                this.rightBtn.visible = false;
                this.leftBtn.visible = true;
                break;
            default:
                this.leftBtn.visible =
                    this.rightBtn.visible = true;
        }
        if (this.selData.numElements == 2) {
            this.rightBtn.visible = false;
        }
        this.outpostsOneData = ConfigDb.ectypeConfig.getOutpostsOneData()[id.toString()];
        // let num = (this.ectpyeModel.replayData.y + 3) * id;//获取对应配置的相对位置
        for (let i = 0; i < 6; i++) {
            let plan = 5;//默认通全关
            if (id == this.selData.numElements - 1) {
                plan = this.replayData[this.selData.numElements - 2].x;//获取当前最新章节进度
            }
            this.passList[i].name = this.outpostsOneData[i].monsters;
            if (i <= plan) {
                this.passList[i]["sectionName"].text = this.outpostsOneData[i].name;
                this.passList[i]["sectionGroup"].visible = true;
                this.passList[i]["stateImg"].source = this.outpostsOneData[i].icon + "_png";

                if (i == plan) {
                    this.passList[i].filters = null
                    this.passList[i].enabled = true;
                    if (!this.passList[i]["sectionOne"].getChildByName("round")) {
                        App.ParticleUtils.createEffect(this.passList[i]["sectionOne"], "round_json", "round_png", 80, 100, "round");
                    }
                } else {
                    this.passList[i].filters = [this.colorFlilter];
                    this.passList[i].enabled = false;
                    if (this.passList[i]["sectionOne"].getChildByName("round")) {
                        App.ParticleUtils.removeEffect(this.passList[i]["sectionOne"], "round");
                    }
                }
                if (this.viaList[i].numChildren) {
                    for (let j = 0; j < this.viaList[i].numChildren; j++) {
                        this.viaList[i].getChildAt(j).visible = i !== plan;
                    }
                }
            } else {
                if (i) {
                    this.passList[i]["stateImg"].source = "v1_weijiesuo_fb_png";
                    this.passList[i]["sectionGroup"].visible =
                        this.passList[i]["startNum"].visible = false;
                    this.passList[i].enabled = true;
                    if (this.passList[i]["sectionOne"].getChildByName("round")) {
                        App.ParticleUtils.removeEffect(this.passList[i]["sectionOne"], "round");
                    }
                } else {
                    this.passList[i]["stateImg"].source = this.outpostsOneData[i].icon + "_png";
                }
                this.passList[i].filters = null;
                this.passList[i]["sectionName"].text = this.outpostsOneData[i].name;
                if (this.viaList[i].numChildren && this.viaList[i].getChildAt(0).visible) {
                    for (let k = 0; k < this.viaList[i].numChildren; k++) {
                        this.viaList[i].getChildAt(k).visible = false;
                    }
                }
            }
        }
    }
    //索引到特定章节进行缩放 从章节列表点击回来或者刚打开副本this.selData.getElementAt get不到
    private changeSection(id: number, isChange: boolean) {
        let elementAt = this.selData.getElementAt(id);
        if (elementAt) {
            elementAt["bg"].visible = !isChange;
            if (isChange) {
                elementAt.scaleX = elementAt.scaleY = 1.2;
            } else {
                elementAt.scaleX = elementAt.scaleY = 1;
            }
        }
    }
    /**播放是否播放关卡动画 */
    public newPassAui(openOps: any) {
        if (openOps) {
            for (let i = 0; i < this.outpostsOneData.length; i++) {
                for (let j = 0; j < openOps.length; j++) {
                    if (openOps[j] == this.outpostsOneData[i].id) {
                        if (i < 6) {
                            this.playAui(i);
                        } else {
                            this.updateReplayData();
                            this.updateExtraData(this.replayData.length)
                        }
                    }
                }
            };
        }
    }
    /** 更新特殊关卡 */
    public updatePass(passData: { as: { k: number, v: number }[], op: dragon.OutpostVo }) {
        // this.updateInitUI();
        this.showSupplyTips(passData.as);
        console.log("passData.op", passData.op);
    }
    //添加补给提示效果 
    private showSupplyTips(as: { k: number, v: number }[]) {
        for (let i = 0; i < as.length; i++) {
            Toast.showTipsDownToUp(`补给成功k=${as[i].k}s=${as[i].v}`);
        }
    }
    /**
     * @param newNum {number} 新开启的关卡Id
     * 播放关卡动画
     */
    public playAui(newNum: number) {
        let func = (index: number) => {
            if (index == this[`via${newNum - 1}`].numChildren) {
                console.log("达到关卡！！");
                if (this.passList[newNum]) {
                    if (newNum !== this.passList.length - 1) {
                        this.passList[newNum].filters = null;
                        this.passList[newNum]["stateImg"].source = "v2_img_putongguanqia_png";
                    } else {
                        this.passList[newNum]["stateImg"].source = "v2_img_jingyingguanqia_png";
                    }
                    App.ParticleUtils.createEffect(this.passList[newNum]["sectionOne"], "round_json", "round_png", 80, 100, "round");
                    this.passList[newNum - 1].filters = [this.colorFlilter];
                    this.passList[newNum - 1].enabled = false;
                    if (this.passList[newNum - 1]["sectionOne"].getChildByName("round")) {
                        App.ParticleUtils.removeEffect(this.passList[newNum - 1]["sectionOne"], "round");
                    }
                    this.passList[newNum]["sectionGroup"].visible = true;
                }
                return;
            }
            let item = this[`via${newNum - 1}`].getChildAt(index);
            let herf = this;
            egret.Tween.get(item).to({ visible: true }, 100).call(function () {
                func(++index);
                herf.pushTweenList(item);
            });
        }
        func(0);
    }

    //特殊关卡点击事件
    private feedPass(event: egret.TouchEvent) {
        // console.log("特殊关卡点击事件", event.target.name, this[`feed${event.target.name}`].clearText.text);
        switch (this[`feed${event.target.name}`].currentState) {
            case "":
            case "clear":
                Toast.showTipsDownToUp(this[`feed${event.target.name}`].clearText.text);
                break;
            case "open":
                switch (parseInt(this[`feed${event.target.name}`].imgHead.name)) {
                    case 1:
                        App.ViewManager.open(ViewConst.Ectpye_Recruit);
                        break;
                    case 2:
                        console.log("天帝剑");
                        break;
                    case 3:
                        if (this[`feed${event.target.name}`].buyGlod.visible) {
                            let moreFeed = this.supplyData[parseInt(event.target.name) - 1];
                            // console.log("aaaaaa", moreFeed)
                            this.applyFunc(EctpyeConst.MOREFEED_RES, moreFeed);

                        } else {
                            console.log("点击军粮补给");
                            let passId = parseInt(this[`feed${event.target.name}`].passId.name);
                            this.applyFunc(EctpyeConst.FEED_REQ, passId);
                        }
                        break;
                    case 4:
                        console.log("绿影书");
                        break;
                    case 5:
                        console.log("客栈图纸");
                        break;
                    default:
                        break;
                }

                break;
            default:
                break;
        }
    }
    /**判断是否最新章节 */
    public isNewSection(id: number) {
        if (this.rollSel.viewport.scrollH == (id - 1) * this.selData.getChildAt(0).width) {
            return false
        }
        this.myCollection.replaceAll([]);
        this.myCollection.replaceAll(this.updateReplayData());
        this.updateExtraData(id);
        this.updateData(id);
        this.updaterollSel(id, false);
        this.updateStar(this.replayData[id - 1].s);
    }
    //更新特殊关卡数据 id当前章节id
    private updateExtraData(idNum: number) {
        for (let i = 0; i < this.feeds.length; i++) {
            this.feeds[i].currentState = "default";
            if (this.feeds[i].getChildByName("hint")) {
                App.ParticleUtils.removeEffect(this.feeds[i], "hint");
            }
        }
        let co = this.replayData[idNum - 1].co;
        if (co) {
            for (let i = co.length - 1; i >= 0; i--) {
                let num: number;
                switch (this.outpostsData[co[i] + ""].count) {
                    case 6:
                    case 5:
                        num = 2;
                        break;
                    case 4:
                    case 3:
                        num = 1;
                        break;
                    case 2:
                    case 1:
                        num = 0;
                        break;
                }
                this.feeds[num].currentState = "clear";
                if (this.feeds[num].getChildByName("hint")) {
                    App.ParticleUtils.removeEffect(this.feeds[num], "hint");
                }
                this.feeds[num].action.text = this.outpostsData[co[i] + ""].name;
                this.feeds[num].imgHead.filters = [this.colorFlilter];
                // console.log("this" + this.feeds[i].action.visible, this.outpostsData[co[i] + ""].name);
                this.feeds[num].clearText.text = App.StringUtils.format("通过第$0关解锁", this.outpostsData[co[i] + ""].count);
                switch (this.outpostsData[co[i] + ""].type) {
                    case 1:
                        this.feeds[num].imgHead.source = "i" + this.outpostsData[co[i] + ""].icon + "_5_png";
                        break;
                    case 3:
                        this.feeds[num].imgHead.source = this.outpostsData[co[i] + ""].icon + "_png";
                        break;
                    default:
                        break;
                }

            }
        }
        let so = this.replayData[idNum - 1].so;
        for (let i = 0; i < this.timerArray.length; i++) {
            App.TimerManager.removeByHandler(this.timerArray[i]);
        }
        this.timerArray = [];
        if (so) {
            so = so.sort(function (a, b) {
                return a.id - b.id; //按id从小到大排序
            });
            for (let i = 0; i < so.length; i++) {
                let num: number;
                switch (this.outpostsData[so[i].id + ""].count) {
                    case 6:
                    case 5:
                        num = 2;
                        break;
                    case 4:
                    case 3:
                        num = 1;
                        break;
                    case 2:
                    case 1:
                        num = 0;
                        break;
                }
                // if (so[i].rf !== 5) {
                this.feeds[num].currentState = "open";
                this.feeds[num].imgHead.filters = null;
                let type = this.outpostsData[so[i].id + ""].type;
                this.feeds[num].imgHead.name = type;
                this.feeds[num].passId.name = this.outpostsData[so[i].id + ""].id;
                if (type == 1) {
                    let id = this.outpostsData[so[i].id + ""].icon.split(":");
                    this.feeds[num].action.text = this.outpostsData[id].name;
                } else {
                    this.feeds[num].action.text = this.outpostsData[so[i].id + ""].name;
                }
                if (type == 3) {
                    this.feeds[num].timeGroup.visible = true;
                    if (so[i].rf !== 5) {
                        if (this.feeds[num].getChildByName("hint")) {
                            App.ParticleUtils.playEffect(this.feeds[num], "hint");
                        } else {
                            App.ParticleUtils.createEffect(this.feeds[num], "hint_json", "hint_png", 40, 62, "hint");
                            // this.feeds[num].effectGroup.visible=true;
                            // this.feeds[num].run.play();
                        }
                        this.feeds[num].count.includeInLayout =
                            this.feeds[num].count.visible = true;
                        this.feeds[num].count.textFlow =
                            (new egret.HtmlTextParser).parser(
                                App.StringUtils.format("<font>剩余<font color='#31d840'>$0</font>次</font>", 5 - so[i].rf));
                        this.feeds[num].buyGlod.includeInLayout =
                            this.feeds[num].buyGlod.visible =
                            this.feeds[num].time.visible = false;
                        if (so[i].rb > 0) {
                            this.feeds[num].time.visible = true;
                            this.specialPass(so, num, i);
                        }
                        // this.specialPass(so,num,i);
                    } else {
                        // this.supplyData[num] = {};
                        if (!this.supplyData[num]) {
                            this.supplyData[num] = {};
                        }
                        if (this.feeds[num].getChildByName("hint")) {
                            App.ParticleUtils.removeEffect(this.feeds[num], "hint");
                        }
                        this.feeds[num].time.visible = true;
                        this.feeds[num].count.includeInLayout =
                            this.feeds[num].count.visible = false;
                        this.feeds[num].buyGlod.includeInLayout =
                            this.feeds[num].buyGlod.visible = true;
                        let goldNums = this.outpostsData[so[i].id + ""].feedbuycost.split(",");
                        this.feeds[num].goldNum.text = goldNums[so[i].rb];
                        this.supplyData[num].allNum = goldNums.length;
                        this.supplyData[num].goldNum = goldNums[so[i].rb];
                        this.supplyData[num].nowNum = goldNums.indexOf(goldNums[so[i].rb].toString());
                        this.supplyData[num].name = this.feeds[num].action.text;
                        console.log("rbb", goldNums, goldNums[so[i].rb]);
                        this.specialPass(so, num, i);
                    }

                }
                // console.log("soso", this.heroData[this.outpostsData[so[i].id + ""].icon], this.outpostsData[so[i].id + ""].icon, so[i].id);
                switch (type) {
                    case 1:
                        this.feeds[num].imgHead.source = "i" + this.outpostsData[so[i].id + ""].icon + "_5_png";
                        break;
                    case 3:
                    case 4:
                        this.feeds[num].imgHead.source = this.outpostsData[so[i].id + ""].icon + "_png";
                        break;
                    default:
                        break;
                }
                if (!this.supplyData[num]) {
                    this.supplyData[num] = {};
                }
                this.supplyData[num].imgHead = this.feeds[num].imgHead.source + "";
            }
        }
    }
    //特殊关卡更新效果
    private specialPass(so: any, num: number, i: number) {
        let data = so[i].cd * 1000;
        this.feeds[num].time.text = App.DateUtils.formatByType(data);
        let handler: TimerHandler = App.TimerManager.doTimer(1000, so[i].cd, () => {
            data -= 1000;
            this.feeds[num].time.text = App.DateUtils.formatByType(data);
        }, this.feeds[num].time, () => {
            // this.feeds[num].currentState = "default";
            this.applyFunc(EctpyeConst.LOAD_REQ);
        })
        this.timerArray.push(handler);
    }
    //监听滚动条变化
    private gorollSel() {
        let singleWidth = this.selData.getChildAt(0).width;
        let num = Math.floor(this.rollSel.viewport.scrollH / singleWidth);
        let fairly: number;
        if (this.replayData.length + 1 == this.chapterData.length) {
            fairly = this.chapterData.length - 2;
        } else {
            fairly = this.chapterData.length - 1
        }
        if (num === this.selData.numElements - 2 && num < fairly) {
            this.rollSel.viewport.scrollH = this.rollNum;
            return
        }
        let surplusWidth = this.rollSel.viewport.scrollH % singleWidth;//多余宽度
        let scrollApart: number;//滚动条需要滑动的距离
        let nowScrollH: number = this.rollSel.viewport.scrollH;//显示窗口最终位置
        this.rollSel.stopAnimation();
        if (this.rollNum < this.rollSel.viewport.scrollH) {
            this.rollSel.scrollPolicyH = "off";
            scrollApart = singleWidth - surplusWidth;
            nowScrollH += scrollApart;
            egret.Tween.get(this.rollSel.viewport).to({ scrollH: nowScrollH }, 300, egret.Ease.quadOut).call(() => {
                num = Math.floor(this.rollSel.viewport.scrollH / singleWidth);
                if (num - 1 >= 0) {
                    this.changeSection(num - 1, false);
                }
                this.changeSection(num, true);
                this.historyId = num;
                this.rollSel.name = num + "";
                this.rollSel.scrollPolicyH = "on";
                this.updateData(num + 1);
                this.updateStar(this.replayData[num].s);
                this.updateExtraData(num + 1);
            });
        } else {

            scrollApart = surplusWidth;
            nowScrollH -= scrollApart;
            egret.Tween.get(this.rollSel.viewport).to({ scrollH: nowScrollH }, 300, egret.Ease.quadOut).call(() => {
                num = Math.floor(this.rollSel.viewport.scrollH / singleWidth);
                this.updateStar(this.replayData[num].s);
                this.applyFunc(EctpyeConst.SECTION_REQ, this.replayData[num].id);
                if (num + 1 < this.selData.numElements) {
                    this.changeSection(num + 1, false);
                }
                this.changeSection(num, true);
                this.historyId = num;
                this.rollSel.name = num + "";
                this.rollSel.scrollPolicyH = "on";
                this.updateData(num + 1);
                this.updateExtraData(num + 1);
            });
        }
        this.pushTweenList(this.rollSel.viewport);

    }
    private handleEvent(event: egret.TouchEvent) {
        switch (event.target) {
            case this.openActivity:
                console.log("111");
                App.ViewManager.open(ViewConst.Ectpye_Activity);
                break;
            case this.openSection:
                console.log("222");
                App.ViewManager.open(ViewConst.Ectpye_section);
                // this.applyFunc(EctpyeConst.SECTION_REQ, this.ectpyeModel.replayData.id);
                break;
            case this.buyVit:
                console.log("333");
                App.ViewManager.open(ViewConst.buyPower);
                break;
        }
    }
}
class selDataItem extends eui.ItemRenderer {
    private sectionName: eui.Label;
    private rect1: eui.Rect;
    private rect2: eui.Rect;
    private rect3: eui.Rect;
    private rects: eui.Rect[];
    private img1: eui.Image;
    private img2: eui.Image;
    private img3: eui.Image;
    private imgs: eui.Image[];
    private passGroup: eui.Group;
    private ray1: eui.Image;
    private ray2: eui.Image;
    private ray3: eui.Image;
    private rays: eui.Image[];
    public constructor() {
        super();
    }
    protected childrenCreated(): void {
        super.createChildren();
        this.imgs = [this.img1, this.img2, this.img3];
        this.rects = [this.rect1, this.rect2, this.rect3];
        this.rays = [this.ray1, this.ray2, this.ray3];
        this.initUI();
    }
    private initUI() {
        this.imgs.forEach((v, i, array) => {
            this.imgs[i].mask = this.rects[i];
        });
    }
    public dataChanged(): void {
        if (this.data.s && this.data.s !== 0) {
            this.passGroup.visible = true;
            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].visible = this.data.s > i
            };
        } else {
            this.passGroup.visible = false;
        }
        if (this.itemIndex == parseInt(this.parent.name) && parseInt(this.parent.name) !== 64) {
            this.currentState = "0";
        } else {
            this.currentState = "1";
        }
        if (!this.data.icon.length && this.itemIndex != parseInt(this.parent.name)) {
            this.currentState = "4";
        } else {
            let icons = this.data.icon;
            this.currentState = icons.length + "";
            for (let i = 0; i < icons.length; i++) {
                switch (this.data.type[i]) {
                    case 1:
                        this.imgs[i].source = `i${icons[i]}_5_png`;
                        break;
                    case 3:
                    case 4:
                        this.imgs[i].source = `${icons[i]}_png`;
                        break;
                }
            }
        }
    }
}