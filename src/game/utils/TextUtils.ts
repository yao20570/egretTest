/**
 * 文本工具
 * author: wenzongyao
 * time:2018-04-08 
 */

class TextUtils {
    /**
     * 获取多国化的文本内容     
     * @param $key：当前的内容的索引
     * @return 对应的字符串
     * */
    public static getText($key: string) {       
        /**对应的语言文件*/
        let data: JSON = RES.getRes("language_cn_json");
        if (data[$key] == null) {
            /**找不到则返回默认字符串*/
            return TextUtils.getText("10000");
        } 
        
        return data[$key];
    }


    /**
     * 数字转换为带单位的字符串
     * @param _nCount: 当前数量
     * @return 带单位的字符串， 如 1024=1.02k, 45374563=45.4m
     * */
    public static getNumWithUnit(_nCount: number) {
        if (!_nCount) {
            return ""
        }

        if (_nCount >= 100000000000) {
            /**100b == 1000亿*/
            let _nNew = _nCount / 1000000000;
            return _nNew.toFixed(0) + "b";
        } else if (_nCount >= 999000000) {
            /**10b == 100亿*/
            let _nNew = _nCount / 1000000000;
            return _nNew.toFixed(1) + "b";
        } else if (_nCount >= 1000000000) {
            /**1b == 10亿*/
            let _nNew = _nCount / 1000000000;
            return _nNew.toFixed(2) + "b";
        } else if (_nCount >= 100000000) {
            /**100m == 1亿*/
            let _nNew = _nCount / 1000000;
            return _nNew.toFixed(0) + "m";
        } else if (_nCount >= 999000) {
            /**10m = 1000万*/
            let _nNew = _nCount / 1000000;
            return _nNew.toFixed(1) + "m";
        } else if (_nCount >= 1000000) {
            /**1m = 100万*/
            let _nNew = _nCount / 1000000;
            return _nNew.toFixed(2) + "m";
        } else if (_nCount >= 100000) {
            /**100k = 10万*/
            let _nNew = _nCount / 1000;
            return _nNew.toFixed(0) + "k";
        } else if (_nCount >= 10000) {
            /**10k = 1万*/
            let _nNew = _nCount / 1000;
            return _nNew.toFixed(1) + "k";
        } else if (_nCount >= 1000) {
            /**1k = 1千*/
            let _nNew = _nCount / 1000;
            let m = _nCount % 100;
            if (m > 0) {
                return _nNew.toFixed(2) + "k";
            } else {
                return _nNew.toFixed(0) + "k";
            }
        }

        return Math.ceil(_nCount) + "";
    }

}
