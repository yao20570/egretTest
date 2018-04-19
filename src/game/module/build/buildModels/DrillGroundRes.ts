/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 14:28:46 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-08 10:02:42
 */
module build{
    /**
     * 统帅府
    */
    export class DrillGroundRes{
        /** 采集队列数 */
        public cq:number;
        /** 城防队列数 */
        public dq:number;
        /** 高级御兵术 */
        public tq:Array<build.TroopsVO>;
        /** 当前高级御兵术阶段 */
        public stage:number;
        /** vip恢复次数 */
        public vc:number;
        /** 高级御兵术cd时间 */
        public cd:number;
        /** 暴击率 */
        public rate:number;
        /** 是否开启自动补耐久 0不开启 1开启 */
        public of:number;
        /** 下一次耐力恢复倒计时 */
        public scd:number;
        /** 建筑id */
        public id:number;
        /** 建筑等级 */
        public lv:number;
        /** 位置 */
        public loc:number;
        
        // 字段名	类型	说明
        // cq	Integer	采集队列数
        // dq	Integer	城防队列数
        // tq	List<build.TroopsVO>	高级御兵术
        // stage	Integer	当前高级御兵术阶段
        // vc	Integer	vip恢复次数
        // cd	Long	高级御兵术cd时间
        // rate	Integer	暴击率
        // of	Integer	是否开启自动补耐久 0不开启 1开启
        // scd	Long	下一次耐力恢复倒计时
        // id	Integer	建筑id
        // lv	Integer	建筑等级
        // loc	Integer	位置
    }

}

module build{
    /**
     * 高级御兵术
    */
    export class TroopsVO{

        /** 队列类型 */
        public type:number;
        /** 等级 */
        public lv:number;
        /** 进度 */
        public pg:number;
        /** 阶段 */
        public sec:number;

        // 字段名	类型	说明
        // type	Integer	队列类型
        // lv	Integer	等级
        // pg	Integer	进度
        // sec	Integer	阶段

    }
}