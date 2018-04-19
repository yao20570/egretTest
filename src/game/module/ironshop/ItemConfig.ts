class ItemConfig extends BaseConfig {

    /**物品配置表*/
    private tItemResourceData: any;

	public constructor(resources: string[]) {
		super("ItemConfig", resources);
	}

	/**
	 * 通过装备id获取装备数据数据（和任我有区别，任我构建了一个数据结构来转化这个数据）
	 * @$id : 物品配置id
	 * */
	public getItemResourceDataById($id):any {
		/**初始化配置表*/
		if (!this.tItemResourceData) {
            this.tItemResourceData = {}
			let data: JSON = RES.getRes("item_resource_json");
			for (let i in data) {
				let row = data[i];
				let key = row.id;
				this.tItemResourceData[key] = row;
			}
		}

		return this.tItemResourceData[$id]
	}
}