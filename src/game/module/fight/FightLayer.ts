/*
* 战斗场景界面
* @author jrc        
* @since 2018年3月22日
*/
class FightLayer extends BaseEuiView {

    public sTitle: string; // 标题
    public sCNameL: string; // 左方名字
    public imgCFlagL: eui.Image; // 左方旗帜
    public pbarBloodL: eui.ProgressBar; // 左方血量
    public grpHerosL: eui.Group; // 左方英雄列表层
    public lbHNameL: eui.Label; // 左方当前战斗英雄名字
    public lbHLvL: eui.Label; // 左方当前战斗英雄等级
    // 
    public sCNameR: string; // 右方名字
    public imgCFlagR: eui.Image; // 右方旗帜
    public pbarBloodR: eui.ProgressBar; // 右方血量
    public grpHerosR: eui.Group; // 右方英雄列表层
    public lbHNameR: eui.Label; // 右方当前战斗英雄名字
    public lbHLvR: eui.Label; // 右方当前战斗英雄等级
    // 
    public imgArrow: eui.Image; // 箭头
    public grpBottom: eui.Group; // 底部层
    public btnSkip: components.Button; // 跳过战斗按钮
    public lbSkipTips: eui.Label; // 跳过战斗提示语
    //
    public grpGround: eui.Group; // 战斗展示层
    public imgBg: eui.Image; // 背景层
    public grpFLayer: eui.Group; // 战斗层
    
    /** 数据 */
    public pRoleModel: RoleModel; // 角色数据
	public bSkipCDOver: boolean=false; // 是否已经完成倒计时
    private bRegSkipTimer: boolean=false;
    private nSkipCD: number=0; // 跳过战斗按钮CD时间
    //////////////////////////////////
    public pFD: FightDirector; // 战报播放管理类
    public nInitCallback: Function; // 界面初始化完成回调
    public tReport: any; // 战报数据
    public nFightEndCallback: Function; // 播放结束回调
    public bCanSkipFight: boolean=false; // 是否可以直接跳过战斗
    public bIsTLBossReport: boolean=false; // 是否是限时boss战
    //////////////////////////////////
    public tHeroItemsL: FightHeroItem[]; // 武将列表
    public tHeroItemsR: FightHeroItem[]; // 武将列表
    public tCurHItemL: FightHeroItem;// 正在战斗的武将item
    public tCurHItemR: FightHeroItem;// 正在战斗的武将item
    public pLayBloodL: FightBlood; // 左方血量层
    public pLayBloodR: FightBlood; // 右方血量层

    public constructor($controller: BaseController, $parent: egret.DisplayObjectContainer) {
        super($controller, $parent);
        this.myInit();
        this.setResources(["fight", "icon_hero_head", "db", "fight_sd"]);
        this.skinName = FightLayerSkin;
    }

    public myInit(): void {
        this.nFightEndCallback = null;
    }

    /** 初始化数据 */
    public initData(): void { 
    }

    /**
     * 面板开启执行函数
     * @param param 参数
     */
    public open(...param: any[]): void {
        this.regEventListener();
        this.initFigthData();
        this.setupViews();
    }

    /** 初始化基础数据 */
    public initFigthData(): void {
        this.pFD = null; 
        // this.tReport = null; // 战报数据
        this.bSkipCDOver = false; // 是否已经完成倒计时
        this.bCanSkipFight = false; // 是否可以直接跳过战斗
        this.bRegSkipTimer = false;
        this.nSkipCD = 0; // 跳过战斗按钮CD时间
        this.bIsTLBossReport = false; // 是否是限时boss战
        FightConst.__bHasEndCallback = false;

        this.pbarBloodL.maximum = 0;
        this.pbarBloodL.value = 0;
        this.pbarBloodR.maximum = 0;
        this.pbarBloodR.value = 0;
        this.grpFLayer.scaleX = this.grpFLayer.scaleY = 1.0;

        this.grpFLayer.removeChildren();
        this.grpHerosL.removeChildren();
        this.grpHerosR.removeChildren();
        this.tHeroItemsL = [];
        this.tHeroItemsR = [];

        this.pRoleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
    }
	// ===================== ↓初始化战报数据↓ =====================
    /** 设置战报数据 */
    public setReport(_tReport:any): void {
        this.initReport(_tReport);
    }
    public initReport(_tReport): void {
        this.tReport = _tReport;
        if (!this.tReport || !this.tReport.acts 
            || !this.tReport.ous || this.tReport.ous.length === 0
            || !this.tReport.dus || this.tReport.dus.length === 0) {
            this.onFightEndCallback();
            return;
        }
        let initUnits = function(_tU:any[]): void {
            _tU.forEach((v, k) => {
                let nHid = v.hs && v.hs.t ? v.hs.t : v.hid;
                v.tHeroInfo = FightUtils.getHeroInfo(nHid);
                v.curTrp = v.trp;
            });
        }
        // 初始化方阵数据
        initUnits(this.tReport.ous);
        initUnits(this.tReport.dus);
        // 是否是限时boss战
        this.bIsTLBossReport = this.tReport.t === FReportType.tlboss;
    }
    
    /** 获取战报数据 */
    public getReport():any {
        return this.tReport;
    }
    
	// ===================== ↑初始化战报数据↑ =====================

    /** 注册按钮事件  */
    public regEventListener(): void {
        this.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkipBtn, this);
    }

    /** 初始化界面 */
    public setupViews(): void {
        if (this.tReport == null) return;
        this.sTitle = FightUtils.getFightTitle(this.tReport.t);
        this.sCNameL = this.tReport.on;
        this.imgCFlagL.source = FightUtils.getCountryFlagImg(this.tReport.oc);
        this.sCNameR = this.tReport.dn;
        this.imgCFlagR.source = FightUtils.getCountryFlagImg(this.tReport.dc);

        //////////////////////////////////////////////////////////////
        this.pbarBloodL.labelFunction = function(v:number, max:number):string {
            return v + "";
        }
        this.pbarBloodR.labelFunction = function(v:number, max:number):string {
            return v + "";
        }
        //////////////////////////////////////////////////////////////
        AnchorUtil.setAnchorX(this.lbHNameL, 1);
        AnchorUtil.setAnchorX(this.lbHLvR, 1);
        FightConst.__fightCenterX = this.grpFLayer.width / 2;
        FightConst.__fightCenterY = this.grpFLayer.height / 2 - 50;
        this.grpGround.scaleX = this.grpGround.scaleY = FightConst.__fSScale;

        this.initHeroItems(this.tReport.ous, true, this.grpHerosL, this.tHeroItemsL); // 初始化左边武将数据
        this.initHeroItems(this.tReport.dus, false, this.grpHerosR, this.tHeroItemsR); // 初始化左边武将数据

        ///////////////////////////////////////////////////
        if (this.pFD == null) {
            this.pFD = new FightDirector(this, this.grpFLayer, this.tReport);
            if (this.nInitCallback) this.nInitCallback(); // 初始化结束回调
        }
    }
    /** 初始化血量层 */
    public initBloodLayerInfo(): void {
        // 初始化血量层
        if (this.pLayBloodL == null) {
            this.pLayBloodL = new FightBlood(1);
            this.pLayBloodL.x = FightConst.__fightCenterX - FightConst.__fFightOffsetX - this.pLayBloodL.width / 2;
            this.pLayBloodL.y = FightConst.__fightCenterY + FightConst.__fFightOffsetY - 65 - this.pLayBloodL.height;
        }
        this.grpFLayer.addChildAt(this.pLayBloodL, 310);
        this.pLayBloodL.visible =false;
        if (this.pLayBloodR == null) {
            this.pLayBloodR = new FightBlood(2);
            let fX = FightConst.__fightCenterX + FightConst.__fFightOffsetX - this.pLayBloodR.width / 2;
            let fY = FightConst.__fightCenterY - FightConst.__fFightOffsetY - 65 - this.pLayBloodR.height;
            if (this.bIsTLBossReport) {
                fX += 53;
                fY -= 120;
            }
            this.pLayBloodR.x = fX;
            this.pLayBloodR.y = fY;
        }
        this.grpFLayer.addChildAt(this.pLayBloodR, 300);
        this.pLayBloodR.visible =false;
    }

	// ===================== ↓战斗双方信息↓ =====================
    private static _fItemScaleA = 0.5; // 武将头像缩放值1
    private static _fItemScaleB = 0.7; // 武将头像缩放值2
    private static _nItemOffset = 15; // 武将item间隔大小
    /** 初始化武将图标 */
    private initHeroItems(_tUnits:any[], _bLeft:boolean, _pView, _tList:any[]): void {
        let fX = _bLeft ? _pView.width : 0;
        _tUnits.forEach((v, k) => {
            let pItem:FightHeroItem = new FightHeroItem();
            let fScale = FightLayer._fItemScaleA;
            let fY = 5;
            if (k === 0) {
                pItem.setNameVisible(false);
                fScale = FightLayer._fItemScaleB;
                if (_bLeft) this.tCurHItemL = pItem;
                else this.tCurHItemR = pItem;
                fY = 3;
                this.setCurHeroInfo(_bLeft ? 1 : 2, v)
            }
            _tList.push(pItem);
            fX = _bLeft ? fX - pItem.width * fScale : fX;
            pItem.x = fX;
            pItem.y = fY;
            pItem.setScale(fScale);
            pItem.setData(v.tHeroInfo);
            _pView.addChild(pItem);
            fX = _bLeft ? fX - FightLayer._nItemOffset : fX + pItem.width * fScale + FightLayer._nItemOffset;
        });
        if (!_bLeft) this.setArrowState(); // 设置克制关系
    }
    /**
     * 设置当前战斗武将信息
     * @param  {number} _nDir 方向 1：左方 2：右方
     * @param  {any} _tInfo 武将信息
     * @param  {number} _nIndex 武将下标
     * @returns void
     */
    private setCurHeroInfo(_nDir:number, _tInfo:any, _nIndex:number=-1): void {
        let pLbHLv:eui.Label;
        let pLbHName:eui.Label;
        let pPbarBlood:eui.ProgressBar;
        if (_nDir === 1) { // 左方
            pLbHLv = this.lbHLvL;
            pLbHName = this.lbHNameL;
            pPbarBlood = this.pbarBloodL;
        } else { // 右方
            pLbHLv = this.lbHLvR;
            pLbHName = this.lbHNameR;
            pPbarBlood = this.pbarBloodR;
        }
        let sName = "";
        let nQuality = 1;
        if (_tInfo.tHeroInfo) {
            sName = _tInfo.tHeroInfo.sName;
            nQuality = _tInfo.tHeroInfo.nQuality;
        }
        pLbHLv.text = "Lv." + _tInfo.lvl;
        pLbHName.text = sName;
        pLbHLv.validateNow();
        pLbHName.validateNow();
        
        let nW = (_nDir === 1 ? 315 - pLbHLv.x : pLbHLv.x - 325) - pLbHLv.width - 4;
        FightUtils.resetScaleByMaxWidth(pLbHName, nW);
        ColorUtils.setTextColorByQuality(pLbHName, nQuality);
        pPbarBlood.maximum = _tInfo.trp;
        pPbarBlood.value = _tInfo.trp;

        if (_nIndex != null && _nIndex >= 0) {
            this.showHeroAction(_nDir, _nIndex);
        }
    }
    /** 设置克制关系 */
    public setArrowState(): void {
        if (this.tCurHItemL && this.tCurHItemR) {
            let pHDL = this.tCurHItemL.getData();
            let pHDR = this.tCurHItemR.getData();
            if (pHDL && pHDR) {
                let nState = FightUtils.getHeroRestrainState(pHDL.nKind, pHDR.nKind);
                switch(nState) {
                    case 0:{this.imgArrow.source = "v1_img_bukezhi_png"; break;}
                    case 1:{this.imgArrow.source = "v1_img_lanjiantou_png"; break;}
                    case 2:{this.imgArrow.source = "v1_img_hongjiantou_png"; break;}
                }
            }
        }
    }
	// ===================== ↑战斗双方信息↑ =====================

	// ===================== ↓跳过按钮相关↓ =====================
    /** 设置跳过战斗按钮可视状态 */
    public setSkipBtnVisible(_bVisible:boolean): void {
        this.grpBottom.visible = _bVisible;
        if (_bVisible) { 
            let tVip = ConfigDb.getAvatarVIPByLevel(this.pRoleModel.vip);
            if (this.bSkipCDOver || this.bCanSkipFight || (tVip && tVip.canskip)) {
                this.lbSkipTips.visible = false;
                this.btnSkip.label = "跳过战斗";
            } else {
                this.regSkipTimer();
                this.lbSkipTips.visible = true;
            }
        } else {
            this.lbSkipTips.visible = _bVisible;
        }
    }
    /** 启动定时器 */
    private regSkipTimer(): void {
        if (this.bRegSkipTimer) return ;
        this.bRegSkipTimer = true;
        this.nSkipCD = 5;
        this.setSkipCD(this.nSkipCD);
        App.TimerManager.doTimer(1000, this.nSkipCD, () => {
            this.nSkipCD--;
            this.setSkipCD(this.nSkipCD);
        }, {}, () => {
            this.bRegSkipTimer = false;
            this.bSkipCDOver = true;
            this.setSkipBtnVisible(true);
        }, {});
    }
    /** 设置跳过战斗CD时间 */
    private setSkipCD(_nCD:number):void {
        this.btnSkip.label = App.StringUtils.format("$0s跳过", _nCD);
    }

    /** 点击“跳过战斗”按钮 */
    private onClickSkipBtn(): void {
        let tVip = ConfigDb.getAvatarVIPByLevel(this.pRoleModel.vip);
        if (this.bSkipCDOver || this.bCanSkipFight || (tVip && tVip.canskip)) {
            this.onFightEndCallback();
        } else {
            Toast.showTipsDownToUp(ConfigDb.getTipsByIndex(539));
        }
    }
	// ===================== ↑跳过按钮相关↑ =====================
    
	// ===================== ↓战斗结束相关↓ =====================
    /** 关闭战斗界面 */
    public onCloseFight(): void {
        App.ViewManager.close(ViewConst.FightLayer);
    }
    /** 战斗播放结束 */
    public onFightEndCallback():void {
        if (!FightConst.__bHasEndCallback && this.nFightEndCallback) {
            FightConst.__bHasEndCallback = true; // 战斗已结束
            this.nFightEndCallback();

            if (this.pFD) {
                this.pFD.stopAllFightActions();
                this.pFD.removeAllSkillArms();
            }
        }
    }
    /** 设置播放结束回调 */
    public setFightCallback(_nCallback:Function): void {
        this.nFightEndCallback = _nCallback;
    }
	// ===================== ↑战斗结束相关↑ =====================
	// ===================== ↓消息监听相关↓ =====================
    public updBloodInfo(_S:number, _nState:number, _nHPos?:number, _nPhx?:number): void {
        if (_S === 1) {
            if (_nState === 1) {
                if (_nHPos != null && _nPhx != null) {
                    let tT = this.tReport.ous[_nHPos].phxs[_nPhx];
                    if (tT) {
                        this.pLayBloodL.visible = true;
                        this.pLayBloodL.setData(this.tReport.ous[_nHPos].tHeroInfo, _nPhx, tT.trp, _nHPos);
                    }
                }
            } else {
                this.pLayBloodL.visible = false;
            }
        } else {
            if (_nState === 1) {
                if (_nHPos != null && _nPhx != null) {
                    let tT = this.tReport.dus[_nHPos].phxs[_nPhx];
                    if (tT) {
                        this.pLayBloodR.visible = true;
                        this.pLayBloodR.setData(this.tReport.dus[_nHPos].tHeroInfo, _nPhx, tT.trp, _nHPos, this.bIsTLBossReport);
                    }
                }
            } else {
                this.pLayBloodR.visible = false;
            }
        }
    }
    /** 掉血 */
    public onDropBlood(_S:number, _D:number): void {
        if (_S == null || _D == null) return;
        let pLayBlood:FightBlood;
        let pbarBlood:eui.ProgressBar;
        let tUS:any[];
        if (_S === 1) {
            pLayBlood = this.pLayBloodL;
            pbarBlood = this.pbarBloodL;
            tUS = this.tReport.ous;
        } else {
            pLayBlood = this.pLayBloodR;
            pbarBlood = this.pbarBloodR;
            tUS = this.tReport.dus;
        }
        pLayBlood.deductBlood(_D);
        let nHPos = pLayBlood.getHeroPos();
        if (nHPos != null) {
            let tT = tUS[nHPos];
            if (tT) {
                tT.curTrp -= _D;
                pbarBlood.value = Math.ceil(tT.curTrp);
                pbarBlood.maximum = tT.trp;
                if (tT.curTrp === 0) { // 当前武将的方阵死亡
                    let nNHP = nHPos + 1;
                    let tDatas = tUS[nNHP];
                    if (tDatas) {
                        this.setCurHeroInfo(_S, tDatas, nNHP);
                    } else {
                        this.fadeOutItemHeroByDir(_S, true);
                    }
                }
            }
        }
    }
    public setInitCallback(_nCallback:Function): void {
        this.nInitCallback = _nCallback;
    }
    /** 播放技能名字 */
    public showSkill(_S:number, _T):void {
        if (_S === 1) this.pLayBloodL.showSkill(_T);
        else this.pLayBloodR.showSkill(_T);
    }
    /** 设置主公名字 */
    public showKingName(_S:number, _sWho:string): void {
        if (_S === 1) this.sCNameL = _sWho;
        else this.sCNameR = _sWho;
    }
	// ===================== ↑消息监听相关↑ =====================
	// ===================== ↓其他相关↓ =====================
    /** 武将切换动作 */
    private showHeroAction(_S:number, _I:number): void {
        let tList = _S === 1 ? this.tHeroItemsL : this.tHeroItemsR;
        // 判断是否有下一个武将
        let tNH:FightHeroItem = tList[_I];
        if (tNH) {
            tNH.setNameVisible(false);
            let fX = 0;
            let fY = 3;
            if (_S === 1) {
                fX = this.grpHerosL.width - tNH.width * FightLayer._fItemScaleB;
            }
            egret.Tween.get(tNH).to({x:fX, y:fY, scaleX:FightLayer._fItemScaleB, scaleY:FightLayer._fItemScaleB}, 300)
                                .call(()=>{
                                    if (_S === 1) this.tCurHItemL = tNH;
                                    else this.tCurHItemR = tNH;
                                    this.setArrowState();
                                });
        }
        // 全部移动
        let nPI = _I - 1;
        for (let i=0; i<tList.length; i++) {
            if (i !== _I && i !== nPI) {
                let v = tList[i];
                let fX = v.width * FightLayer._fItemScaleA + FightLayer._nItemOffset;
                if (_S === 2) fX = -fX;
                egret.Tween.get(v).to({x:v.x + fX}, 300);
            }
        }
        // 死亡武将消失
        this.fadeOutItemHeroByDir(_S, false);
    }
    /** 武将结束 */
    public fadeOutItemHeroByDir(_S:number, _E:boolean): void {
        let tHI = _S === 1 ? this.tCurHItemL : this.tCurHItemR;
        this.fadeOutCurItemHero(_S, tHI, _E);
    }
    /** 武将消失 */
    public fadeOutCurItemHero(_S:number, _tHI:any, _E:boolean): void {
        if (_tHI == null) return;
        if (!_E) {
            egret.Tween.get(_tHI).to({alpha:0}, 150).to({alpha:1}, 200).call(()=>{
                if (!_E) {
                    if (_S === 1) {
                        let nSize = this.tHeroItemsL.length;
                        _tHI.scaleX = _tHI.scaleY = FightLayer._fItemScaleA;
                        _tHI.x = this.grpHerosL.width 
                            - (nSize - 1) * _tHI.width * _tHI.scaleX 
                            - (nSize - 1) * FightLayer._nItemOffset
                            - _tHI.width * FightLayer._fItemScaleB;
                        _tHI.y = 3;
                    } else {
                        let nSize = this.tHeroItemsR.length;
                        _tHI.scaleX = _tHI.scaleY = FightLayer._fItemScaleA;
                        _tHI.x = (nSize - 2) * _tHI.width * _tHI.scaleX 
                            + (nSize - 1) * FightLayer._nItemOffset
                            + _tHI.width * FightLayer._fItemScaleB;
                        _tHI.y = 3;
                    }
                    _tHI.setNameVisible(true);
                    _tHI.setToGray(true);
                }
            });
        } else {
            _tHI.setToGray(true);
        }
    }
	// ===================== ↑其他相关↑ =====================
}