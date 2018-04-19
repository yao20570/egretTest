/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 14:11:00 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-08 09:53:24
 */
module build{
    /** 
     * 工坊数据
     */
    export class AtelierRes{
        /** 购买生产队列数  */
        public bq:number;
        /** 队列数量 */
        public q:number;
        /** 生产队列 */
        public pros:Array<build.AtelierProduceRes>;
        /** 等待队列 */
        public wpros:Array<build.AtelierProduceRes>;
        /** 生产完成队列 */
        public fpros:Array<build.AtelierProduceRes>;
        /** 离线生产队列数 */
        public oq:number;
        /** 建筑id */
        public id:number;
        /** 建筑等级 */
        public lv:number;
        /** 位置 */
        public loc:number;

        // 字段名	类型	说明
        // bq	Integer	购买生产队列数
        // q	Integer	队列数量
        // pros	List<build.AtelierProduceRes>	生产队列
        // wpros	List<build.AtelierProduceRes>	等待队列
        // fpros	List<build.AtelierProduceRes>	生产完成队列
        // oq	Integer	离线生产队列数
        // id	Integer	建筑id
        // lv	Integer	建筑等级
        // loc	Integer	位置

    }

}

module build{
    /**
     * 工坊生产
     */
    export class AtelierProduceRes{
        /** 队列ID */
        public proId:number;
        /** 材料类型 */
        public type:number;
        /** 倒计时 */
        public cd:number;
        /** 生产总时间 */
        public nd:number;
        /** 进度 */
        public ps;
        /** 生产物品 */
        // gs	Pair<Integer,Long>	生产物品
        // 字段名	类型	说明
        // proId	Integer	队列ID
        // type	Integer	材料类型
        // cd	Integer	倒计时
        // nd	Integer	生产总时间
        // ps	Float	进度
        // gs	Pair<Integer,Long>	生产物品
    }
}

