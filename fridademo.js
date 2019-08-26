'use strict'
Java.perform(function () {
    var utils = Java.use('com.yangjl.fridademo.Utils');
    var coinMoneyClass = Java.use('com.yangjl.fridademo.CoinMoney');

    // utils.getPwd.implementation = function () {
    //     console.log("Hook Start...");
    //     send("Success");
    //     return this.getPwd() + "hello";
    // }

    // coinMoneyClass.$init.overload("int").implementation = function (money) {
    //     send(money);
    //     money = 888;
    //     return this.$init(money);
    // }

    // utils.getCoin.implementation = function () {
    //     //两种方法都可以
    //     //var coinObj = coinMoneyClass.$new.overload("int","java.lang.String").call(coinMoneyClass,2,"2.0");
    //     var coinObj = coinMoneyClass.$new(2, "2.0");
    //     return coinObj;
    // }

    utils.getCoinMoney.implementation = function () {
        var coin = arguments[0];
        send("coin obj:" + coin);

        //调用方法
        var money = coin.getMoney();
        send('getCoinMoney money:'+money);

        //获取字段值
        var money1= coin.money.value;
        send("money field:"+money1); 
        coin.money.value = 888;//设置字段值
        send('getCoinMoney money:'+coin.getMoney());

        //通过反射获取字段值
        var clazz = Java.use("java.lang.Class");
        var money_field_name = Java.cast(coin.getClass(),clazz).getDeclaredField("money");
        money_field_name.setAccessible(true);
        send("reflect money field:"+money_field_name.get(coin));
        //通过反射设置值
        money_field_name.setInt(coin,101);
        send(coin.getMoney());
        return 666;
    }

})