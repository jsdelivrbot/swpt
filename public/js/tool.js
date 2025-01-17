var TOOL={
    //存储单个属性
    set :function(key,value){
        window.localStorage[key]=value;
        // console.log(window.localStorage);
    },
    //读取单个属性
    get:function(key,defaultValue){
        return window.localStorage[key] || defaultValue;
    },
    //存储对象，以JSON格式存储
    setObject:function(key,value){
        window.localStorage[key]=JSON.stringify(value);
    },
    //读取对象
    getObject: function (key) {
        // console.log(key);
        return window.localStorage[key]?JSON.parse(window.localStorage[key]):'';
    }
};