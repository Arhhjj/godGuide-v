import Singleton from "../cmpt/base/Singleton"

// 属性装饰器：用于添加get和set方法
function GetSet(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        get: function () {
            return this[`_${propertyKey}`];
        },
        set: function (value: any) {
            this[`_${propertyKey}`] = value;
        },
    });
}

/**用户数据类 */
export default class UserInfo extends Singleton {
    static get instance() {
        return super.getInstance<UserInfo>()
    }

    private _userName: string = "" //用户名称
    @GetSet userName: string

    private _coin: number = 0 //金币
    @GetSet coin: number

    private _levelProgress: number = 1
    @GetSet levelProgress: number

    private _signInDays: number = 0
    @GetSet signInDays: number

    private _lastSignInDate: any = null
    @GetSet lastSignInDate: any

    private _propConfig: number[] = []
    @GetSet propConfig: number[]

    private _roleConfig: number[] = []
    @GetSet roleConfig: number[]


    /**初始化初始数据内容结构 */
    public initUserInfo() {
        this.userName = "Ar"
        this.coin = 1000
        this.levelProgress = 1
        this.signInDays = 0
        this.lastSignInDate = null
        this.propConfig = [1, 1, 1, 1]
        this.roleConfig = [1107, 150, 580, 220]
    }

    /**设置用户数据 */
    public setUserInfo(data) {
        if (!data) return
        Object.assign(this, data)
    }

    /**获取用户数据 */
    public getUserInfo() {
        const data = {
            userName: this.userName,
            coin: this.coin,
            levelProgress: this.levelProgress,
            signInDays: this.signInDays,
        }
        return data
    }
}

/**用户数据本地存储 */
export class UserInfoStorge {
    /**本地数据key */
    private static key: string = "userInfo"

    /**储存数据 */
    public static setUserInfo(value: any = UserInfo.instance.getUserInfo(), key = this.key) {
        cc.sys.localStorage.setItem(key, JSON.stringify(value))
    }

    /**获取数据 */
    public static getUserInfo(key = this.key) {
        return JSON.parse(cc.sys.localStorage.getItem(key))
    }

    /**清除用户的本地数据 */
    public static clearUserInfo(key = this.key) {
        cc.sys.localStorage.removeItem(key)
    }

    /**新增用户数据 -- value只包含新增的内容 */
    public static addUserInfo(value: any, key = this.key) {
        const userInfo = this.getUserInfo(key)
        if (userInfo) {
            const addUserInfo = { ...userInfo, ...value }
            this.setUserInfo(addUserInfo, key)
        }
    }

    /**是否存在本地数据 */
    public static hasUserInfo(key = this.key) {
        return cc.sys.localStorage.getItem(key) !== null
    }

    /**删除指定的本地数据 */
    public static removeUserInfo(key: string) {
        cc.sys.localStorage.removeItem(key)
    }

    /**获取所有本地数据 */
    public static getAllUserInfo() {
        const userInfo = []
        for (let i = 0; i < cc.sys.localStorage.length; i++) {
            const key = cc.sys.localStorage.key(i)
            if (key.startsWith(this.key)) {
                const value = JSON.parse(cc.sys.localStorage.getItem(key))
                userInfo.push(value)
            }
        }
        return userInfo
    }

} 
