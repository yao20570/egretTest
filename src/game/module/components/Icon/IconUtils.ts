// TypeScript file

/**
 * 根据品质设置背景框（物品，武将）
 * _pImgBg: 品质框图片节点
 * _nQuality: 品质
 * _bTx:是否有特效
*/
function setBgQuality(_pImgBg: eui.Image, _nQuality: number) {

    _nQuality = _nQuality || 1;

    switch (_nQuality) {
        case 1: _pImgBg.source = "v1_img_touxiangkuanghui_png"; break;
        case 2: _pImgBg.source = "v1_img_touxiangkuanglv_png";   break;
        case 3: _pImgBg.source = "v1_img_touxiangkuanglan_png";   break;
        case 4: _pImgBg.source = "v1_img_touxiangkuangzi_png";   break;
        case 5: _pImgBg.source = "v1_img_touxiangkuangcheng_png";   break;
        case 6: _pImgBg.source = "v1_img_touxiangkuanghong_png";   break;
        case 100: _pImgBg.source = "v2_img_kapaiygwc_png";   break;
    }

    
}

function setIconTx(_pGroup:eui.Group, _nQuality:number):void{
    if (_nQuality >= 5 && _nQuality < 100) {
        Error("还没写添加特效的功能")
    }
}