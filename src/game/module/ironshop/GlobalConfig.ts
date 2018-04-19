class GlobalConfig extends BaseConfig {

	private tProtoErrTips: any;

	public constructor(resources: string[]) {
		super("GlobalConfig", resources);
	}

	/**
	 * 获取接收协议时的报错tip
	 * @_id : 装备配置id
	 * @return 找不到为null
	 * */
	public getProtoErrTips(_id):string {
		/**初始化配置表*/
		if (!this.tProtoErrTips) {
			this.tProtoErrTips = {}
			let data: JSON = RES.getRes("tips_base_json");
			for (let i in data) {
				let row = data[i];
				let key = row.tip_index;
				this.tProtoErrTips[key] = row.content;
			}
		}
		return this.tProtoErrTips[_id]
	}
}