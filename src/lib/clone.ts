function clone<T>(data:T):T{
    //声明一个类型  DATA什么类型 返回值什么类型
    return JSON.parse(JSON.stringify(data))
}
export default clone