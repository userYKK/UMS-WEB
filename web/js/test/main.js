/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-28 18:22
 * @description  测试类的总控制
 * @file
 *
 */

var test = {};


/**
 *  总的入口
 */
test.init = function(){
    // 异步加载 js 文件测试
    //test.load.t1();
    //test.load.t2();

    // 日志测试
    this.log.struct();
    //this.log.windowError();
};


/**
 *  测试异步加载js文件
 * @type {{}}
 */
test.load = {
    't1':function(){ // html标签写入js，获取json对象中的function,并且执行
        console.info('test.load.t1 方法');
    },
    't2':function(){// 测试标签写入js后的json对象的属性中的function 是否执行
        for(var a in this.t3){
            this.t3[a]();
        }
    },
    't3':{
        'tt1':function(){
            console.info('test.load.t3.tt1 方法');
        },
        'tt2':function(){
            console.info('test.load.t3.tt2 方法');
        }
    }
};

/**
 *  日志的测试部分
 *  @type {{windowError: Function}}
 */
test.log = {
    'struct':function(){ // 测试log中的结构
        var loggerTemp = new log();
        console.info(loggerTemp);
    },
    'windowError':function(){ // 测试控制全局的error事件，在 log 模块中进行绑定
        var a = {};
        // 这里触发报错
        console.info(a.a.a);
    }
};