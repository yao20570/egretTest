class RoleModel extends BaseModel {
    /**角色ID */
    public roleId: number;
    /**角色名字 */
    public roleName: string;
    /**角色性别 */
    public gender: number;
    /**角色世界排行 */
    public rank: number;
    /**角色战力 */
    public score: number;
    /**角色体力 */
    public eg: number;
    /**角色vip等级 */
    public vip: number;
    /**角色vip积分 */
    public vipPoint: number;
    /**注册时间 */
    public regTime: number;
    /**主公经验 */
    public exp: number;
    /**角色等级 */
    public level: number;
    /**角色爵位 */
    public knight: number;
    /**角色战功 */
    public warWork: number;
    /**角色黄金 */
    public gold: number;
    /**恢复下点能量所需时间(秒) */
    public fcd: number;
    /**木材 */
    public wood: number;
    /**粮食 */
    public food: number;
    /**铜钱 */
    public coin: number;
    /**铁矿 */
    public iron: number;
    /**步兵 */
    public it: number;
    /**弓兵 */
    public ac: number;
    /**骑兵 */
    public sw: number;
    /**每天购买体力次数 */
    public ben: number;
    /**月卡剩余次数 */
    public md: number;
    /**已购买VIP礼包 */
    public vb: Array<number>;
    /**人物形象 */
    public ao: ActorVo;
    /**是否已选择国家 0:否 1:是 */
    public cc: number;
    /**弱方国家ID(只有cc字段为0时才有该字段) */
    public wc: number;
    /**奖章 */
    public me: number;
    /**过关斩将积分 */
    public ep: number;
    /**所属国家 */
    public country: number;
    /**主公图像 */
    public iconImg: string;
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller: BaseController) {
        super($controller);
    }

    public initData(roleInfo: any) {
        let body: any = roleInfo.body;
        this.roleId = Number(body.id);
        this.roleName = String(body.n);
        this.gender = Number(body.gr);
        this.regTime = Number(body.ct);
        this.rank = 0;
        this.score = Number(body.s);
        this.exp = Number(body.e);
        this.eg = Number(body.eg);
        this.vip = Number(body.v);
        this.vipPoint = Number(body.vp);
        this.level = Number(body.l);
        this.knight = Number(body.bt);
        this.warWork = Number(body.p);
        this.gold = Number(body.g);
        this.fcd = Number(body.fcd);
        this.wood = Number(body.w);
        this.food = Number(body.f);
        this.coin = Number(body.c);
        this.iron = Number(body.i);
        this.it = Number(body.it);
        this.ac = Number(body.ac);
        this.sw = Number(body.sw);
        this.country = Number(body.ie);
        this.ben = Number(body.ben);
        this.md = Number(body.md);
        this.vb = <Array<number>>body.vb;
        this.ao = <ActorVo>body.ao;
        this.cc = Number(body.cc);
        this.wc = Number(body.wc);
        this.me = Number(body.me);
        this.ep = Number(body.ep);
    }

    /**
    * 判断是否满足资源
    * @param sResStr 配置表的资源消耗字符串(格式:1:200;2:300) =>[[1,200][2,300]]
    * */
    public isResEnough(sResStr: string):boolean {
        let isEnough = true;
        let ary = App.StringUtils.splitMuilt(sResStr, ";", ":");
        for (let v of ary) {
            let resId = v[0];
            let num = v[1];
            isEnough = isEnough && this.getResNum(resId) > num           
        }
        return isEnough;
    }

    /**
     * 根据配置resCfgId获取相对应的资源数量
     * @param resCfgId 
     * @return 
     * */
    public getResNum(resCfgId: number): number {
        switch (resCfgId) {
            /**直接0的没写，用到再补*/
            case Role.Type_Res.energy: return 0;
            case Role.Type_Res.food: return this.food;
            case Role.Type_Res.coin: return this.coin;
            case Role.Type_Res.wood: return this.wood;
            case Role.Type_Res.iron: return this.iron;
            case Role.Type_Res.infantry: return this.it;
            case Role.Type_Res.sowar: return this.sw;
            case Role.Type_Res.archer: return this.ac;
            case Role.Type_Res.person: return 0;
            case Role.Type_Res.money: return this.gold;
            case Role.Type_Res.prestige: return 0;
            case Role.Type_Res.exp: return 0;
            case Role.Type_Res.vipdot: return 0;
            case Role.Type_Res.luckypoint: return 0;
            case Role.Type_Res.medal: return this.me
            case Role.Type_Res.killheroexp: return 0;;
            case Role.Type_Res.royalscore: return 0;;
            case Role.Type_Res.countrycoin: return 0;;
        }
    }

}

class ActorVo {
    public i: string;//当前头像
    public b: string;//当前头像框
    public t: string;//当前称号
    public ik: Array<LockAdornVo>;//当前解锁的头像
    public bk: Array<LockAdornVo>;//当前解锁的头像框
    public tk: Array<LockAdornVo>;//当前解锁的称号
}

/**解锁的头像装饰 */
class LockAdornVo {
    public id: string;//ID
    public cd: number;//失效倒计时,-1代表永久
}