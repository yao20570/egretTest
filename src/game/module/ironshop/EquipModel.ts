/**
 * 建筑数据
 * @author wenzongyao
 * @time  2018/4/8
*/
class EquipModel extends BaseModel {


    public orc: number;

    /**当前打造的信息*/
    private _curProduceInfo: ProduceVo;


    private tEquipsInIronShop: any = {};

    public constructor($controller: BaseController) {
        super($controller);
    }
    /**
     * 初始化数据
     * @param  {any} buildInfo
     */
    public initData(buildInfo: any) {
        let body: any = buildInfo.body;

        this.createEquipVos(body.es)	/**所有装备数据*/
        // self.nCapacity = tData.c	--int	装备容量
        // self.nBoughtCount = tData.b	--int	装备容量购买次数
        // self:setFreeTrain(tData.ft)	--Integer	免费洗炼次数
        // self:setFreeTrainCd(tData.cd) --Long	免费洗炼恢复次数CD时间
        // self:setSmithId(tData.si)	--Integer	雇佣的铁匠ID
        // self:setSmithRemainCd(tData.sw)--Long	雇佣的铁匠工作剩余时间
        this.setProduceData(body.m)	/**装备打造*/
    }

    private tEquipVos: any
    public createEquipVos(_tData: any): void {

    }

    /**
	 * 获取打造显示的装备数据
	 * */
    public getEquipsInIronShop($nQuality: number): any {
        if (!this.tEquipsInIronShop[$nQuality]) {
            let tRes = new Array<any>();
            let tEquipDatas = ConfigDb.equipConfig.getEquipsDataByQuality($nQuality);
            for (let v of tEquipDatas) {
                if (v.bIsShow) {
                    tRes.push(v)
                }
            }
            this.tEquipsInIronShop[$nQuality] = tRes;
        }
        return this.tEquipsInIronShop[$nQuality]
    }

    /**
     * 获取当前装备打造的装备信息
     * @return 没有打造则返回null
    */
    public getCurProduceEquip(): ProduceVo {
        return this._curProduceInfo;
    }

    /**
     * 获取当前装备打造的id(配表Id)
     * @return 没有打造则返回null
    */
    public getCurProduceEquipId(): number {
        if (this._curProduceInfo) {
            return this._curProduceInfo.id
        }
        return null
    }
    
    /**打造装备*/
    public onReqEquipMake( tData ){
        if (!tData){
            return;
        }	
	    this.setProduceData(tData.m)	
    }
	

    /**设置打造信息*/
    public setProduceData(tData):void{
        if (!tData){
            return
        }
        if (this._curProduceInfo) {
            this._curProduceInfo.updateData(tData)
        } else {
            this._curProduceInfo = new ProduceVo(tData);
        }		
    }

    /**
     * 获取当前第一个上锁的品质
     * @return index(开始锁的品质)|null(没有锁)
     * */
    public getFirstLockQuailty(): number {
        let roleModel = <RoleModel>App.ControllerManager.getControllerModel(ControllerConst.Role);
        let roleLv = roleModel.level;
        let nQualityMax = ConfigDb.equipConfig.getEquipQualityMax()

        for (let i = 1; i <= nQualityMax; ++i) {
            let tEquipDatas = ConfigDb.equipConfig.getEquipsInSmith(i)
            for (let v of tEquipDatas) {
                if (roleLv < v.makelv) {
                    return i;
                }
            }
        }
        return null
    }

}
