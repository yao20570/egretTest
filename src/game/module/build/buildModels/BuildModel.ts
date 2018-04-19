/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-04 10:05:37 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 15:36:19
 */
/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-04 10:05:32 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-04-04 10:05:32 
 */
/**
 * 建筑数据
 * @author lxn
 * @time  2018/4/03
*/
class BuildModel extends BaseModel{

    /** 购买建筑升级队列失效时间 */
    public bqt:number;
    /** 购买建筑升级队列次数 */
    public m:number;
    /** 自动升级队列次数 */
    public atm:number;
    /** 建筑操作队列 */
    public bqqs:Array<build.BuildQueueRes>;
    /** 自动升级开关 */
    public openAuto:boolean;
    /** 自动招募城墙守卫次数 */
    public arm:number;
    /** 王宫建筑 */
    public palace:build.PalaceRes;
    /** 步兵营 */
    public infantry:build.CampRes;
    /** 骑兵营 */
    public sowar:build.CampRes;
    /** 弓兵营 */
    public archer:build.CampRes;
    /** 募兵府 */
    public recruting:build.RecruitingCampRes;
    /** 仓库 */
    public store:build.StoreHouseRes;
    /** 科技建筑信息 */
    public tnoly:build.TechnologyRes;
    /** 作坊 */
    public atelier:build.AtelierRes;
    /** 城门 */
    public gate:build.GateRes;
    /** 统帅府 */
    public drillGround:build.DrillGroundRes;
    /** 资源建筑 */
    public rbuild:Array<build.ResourceBuildRes>;
    /** 是否开启购买建筑队列 0.未开启 1.开启 */
    public ob:number;
    /** 不可升级建筑 */
    public ub:Array<number>;
    /** 未激活资源建筑 */
    public unActb:Array<build.UnActivateBuildRes>;
    /** 征收时间 */
    public cul:number;
    /** 自动建造信息 */
    public abu:build.AutoBuildUpgradeRes;
    /** 今天打包木头的次数 */
    public pw:number;
    /** 今天打包银币的次数 */
    public pc:number;
    /** 今天打包粮食的次数 */
    public pf:number;
    /** 募兵府是否解锁 1可以解锁0不可以 */
    public orc:number;

    public constructor($controller: BaseController) {
        super($controller);
    }
    /**
     * 初始化数据
     * @param  {any} buildInfo
     */
    public initData(buildInfo:any){
        let body:any = buildInfo.body;
        this.bqt = <number>body.bqt;
        this.m   = <number>body.m;
        this.atm = <number>body.atm;
        this.bqqs = <Array<build.BuildQueueRes>>body.bqqs;
        this.openAuto = <boolean>body.openAuto;
        this.arm = <number>body.arm;
        this.palace = <build.PalaceRes>body.palace;
        this.infantry = <build.CampRes>body.infantry;
        this.sowar = <build.CampRes>body.sowar;
        this.archer = <build.CampRes>body.archer;
        this.recruting = <build.RecruitingCampRes>body.recruting;
        this.store = <build.StoreHouseRes>body.store;
        this.tnoly = <build.TechnologyRes>body.tnoly;
        this.atelier = <build.AtelierRes>body.atelier;
        this.gate = <build.GateRes>body.gate;
        this.drillGround = <build.DrillGroundRes>body.drillGround;
        this.rbuild = <Array<build.ResourceBuildRes>>body.rbuild;
        this.ob = <number>body.ob;
        this.ub = <Array<number>>body.ub;
        this.unActb = <Array<build.UnActivateBuildRes>>body.unActb;
        this.cul = <number>body.cul;
        this.abu = <build.AutoBuildUpgradeRes>body.abu;
        this.pw  = <number>body.pw;
        this.pc  = <number>body.pc;
        this.pf  = <number>body.pf;
        this.orc = <number>body.orc;
    }

}

module build{
    /**
     * 资源建筑
    */
    export class ResourceBuildRes{
        /** 建筑id */
        public id:number;
        /** 建筑等级 */
        public lv:number;
        /** 位置 */
        public loc:number;
    }
}
module build{
    /**
     * 未激活建筑
    */
    export class UnActivateBuildRes{
        /** 图纸碎片 */
        public ds:number;
        /** 建筑id */
        public id:number;
        /** 建筑等级 */
        public lv:number;
        /** 位置 */
        public loc:number;
       
        // 字段名	类型	说明
        // ds	int	图纸碎片
        // id	Integer	建筑id
        // lv	Integer	建筑等级
        // loc	Integer	位置

    }
}

module build{
    /**
     * 自动建造信息
    */
    export class AutoBuildUpgradeRes{
        /** 自动建造的方式 0默认功能建筑 1资源建筑优先 2自定义 */
        public abt:number;
        /** 是否开启低等级优先自动升级 0为开启,1为不开启 */
        public lp:number;


        /** 不参与自动建筑的建筑id */
        public nbi:Array<number>;
        
     
        // 字段名	类型	说明
        // abt	Integer	自动建造的方式 0默认功能建筑 1资源建筑优先 2自定义
        // lp	Integer	是否开启低等级优先自动升级 0为开启,1为不开启
        // udp	List<Pair<Integer,Integer>>	自定义优先级 k-id,v-优先级
        // nbi	Set<Integer>	不参与自动建筑的建筑id
    }
}