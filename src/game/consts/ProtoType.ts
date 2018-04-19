/**
 * 协议类型,常用成对的正负数表示<br>
 * 一般客户端请求为正数,如XXX_REQ:number(请求)<br>
 * 服务器下发为负数XXX_RES:string(响应),XXX_PUSH(推送)<br>
 * 建议命名方式: 需要操作的数据类+动作+类型, 如 AVATAR_CREATE_REQ:number表示角色创建请求<br>
 * <strong>注意:请按照顺序编写消息号<strong>
 * 
 * @author yaowenhao
 * @since 2014年7月15日 下午2:47:17
 */
class ProtoType {
	/** 下线 (内部已用) */
	public static  ACCOUNT_LOGOUT_REQ:number = 101;
	public static ACCOUNT_LOGOUT_RES:string = "-101";
	/** 登陆 (内部已用) */
	public static  ACCOUNT_LOGIN_REQ:number = 102;
	public static  ACCOUNT_LOGIN_RES:string = "-102";

	/*********************** 角色相关的协议 2000"-2099"" **************************/
	/** 加载Avatar */
	public static  AVATAR_LOAD_REQ:number = 2001;
	public static  AVATAR_LOAD_RES:string = "-2001";
	/** 购买体力 */
	public static AVATAR_ENERGYRECV_REQ:number = 2002;
	public static AVATAR_ENERGYRECV_RES:string = "-2002";
	/** 角色属性更新推送 */
	public static AVATAR_UPDATE_PUSH = "-2003";
	/** 角色更改名称或性别 */
	public static AVATAR_RENAME_REQ:number = 2004;
	public static AVATAR_RENAME_RES:string = "-2004";
	/** 充值推送 */
	public static AVATAR_RECHARGE_PUSH = "-2005";
	/** 请求能量恢复 */
	public static AVATAR_BUYENERGY_REQ:number = 2007;
	public static AVATAR_BUYENERGY_RES:string = "-2007";
	/** 购买VIP礼包 */
	public static AVATAR_BUYVIPGIFTBAG_REQ:number = 2008;
	public static AVATAR_BUYVIPGIFTBAG_RES:string = "-2008";
	/** 改变人物形象 */
	public static AVATAR_CHANGEACTOR_REQ:number = 2009;
	public static AVATAR_CHANGEACTOR_RES:string = "-2009";
	/** 加载播放过界面的数据 */
	public static AVATAR_LOADPLAYRECORD_REQ:number = 2010;
	public static AVATAR_LOADPLAYRECORD_RES:string = "-2010";
	/** 记录播放过界面的数据 */
	public static AVATAR_ADDPLAYRECORD_REQ:number = 2011;
	public static AVATAR_ADDPLAYRECORD_RES:string = "-2011";
	/** 刷新头像的数据 */
	public static AVATAR_REFRESH_ACTOR_REQ:number = 2012;
	public static AVATAR_REFRESH_ACTOR_RES:string = "-2012";
	/** 查看玩家战力评分 */
	public static AVATAR_SCORE_GRADE_REQ:number = 2013;
	public static AVATAR_SCORE_GRADE_RES:string = "-2013";
	/** 对比玩家战力评分 */
	public static AVATAR_COMPARE_GRADE_REQ:number = 2014;
	public static AVATAR_COMPARE_GRADE_RES:string = "-2014";
	/********************* 建筑相关协议2100"-2199"" ******************************/
	/** 建筑数据更新推送 */
	public static BUILD_DATAUPDATE_PUSH = "-2100";
	/** 建筑升级请求 */
	public static BUILD_LV_UP_REQ:number = 2101;
	public static BUILD_LV_UP_RES:string = "-2101";
	/** 建筑队列更新推送 */
	public static BUILD_QUEUE_UPDATE_PUSH = "-2102";
	/** 建筑队列加速请求 */
	public static BUILD_QUEUE_SPEED_REQ:number = 2103;
	public static BUILD_QUEUE_SPEEDUP_RES:string = "-2103";
	/** 开启(关闭)自动升级 */
	public static BUILD_OPEN_AUOTLVUP_REQ:number = 2104;
	public static BUILD_OPEN_AUOTLVUP_RES:string = "-2104";
	/** 购买建筑队列 */
	public static BULD_QUEUE_BUY_REQ:number = 2106;
	public static BULD_QUEUE_BUY_RES:string = "-2106";
	/** 仓库保护资源更新 */
	public static BUILD_STOREHOUSE_UPDATE_PUSH = "-2107";
	/** 征收资源 */
	public static BUILD_RESOURCE_LEVY_REQ:number = 2108;
	public static BUILD_RESOURCE_LEVY_RES:string = "-2108";
	/** 加载资源 */
	public static BUILD_LOADRESOURCE_REQ:number = 2109;
	public static BUILD_LOADRESOURCE_RES:string = "-2109";
	/** 资源产量更新推送 */
	public static BUILD_RESOUCE_PRODUCT_PUSH = "-2110";
	/** 雇佣文官 */
	public static BUILD_EMPOFFICAL_REQ:number = 2111;
	public static BUILD_EMPOFFICAL_RES:string = "-2111";
	/** 招募士兵 */
	public static BUILD_RECRUIT_REQ:number = 2112;
	public static BUILD_RECRUIT_RES:string = "-2112";
	/** 募兵操作 */
	public static BUILD_RECRUITOPERATE_REQ:number = 2113;
	public static BUILD_RECRUITOPERATE_RES:string = "-2113";
	/** 兵营调整 */
	public static BUILD_CAMPADJUSET_REQ:number = 2114;
	public static BUILD_CAMPADJUSET_RES:string = "-2114";
	/** 文官雇佣时间刷新 */
	public static BUILD_REFRESHOFFICER_REQ:number = 2115;
	public static BUILD_REFRESHOFFICER_RES:string = "-2115";
	/** 作坊生产队列添加 */
	public static BUILD_ATELIER_PRODUCT_REQ:number = 2116;
	public static BUILD_ATELIER_PRODUCT_RES:string = "-2116";
	/** 购买作坊生产队列 */
	public static BUILD_ATELIER_BUYQUQUE_REQ:number = 2118;
	public static BUILD_ATELIER_BUYQUQUE_RES:string = "-2118";
	/** 加载所有建筑信息 */
	public static BUILD_LOAD_REQ:number = 2119;
	public static BUILD_LOAD_RES:string = "-2119";
	/** 招募士兵完成推送 */
	public static BUILD_RECRUITOK_PUSH = "-2120";
	/** 工坊领取奖励 */
	public static BUILD_ATELIER_GETAWARD_REQ:number = 2121;
	public static BUILD_ATELIER_GETAWARD_RES:string = "-2121";
	/** 城墙招募守卫 */
	public static BUILD_RECRUIT_DEFEND_REQ:number = 2122;
	public static BUILD_RECRUIT_DEFEND_RES:string = "-2122";
	/** 城墙守卫操作 */
	public static BUILD_DEFEND_OPERATE_REQ:number = 2123;
	public static BUILD_DEFEND_OPERATE_RES:string = "-2123";
	/** 工坊生产完成推送 */
	public static BUILD_ATELIER_PRODUCEOK_PUSH = "-2124";
	/** 城墙自动招募守卫推送 */
	public static BUILD_AUTORECRUIT_DEFEND_PUSH = "-2125";
	/** 城墙自动招募守卫开关 */
	public static BUILD_OPENAUTORECRUIT_DEFEND_REQ:number = 2126;
	public static BUILD_OPENAUTORECRUIT_DEFEND_RES:string = "-2126";
	/** 城墙操作 */
	public static BUILD_GATE_OPERATE_REQ:number = 2127;
	public static BUILD_GATE_OPERATE_RES:string = "-2127";
	/** 建筑解锁推送 */
	public static BUILD_UNLOCK_PUSH = "-2128";
	/** 兵营招募队列更新推送 */
	public static BUILD_CAMP_RECRUIT_UPDATE_PUSH = "-2129";
	/** 建筑移除推送 */
	public static BUILD_REMOVE_PUSH = "-2130";
	/** 建筑改造 */
	public static BUILD_REMOULD_REQ:number = 2131;
	public static BUILD_REMOULD_RES:string = "-2131";
	/** 城墙守卫损兵更新推送 */
	public static BUILD_GATE_DEFEND_UPDATE_PUSH = "-2132";
	/** 工坊生产材料消耗时间 */
	public static BUILD_ATELIER_PRODUCE_TIME_REQ:number = 2133;
	public static BUILD_ATELIER_PRODUCE_TIME_RES:string = "-2133";
	/** 建筑队列倒计时检测 */
	public static BUILD_QUEUE_CHECK_REQ:number = 2134;
	public static BUILD_QUEUE_CHECK_RES:string = "-2134";
	/** 工坊队列倒计时检测 */
	public static BUILD_ATELIERQUEUE_CHECK_REQ:number = 2135;
	public static BUILD_ATELIERQUEUE_CHECK_RES:string = "-2135";
	/** 工坊黄金加速完成 */
	public static BUILD_ATELIERSPEED_REQ:number = 2136;
	public static BUILD_ATELIERSPEED_RES:string = "-2136";
	/** 建筑队列加速推送 */
	public static BUILD_QUEUE_SPEED_PUSH = "-2137";
	/** 统帅府队列扩展操作 */
	public static BUILD_INCREASE_ARMY_QUEUE_REQ:number = 2138;
	public static BUILD_INCREASE_ARMY_QUEUE_RES:string = "-2138";
	/** 武将加入统帅府队列 */
	public static BUILD_UP_HERO_QUEUE_REQ:number = 2139;
	public static BUILD_UP_HERO_QUEUE_RES:string = "-2139";
	/** 激活高级御兵术 */
	public static BUILD_ACTIVATE_TROOP_REQ:number = 2140;
	public static BUILD_ACTIVATE_TROOP_RES:string = "-2140";
	/** 统帅府队列更新推送 */
	public static BUILD_INCREASE_ARMY_QUEUE_PUSH = "-2141";
	/** 是否开启自动补兵 */
	public static BUILD_OPEN_AUTO_FILL_REQ:number = 2142;
	public static BUILD_OPEN_AUTO_FILL_RES:string = "-2142";
	/** 募兵府创建 */
	public static BUILD_CREATE_RECRUIT_REQ:number = 2143;
	public static BUILD_CREATE_RECRUIT_RES:string = "-2143";
	/** 工坊道具加速 */
	public static BUILD_ATELIER_PRO_SPEEDITEM_REQ:number = 2144;
	public static BUILD_ATELIER_PRO_SPEEDITEM_RES:string = "-2144";
	/** 设置是否低等级优先升级 */
	public static BUILD_SET_LVPRECEDENCE_REQ:number = 2145;
	public static BUILD_SET_LVPRECEDENCE_RES:string = "-2145";
	/** 设置自动建造的类型 */
	public static BUILD_SET_AUTOBUILDTYPE_REQ:number = 2146;
	public static BUILD_SET_AUTOBUILDTYPE_RES:string = "-2146";
	/** 设置自定义自动建造优先级 */
	public static BUILD_SET_USERDEFINE_PRIORITY_REQ:number = 2147;
	public static BUILD_SET_USERDEFINE_PRIORITY_RES:string = "-2147";
	/** 设置建筑是否开启自动建造 */
	public static BUILD_SET_BUILD_AUTO_UPDATE_REQ:number = 2148;
	public static BUILD_SET_BUILD_AUTO_UPDATE_RES:string = "-2148";
	/********************* 活动相关协议 2200"-2299"" ***********************************/
	/** 加载运营活动数据 */
	public static ACTIVITY_LOADOPERATE_REQ:number = 2201;
	public static ACTIVITY_LOADOPERATE_RES:string = "-2201";
	/** 运营活动开启推送 */
	public static ACTIVITY_START_PUSH = "-2202";
	/** 运营活动关闭推送 */
	public static ACTIVITY_END_PUSH = "-2203";
	/** 运营活动移除推送 */
	public static ACTIVITY_REMOVE_PUSH = "-2204";
	/** 定点重置推送 */
	public static ACTIVITY_RESET_PUSH = "-2205";
	/** 兑换CD码 */
	public static CDKEY_REQ:number = 2206;
	public static CDKEY_RES:string = "-2206";
	/** 运营活动数据刷新推送 */
	public static ACTIVITY_REFRESH_PUSH = "-2207";

	/********************* 物品相关协议 2300"-2350"" ***********************************/
	/** 加载背包数据 */
	public static ITEM_LOAD_DATA_REQ:number = 2300;
	public static ITEM_LOAD_DATA_RES:string = "-2300";
	/** 物品数据更新 */
	public static ITEM_UPDATE_PUSH = "-2301";
	/** 背包物品使用 */
	public static ITEM_BACKPACK_USE_REQ:number = 2302;
	public static ITEM_BACKPACK_USE_RES:string = "-2302";
	/** 购买装备容量 */
	public static ITEM_EQUIPCAPA_BUY_REQ:number = 2303;
	public static ITEM_EQUIPCAPA_BUY_RES:string = "-2303";
	/** 改名卡使用 */
	public static ITEM_USE_RENAME_REQ:number = 2304;
	public static ITEM_USE_RENAME_RES:string = "-2304";
	/** 物品今天重置推送 */
	public static ITEM_RESET_PUSH = "-2305";
	/** 物品今天使用次数更新推送 */
	public static TODAY_USED_UPDATE_PUSH = "-2306";
	/********************* 世界相关协议 3000"-3050"" ***********************************/
	/** 加载城市 */
	public static LOADCITY_REQ:number = 3000;
	public static LOADCITY_RES:string = "-3000";
	/** 城市搬迁 */
	public static CITY_MIGRATE_REQ:number = 3001;
	public static CITY_MIGRATE_RES:string = "-3001";
	/** 创建世界任务 */
	public static CITY_CREATETASK_REQ:number = 3002;
	public static CITY_CREATETASK_RES:string = "-3002";
	/** 输入任务指令 */
	public static TASK_INPUTORDER_REQ:number = 3003;
	public static TASK_INPUTORDER_RES:string = "-3003";
	/** 侦查 */
	public static SCOUT_REQ:number = 3004;
	public static SCOUT_RES:string = "-3004";
	/** 开始在世界移动数据推送 */
	public static MOVE_PUSH = "-3005";
	/** 任务状态变更推送 */
	public static SWICHSTATE_PUSH = "-3006";
	/** 视图点消失推送 */
	public static DISAPPEARDOT_PUSH = "-3007";
	/** 搜索周围视图点 */
	public static ARROUNDDOT_REQ:number = 3008;
	public static ARROUNDDOT_RES:string = "-3008";
	/** 加载区域块内的城市分布点 */
	public static LOADBLOCK_REQ:number = 3009;
	public static LOADBLOCK_RES:string = "-3009";
	/** 发起国战 */
	public static OPEN_COUNTRYWAR_REQ:number = 3010;
	public static OPEN_COUNTRYWAR_RES:string = "-3010";
	/** 加载城战信息 */
	public static LOAD_CITYWAR_REQ:number = 3011;
	public static LOAD_CITYWAR_RES:string = "-3011";
	/** 加载城池国战信息 */
	public static LOAD_COUNTRY_REQ:number = 3012;
	public static LOAD_COUNTRY_RES:string = "-3012";
	/** 查看协防 */
	public static LOAD_HELP_REQ:number = 3013;
	public static LOAD_HELP_RES:string = "-3013";
	/** 区域内发生国战推送 */
	public static COUNTRYWAR_OVERVIEW = "-3014";
	/** 城池被占领推送 */
	public static OCCITY_PUSH = "-3015";
	/** 加载我国国战列表 */
	public static LOAD_COUNTRYWARLIST_REQ:number = 3016;
	public static LOAD_COUNTRYWARLIST_RES:string = "-3016";
	/** 征收图纸 */
	public static COLLECT_PAPER_REQ:number = 3017;
	public static COLLECT_PAPER_RES:string = "-3017";
	/** 申请城主 */
	public static APPLY_CITYLEADER_REQ:number = 3018;
	public static APPLY_CITYLEADER_RES:string = "-3018";
	/** 任务移除推送 */
	public static REMOVETASK_PUSH = "-3019";
	/** 视图点数据变化推送 */
	public static VIEWDOT_PUSH = "-3020";
	/** 发生国战数据推送 */
	public static COUNTRYWAR_PUSH = "-3021";
	/** 关闭国战推送 */
	public static END_COUNTRYWAR_PUSH = "-3022";
	/** 城战提醒推送 */
	public static CITYWAR_NOTICE_PUSH = "-3023";
	/** 加载城主候选人 */
	public static LOAD_CANDIDATE_REQ:number = 3024;
	public static LOAD_CANDIDATE_RES:string = "-3024";
	/** 遣返友军驻防 */
	public static BACK_GARRISON_REQ:number = 3025;
	public static BACK_GARRISON_RES:string = "-3025";
	/** 季节变化推送 */
	public static SEASON_CHANGE_PUSH = "-3026";
	/** 发起召唤 */
	public static CALL_REQ:number = 3027;
	public static CALL_RES:string = "-3027";
	/** 响应召唤 */
	public static BECALL_REQ:number = 3028;
	public static BECALL_RES:string = "-3028";
	/** 查看召唤信息 */
	public static CALLINFO_REQ:number = 3029;
	public static CALLINFO_RES:string = "-3029";
	/** 城主卸任 */
	public static RETIRE_REQ:number = 3030;
	public static RETIRE_RES:string = "-3030";
	/** 驻防数据刷新推送 */
	public static GARRISON_REFRESH_PUSH = "-3031";
	/** 更新城防 */
	public static UPDATE_CITYDEF_REQ:number = 3032;
	public static UPDATE_CITYDEF_RES:string = "-3032";
	/** 修改名城/都城名字 */
	public static MODIFY_CITYNAME_REQ:number = 3033;
	public static MODIFY_CITYNAME_RES:string = "-3033";
	/** 列出所有区域中心城占领信息 */
	public static LIST_MAINCITYOC_REQ:number = 3034;
	public static LIST_MAINCITYOC_RES:string = "-3034";
	/** 区域中心城推送 */
	public static MAINCITYOC_PUSH = "-3035";
	/** 最大乱军等级推送 */
	public static MAX_REBELLV_PUSH = "-3036";
	/** 被迁城推送 */
	public static BEMIGRATE_PUSH = "-3037";
	/** 领取一血图纸 */
	public static GETFB_PAPER_REQ:number = 3038;
	public static GETFB_PAPER_RES:string = "-3038";
	/** 城战请求支援 */
	public static CASTLEWAR_SOS_REQ:number = 3039;
	public static CASTLEWAR_SOS_RES:string = "-3039";
	/** 领取世界目标奖励 */
	public static WORLDTARGET_GETAWARD_REQ:number = 3040;
	public static WORLDTARGET_GETAWARD_RES:string = "-3040";
	/** 消耗低迁迁城到指定区域 */
	public static LOWMIGRATE2BI_REQ:number = 3041;
	public static LOWMIGRATE2BI_RES:string = "-3041";
	/** 世界目标数据变化推送 */
	public static WORLDTARGET_PUSH = "-3042";
	/** 重建物资推送 */
	public static REBUILDITEM_PUSH = "-3043";
	/** 击打世界boss */
	public static ACK_BOSS_REQ:number = 3044;
	public static ACK_BOSS_RES:string = "-3044";
	/** 不能打的都城推送 */
	public static CANNOT_ACK_DUCHENG = "-3045";
	/** 重发召唤公告 */
	public static RESEND_CALLNOTICE_REQ:number = 3046;
	public static RESEND_CALLNOTICE_RES:string = "-3046";
	/** 世界数据刷新推送 */
	public static WORLD_DATAREFRESH_PUSH = "-3047";
	/** 城战推送 */
	public static CASTLEWAR_PUSH = "-3048";
	/** 加载正在赶往的友军帮助列表 */
	public static LOAD_COMINGHELP_REQ:number = 3049;
	public static LOAD_COMINGHELP_RES:string = "-3049";
	/** 正在赶往的友军帮助推送 */
	public static COMINGHELP_PUSH = "-3050";
	/********************* 世界相关协议 3500"-3550"" ***********************************/
	/** 该点有乱军战斗推送 */
	public static REBEL_FIGHT_PUSH = "-3500";
	/** 出征任务获得推送 */
	public static WORLDTASK_OB_PUSH = "-3501";
	/** 加载城池首杀数据 */
	public static LOAD_CFB_REQ:number = 3502;
	public static LOAD_CFB_RES:string = "-3502";
	/** 城池首杀数据推送 */
	public static CFB_PUSH = "-3503";
	/** 目标搜索 */
	public static SEARCH_REQ:number = 3504;
	public static SEARCH_RES:string = "-3504";
	/** 免费迁去州 */
	public static MIGRATE2ZHOU_REQ:number = 3505;
	public static MIGRATE2ZHOU_RES:string = "-3505";
	/** 国战SOS */
	public static COUNTRYSOS_REQ:number = 3506;
	public static COUNTRYSOS_RES:string = "-3506";
	/** 搜索最近可进攻最高等级乱军 */
	public static SEARCH_NEARREBLE_REQ:number = 3507;
	public static SEARCH_NEARREBLE_RES:string = "-3507";
	/** 手动生成一个任务乱军 */
	public static REFRESH_REBEL_REQ:number = 3508;
	public static REFRESH_REBEL_RES:string = "-3508";

	/********************* 冥界入侵协议 3600"-3630"" ***********************************/
	/** 兑换属性 */
	public static EXECHANGE_ATTR_REQ:number = 3600;
	public static EXECHANGE_ATTR_RES:string = "-3600";
	/** 积分兑换商店 */
	public static EXECHANGE_POINT_REQ:number = 3601;
	public static EXECHANGE_POINT_RES:string = "-3601";

	/********************* 邮件相关 3051"-3080"" *******************************/
	/** 加载邮件 */
	public static LOAD_MAIL_REQ:number = 3051;
	public static LOAD_MAIL_RES:string = "-3051";
	/** 将邮件设置为已读状态 */
	public static READ_MAIL_REQ:number = 3052;
	public static READ_MAIL_RES:string = "-3052";
	/** 删除邮件 */
	public static DELETE_MAIL_REQ:number = 3053;
	public static DELETE_MAIL_RES:string = "-3053";
	/** 新邮件推送 */
	public static NEWMAIL_PUSH = "-3054";
	/** 保存邮件 */
	public static SAVE_MAIL_REQ:number = 3055;
	public static SAVE_MAIL_RES:string = "-3055";
	/** 获取邮件物品 */
	public static GET_MAILITEM_REQ:number = 3056;
	public static GET_MAILITEM_RES:string = "-3056";
	/** 加载战斗回放 */
	public static GET_FIGHTREPLAY_REQ:number = 3057;
	public static GET_FIGHTREPLAY_RES:string = "-3057";
	/** 加载战斗者列表信息 */
	public static GET_FIGHTERSINFO_REQ:number = 3058;
	public static GET_FIGHTERSINFO_RES:string = "-3058";
	/** 取消保存邮件 */
	public static UNSAVE_MAIL_REQ:number = 3059;
	public static UNSAVE_MAIL_RES:string = "-3059";
	/** 获取未读邮件数量 */
	public static NOREAD_NUMS_REQ:number = 3060;
	public static NOREAD_NUMS_RES:string = "-3060";
	/** 获取单条邮件数据 */
	public static SINGLEMAIL_REQ:number = 3061;
	public static SINGLEMAIL_RES:string = "-3061";
	/** 国家邮件 */
	public static COUNTRYMAIL = 3062;

	/********************* 武王伐纣 3100"-3150"" *******************************/
	/** 召唤BOSS */
	public static CALLBOSS_REQ:number = 3100;
	public static CALLBOSS_RES:string = "-3100";
	/** 对觉醒BOSS发起战斗 */
	public static OPENWAR2BOSS_REQ:number = 3101;
	public static OPENWAR2BOSS_RES:string = "-3101";
	/** 加载兑换信息 */
	public static LOADEXCHANGE_REQ:number = 3102;
	public static LOADEXCHANGE_RES:string = "-3102";
	/** 加载国家积分 */
	public static LOADPOINT_REQ:number = 3103;
	public static LOADPOINT_RES:string = "-3103";
	/** 加载BOSS战列表 */
	public static LOADWAR_REQ:number = 3104;
	public static LOADWAR_RES:string = "-3104";
	/** SOS */
	public static SOS4BOSS_REQ:number = 3105;
	public static SOS4BOSS_RES:string = "-3105";
	/** 兑换物品 */
	public static EXCHANGE_REQ:number = 3106;
	public static EXCHANGE_RES:string = "-3106";

	/********************* 装备相关 7000"-7099"" *******************************/
	/** 装备加载数据 */
	public static EQUIP_LOAD_REQ:number = 7000;
	public static EQUIP_LOAD_RES:string = "-7000";
	/** 装备数据更新推送 */
	public static EQUIP_MODIFY_PUSH = "-7001";
	/** 装备恢复免费洗炼次数 */
	public static EQUIP_RECOVER_TRAIN_REQ:number = 7002;
	public static EQUIP_RECOVER_TRAIN_RES:string = "-7002";
	/** 装备洗炼 */
	public static EQUIP_TRAIN_REQ:number = 7003;
	public static EQUIP_TRAIN_RES:string = "-7003";
	/** 装备高级洗炼 */
	public static EQUIP_HIGH_TRAIN_REQ:number = 7004;
	public static EQUIP_HIGH_TRAIN_RES:string = "-7004";
	/** 穿上装备 */
	public static EQUIP_PUTON_REQ:number = 7005;
	public static EQUIP_PUTON_RES:string = "-7005";
	/** 解下装备 */
	public static EQUIP_TAKEOFF_REQ:number = 7006;
	public static EQUIP_TAKEOFF_RES:string = "-7006";
	/** 装备购买容量 */
	public static EQUIP_BUY_CAPACITY_REQ:number = 7007;
	public static EQUIP_BUY_CAPACITY_RES:string = "-7007";
	/** 装备打造 */
	public static EQUIP_MAKE_REQ:number = 7008;
	public static EQUIP_MAKE_RES:string = "-7008";
	/** 雇佣铁匠 */
	public static EQUIP_EMPLOY_SMITH_REQ:number = 7009;
	public static EQUIP_EMPLOY_SMITH_RES:string = "-7009";
	/** 铁匠打造加速 */
	public static EQUIP_SMITH_SPEEDUP_REQ:number = 7010;
	public static EQUIP_SMITH_SPEEDUP_RES:string = "-7010";
	/** 金币完成装备打造 */
	public static EQUIP_GOLD_COMPLETE_REQ:number = 7011;
	public static EQUIP_GOLD_COMPLETE_RES:string = "-7011";
	/** 领取打造的装备 */
	public static EQUIP_TAKE_MAKE_REQ:number = 7012;
	public static EQUIP_TAKE_MAKE_RES:string = "-7012";
	/** 装备分解 */
	public static EQUIP_DECOMPOSE_REQ:number = 7013;
	public static EQUIP_DECOMPOSE_RES:string = "-7013";
	/** 装备强化 */
	public static EQUIP_STRONG_REQ:number = 7014;
	public static EQUIP_STRONG_RES:string = "-7014";
	/** 装备生产道具加速 */
	public static EQUIP_USE_ITEM_SPEED_REQ:number = 7015;
	public static EQUIP_USE_ITEM_SPEED_RES:string = "-7015";

	/********************* 装备相关 7100"-7199"" *******************************/
	/** 神兵加载数据 */
	public static ARTIFACT_LOAD_REQ:number = 7100;
	public static ARTIFACT_LOAD_RES:string = "-7100";
	/** 打造神兵 */
	public static ARTIFACT_MAKE_REQ:number = 7101;
	public static ARTIFACT_MAKE_RES:string = "-7101";
	/** 打造神兵完成 */
	public static ARTIFACT_MAKE_FINISH_REQ:number = 7102;
	public static ARTIFACT_MAKE_FINISH_RES:string = "-7102";
	/** 打造神兵加速 */
	public static ARTIFACT_MAKE_SPEED_REQ:number = 7103;
	public static ARTIFACT_MAKE_SPEED_RES:string = "-7103";
	/** 神兵升级 */
	public static ARTIFACT_UPGRADE_REQ:number = 7104;
	public static ARTIFACT_UPGRADE_RES:string = "-7104";
	/** 神兵进阶 */
	public static ARTIFACT_ADVANCE_REQ:number = 7105;
	public static ARTIFACT_ADVANCE_RES:string = "-7105";
	/** 神兵进阶完成 */
	public static ARTIFACT_ADVA_FINISH_REQ:number = 7106;
	public static ARTIFACT_ADVA_FINISH_RES:string = "-7106";
	/** 神兵进阶加速 */
	public static ARTIFACT_ADVA_SPEED_REQ:number = 7107;
	public static ARTIFACT_ADVA_SPEED_RES:string = "-7107";
	/** 神兵碎片推送 */
	public static ARTIFACT_FRAGMENT_PUSH = "-7108";
	/** 神兵碎片购买 */
	public static ARTIFACT_BUY_FRAGMENT_REQ:number = 7109;
	public static ARTIFACT_BUY_FRAGMENT_RES:string = "-7109";

	/********************* 剧情章节相关 7200"-7299"" *******************************/
	/** 剧情章节加载数据 */
	public static PLOT_DATA_REQ:number = 7200;
	public static PLOT_DATA_RES:string = "-7200";
	/** 剧情目标更新推送 */
	public static PLOT_TARGET_PUSH = "-7201";
	/** 剧情目标领取奖励 */
	public static PLOT_TAKE_TARGET_REQ:number = 7202;
	public static PLOT_TAKE_TARGET_RES:string = "-7202";
	/** 剧情章节领取奖励 */
	public static PLOT_TAKE_CHAPTER_REQ:number = 7203;
	public static PLOT_TAKE_CHAPTER_RES:string = "-7203";
	/********************* 副本相关 8000"-8099"" *******************************/
	/** 副本加载数据 */
	public static DRAGON_LOAD_REQ:number = 8000;
	public static DRAGON_LOAD_RES:string = "-8000";
	/** 副本加载关卡信息 */
	public static DRAGON_LOAD_CHAPTER_REQ:number = 8001;
	public static DRAGON_LOAD_CHAPTER_RES:string = "-8001";
	/** 副本挑战关卡 */
	public static DRAGON_CHALLENGE_REQ:number = 8002;
	public static DRAGON_CHALLENGE_RES:string = "-8002";
	/** 副本扫荡关卡 */
	public static DRAGON_SWEEP_REQ:number = 8003;
	public static DRAGON_SWEEP_RES:string = "-8003";
	/** 副本抽将 */
	public static DRAGON_LOTHERO_REQ:number = 8004;
	public static DRAGON_LOTHERO_RES:string = "-8004";
	/** 副本军资补给 */
	public static DRAGON_FEED_REQ:number = 8005;
	public static DRAGON_FEED_RES:string = "-8005";
	/** 副本购买军资补给 */
	public static DRAGON_BUYFEED_REQ:number = 8006;
	public static DRAGON_BUYFEED_RES:string = "-8006";
	/** 副本开启资源田 */
	public static DRAGON_OPENFIELD_REQ:number = 8007;
	public static DRAGON_OPENFIELD_RES:string = "-8007";
	/** 副本购买装备图纸 */
	public static DRAGON_BUYWEAPONPAPER_REQ:number = 8008;
	public static DRAGON_BUYWEAPONPAPER_RES:string = "-8008";
	/** 副本关卡数据推送 */
	public static DRAGON_OUTPOST_PUSH = "-8009";
	/** 副本数据更新推送 */
	public static DRAGON_UPDATE_PUSH = "-8010";
	/********************** 武将相关 8100"-8199"" *******************************/
	/** 武将加载数据 */
	public static HERO_LOAD_REQ:number = 8100;
	public static HERO_LOAD_RES:string = "-8100";
	/** 武将培养 */
	public static HERO_TRAIN_REQ:number = 8101;
	public static HERO_TRAIN_RES:string = "-8101";
	/** 武将恢复免费培养次数 */
	public static HERO_RECOVER_TRAIN_REQ:number = 8102;
	public static HERO_RECOVER_TRAIN_RES:string = "-8102";
	/** 武将数据变化推送 */
	public static HERO_MODIFY_PUSH = "-8103";
	/** 武将上阵 */
	public static HERO_UPBATTLE_REQ:number = 8104;
	public static HERO_UPBATTLE_RES:string = "-8104";
	/** 武将补兵 */
	public static HERO_FILLUP_TRP_REQ:number = 8105;
	public static HERO_FILLUP_TRP_RES:string = "-8105";
	/** 设置自动补兵 */
	public static SET_AUTOFILL_REQ:number = 8106;
	public static SET_AUTOFILL_RES:string = "-8106";
	/** 武将推演 */
	public static HERO_SUMMON_REQ:number = 8107;
	public static HERO_SUMMON_RES:string = "-8107";
	/** 武将使用经验丹 */
	public static HERO_USE_EXPPILL_REQ:number = 8108;
	public static HERO_USE_EXPPILL_RES:string = "-8108";
	/** 武将进阶 */
	public static HERO_ADVANCE_REQ:number = 8109;
	public static HERO_ADVANCE_RES:string = "-8109";
	/** 武将补充耐力值 */
	public static HERO_FILL_STAMINA_REQ:number = 8110;
	public static HERO_FILL_STAMINA_RES:string = "-8110";

	/********************* 科技相关 8200"-8299"" *******************************/
	/** 科技研究请求 */
	public static SCIENCE_STUDY_REQ:number = 8200;
	public static SCIENCE_STUDY_RES:string = "-8200";
	/** 科技加载数据 */
	public static SCIENCE_LOAD_REQ:number = 8201;
	public static SCIENCE_LOAD_RES:string = "-8201";
	/** 科技操作 */
	public static SCIENCE_OPERATE_REQ:number = 8202;
	public static SCIENCE_OPERATE_RES:string = "-8202";
	/** 雇佣研究员 */
	public static SCIENCE_EMPRESEARCHER_REQ:number = 8203;
	public static SCIENCE_EMPRESEARCHER_RES:string = "-8203";
	/** 当前科技研究更新推送 */
	public static SCIENCE_STUDY_UPDATE_PUSH = "-8204";
	/********************* BUFF相关 8300"-8399"" *******************************/
	/** buff加载数据 */
	public static BUFF_LOAD_REQ:number = 8300;
	public static BUFF_LOAD_RES:string = "-8300";

	/********************* 任务相关8400"-8450"" ********************************/
	/** 任务加载 */
	public static MISSION_LOAD_REQ:number = 8400;
	public static MISSION_LOAD_RES:string = "-8400";
	/** 任务数据更新推送 */
	public static MISSION_UPDATE_PUSH = "-8401";
	/** 前端点击页面完成任务 */
	public static MISSION_CLICK_PAGE_FINISH_REQ:number = 8402;
	public static MISSION_CLICK_PAGE_FINISH_RES:string = "-8402";
	/** 任务完成领取奖励 */
	public static MISSION_FINISH_AWARD_REQ:number = 8403;
	public static MISSION_FINISH_AWARD_RES:string = "-8403";
	/** 新手引导步骤记录 */
	public static MISSION_RECORDGUIDE_REQ:number = 8404;
	public static MISSION_RECORDGUIDE_RES:string = "-8404";
	/** 每日任务领取奖励 */
	public static DAILY_FINISH_AWARD_REQ:number = 8405;
	public static DAILY_FINISH_AWARD_RES:string = "-8405";
	/** 每日领取任务进度奖励 */
	public static DAILY_GET_POINT_AWARD_REQ:number = 8406;
	public static DAILY_GET_POINT_AWARD_RES:string = "-8406";
	/** 是否开启巡逻兵提示 */
	public static OPEN_SOLDIER_TIPS_REQ:number = 8407;
	public static OPEN_SOLDIER_TIPS_RES:string = "-8407";
	/** 开启巡逻兵提示推送 */
	public static OPEN_SOLDIER_TIPS_PUSH = "-8408";
	/******************** 排行榜相关8451"-8499"" *********************************/

	/** 查看排行榜信息 */
	public static RANK_LOOK_INFO_REQ:number = 8451;
	public static RANK_LOOK_INFO_RES:string = "-8451";
	/** 查看玩家信息 */
	public static RANK_LOOK_PLAYER_REQ:number = 8452;
	public static RANK_LOOK_PLAYER_RES:string = "-8452";
	/** 查看玩家个人排行榜数据 */
	public static RANK_LOOKMYSELF_RANK_REQ:number = 8454;
	public static RANK_LOOKMYSELF_RANK_RES:string = "-8454";
	/***************** 商店相关8500"-8550"" **********************/
	/** 商店物品购买 */
	public static SHOP_BUY_GOODS_REQ:number = 8500;
	public static SHOP_BUY_GOODS_RES:string = "-8500";
	/** 商店数据更新推送 */
	public static SHOP_UPDATE_PUSH = "-8501";
	/** 加载商店数据 */
	public static SHOP_LOAD_DATA_REQ:number = 8502;
	public static SHOP_LOAD_DATA_RES:string = "-8502";
	/** 珍宝阁翻牌 */
	public static SHOP_TREASURE_DRAW_REQ:number = 8503;
	public static SHOP_TREASURE_DRAW_RES:string = "-8503";
	/** 购买珍宝阁物品 */
	public static SHOP_BUY_TREASURE_REQ:number = 8504;
	public static SHOP_BUY_TREASURE_RES:string = "-8504";
	/** 商队兑换资源 */
	public static SHOP_TEAM_EXCHANGE_REQ:number = 8506;
	public static SHOP_TEAM_EXCHANGE_RES:string = "-8506";
	/********************* 每日抢答相关 8551"-8599"" *******************************/
	/** 题目推送 */
	public static ANSER_PUSH = "-8551";
	/** 答题处理推送 */
	public static ANSER_DEAL_PUSH = "-8552";
	/** 答题结束推送 */
	public static ANSER_END_PUSH = "-8553";
	/** 玩家答题 */
	public static ANSER_REQ:number = 8554;
	public static ANSER_RES:string = "-8554";
	/** 领取答题奖励 */
	public static ANSER_GETAWARD_REQ:number = 8555;
	public static ANSER_GETAWARD_RES:string = "-8555";
	/** 刷新答题玩家列表 */
	public static ANSWER_LIST_REQ:number = 8556;
	public static ANSWER_LIST_RES:string = "-8556";
	/** 玩家答题状态请求 */
	public static ANSWER_AVATAR_REQ:number = 8557;
	public static ANSWER_AVATAR_RES:string = "-8557";
	/** 玩家登陆请求答题信息 */
	public static ANSWER_ONLINE_REQ:number = 8558;
	public static ANSWER_ONLINE_RES:string = "-8558";
	/** 玩家准备答题推送 (红点) */
	public static ANSER_RED_PUSH = "-8559";
	/******************** 聊天系统相关4501"-4700"" *********************************/
	/** 聊天发送消息 */
	public static CHAT_MSG_REQ:number = 4501;
	public static CHAT_MSG_RES:string = "-4501";
	/** 推送聊天消息 */
	public static CHAT_MSG_PUSH = "-4502";
	/** 加载聊天记录 */
	public static CHAT_LOADRECORD_REQ:number = 4503;
	public static CHAT_LOADRECORD_RES:string = "-4503";
	/** 使用喇叭 */
	public static USE_LABA_REQ:number = 4504;
	public static USE_LABA_RES:string = "-4504";
	/** 世界喇叭信息推送 */
	public static WOLRD_LABA_PUSH = "-4505";
	/** 推送滚屏公告 */
	public static NOTICE_PUSH = "-4506";
	/** 点赞别人 */
	public static PRAISE_REQ:number = 4507;
	public static PRAISE_RES:string = "-4507";
	/** 推送已点赞数据 */
	public static CHECK_PRAISE_REQ:number = 4508;
	public static CHECK_PRAISE_RES:string = "-4508";
	/** 个人分享推送 */
	public static SHARING_PUSH = "-4509";
	/** 开启地理位置 */
	public static CHAT_POSITION_REQ:number = 4510;
	public static CHAT_POSITION_RES:string = "-4510";
	/** 聊天举报 */
	public static CHAT_REPORT_REQ:number = 4511;
	public static CHAT_REPORT_RES:string = "-4511";
	/** 屏蔽聊天玩家 */
	public static SHIELD_CHAT_REQ:number = 4512;
	public static SHIELD_CHAT_RES:string = "-4512";
	/** 解除屏蔽玩家 */
	public static RELIEVE_SHIELD_CHAT_REQ:number = 4513;
	public static RELIEVE_SHIELD_CHAT_RES:string = "-4513";
	/** 加载聊天屏蔽人员 */
	public static LOAD_SHIELD_REQ:number = 4514;
	public static LOAD_SHIELD_RES:string = "-4514";
	/** 阅读公告 */
	public static READ_NOTICE_REQ:number = 4515;
	public static READ_NOTICE_RES:string = "-4515";
	/** 获取公告信息 */
	public static NOTICE_INFO_REQ:number = 4516;
	public static NOTICE_INFO_RES:string = "-4516";
	/** 重新加载公告 */
	public static RELOAD_NOTICE_RES:string = "-4517";
	/** 获取联系方式信息 */
	public static TEL_INFO_REQ:number = 4518;
	public static TEL_INFO_RES:string = "-4518";
	/** 撤销强制公告 */
	public static NOTICE_CANCEL_PUSH = "-4519";
	/** 加载公告 */
	public static CHAT_LOADNOTICE_REQ:number = 4520;
	public static CHAT_LOADNOTICE_RES:string = "-4520";
	/** 添加好友 */
	public static FRIEND_ADD_REQ:number = 4521;
	public static FRIEND_ADD_RES:string = "-4521";
	/** 送好友体力 */
	public static FRIEND_BLESS_REQ:number = 4522;
	public static FRIEND_BLESS_RES:string = "-4522";
	/** 领取好友体力 */
	public static FRIEND_BLESSGET_REQ:number = 4523;
	public static FRIEND_BLESSGET_RES:string = "-4523";
	/** 赠送能量信息请求 */
	public static FRIEND_BLESSINFO_REQ:number = 4524;
	public static FRIEND_BLESSINFO_RES:string = "-4524";
	/** 赠送好友体力推送 */
	public static FRIEND_BLESS_PUSH = "-4525";
	/** 好友送体力列表零点推送 */
	public static BLESSI_ZERO_PUSH = "-4526";
	/** 添加好友的推送 */
	public static FRIEND_ADD_PUSH = "-4527";
	/** 删除好友 */
	public static FRIEND_DELETE_REQ:number = 4528;
	public static FRIEND_DELETE_RES:string = "-4528";
	/** 删除好友的推送 */
	public static FRIEND_DELETE_PUSH = "-4529";
	/** 加载好友列表 */
	public static FRIEND_LOAD_REQ:number = 4530;
	public static FRIEND_LOAD_RES:string = "-4530";
	/** 更新最近联系人 */
	public static RLINKMAN_UPDATE_PUSH = "-4531";
	/** 信息强制撤回推送 */
	public static FORCE_CHAT_PUSH = "-4532";
	/** 发送个人分享 */
	public static SHARING_REQ:number = 4533;
	public static SHARING_RES:string = "-4533";
	/** 个人分享查询 */
	public static SHARING_FIND_REQ:number = 4534;
	public static SHARING_FIND_RES:string = "-4534";
	/** 加载私聊信息 */
	public static LOAD_PRIVATEMSG_REQ:number = 4535;
	public static LOAD_PRIVATEMSG_RES:string = "-4535";
	/** 关闭窗口操作 */
	public static CLOSE_PRIVATEWINDOW_REQ:number = 4536;
	public static CLOSE_PRIVATEWINDOW_RES:string = "-4536";
	/** 加载最近联系人列表 */
	public static RLINKMAN_LOAD_REQ:number = 4537;
	public static RLINKMAN_LOAD_RES:string = "-4537";
	/** 收到点赞推送 */
	public static PRAISE_GET_PUSH = "-4538";
	/******************** 红包系统4701"-4799"" *********************************/
	/** 发红包给所有人抢 */
	public static REDPACKET_SEND_EVERY_ONE_REQ:number = 4701;
	public static REDPACKET_SEND_EVERY_ONE_RES:string = "-4701";
	/** 送红包给好友 */
	public static REDPACKET_SEND_FRIEND_REQ:number = 4702;
	public static REDPACKET_SEND_FRIEND_RES:string = "-4702";
	/** 查看红包信息 */
	public static REDPACKET_GET_INFO_REQ:number = 4703;
	public static REDPACKET_GET_INFO_RES:string = "-4703";
	/** 抢红包 */
	public static REDPACKET_SCRAPE_REQ:number = 4704;
	public static REDPACKET_SCRAPE_RES:string = "-4704";
	/** 谁得到红包 */
	public static REDPACKET_WHO_GET_PUSH = "-4705";
	/******************** 活动相关 *********************************/
	/** 南征北战已完成任务变更推送 4000"-4500"" */
	/** 南征北战领取任务奖励 */
	public static COUNTRYWAR_GETAWARD_REQ:number = 4001;
	public static COUNTRYWAR_GETAWARD_RES:string = "-4001";
	/** 开启成长基金 */
	public static OPEN_GROWFUND_REQ:number = 4002;
	public static OPEN_GROWFUND_RES:string = "-4002";
	/** 获取成长基金奖励 */
	public static GET_GROWFUNDAWARD_REQ:number = 4003;
	public static GET_GROWFUNDAWARD_RES:string = "-4003";
	/** 王宫升级领取奖励 */
	public static PALACEUPGRADES_GETAWARD_REQ:number = 4004;
	public static PALACEUPGRADES_GETAWARD_RES:string = "-4004";
	/** 7天签到领取奖励 */
	public static TAKE_SEVEN_DAY_REQ:number = 4005;
	public static TAKE_SEVEN_DAY_RES:string = "-4005";
	/** 国战排行领取奖励 */
	public static COUNTRYWARRANK_GETAWARD_REQ:number = 4006;
	public static COUNTRYWARRANK_GETAWARD_RES:string = "-4006";
	/** 首冲好礼领取奖励 */
	public static FIRST_RECHARGE_TAKE_GIFT_REQ:number = 4008;
	public static FIRST_RECHARGE_TAKE_GIFT_RES:string = "-4008";
	/** 首冲好礼数据推送 */
	public static FIRST_RECHARGE_GIFT_PUSH = "-4009";
	/** 登坛拜将购买东西 */
	public static SEEK_HERO_BUY_REQ:number = 4010;
	public static SEEK_HERO_BUY_RES:string = "-4010";
	/** 登坛拜将刷新物品 */
	public static SEEK_HERO_REFRESH_REQ:number = 4011;
	public static SEEK_HERO_REFRESH_RES:string = "-4011";
	/** 登坛拜将恢复刷新次数 */
	public static SEEK_HERO_RECOVER_REQ:number = 4012;
	public static SEEK_HERO_RECOVER_RES:string = "-4012";
	/** 登坛拜将招募武将 */
	public static SEEK_HERO_SUMMON_REQ:number = 4013;
	public static SEEK_HERO_SUMMON_RES:string = "-4013";
	/** 全民返利领取奖励 */
	public static PEOPLERECBACK_GETAWARD_REQ:number = 4014;
	public static PEOPLERECBACK_GETAWARD_RES:string = "-4014";
	/** 福泽天下领取奖励 */
	public static WEALTHFARELAND_GETAWARD_REQ:number = 4016;
	public static WEALTHFARELAND_GETAWARD_RES:string = "-4016";
	/** 每日登陆领取奖励 */
	public static GIVE_DAILY_AWARD_REQ:number = 4018;
	public static GIVE_DAILY_AWARD_RES:string = "-4018";
	/** 每日登陆检查是否可以领取奖励 */
	public static CHECK_DAILY_AWARD_REQ:number = 4019;
	public static CHECK_DAILY_AWARD_RES:string = "-4019";
	/** 耗铁有礼转盘 */
	public static CONSUME_IRON_TURN_REQ:number = 4020;
	public static CONSUME_IRON_TURN_RES:string = "-4020";
	/** 耗铁有礼购买次数 */
	public static CONSUME_IRON_BUY_REQ:number = 4021;
	public static CONSUME_IRON_BUY_RES:string = "-4021";
	/** 屯田计划购买计划 */
	public static BUY_PROJECT_REQ:number = 4022;
	public static BUY_PROJECT_RES:string = "-4022";
	/** 屯田计划领取奖励 */
	public static BUYPROJECT_EX_REQ:number = 4023;
	public static BUYPROJECT_EX_RES:string = "-4023";
	/** 每日返利领取奖励 */
	public static EVERYDAYBACKAWARD_GET_REQ:number = 4024;
	public static EVERYDAYBACKAWARD_GET_RES:string = "-4024";
	/** 锻造排行领取奖励 */
	public static MAKEEQUIPRANK_TAKE_REQ:number = 4026;
	public static MAKEEQUIPRANK_TAKE_RES:string = "-4026";
	/** 锻造排行奖励时间到达推送 */
	public static MAKEEQUIPRANK_TAKE_TIME_PUSH = "-4027";
	/** 屯粮排行领取奖励 */
	public static ACCUMULATEFOODS_GET_AWARDS_REQ:number = 4028;
	public static ACCUMULATEFOODS_GET_AWARDS_RES:string = "-4028";
	/** 屯粮排行奖励时间到达推送 */
	public static ACCUMULATEFOODS_TAKE_TIME_PUSH = "-4029";
	/** 兵力排行领取奖励 */
	public static TROOPRANK_TAKE_REQ:number = 4030;
	public static TROOPRANK_TAKE_RES:string = "-4030";
	/** 兵力排行奖励时间到达推送 */
	public static TROOPRANK_TAKE_TIME_PUSH = "-4031";
	/** 消费好礼消费推送 */
	public static CONSUMEACCUMULATION_CONSUME_PUSH = "-4032";
	/** 消费好礼领取奖励 */
	public static CONSUMEACCUMULATION_GETALWARD_REQ:number = 4033;
	public static CONSUMEACCUMULATION_GETALWARD_RES:string = "-4033";
	/** 夺宝转盘转动 */
	public static SNATCHTURN_RUN_REQ:number = 4034;
	public static SNATCHTURN_RUN_RES:string = "-4034";
	/** 洗炼排行领取奖励 */
	public static TRAINRANK_TAKE_REQ:number = 4035;
	public static TRAINRANK_TAKE_RES:string = "-4035";
	/** 洗炼排行奖励时间到达推送 */
	public static TRAINRANK_TAKE_TIME_PUSH = "-4036";
	/** 获取成长基金已购买人数 */
	public static GROWFUND_GETBUY_REQ:number = 4037;
	public static GROWFUND_GETBUY_RES:string = "-4037";
	/** 屯铁排行领取奖励 */
	public static ACCUMULATEIRON_GET_AWARDS_REQ:number = 4038;
	public static ACCUMULATEIRON_GET_AWARDS_RES:string = "-4038";
	/** 屯铁排行奖励时间到达推送 */
	public static ACCUMULATEIRON_TAKE_TIME_PUSH = "-4039";
	/** 乱军加速物品加速 */
	public static REBELSPEED_SPEED_REQ:number = 4040;
	public static REBELSPEED_SPEED_RES:string = "-4040";
	/** 每日领取奖励0点重置推送 */
	public static DAILY_AWARD_PUSH = "-4041";
	/** 折扣商店购买 */
	public static DISCOUNTSHOP_BUY_REQ:number = 4042;
	public static DISCOUNTSHOP_BUY_RES:string = "-4042";
	/** 攻城排行领取奖励 */
	public static ATTACKCITY_GET_AWARDS_REQ:number = 4043;
	public static ATTACKCITY_GET_AWARDS_RES:string = "-4043";
	/** 全民返利刷新数据 */
	public static PEOPLERECBACK_REFRESHDATA_REQ:number = 4044;
	public static PEOPLERECBACK_REFRESHDATA_RES:string = "-4044";
	/** 累计充值领取奖励 */
	public static ACCUMULATERECHARGE_GET_REQ:number = 4045;
	public static ACCUMULATERECHARGE_GET_RES:string = "-4045";
	/** 每日进贡领取物品 */
	public static EVERYDAYPRESENTGIFT_GET_REQ:number = 4046;
	public static EVERYDAYPRESENTGIFT_GET_RES:string = "-4046";
	/** 福泽天下刷新数据 */
	public static WEALFARELAND_REFRESHDATA_REQ:number = 4047;
	public static WEALFARELAND_REFRESHDATA_RES:string = "-4047";
	/** 每日吃鸡 */
	public static CHICKENDINNER_EAT_REQ:number = 4048;
	public static CHICKENDINNER_EAT_RES:string = "-4048";
	/** 每日吃鸡补签 */
	public static CHICKENDINNER_BACK_REQ:number = 4049;
	public static CHICKENDINNER_BACK_RES:string = "-4049";
	/** 7日登基"-领取登录"奖励[1] */
	public static SA1_LOGIN_TAKE_REQ:number = 4050;
	public static SA1_LOGIN_TAKE_RES:string = "-4050";
	/** 7日登基"-领取等级"奖励[2] */
	public static SA2_LEVEL_TAKE_REQ:number = 4051;
	public static SA2_LEVEL_TAKE_RES:string = "-4051";
	/** 7日登基"-领取乱军"奖励[3] */
	public static SA3_REBEL_TAKE_REQ:number = 4052;
	public static SA3_REBEL_TAKE_RES:string = "-4052";
	/** 7日登基"-领取科技"奖励[4] */
	public static SA4_SCIE_TAKE_REQ:number = 4053;
	public static SA4_SCIE_TAKE_RES:string = "-4053";
	/** 7日登基"-领取武将"奖励[5] */
	public static SA5_HERO_TAKE_REQ:number = 4054;
	public static SA5_HERO_TAKE_RES:string = "-4054";
	/** 7日登基"-领取BO"SS奖励[6] */
	public static SA6_BOSS_TAKE_REQ:number = 4055;
	public static SA6_BOSS_TAKE_RES:string = "-4055";
	/** 7日登基"-领取装备"奖励[7] */
	public static SA7_EQUIP_TAKE_REQ:number = 4056;
	public static SA7_EQUIP_TAKE_RES:string = "-4056";
	/** 7日登基"-领取副本"奖励[8] */
	public static SA8_DRAGON_TAKE_REQ:number = 4057;
	public static SA8_DRAGON_TAKE_RES:string = "-4057";
	/** 7日登基"-领取城战"奖励[9] */
	public static SA9_CITY_TAKE_REQ:number = 4058;
	public static SA9_CITY_TAKE_RES:string = "-4058";
	/** 7日登基"-领取加速"奖励[10] */
	public static SA10_SPEED_TAKE_REQ:number = 4059;
	public static SA10_SPEED_TAKE_RES:string = "-4059";
	/** 7日登基"-领取兵营"奖励[11] */
	public static SA11_CAMP_TAKE_REQ:number = 4060;
	public static SA11_CAMP_TAKE_RES:string = "-4060";
	/** 7日登基"-领取神兵"奖励[12] */
	public static SA12_ARTIFECT_TAKE_REQ:number = 4061;
	public static SA12_ARTIFECT_TAKE_RES:string = "-4061";
	/** 7日登基"-领取科技"排行奖励[13] */
	public static SA13_RANKSCIENCE_TAKE_REQ:number = 4062;
	public static SA13_RANKSCIENCE_TAKE_RES:string = "-4062";
	/** 7日登基"-领取募兵"奖励[14] */
	public static SA14_RECRUIT_TAKE_REQ:number = 4063;
	public static SA14_RECRUIT_TAKE_RES:string = "-4063";
	/** 7日登基"-领取资源"田奖励[15] */
	public static SA15_RESOURCE_TAKE_REQ:number = 4064;
	public static SA15_RESOURCE_TAKE_RES:string = "-4064";
	/** 7日登基"-领取攻城"排行奖励[16] */
	public static SA16_RANKCITY_TAKE_REQ:number = 4065;
	public static SA16_RANKCITY_TAKE_RES:string = "-4065";
	/** 7日登基"-领取装备"排行奖励[17] */
	public static SA17_RANKEQUIP_TAKE_REQ:number = 4066;
	public static SA17_RANKEQUIP_TAKE_RES:string = "-4066";
	/** 7日登基"-领取洗炼"排行奖励[18] */
	public static SA18_TRAIN_TAKE_REQ:number = 4067;
	public static SA18_TRAIN_TAKE_RES:string = "-4067";
	/** 7日登基"-领取副本"排行奖励[19] */
	public static SA19_RANKDRAGON_TAKE_REQ:number = 4068;
	public static SA19_RANKDRAGON_TAKE_RES:string = "-4068";
	/** 7日登基"-领取王宫"排行奖励[20] */
	public static SA20_RANKPALACE_TAKE_REQ:number = 4069;
	public static SA20_RANKPALACE_TAKE_RES:string = "-4069";
	/** 7日登基"-领取战力"排行奖励[21] */
	public static SA21_RANKSCORE_TAKE_REQ:number = 4070;
	public static SA21_RANKSCORE_TAKE_RES:string = "-4070";
	/** 新版首冲好礼领取奖励 */
	public static FIRST_RECHARGE_NEW_TAKE_GIFT_REQ:number = 4071;
	public static FIRST_RECHARGE_NEW_TAKE_GIFT_RES:string = "-4071";
	/** 红包馈赠 */
	public static GIFT_REDPACKETS_REQ:number = 4072;
	public static GIFT_REDPACKETS_RES:string = "-4072";
	/** 绑定手机操作 */
	public static BIND_PHONE_REQ:number = 4073;
	public static BIND_PHONE_RES:string = "-4073";
	/** 寻龙夺宝抽奖 */
	public static DRAGON_TREASURE_LOTTERY_REQ:number = 4074;
	public static DRAGON_TREASURE_LOTTERY_RES:string = "-4074";
	/** 在线福利领奖 */
	public static ONLINEWELFARE_GETAWALDS_REQ:number = 4075;
	public static ONLINEWELFARE_GETAWALDS_RES:string = "-4075";
	/** 寻龙夺宝购买物品 */
	public static DRAGON_TREASURE_BUY_REQ:number = 4076;
	public static DRAGON_TREASURE_BUY_RES:string = "-4076";
	/** 双旦活动签到 */
	public static DOUBLEEGG_SIGN_REQ:number = 4077;
	public static DOUBLEEGG_SIGN_RES:string = "-4077";
	/** 王权征收获取物品 */
	public static SCEPTERLEVY_GETREWARD_REQ:number = 4078;
	public static SCEPTERLEVY_GETREWARD_RES:string = "-4078";
	/** 充值签到领取签到奖励 */
	public static RDAACT_GET_SIGNREWARD_REQ:number = 4079;
	public static RDAACT_GET_SIGNREWARD_RES:string = "-4079";
	/** 充值签到领取免费奖励 */
	public static RDAACT_GET_FREEREWARD_REQ:number = 4080;
	public static RDAACT_GET_FREEREWARD_RES:string = "-4080";
	/** 最终版首冲好礼领取奖励 */
	public static FIRST_RECHARGE_FINAL_TAKE_GIFT_REQ:number = 4081;
	public static FIRST_RECHARGE_FINAL_TAKE_GIFT_RES:string = "-4081";
	/** 每日特惠领取每日免费赠品 */
	public static DAILY_DEAL_TAKESURPRISE_REQ:number = 4082;
	public static DAILY_DEAL_TAKESURPRISE_RES:string = "-4082";
	/** 新版成长基金领取奖励 */
	public static NEWGROWFUND_GIFT_REQ:number = 4083;
	public static NEWGROWFUND_GIFT_RES:string = "-4083";
	/** 腊八拉霸抽奖 */
	public static SLOTSTANK_PULL_REQ:number = 4084;
	public static SLOTSTANK_PULL_RES:string = "-4084";
	/** 领取攻城略池首次攻城奖励 */
	public static TAKECITYACT_FIRST_REQ:number = 4085;
	public static TAKECITYACT_FIRST_RES:string = "-4085";
	/** 领取攻城略池领取宝箱奖励 */
	public static TAKECITYACT_GETBOX_REQ:number = 4086;
	public static TAKECITYACT_GETBOX_RES:string = "-4086";
	/** 领取攻城略池领取每日宝箱奖励 */
	public static TAKECITYACT_GETDAILYBOX_REQ:number = 4087;
	public static TAKECITYACT_GETDAILYBOX_RES:string = "-4087";
	/** 寻访美人寻访一次 */
	public static SEEK_BEAUTY_ONE_REQ:number = 4088;
	public static SEEK_BEAUTY_ONE_RES:string = "-4088";
	/** 寻访美人寻访十次 */
	public static SEEK_BEAUTY_TEN_REQ:number = 4089;
	public static SEEK_BEAUTY_TEN_RES:string = "-4089";
	/** 寻访美人招募武将[废弃] */
	public static SEEK_BEAUTY_SUMMON_REQ:number = 4090;
	public static SEEK_BEAUTY_SUMMON_RES:string = "-4090";
	/** 福星高照单开红包 */
	public static LUCKY_STARSHINE_OPENONE_REQ:number = 4091;
	public static LUCKY_STARSHINE_OPENONE_RES:string = "-4091";
	/** 福星高照连开红包 */
	public static LUCKY_STARSHINE_OPENLINK_REQ:number = 4092;
	public static LUCKY_STARSHINE_OPENLINK_RES:string = "-4092";
	/** 福星高照领取开启奖励 */
	public static LUCKY_STARSHINE_TAKEOPEN_REQ:number = 4093;
	public static LUCKY_STARSHINE_TAKEOPEN_RES:string = "-4093";
	/** 年兽来袭攻击年兽 */
	public static ATTACK_MONSTER_REQ:number = 4094;
	public static ATTACK_MONSTER_RES:string = "-4094";
	/** 年兽来袭领取伤害奖励 */
	public static MONSTERACT_GET_HURTAWARD_REQ:number = 4095;
	public static MONSTERACT_GET_HURTAWARD_RES:string = "-4095";
	/** 年兽来袭查看排行榜 */
	public static MONSTERACT_LOOK_COUNTRYRANK_REQ:number = 4096;
	public static MONSTERACT_LOOK_COUNTRYRANK_RES:string = "-4096";
	/** 新王权征收获取物品 */
	public static SCEPTERLEVY2_GETREWARD_REQ:number = 4097;
	public static SCEPTERLEVY2_GETREWARD_RES:string = "-4097";
	/** 年兽来袭刷新血量 */
	public static MONSTERACT_REFRESH_HP_REQ:number = 4098;
	public static MONSTERACT_REFRESH_HP_RES:string = "-4098";
	/** 福星高照购买红包 */
	public static LUCKY_STARSHINE_BUYRED_REQ:number = 4099;
	public static LUCKY_STARSHINE_BUYRED_RES:string = "-4099";
	/** 装备打造领取奖励 */
	public static MAKING_EQUIP_ACT_GETAWARD_REQ:number = 4100;
	public static MAKING_EQUIP_ACT_GETAWARD_RES:string = "-4100";
	/******************** 国家相关 5000"-5050"" *********************************/
	/** 选择国家 */
	public static SELECTCOUNTRY_REQ:number = 5000;
	public static SELECTCOUNTRY_RES:string = "-5000";
	/** 开发国家 */
	public static DEVELOP_REQ:number = 5001;
	public static DEVELOP_RES:string = "-5001";
	/** 加载官员 */
	public static LOAD_OFFICIAL_REQ:number = 5002;
	public static LOAD_OFFICIAL_RES:string = "-5002";
	/** 投票给官员候选人 */
	public static VOTE_REQ:number = 5003;
	public static VOTE_RES:string = "-5003";
	/** 膜拜国王 */
	public static WORSHIP_REQ:number = 5004;
	public static WORSHIP_RES:string = "-5004";
	/** 发布公告 */
	public static RELEASE_NOTICE_REQ:number = 5005;
	public static RELEASE_NOTICE_RES:string = "-5005";
	/** 获取膜拜次数 */
	public static GET_WORSHIPTIMES_REQ:number = 5006;
	public static GET_WORSHIPTIMES_RES:string = "-5006";
	/** 公告推送 */
	public static NOTICE_CHANGE_PUSH = "-5007";
	/** 获取城战积分箱子 */
	public static GET_BOXAWARD_REQ:number = 5008;
	public static GET_BOXAWARD_RES:string = "-5008";
	/** 加载国家荣誉任务完成情况 */
	public static LOAD_HONORTASK_FINISH_REQ:number = 5009;
	public static LOAD_HONORTASK_FINISH_RES:string = "-5009";
	/** 获取国家荣誉任务奖励 */
	public static GET_HONORTASK_AWARD_REQ:number = 5010;
	public static GET_HONORTASK_AWARD_RES:string = "-5010";
	/** 限时任务刷新推送 */
	public static TASK_REFRESH_PUSH = "-5011";
	/** 获取限时任务奖励 */
	public static GET_TIMELIMITTASK_AWARD_REQ:number = 5012;
	public static GET_TIMELIMITTASK_AWARD_RES:string = "-5012";
	/** 罢免将军 */
	public static RECALL_GENERAL_REQ:number = 5013;
	public static RECALL_GENERAL_RES:string = "-5013";
	/** 任命将军 */
	public static SET_GENERAL_REQ:number = 5014;
	public static SET_GENERAL_RES:string = "-5014";
	/** 加载国家数据 */
	public static LOAD_COUNTRYINFO_REQ:number = 5015;
	public static LOAD_COUNTRYINFO_RES:string = "-5015";
	/** 加载国家日志 */
	public static LOAD_EVENTS_REQ:number = 5016;
	public static LOAD_EVENTS_RES:string = "-5016";
	/** 限时任务完成度变化推送 */
	public static TIMELIMITTASK_FINISH_PUSH = "-5017";
	/** 推送城战积分 */
	public static CASTLEWAR_POINT_PUSH = "-5018";
	/** 国家数据刷新推送 */
	public static COUNTRY_DATAREFRESH_PUSH = "-5019";
	/** 升级爵位 */
	public static BANNERET_LEVELUP_REQ:number = 5020;
	public static BANNERET_LEVELUP_RES:string = "-5020";
	/** 官员候选人数据刷新推送 */
	public static OFFICIAL_REFRESH_PUSH = "-5021";
	/** 加载我国国家城池 */
	public static LOAD_COUNTRYCITY_REQ:number = 5022;
	public static LOAD_COUNTRYCITY_RES:string = "-5022";
	/** 国家事件推送 */
	public static COUNTRY_EVENT_PUSH = "-5023";
	/** 加载将军候选人列表 */
	public static LOAD_GENERALCANDIDATE_REQ:number = 5024;
	public static LOAD_GENERALCANDIDATE_RES:string = "-5024";
	/** 官员罢免任命推送 */
	public static OFFICIAL_CHANGE_PUSH = "-5025";
	/** 竞选结束推送 */
	public static ELECT_END_PUSH = "-5026";
	/** 竞选开始推送 */
	public static ELECT_START_PUSH = "-5027";
	/** 我国国家城池刷新推送 */
	public static COUNTRYCITY_REFRESH_PUSH = "-5028";
	/** 国家荣誉红点推送 */
	public static COUNTRY_HONOR_RED = "-5029";
	/** 官员/候选人更名推送 */
	public static RENAME_PUSH = "-5030";
	/** 开启官员竞选推送 */
	public static ELECT_OPEN_PUSH = "-5031";
	/** 官员海报更新推送 */
	public static POSTER_PUSH = "-5032";
	/************* 公共数据接口5051"-5099"" *********************************/
	/** 获取系统玩法开关 */
	public static PUB_GET_SYSSWITCH_REQ:number = 5051;
	public static PUB_GET_SYSSWITCH_RES:string = "-5051";
	/************** 小玩法系统协议6000"-6099"" *******************************/
	/** 登录检查每日宝箱详细信息 */
	public static CHECK_DAILY_GIFT_REQ:number = 6001;
	public static CHECK_DAILY_GIFT_RES:string = "-6001";
	/** 每日宝箱获取奖励 */
	public static GET_DAILY_GIFT_REQ:number = 6002;
	public static GET_DAILY_GIFT_RES:string = "-6002";
	/** 每日宝箱数据更新推送 */
	public static UPDATE_DAILY_GIFT_PUSH = "-6003";
	/** 名将推荐数据更新推送 */
	public static UPDATE_CAPTAIN_TIME_PUSH = "-6004";
	/** 名将推荐数据登录检查 */
	public static CHECK_CAPTAIN_TIME_REQ:number = 6005;
	public static CHECK_CAPTAIN_TIME_RES:string = "-6005";
	/** 触发礼包 */
	public static PLAY_TRIGIFT_PUSH = "-6006";
	/** 加载触发礼包 */
	public static PLAY_TRIGIFT_REQ:number = 6007;
	public static PLAY_TRIGIFT_RES:string = "-6007";
	/** 购买触发礼包 */
	public static TRIGIFT_BUY_REQ:number = 6008;
	public static TRIGIFT_BUY_RES:string = "-6008";
	/** 武将游历 */
	public static HERO_TRAVEL_PUSH = "-6009";
	/** 领取武将任务的奖励 */
	public static HERO_TRIGIFT_REQ:number = 6010;
	public static HERO_TRIGIFT_RES:string = "-6010";
	/** 加载武将任务的奖励 */
	public static HERO_LOADAWARD_REQ:number = 6011;
	public static HERO_LOADAWARD_RES:string = "-6011";
	/** 得到游历详细信息 */
	public static GET_TRAVEL_INFO_REQ:number = 6013;
	public static GET_TRAVEL_INFO_RES:string = "-6013";
	/** 开始游历 */
	public static BEGIN_TRAVEL_REQ:number = 6014;
	public static BEGIN_TRAVEL_RES:string = "-6014";
	/** 完成游历 */
	public static FINISH_TRAVEL_REQ:number = 6015;
	public static FINISH_TRAVEL_RES:string = "-6015";
	/** [新]触发礼包加载数据 */
	public static LOAD_TPACK_REQ:number = 6016;
	public static LOAD_TPACK_RES:string = "-6016";
	/** [新]触发礼包数据推送 */
	public static TPACK_PUSH = "-6017";
	/********************** 竞技场协议6100"-6199"" *****************/
	/** 加载个人的排行榜视图 */
	public static ARENA_LOAD_MY_VIEWS_REQ:number = 6100;
	public static ARENA_LOAD_MY_VIEWS_RES:string = "-6100";
	/** 挑战 */
	public static ARENA_FIGHT_REQ:number = 6101;
	public static ARENA_FIGHT_RES:string = "-6101";
	/** 领取积分奖励 */
	public static ARENA_GET_ITG_AWARD_REQ:number = 6102;
	public static ARENA_GET_ITG_AWARD_RES:string = "-6102";
	/** 扫荡 */
	public static ARENA_SWEEPARENA_REQ:number = 6103;
	public static ARENA_SWEEPARENA_RES:string = "-6103";
	/** 竞技场购买物品 */
	public static ARENA_BUY_SHOP_ITEM_REQ:number = 6104;
	public static ARENA_BUY_SHOP_ITEM_RES:string = "-6104";
	/** 加载竞技场信息 */
	public static ARENA_LOAD_INFO_REQ:number = 6105;
	public static ARENA_LOAD_INFO_RES:string = "-6105";
	/** 设置竞技场阵容 */
	public static ARENA_SET_BATTLEARRAY_REQ:number = 6106;
	public static ARENA_SET_BATTLEARRAY_RES:string = "-6106";
	/** 竞技场数据更新推送 */
	public static ARENA_UPDATE_PUSH = "-6107";
	/** 查看战斗记录 */
	public static ARENA_LOAD_REPOT_REQ:number = 6108;
	public static ARENA_LOAD_REPOT_RES:string = "-6108";
	/** 查看排行榜 */
	public static ARENA_LOAD_RANKING_REQ:number = 6109;
	public static ARENA_LOAD_RANKING_RES:string = "-6109";
	/** 查看幸运排行榜 */
	public static ARENA_LOAD_LUCKY_RANK_REQ:number = 6110;
	public static ARENA_LOAD_LUCKY_RANK_RES:string = "-6110";
	/** 竞技场购买挑战次数 */
	public static ARENA_BUY_CHALLENGE_REQ:number = 6111;
	public static ARENA_BUY_CHALLENGE_RES:string = "-6111";
	/** 竞技场查看玩家信息 */
	public static ARENA_LOOK_PLAYER_INFO_REQ:number = 6112;
	public static ARENA_LOOK_PLAYER_INFO_RES:string = "-6112";
	/** 竞技场战报推送 */
	public static ARENA_REPOT_PUSH = "-6113";
	/** 竞技场刷新商店 */
	public static ARENA_REFRESH_SHOP_REQ:number = 6114;
	public static ARENA_REFRESH_SHOP_RES:string = "-6114";
	/** 竞技场展示总战力 */
	public static ARENA_SHOW_SCORE_REQ:number = 6115;
	public static ARENA_SHOW_SCORE_RES:string = "-6115";
	/********************** 限时BOSS协议6200"-6299"" *****************/
	/** BOSS加载数据 */
	public static BOSS_LOAD_REQ:number = 6200;
	public static BOSS_LOAD_RES:string = "-6200";
	/** BOSS排行榜请求 */
	public static BOSS_RANK_REQ:number = 6201;
	public static BOSS_RANK_RES:string = "-6201";
	/** BOSS攻击 */
	public static BOSS_FIGHT_REQ:number = 6202;
	public static BOSS_FIGHT_RES:string = "-6202";
	/** BOSS强击 */
	public static BOSS_STORM_REQ:number = 6203;
	public static BOSS_STORM_RES:string = "-6203";
	/** BOSS数据更新推送 */
	public static BOSS_UPDATE_PUSH = "-6204";
}
