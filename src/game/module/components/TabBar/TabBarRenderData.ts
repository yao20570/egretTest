/**
 * tabbar样式数据，简化动态设置tabbar的按钮
 * wenzongyao
 * 2018-4-11
*/

module components {
    export class TabBtnRenderData {
        public name: string;
        public tipNum: number;
        public isShowTip: boolean;
        public isLock: boolean;
        public upStr: string;
        public downStr: string;
        public constructor($name: string
            , $tipNum: number = 0
            , $isLock: boolean = false
            , $upStr: string = "v1_btn_biaoqian_png"
            , $downStr: string = "v1_btn_selected_biaoqian_png") {
            
            this.name = $name;
            this.tipNum = $tipNum;
            this.isShowTip = $tipNum > 0;
            this.isLock = $isLock;
            this.upStr = $upStr;
            this.downStr = $downStr;
        }
    }

    export class TabBarRenderData extends eui.ArrayCollection {
        public constructor($data: Array<TabBtnRenderData>) {
            super($data);
        }
    }
}