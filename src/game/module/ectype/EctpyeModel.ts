class EctpyeModel extends BaseModel {
    private ectpyeModel: EctpyeModel;
    /** 副本加载数据 */
    public replayData:Array<dragon.ChapterVo>;
    /** 副本加载章节数据 */
    public sectionData:Array<dragon.OutpostVo>;
    /** 副本扫荡关卡数据 */
    public sweepData: {
        awards: any,//副本奖励
        heroExps: {
            h: number,//武将ID
            i: number,//武将等级
            e: number,//升级前经验
            a: number,//增加经验
            z: number,//升级后经验
            fl: number,//最终等级
            hs: {
                t: number,//英雄模板Id
                ig: number,//武将是否神级进阶 0否 1是
            }
        }[],//武将经验获得
        aae: {
            e: number,//增加的经验
            be: number,//之前的经验
            ae: number,//之后的经验
            bl: number,//之前的等级
            al: number,//之后的等级
        },//主公经验获得
        filed: number,//掉落资源田碎片对应的建筑位置
        filedN: number,//掉落资源田碎片数量
        arft: number,//掉落神碎片Id
        arftN: number,//掉落神兵碎片数量
    }
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller: BaseController) {
        super($controller);
    }

    public initData(replayData: any) {
        let chapters: Array<any> = replayData.body.chapters;
        chapters.sort(function (a, b) {
                return a.id - b.id; //按章节从小到大排序
            });
        this.replayData= chapters;
    }

    public initSectionData(sectionData: any) {
        let outposts: Array<any> = sectionData.body.outposts;
        this.sectionData= outposts;
    }
    public updataSectionData(sectionData: any) {
        let outposts: Array<any> = sectionData.body.o.outposts;
        this.sectionData= outposts;
    }

}