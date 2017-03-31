/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-28 18:22
 * @description  测试类的总控制
 * @file
 *
 */

(function(){

    var test = function(){
        this.base = undefined; // 全局变量
    };

    /**
     *  测试异步加载js文件
     * @type {{}}
     */
    test.prototype.load = {
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
    test.prototype.log = {
        /**
         *  测试log中的结构,
         * @param fobj 是test对象
         */
        'struct':function(fobj){
            console.info(fobj);
            var loggerTemp = fobj.base.log;
            console.info(loggerTemp);
        },
        /**
         *  测试控制全局的error事件，在 log 模块中进行绑定
         * @param fobj 是test对象
         */
        'windowError':function(fobj){
            var a = {};
            // 这里触发报错
            //console.info(a.a.a);
        },
        /**
         *  测试断言的 error 是否正确
         * @param fobj 是test对象
         */
        'assert_error':function(fobj){
            console.info(fobj);
            fobj.base.assert.error("测试 错误信息");
        }
    };
    /**
     *  总的入口
     */
    var init = function(fobj){
         var temp = fobj.test = new test(); // appPromise实例存放在全局中
        temp.base = fobj;

        console.info(fobj);
        // 异步加载 js 文件测试
        //temp.load.t1();
        //temp.load.t2();

        // 日志测试
        //temp.log.struct(temp);
        temp.log.windowError(temp);
        //temp.log.assert_error(temp);
    };

    return init;
})()(base);
