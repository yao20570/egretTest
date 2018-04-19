class SectionOne extends eui.Button {
	public sectionOne: eui.Group;
	public stateImg: eui.Image;
	public sectionGroup: eui.Group;
	public sectionName: eui.Label;
	public startNum: eui.Group;
	public ray1: eui.Image;
	public ray2: eui.Image;
	public ray3: eui.Image;
	public bg: eui.Image;
	public stateBg: eui.Image;
	private Group;
	public constructor() {
		super();
		this.skinName = SectionOneSkin;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
	}
	private touchHandler(evt: egret.TouchEvent) {
		if (!this.Group) {
			this.Group = Object.create(this.sectionOne);
		}
		switch (evt.type) {
			case egret.TouchEvent.TOUCH_BEGIN:
				this.bg.mask = this.Group;
				break;
			case egret.TouchEvent.TOUCH_END:
				this.bg.mask = null;
				break;
		}
	}
}