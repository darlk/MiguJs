/**
 * Created by wonder on 10/02/2017.
 */

var MiguInstance = (function () {
    var instance;
    return function () {
        return (instance || (instance = migu()));
    }
})();

var migu = function () {

    var openMiGuInitFun = function () {
        openMiGuInit(data_params.channel_code);
    };

    var loginTypeFun = function (msisdn, callback) {

        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            // loginType: "1",
            // callBackUrl: window.location.href, // 获取当前url
            loginType: "3",
            callBackUrl: "", // 获取当前url
            miguToken: "",
            key: data_params.api_key,
            msisdn: msisdn

        }

        showResult("n", "loginType:<br>params:", params);

        loginType(params);
    }

    var loginOutFun = function (callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token
        };

        showResult("n", "loginOut:<br>params:", params);

        loginOut(params);
    }

    var getUserInfoFun = function (callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token
        };

        showResult("n", "getUserInfo:<br>params:", params);

        getUserInfo(params);
    }

    var getAuditionToneUrlFun = function (contentId, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            contentId: contentId
        }

        showResult("n", "getAuditionToneUrl:<br>params:", params);

        getAuditionToneUrl(params);
    };

    /**
     *包月包策略查询
     * @param serviceId 包月包ID，开通特级会员、开通彩铃、白金会员可以不填写
     * @param type 3开通特级会员, 4开通彩铃功能,5CP包月,6白金会员(其他业务不填)
     * @param callback
     */
    var queryStrategyBYBFun = function (serviceId, type, callback) {

        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            serviceId: serviceId,
            count: "1",// 包月月份，比如：1个月填写1、2个月填写2，最大值12
            type: type
        };

        showResult("n", "queryStrategyBYB:<br>params:", params);

        queryStrategyBYB(params);
    };

    var openRingToneFun = function (callback) {

        data_params.callback = callback;

        queryStrategyBYBFun("", "4", "innerCallback.openRingToneCallback");

    };

    var orderRingToneFun = function (contentId, callback) {

        data_params.content_id = contentId;
        data_params.callback = callback;

        queryPolicyFun(contentId, 'innerCallback.queryPolicyCallback');


    }

    var getUserRingBaseFun = function (callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
        }

        showResult("n", "getUserRingBase:<br>params:", params);

        getUserRingBase(params);
    }

    var setRingFun = function (contentId, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            contentId: contentId
        }

        showResult("n", "setRing:<br>params:", params);

        setRing(params);

    }

    var delRingFun = function (callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            contentId: contentId
        }

        showResult("n", "delRing:<br>params:", params);

        delRing(params);
    }

    /**
     * 根据手机号查询用户默认铃音
     * @param msisdn 参数为空时查询当前登录用户
     * @param callback
     */
    var queryUserDefaultRingFun = function (msisdn, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            msisdn: msisdn
        }

        showResult("n", "queryUserDefaultRing:<br>params:", params);

        queryUserDefaultRing(params);

    }

    var queryOpenRingYNFun = function () {
        var params = {
            youCallbackName: "innerCallback.queryOpenRingYNCallback",
            channelCode: data_params.channel_code,
            token: data_params.token
        }

        showResult("a", "queryOpenRingYN:<br>params:", params);

        queryOpenRingYN(params);
    }

    var orderMonthRingFun = function (serviceId, callback) {

        data_params.callback = callback;
        data_params.crbt_month_service_id = serviceId;

        queryStrategyBYBFun(serviceId, "", "innerCallback.orderMonthRingCallback");

    }

    var cancelMonthRingFun = function (serviceId, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            serviceId: serviceId
        }

        showResult("n", "cancelMonthRing:<br>params:", params);

        cancelMonthRing(params);

    }

    var queryMonthRingYNFun = function () {
        var params = {
            youCallbackName: "innerCallback.queryMonthRingYNCallback",
            channelCode: data_params.channel_code,
            token: data_params.token,
            serviceId: data_params.crbt_month_service_id
        }

        showResult("a", "queryMonthRingYN:<br>params:", params);

        queryMonthRingYN(params);

    }

    var queryPolicyFun = function (contentId, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            contentId: contentId
        }

        showResult("n", "queryPolicy:<br>params:", params);

        queryPolicy(params);
    }

    var openCPMBFun = function (serviceId, callback) {

        data_params.cp_month_service_id = serviceId;
        data_params.callback = callback;

        queryStrategyBYBFun(serviceId, '', "innerCallback.openCPMBCallback")

    }

    var cancelCPMBFun = function (serviceId, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            serviceId: serviceId
        }

        showResult("n", "cancelCPMB:<br>params:", params);

        cancelCPMB(params);

    }

    var queryCPMBFun = function (cpId) {
        var params = {
            youCallbackName: "innerCallback.queryCPMBCallback",
            channelCode: data_params.channel_code,
            token: data_params.token,
            serviceId: cpId
        }

        showResult("a", "queryCPMB:<br>params:", params);

        queryCPMB(params);

    }

    var rdownlinkCPFun = function (contentId, cpId, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            contentId: contentId,
            serviceId: cpId,
            codeRate: "0" // 0：40kbps 1：128kbps
        }

        showResult("n", "rdownlinkCP:<br>params:", params);

        rdownlinkCP(params);

    }

    var queryRingPoicyFun = function (contentId, callback) {
        var params = {
            youCallbackName: functionName(callback),
            channelCode: data_params.channel_code,
            token: data_params.token,
            contentId: contentId,
            resource: "<resource>000018</resource><resource>999992</resource>" // 000018：40kbps 999992：128kbps

        }

        showResult("n", "queryRingPoicy:<br>params:", params);

        queryRingPoicy(params);

    }

    var getRingDownlinkFun = function (contentId, callback) {

        data_params.content_id = contentId;
        data_params.callback = callback;

        queryRingPoicyFun(contentId, 'innerCallback.queryRingPolicyCallback');

    }


    return {
        // 查询阳光计划接入信息
        openMiGuInitFun: openMiGuInitFun,

        // 获取登陆链接地址
        loginTypeFun: loginTypeFun,
        //退出当前登陆
        loginOutFun: loginOutFun,
        // 获取当前登陆用户信息
        getUserInfoFun: getUserInfoFun,
        //包月包策略查询
        queryStrategyBYBFun: queryStrategyBYBFun,

        // 查询用户是否开通了彩铃功能
        queryOpenRingYNFun: queryOpenRingYNFun,
        // 开通彩铃功能
        openRingToneFun: openRingToneFun,
        // 获取彩铃试听地址
        getAuditionToneUrlFun: getAuditionToneUrlFun,
        // 查询彩铃策略接口
        queryPolicyFun: queryPolicyFun,
        // 订购彩铃
        orderRingToneFun: orderRingToneFun,
        // 查询个人铃音库
        getUserRingBaseFun: getUserRingBaseFun,
        // 设置默认铃音
        setRingFun: setRingFun,
        // 删除个人铃音
        delRingFun: delRingFun,
        // 根据手机号查询用户默认铃音
        queryUserDefaultRingFun: queryUserDefaultRingFun,
        // 彩铃包月退订
        cancelMonthRingFun: cancelMonthRingFun,
        // 查询是否彩铃包月
        queryMonthRingYNFun: queryMonthRingYNFun,
        // 彩铃包月订购
        orderMonthRingFun: orderMonthRingFun,

        // CP专属包月订购
        openCPMBFun: openCPMBFun,
        // CP专属包月退订
        cancelCPMBFun: cancelCPMBFun,
        // 查询CP专属包月订购关系
        queryCPMBFun: queryCPMBFun,
        // CP专属包月包内振铃下载
        rdownlinkCPFun: rdownlinkCPFun,


        // 查询振铃下载策略
        queryRingPoicyFun: queryRingPoicyFun,
        // 获取振铃下载地址
        getRingDownlinkFun: getRingDownlinkFun,
    }

}

var innerCallback = (function () {

    function queryPolicyCallback(result) {

        if (result.resCode == return_code.success) {

            showResult("a", "result:", result);

            // 挑选bizInfo
            var bizInfo11, bizInfo00;

            for (i in result.bizInfos) {
                if (result.bizInfos[i].bizType == '11') { //按次收费
                    bizInfo11 = result.bizInfos[i];
                } else if (result.bizInfos[i].bizType == '00') { // 免费
                    bizInfo00 = result.bizInfos[i];
                }
            }

            var params = {
                youCallbackName: functionName(data_params.callback),
                channelCode: data_params.channel_code,
                token: data_params.token,
                cpId: result.cpId,
                contentId: data_params.content_id,
                productId: result.productId,
                bizCode: bizInfo11.bizCode,
                bizType: bizInfo11.bizType,
                salePrice: bizInfo11.salePrice,
                memberType: result.memberType,
                hold2: bizInfo11.hold2,
                name: "orderRingTone",
                excode: data_params.excode,
                defSeq: ""

            };

            showResult("a", "orderRingTone:<br>params:", params);

            orderRingTone(params);

        } else {
            data_params.callback(result, 0);
        }

    }

    function queryRingPolicyCallback(result) {

        if (result.resCode == return_code.success) {

            showResult("a", "result:", result);

            var params = {
                youCallbackName: functionName(data_params.callback),
                channelCode: data_params.channel_code,
                token: data_params.token,
                contentId: contentId,
                codeRate: "0", // 0：40kbps 1：128kbps
                bizCode: "",
                bizType: "",
                cpId: "",
                productId: "",
                salePrice: "",
                memberType: "",
                hold2: "",
                name: "getRingDownlink",
                excode: data_params.excode,
                defSeq: ""
            }

            showResult("a", "getRingDownlink:<br>params:", params);

            getRingDownlink(params);
        } else {
            data_params.callback(result, 0);
        }
    }

    function openCPMBCallback(result) {
        if (result.resCode == return_code.success) {

            showResult("a", "result:", result);

            var bizInfoMon = result.bizInfoMon;

            var params = {
                youCallbackName: functionName(data_params.callback),
                channelCode: data_params.channel_code,
                token: data_params.token,
                serviceId: data_params.cp_month_service_id,
                cpId: bizInfoMon.cpId,
                bizCode: bizInfoMon.bizCode,
                cpparam: bizInfoMon.cpparam,
                salePrice: bizInfoMon.salePrice,
                name: "openCPMB",
                excode: data_params.excode,
                defSeq: ""
            }

            showResult("a", "openCPMB:<br>params:", params);

            openCPMB(params);

        } else {
            data_params.callback(result, 0);
        }
    }

    function queryOpenRingYNCallback(result) {
        showResult("a", "result:", result);
        data_params.is_crbt_member = (result.resCode == return_code.success);
    }

    function queryCPMBCallback(result) {
        showResult("a", "result:", result);
        data_params.is_cp_month_opened = (result.resCode == return_code.success);
    }

    function queryMonthRingYNCallback(result) {
        showResult("a", "result:", result);
        data_params.is_crbt_month_opened = (result.resCode == return_code.success);
    }

    function orderMonthRingCallback(result) {

        if (result.resCode == return_code.success) {

            showResult("a", "result:", result);

            var bizInfoMon = result.bizInfoMon;

            var params = {
                youCallbackName: functionName(data_params.callback),
                channelCode: data_params.channel_code,
                token: data_params.token,
                serviceId: data_params.crbt_month_service_id,
                cpId: bizInfoMon.cpId,
                bizCode: bizInfoMon.bizCode,
                cpparam: bizInfoMon.cpparam,
                salePrice: bizInfoMon.salePrice,
                name: "orderMonthRing",
                excode: data_params.excode,
                defSeq: ""
            }

            showResult("a", "orderMonthRing:<br>params:", params);

            orderMonthRing(params);
        } else {
            data_params.callback(result, 0); // 获取policy出错
        }


    }

    function openRingToneCallback(result) {

        if (result.resCode == return_code.success) {
            showResult("a", "result:", result);

            var bizInfoMon = result.bizInfoMon;

            var params = {
                youCallbackName: functionName(callback),
                channelCode: data_params.channel_code,
                token: data_params.token,
                cpId: bizInfoMon.cpId,
                bizCode: bizInfoMon.bizCode,
                cpparam: bizInfoMon.cpparam,
                salePrice: bizInfoMon.salePrice,
                name: "openRingTone",
                excode: data_params.excode,
                defSeq: ""

            };

            showResult("a", "openRingTone:<br>params:", params);

            openRingTone(params);
        } else {
            data_params.callback(result, 0); // 获取policy出错
        }
    }

    return {
        queryPolicyCallback: queryPolicyCallback,
        queryRingPolicyCallback: queryRingPolicyCallback,
        openCPMBCallback: openCPMBCallback,
        queryOpenRingYNCallback: queryOpenRingYNCallback,
        queryCPMBCallback: queryCPMBCallback,
        queryMonthRingYNCallback: queryMonthRingYNCallback,
        orderMonthRingCallback: orderMonthRingCallback,
        openRingToneCallback: openRingToneCallback,
    };
})();


// 枚举常量
var enums = {
    flag: {success: '1', failure: '2'},
    msg_type: {toast: '1', alert: '2', confirm: '3'},
    status: {no: '0', yes: '1'},
    func_name: {
        login: 'login',
        relogin: 'relogin',
        open_month: 'open_month',
        open_ring: 'open_ring',
        order_ring: 'order_ring',
        set_ring: 'set_ring',
        show_page: 'show_page'
    },
    msg: {
        request_error: '抱歉，系统忙，请稍后重试',
        open_month_error: '抱歉，开通彩铃包月失败，请稍后重试',
        open_ring_error: '抱歉，开通彩铃基本失败，请稍后重试'
    },
    member_type: {unknown: '0', month: '1', special: '2'} // 0.未知、1.包月用户、2.特级会员
};

var data_params = {
    api_key: '6d435888ca204c8fa57f817f70f87828',
    channel_code: '002100O', // 渠道号
    token: '',
    mobile: '',
    content_id: '',
    resource_id: '',
    cp_month_service_id: '600967020000006633',
    crbt_month_service_id: '600927020000006631',
    ring_box_service_id: '',
    member_type: enums.member_type.unknown,
    logined: false,
    is_cp_month_opened: false,
    is_crbt_member: false,
    is_crbt_month_opened: false,
    excode: '',
    callback: ''
};


// 返回值对照表
var return_code = {
    success: '000000',
    has_no_record: '300002',
    ring_ordered: '302011',
    token_invalid: '999009',
    user_cancel: '044001',
    has_setted: '100002'
};

// 传入函数返回函数名
function functionName(func) {

    if (typeof func == 'string') {
        return func;
    } else if (typeof func == "function") {
        var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());
        return result ? result[1] : '';
    }

}

// 获取url查询参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 打印测试结果
function showResult(showType, logTitle, resultStr) {
    if (showType == "a") { //append
        document.getElementById("divResult").innerHTML =
            document.getElementById("divResult").innerHTML
            + "<br>"
            + logTitle
            + "<br>"
            + JSON.stringify(resultStr, null, 2);
    } else if (showType == "n") {//new
        document.getElementById("divResult").innerHTML = logTitle
            + "<br>"
            + JSON.stringify(resultStr, null, 2);
    }
}
