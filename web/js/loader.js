/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-26 02:29
 * @description  功能 js 加载器
 * @file
 *
 */

/**
 *  全局参数控制的变量
 * @type {{coreconfigPath: string, promisePath: string[]}}
 */
var base = {
    'coreconfigPath':'js/config/coreparam.config',
    'promisePath':['js/promise/app.js','js/promise/server.js']
};

$(function(){
    new loader().init(base);
});

/**
 *   加载器类
 */
var loader = function(){
};

/**
 *  首先加载必须的文件
 * @param fobj
 */
loader.prototype.init = function (fobj) {
    this._loadConfigParams(fobj);
    this._loadPromiseConfig(fobj);
};

/**
 *  加载 config 下面的配置的 .config 的json文件，需要过滤注释
 */
loader.prototype._loadConfigParams = function(fobj){
    var url = fobj.coreconfigPath;
    var tempPromise = $.ajax({
        type: 'GET',
        url: url,
        async: false,
        cache: true,
        dataType: 'text'
    });
    $.when(tempPromise).done(function(data) {
        // 头部注释过滤
        data = data.substring(data.indexOf('{'), data.length);
        // 正则表达式
        var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;
        var param = data.replace(reg, function (word) { // 去除注释后的文本
            return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;
        });
        $.extend(fobj, JSON.parse(param));
    });
};

/**
 *  加载 promise 文件
 */
loader.prototype._loadPromiseConfig = function(fobj){
    var urls = fobj.promisePath;
    var tempPromises = [];
    for (var i = 0; i < urls.length; i++) {
        // 需要设置同步，否则异步控制不了完成后的数据参数的植入
        var tempPromise = $.ajax({
            type: 'GET',
            url: urls[i],
            cache: true,
            dataType: 'script',
            async: false
        });
        tempPromises.push(tempPromise);
    }

    alert(1);
    // when 加载直接使用 promise 数组
    $.when(tempPromises).then(function(data){
        // 开始进行所有的加载 app 文件 , 设置 app  和 server 中的参数
        var temp = new appPromise();
        temp.init(fobj);
    });
};


// 加载需要的文件
function b(){
    console.log('writeScriptTag_=' + url);
    $.ajax(url, { async: true, cache: true, dataType: 'script' });
}

// 加载第三方插件库,不包括 jquery
function c(param){

}