/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 10:55:43 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 11:41:45
 */

module build {
    /**
     * 建筑队列
     */
     export   class BuildQueueRes{
            /** 倒计时 */
            public cd:number;
            /** 免费加速 1.未加速 0.已加速 */
            public rss:number;
            /** 建筑位置 */
            public loc:number;
            /** 需要的总时间*/
            public nd:number;
            /** 指令 1.建筑升级 2.建筑拆除 3.建筑创建 */
            public od:number;
            /** 建筑队列序号 1.默认队列 2.购买队列 */
            public bd:number;
            /** 是否请求协助 1是0否 */
            public rh:number;
        }
}