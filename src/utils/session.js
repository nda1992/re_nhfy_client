export const StorageClass = new class Session {
  /**
   * 加密数据
   * @param {any} data 转为base64数据
   */
  encrypt(data){
    let set = encodeURIComponent(data), result = btoa(set);
    return result;
  }
  /**
   * 解码数据
   * @param {any} data 数据
   */
  MyLocker(data){
    try{
      let jieMi = atob(data), jieM = decodeURIComponent(jieMi);
      return jieM;
    }catch(e){
      throw Error('解码出错')
    }
  }
  /**
   *  根据参数区分存储对象
   * @param Session
   * @returns {Storage} 返回 Session 存储对象
   */
  isSession(Session){
    return Session ? localStorage : sessionStorage;
  }
  /**
   * 判断该当前的key 是否存在
   * @param key
   * @constructor
   */
  ISKET(key){
    if(!key){
      throw Error('请传入Session的KEY!!!')
    }
  }
  /**
   * Session存储方法
   * @param key 存储的key值
   * @param setObj 存储的数据
   * @param Session 存储 localStorage 还是 sessionStorage 默认 sessionStorage
   */
  setSession(key,setObj,Session){
    // console.log(this);
    this.ISKET(key);
    if(Object.keys(setObj).length > 0){
      setObj = JSON.stringify(setObj);
    }

    let Storage = Session ? localStorage : sessionStorage

    this.isSession(Session).setItem(this.encrypt(key),this.encrypt(setObj))
  }
  /**
   * 获取存储的值
   * @param key 存储的key
   * @param Session  存储 localStorage 还是 sessionStorage 默认 sessionStorage
   * @returns {any} 返回对应的key 的数据
   */
  getSession(key,Session){
    this.ISKET(key);
    let data = this.isSession(Session).getItem(this.encrypt(key))
    if(data){
      try{
        return  JSON.parse(this.MyLocker(data))
      }catch(e){
        console.error('getSession方法获取数据错误');
        return false
      }
    }
  }
  sessionClear(key,Session){
    this.ISKET(key);
    this.isSession(Session).removeItem(key)
  }
  sessionClearAll(Session){
    this.isSession(Session).clear();
  }
}



// let set = new  Session();
// // set.setSession(123,{name:'张三',data:[1,2,3,4,5],msg:'终端设备是副科级多喝水广发卡见鬼十法卡的很发生过哈师大'})
// // console.log(set.getSession(123));
