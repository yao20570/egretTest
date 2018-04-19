/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 14:22:40 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 14:26:10
 */
module build{
    /**
     * 城门
     */
    export class GateRes{
        
        // 字段名	类型	说明
        // gcd	Integer	招募CD
        // ds	List<build.DefendRes>	城墙守卫
        // s	Integer	自动招募守卫开关 0.关闭 1.开启
        // sq	List<Integer>	城墙武将顺序
        // dq	List<Integer>	城防顺序
        // id	Integer	建筑id
        // lv	Integer	建筑等级
        // loc	Integer	位置

    }

}

module build{
    /**
     * 城墙守卫
    */
    export class DefendRes{

        
        // 字段名	类型	说明
        // id	String	守卫ID
        // mid	Integer	守卫NPC怪物ID
        // lv	Integer	等级
        // max	Integer	最高带兵量
        // tp	Integer	带兵量
        // q	Integer	品质
        // ct	Integer	剩余提升次数
    }

}