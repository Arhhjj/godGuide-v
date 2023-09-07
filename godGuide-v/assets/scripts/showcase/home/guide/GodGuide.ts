import { EventName } from "../../../common/const/EventName";
import Events, { preloadEvent } from "../../../common/util/Events";
import Res from "../../../common/util/Res";
import guideTasks from "./task/GuideTaskIndex";

const { ccclass, property } = cc._decorator;
// declare let require: (string) => any;
// let async = require('async');

import * as async from 'async'

@ccclass
export class GodGuide extends cc.Component {

    /**手指预制件 */
    @property(cc.Prefab) fingerPrefab: cc.Prefab = null

    private _finger: cc.Node = null
    private _mask: cc.Mask = null
    private _targetNode: any = null//引导的目标（也就是要引导玩家操作的目标）

    onLoad() {
        Events.targetOn(this)

        if (this.fingerPrefab) {
            /**若要进行资源引用计数管理 应使用Res中的instantiate进行加载 */

            this._finger = cc.instantiate(this.fingerPrefab)
            this._finger.parent = this.node
            this._finger.active = false
            //this._finger.getComponent("GuideFinger").stopAnim() //手指可以挂一些动画脚本
        }

        this.node.setContentSize(cc.winSize)
        this.node.on(cc.Node.EventType.TOUCH_START, this.addSetSwallowTouchesEventListener, this)

        this._mask = this.node.getComponentInChildren(cc.Mask)
        this._mask.node.active = false //mask遮挡面板默认不开启，只有在引导时在开启
    }

    protected onDestroy(): void {
        Events.targetOff(this)
    }

    /**
     * 由事件进行派发的引导处理
     * @param data 
     */
    @preloadEvent(EventName.EXCUTE_GUIDE_TASK)
    excuteGuideTask(data) {
        console.log("接收的引导数据", data);
        this._mask.node.active = true;  //引导前开启遮挡面板

        let flie = guideTasks[`${data}`]
        let task = flie.task

        this._targetNode = null; //每次引导执行前，都将之前的引导目标清空

        async.eachSeries(task.steps, (step, cb) => {
            this._processStep(step, cb)
        }, () => {
            this._mask._graphics.clear();
            this._mask.node.active = false;//关闭遮挡面板
            this._finger.active = false;
        })

    }

    /**执行引导步骤 */
    _processStep(step, callback) {
        //调用async.series来执行引导的步骤
        async.series({
            stepStart(markonCb) {
                if (step.onStart) {
                    step.onStart(() => {
                        markonCb();
                    });
                } else {
                    markonCb();
                }
            },
            stepExcute: (markonCb) => {
                if (step.onExcute) {
                    step.onExcute(() => {
                        this.scheduleOnce(() => {
                            let cmd = GodGuide[step.command.cmd];
                            if (cmd) {
                                cmd(this, step, (error) => {
                                    markonCb(error);
                                });
                            }
                        }, step.delayTime || 0);
                    });
                } else {
                    markonCb();
                }
            },
            stepEnd: (markonCb) => {
                if (step.onEnd) {
                    step.onEnd(() => {
                        markonCb();
                    });
                } else {
                    markonCb();
                }
            },
        },
            (error, result) => {
                if (error) {
                    //如果存在意外终止 doSomething。。。。
                    return
                }
                //引导执行完毕
                callback()
            })

    }

    /**
     * 事件的吞没处理机制
     */
    addSetSwallowTouchesEventListener(event) {
        if (!this._mask.node.active) {
            this.node._touchListener.setSwallowTouches(false);
            return;
        }
        if (!this._targetNode) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        if (!cc.isValid(this._targetNode)) {
            return;
        }
        let rect = this._targetNode.getBoundingBoxToWorld();
        if (rect.contains(event.getLocation())) {
            //如果玩家点击了规定的区域，则让事件往下派发
            this.node._touchListener.setSwallowTouches(false);
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    }

    static movefinger(guideTaskMgr: GodGuide, step, callback) {
        let params = step.command;
        guideTaskMgr._targetNode = null; //先置空之前查找的目标节点

        //开始查找新的目标节点
        guideTaskMgr.find(params.args, (node, rect) => {

            //查找到之后并且聚焦过去
            guideTaskMgr.fingerToNode(node, () => {

                guideTaskMgr._targetNode = node; //赋值新的查找到的目标节点

                node.once(cc.Node.EventType.TOUCH_END, () => {
                    callback();
                    console.log("点击目标节点成功")
                });

            });
        });
    }


    //******************工具集函数********************* */

    /**
     * 查找节点
     * @param value 
     * @param cb 
     */
    private find(value, cb?) {
        let root = cc.find('Canvas');
        // let root = this.node.parent

        this.locateNode(root, value, (error, node) => {
            if (error) {
                console.log("查找节点失败", value)
                return;
            }
            let rect = this._focusToNode(node);
            if (cb) {
                console.log("查找节点成功", value)
                cb(node, rect);
            }
        });
    }


    /**
    * 路径特殊字符使用正则表达式进行拆分
    * @param locator 查询的路径配置，形如：'bottom/bag/bagContent/casting',
    */
    private parse(locator) {
        let names = locator.split(/[.,//,>,#]/g);
        let segments = names.map(function (name) {
            let index = locator.indexOf(name);
            let symbol = locator[index - 1] || '/';
            return { symbol: symbol, name: name.trim() };
        });
        return segments;
    }


    /**
    * 根据查找路径和根节点定位要查找的目标节点
    * @param root 
    * @param locator 
    * @param cb 
    */
    private locateNode(root, locator, cb?) {
        let segments = this.parse(locator);
        let child = null, node = root;

        for (let i = 0; i < segments.length; i++) {
            let item = segments[i];
            switch (item.symbol) {
                case '/':
                    child = node.getChildByName(item.name);
                    break;
            }
            if (!child) {
                node = null;
                break;
            }
            node = child;
        }
        if (node && node.active && cb) {
            cb(null, node);
        } else {
            cb(locator)
        }
        return node;
    }


    /**
     * 聚焦到目标节点并绘制图形
     * @param node 查找的节点
     */
    _focusToNode(node: cc.Node) {
        this._mask._graphics.clear();

        let rect = node.getBoundingBoxToWorld();
        let p = this.node.convertToNodeSpaceAR(rect.origin);
        rect.x = p.x;
        rect.y = p.y;
        this._mask._graphics.fillRect(rect.x, rect.y, rect.width, rect.height);
        return rect;
    }


    /**
     * 移动手指到目标节点
     * @param node 
     * @param markonCb 
     */
    fingerToNode(node, markonCb) {
        if (!this._finger) {
            markonCb();
        }
        this._finger.active = true;
        this._finger.stopAllActions();
        let p = this.node.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.position));
        this._finger.setPosition(cc.v3(p.x + 100, p.y));
        //this._finger.getComponent("GuideFinger").playAnim(); //手指可以挂一些动画脚本，用来控制动画播放
        markonCb();
    }


}