var innerHttpUrl = "http://125.88.171.116:30005";
var historyInfo = window.localStorage.getItem("historyInfo");
var egretLibList = null;
var mainList = null;
if(!historyInfo){
	historyInfo = [];
	window.localStorage.setItem("historyInfo",JSON.stringify(historyInfo));
}else{
	historyInfo = JSON.parse(historyInfo);
}

function showServerList(serverType){
	if(!window["loginInfo"]){
		return;
	}
	$("#typeServerList").html('');
	if("myServers" == serverType){
		var myServers = window["loginInfo"].myServers;
		if(!myServers){
			return;
		}
		for (var i in myServers) {
			var oneData = myServers[i];
			var serverData = oneData["server"];
			var _html = '<div sid="'+serverData.id+'" sname="'+serverData.ne+'" class="serverBiaoqian serverBiaoqian_webkit">'+serverData.ne+'</div>';
			$("#typeServerList").append(_html);
		}
	}
	if("allServers" == serverType){
		var saveAllServers = window["loginInfo"].saveAllServers;
		if(!saveAllServers){
			return;
		}
		for (var i in saveAllServers) {
			var serverData = saveAllServers[i];
			var _html = '<div sid="'+serverData.id+'" sname="'+serverData.ne+'" class="serverBiaoqian serverBiaoqian_webkit">'+serverData.ne+'</div>';
			$("#typeServerList").append(_html);
		}
	}
	$("#typeServerList").children().click(function(){
		$('#servername').html($(this).attr("sname"));
		//更改本地上一次的登录服务器
		var saveAllServers = window["loginInfo"].saveAllServers;
		var curSid = $(this).attr("sid");
		var lastServer = saveAllServers[curSid];
		window["loginInfo"].lastServer = lastServer;
		$('#serverList').hide();
	});
}

function fillServerInfo(info){    
    if(!info){
        window.alert("未获取到服务器列表!");
        return;
    }    
    var allServers = info.gsl;
    if(!allServers || allServers.length == 0){
        window.alert("服务器列表为空!");
        return;       
    }
	var saveAllServers = {};//所有服
	for(var i in allServers){
		var k = String(allServers[i].id);
		var v = allServers[i];
		saveAllServers[k] = v;
	}

	var lastServer = saveAllServers[String(info.preSid)];//最近服
    var newServer = allServers[0];//最新服
	if(!lastServer){
        lastServer = newServer;
    }  

    var myServers = {};//我的服务器
    if(info.rl){
    	for(var i in info.rl){
			var k = String(info.rl[i].sid);
    		var v = info.rl[i];
			v.server = saveAllServers[k];
    		myServers[k] = v;
    	}
    }   
                 
    var sname = lastServer.ne;
    var slabel = lastServer.label;  
    $('#servername').html(sname);	        
    if (slabel == 3) {
        $('#showServerList').html("&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
    } else {        
        $('#showServerList').html("&nbsp;&nbsp;&nbsp;选服&gt;");
    }
    $('#newname').html(newServer.ne);
    //保存登录游戏服信息
	var loginInfo = {};
	loginInfo.saveAllServers = saveAllServers;
    loginInfo.lastServer = lastServer;
    loginInfo.myServers = myServers;
	loginInfo.account = info.ac;
	loginInfo.token = info.key;
    window["loginInfo"] = loginInfo;
}

function loginAccount(){
	var acc = $("#accountInput").val();
    var pwd = $("#passwordInput").val();
    if(!acc || !pwd){
        window.alert("账号或密码不能为空!");
        return;
    } 
    var paramObj = {
        channel: 10000,
        acc: acc,
        pwd: pwd
    };
    var p = AccountUtil.getURLVariables(paramObj);            
    $.ajax({
        type: "POST",
        url: innerHttpUrl+"/action/user/login",
        data: p,
        dataType:"json",
        success: function (data) {
            if(!data || data.s != 0){
                window.alert("获取服务器列表失败!");
                return;
            }
            
            var historyData = {};
            historyData.acc = acc;
            historyData.pw = pwd;
            var delIdx = -1;
            for (var i = 0; i < historyInfo.length; i++) {
				var delData = historyInfo[i];
				if(delData.acc == acc){
					delIdx = i;
					break;
				}
			}
			if(delIdx > -1){
				historyInfo.splice(delIdx,1);
			}			
            historyInfo.push(historyData);
            window.localStorage.setItem("historyInfo",JSON.stringify(historyInfo));
            $("#loginDialog").hide();
			$("#loginServer").show();
			fillServerInfo(data.r);
        },
        error: function (e) {
            window.alert("获取服务器列表失败!");
            console.log(e);
        }
    });
}


function fastRegister(){    
    var paramObj = {
        channel: 10000
    };
    var p = AccountUtil.getURLVariables(paramObj);            
    $.ajax({
        type: "POST",
        url: innerHttpUrl+"/action/user/fastReg",
        data: p,
        dataType:"json",
        success: function (data) { 
            if(!data || data.s != 0){
                window.alert("一键注册失败!");//到时候换统一弹框
                return;
            }                   
            var acc = data.r.ac;
            var pw = data.r.pw;
            $("#accountInput").val(acc);
            $("#passwordInput").val(pw);
            var historyData = {};
            historyData.acc = acc;
            historyData.pw = pw;
            historyInfo.push(historyData);
            window.localStorage.setItem("historyInfo",JSON.stringify(historyInfo));
            $("#registerDialog").hide();
            $("#loginDialog").show();			
            window.alert("注册成功!");
            
        },
        error: function (e) {
            window.alert("一键注册失败!");
            console.log(e);
        }
    });
}

function register(){            
    var acc = $("#regAccountInput").val();
    var pwd = $("#regPasswordInput").val();
    if(!acc || !pwd){
        window.alert("账号或密码不能为空!");
        return;
    }    
    var paramObj = {
        acc:acc,
        pwd:pwd,
        channel: 10000
    };
    var p = AccountUtil.getURLVariables(paramObj);            
    $.ajax({
        type: "POST",
        url: innerHttpUrl+"/action/user/register",
        data: p,
        dataType:"json",
        success: function (data) { 
            if(!data || data.s != 0){
                window.alert("注册失败!");
                return;
            }                   
            var acc = data.r.ac;
            var pw = data.r.pw;
            $("#accountInput").val(acc);
            $("#passwordInput").val(pw);
            var historyData = {};
            historyData.acc = acc;
            historyData.pw = pw;
            historyInfo.push(historyData);
            window.localStorage.setItem("historyInfo",JSON.stringify(historyInfo));
            $("#registerDialog").hide();
            $("#loginDialog").show();			
            window.alert("注册成功!");
        },
        error: function (e) {
            window.alert("注册失败!");
            console.log(e);
        }
    });
}

var loadScript = function (list,processCallBack, completeCallback) {
	var loaded = 0;
	var loadNext = function () {
		loadSingleScript(list[loaded], function () {
			loaded++;
			processCallBack.call(this,loaded,list.length);
			if (loaded >= list.length) {
				completeCallback();
			}
			else {
				loadNext();
			}
		})
	};
	loadNext();
};

var loadSingleScript = function (src, callback) {
	var s = document.createElement('script');
	s.async = false;
	s.src = src;
	s.addEventListener('load', function () {
		s.parentNode.removeChild(s);
		s.removeEventListener('load', arguments.callee, false);
		callback();
	}, false);
	document.body.appendChild(s);
};

/*主进度条 */
var runMainProgress = function (pro) {    
    var w = (pro / 100) * 8.875;
    $(".process1Content").width(w+"rem");
}
window["runMainProgress"] = runMainProgress;

/*二级进度条 */
var currentW = 0;
var runSubProgress = function (current,total){    
    if (currentW == 8.875) {
        currentW = 0;
    }
    currentW = (current / total) * 8.875;
    $(".process2Content").width(currentW+"rem");
}
window["runSubProgress"] = runSubProgress;
window["jquery"] = $;//方便ts调用 

/**登录游戏 */
function loginGame() {
    if (window["loginInfo"]) {  
        loadEgretLib();
    } else {
        setTimeout(loginGame, 50);
    }
}

/**加载游戏引擎 */
function loadEgretLib(){
	if(!egretLibList){
		console.error("游戏引擎文件加载失败!");
		return;
	}
    loadScript(egretLibList,runSubProgress, function () {            
        runMainProgress(15);//加载游戏引擎完毕占比15%        
        loadMain();
    });
}
/**加载游戏主程序 */
function loadMain(){
	if(!mainList){
		console.error("游戏主程序文件加载失败!");
		return;
	}
    loadScript(mainList,runSubProgress, function () {            
        runMainProgress(30);//加载游戏主程序完毕占比30%        
        runEgretMain();       
    });
}

/**进入白鹭 */
function runEgretMain() {
    egret.runEgret({ renderMode: "webgl", audioType: 0, calculateCanvasScaleFactor:function(context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }});
}

/*页面组件初始化*/
$(function(){
	//登录框历史账号密码填充
	if(historyInfo.length > 0){
		var lastData = historyInfo[historyInfo.length-1];
		$("#accountInput").val(lastData.acc);
        $("#passwordInput").val(lastData.pw);
	}
	//注册绑定相关开始
	$("#registerBtn").click(function(){
		$("#loginDialog").hide();
		$("#registerDialog").show();
	});
	
	$("#fastReg").click(function(){
		fastRegister();
	});
	
	$("#normalReg").click(function(){
		register();
	});
	//注册绑定相关结束

	//登录绑定相关开始
	$("#loginBtn").click(function(){
		loginAccount();
	});
	//登录绑定相关结束	
	$("#xialaBtn").click(function(){
		$("#accountSelect").html('');
		var _head = '<div style="height: 0.1rem;"></div>';
		$("#accountSelect").append(_head);
		if(historyInfo.length > 0){			
			for (var i = 0; i < historyInfo.length; i++) {
				var hisData = historyInfo[i];
				var _html = '<div class="accountItem accountItem_webkit"><label style="font-size: 0.3rem;visibility:hidden;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><label>'+hisData.acc+'</label></div><div class="accountItemLine"></div>';
				$("#accountSelect").append(_html);
			}
		}
		$(".accountItem").click(function(){
			var accLb = $(this).children("label").get(1);
			var acc = $.trim($(accLb).html());
			$("#accountInput").val(acc);
			for (var i = 0; i < historyInfo.length; i++) {
				var hisData = historyInfo[i];
				if(acc == hisData.acc){
					$("#passwordInput").val(hisData.pw);
					break;
				}
			}
			$("#accountSelect").hide();
		});

		var _state = $("#accountSelect").css("display");
		if("none" == _state){
			$("#accountSelect").show();
		}else{
			$("#accountSelect").hide();
		}
	});

	$("#accountInput").focus(function(){
		var _state = $("#accountSelect").css("display");
		if("none" != _state){
			$("#accountSelect").hide();
		}
	});
	//登录绑定相关结束

	//选服绑定相关开始
	$("#showServerList").click(function(){
		$(".typeServer").children().removeClass("selectZone");
		$(".typeServer").children().removeClass("selectZone_webkit");
		$(".typeServer").children().addClass("normalServer");
		$(".typeServer").children().addClass("normalServer_webkit");
		$("#myServers").removeClass("normalServer");
		$("#myServers").removeClass("normalServer_webkit");
		$("#myServers").addClass("selectZone");
		$("#myServers").addClass("selectZone_webkit");
		showServerList("myServers");//默认显示我的服务器
		$("#serverList").show();
	});
	$("#closeList").click(function(){
		$("#serverList").hide();
	});
	$(".typeServer").children().click(function(){
		$(".typeServer").children().removeClass("selectZone");
		$(".typeServer").children().removeClass("selectZone_webkit");
		$(".typeServer").children().addClass("normalServer");
		$(".typeServer").children().addClass("normalServer_webkit");
		$(this).removeClass("normalServer");
		$(this).removeClass("normalServer_webkit");
		$(this).addClass("selectZone");
		$(this).addClass("selectZone_webkit");
		showServerList($(this).attr("id"));
	});	
	//选服绑定相关结束

	//公告绑定相关开始
	$("#notice").click(function(){
		$("#noticeContent").show();
	});
	$("#noticeClose").click(function(){
		$("#noticeContent").hide();
	});
	//公告绑定相关结束

	//登录游戏服
	$("#loginGame").click(function(){
		$("#loginServer").hide();		
		$("#loading").show();
		loginGame();
	});

	//初始化需要加载的js文件列表
	var xhr = new XMLHttpRequest();
    xhr.open('GET', '../manifest.json?v=' + Math.random(), true);
    xhr.addEventListener("load", function () {
        var manifest = JSON.parse(xhr.response);
        egretLibList = manifest.initial;
        mainList = manifest.game;        
    });
    xhr.send(null);
	/*
	var w = 0;	
	setInterval(function(){
		console.log(123);
		if(w >= 8.875){
			w = 0;
		}
		w = w + 0.5;
		
		$(".process2Content").width(w+"rem");
		$(".process1Content").width(w+"rem");
	},1000);*/
});