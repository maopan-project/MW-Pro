import Blackboard from "../Blackboard";

/**
 * PPA行为树（Postcondition-Precondition-Action Behavior Tree）
 - Link https://luyuhuang.tech/2019/11/18/behavior-tree.html
 - sequence 一个条件一个动作,那么这个条件就是动作的前置---就是说条件先行，动作后行
 - fallback 一个条件一个动作,那么这个条件就是动作的后置---就是说动作先行，条件后行
 * 
 */
export namespace BTTree {

    export class Service {
        static createBT() {
            let blackboard = new Blackboard();
            blackboard.write('A');
            blackboard.write('B');
            blackboard.write('C');
            blackboard.write('Time');

            let root = new FallbackNode(null, blackboard);
            root.blackboard = blackboard;

            let sequence = new SequenceNode(root, blackboard);
            sequence.activateCache();

            let moveA = new MoveA(sequence, blackboard);
            let moveB = new MoveB(sequence, blackboard);
            let moveC = new MoveC(sequence, blackboard);

            setInterval(() => {
                root.execute();
            }, 100);
        }
    }

    enum RunState {
        READY,
        FAILURE,
        SUCCESS,
        RUNNING,
    }

    /**
     * 行为结点基类
     */
    abstract class BTNode {
        /**黑板数据 */
        blackboard: Blackboard = null;
        /**父亲节点 */
        parent: BTNode = null;
        /**子节点 */
        children: BTNode[] = [];
        /**缓存子节点状态 */
        cache?: RunState[];

        /**
         * @param parent 父节点 
         */
        constructor(parent: BTNode, blackboard: Blackboard) {
            this.parent = parent;
            this.blackboard = blackboard;

            if (this.parent) {
                parent.children.push(this);
            }
        }

        /**BT定时调用 */
        abstract execute(): RunState;
    }

    /**
     * 装饰节点(自定义处理节点) 【顺序、选择、平行都是特殊的装饰节点】
     */
    abstract class DecoratorNode extends BTNode {
        /**激活缓存 */
        activateCache() {
            this.cache = [];
        }
    }

    /**
     * 动作节点
     */
    abstract class ActionNode extends BTNode {
        cha: Character = GameObject.findGameObjectById('09EBA62E') as any;

        private _state: RunState = RunState.READY;
        set state(v) {
            if (this._state === v) {
                return;
            }

            if (v === RunState.RUNNING)
                this.enter();
            else if (v === RunState.FAILURE || v === RunState.SUCCESS)
                this.exit();

            this._state = v;
        }

        get state() {
            return this._state;
        }

        /**当状态切换到Running调用 */
        abstract enter(): void;
        /**当状态切换到Success|Failure调用 */
        abstract exit(): void;
    }

    /**
     * 条件节点（如果使用PPA，那么都是条件节点先行）
     */
    abstract class ConditionNode extends BTNode {
    }

    //#region extension SelectorNode
    /**
     * 顺序节点
     * 只有当第一个子节点返回 Success 的时候, 才会执行第二个子节点.
     */
    class SequenceNode extends DecoratorNode {
        execute(): RunState {
            for (let i = 0; i < this.children.length; i++) {
                let res: RunState;
                if (this.cache) {
                    res = this.cache[i];
                    if (!res) {
                        res = this.children[i].execute();
                        if (res !== RunState.RUNNING) {
                            this.cache[i] = res;
                        }
                    }

                    if (res !== RunState.SUCCESS) {
                        if (res === RunState.FAILURE) {
                            this.cache = [];
                        }

                        return res;
                    }

                } else {
                    res = this.children[i].execute();
                    if (res !== RunState.SUCCESS) {
                        return res;
                    }
                }
            }

            if (this.cache) {
                this.cache = [];
            }

            return RunState.SUCCESS;
        }

    }

    /**
     * 选择节点
     * 只有当第一个节点返回 Failure 的时候, 才会执行第二个节点
     */
    class FallbackNode extends DecoratorNode {
        execute(): RunState {
            for (let i = 0; i < this.children.length; i++) {
                let res: RunState;
                if (this.cache) {
                    res = this.cache[i];
                    if (!res) {
                        res = this.children[i].execute();
                        if (res !== RunState.RUNNING) {
                            this.cache[i] = res;
                        }
                    }

                    if (res !== RunState.FAILURE) {
                        if (res === RunState.SUCCESS) {
                            this.cache = [];
                        }

                        return res;
                    }

                } else {
                    res = this.children[i].execute();
                    if (res !== RunState.FAILURE) {
                        return res;
                    }
                }
            }

            if (this.cache) {
                this.cache = [];
            }

            return RunState.FAILURE;
        }

    }

    /**
     * 平行节点
     * 1.当有m个节点,返回Success
     * 2.有n - m + 1个节点,返回Failure
     * 3.其余返回Running
     */
    class ConcurrentNode extends DecoratorNode {
        execute(): RunState {
            let successNum = 0;
            for (let i = 0; i < this.children.length; i++) {
                let res = this.children[i].execute();
                if (res === RunState.SUCCESS) {
                    successNum++;
                }
            }

            let m = 1;
            if (successNum >= m) {
                return RunState.SUCCESS;
            } else if (successNum > this.children.length - m) {
                return RunState.FAILURE;
            } else {
                return RunState.RUNNING;
            }
        }
    }
    //#endregion

    //#region extension LeafNode
    class MoveA extends ActionNode {
        aPoint: Vector = GameObject.findGameObjectById('215C93EB').worldTransform.position;

        enter(): void {
            this.blackboard.set('Time', TimeUtil.time());
            this.blackboard.set('A', false);

            Navigation.navigateTo(this.cha, this.aPoint, undefined,
                () => { this.blackboard.set('A', true); },
                () => { });
        }

        exit(): void {
            Navigation.stopNavigateTo(this.cha);
            this.blackboard.set('A', false);

            // console.log('ExitA --- ' + (TimeUtil.time() - this.blackboard.get<number>('Time')));

        }

        execute(): RunState {
            this.state = this.blackboard.get<boolean>('A')
                ? RunState.SUCCESS : RunState.RUNNING;

            return this.state;
        }
    }

    class MoveB extends ActionNode {
        aPoint: Vector = GameObject.findGameObjectById('258D5F2B').worldTransform.position;

        enter(): void {
            this.blackboard.set('Time', TimeUtil.time());
            this.blackboard.set('B', false);

            Navigation.navigateTo(this.cha, this.aPoint, undefined,
                () => { this.blackboard.set('B', true); },
                () => { });
        }

        exit(): void {
            Navigation.stopNavigateTo(this.cha);
            this.blackboard.set('B', false);
            // console.log('ExitB --- ' + (TimeUtil.time() - this.blackboard.get<number>('Time')));
        }

        execute(): RunState {
            this.state = this.blackboard.get<boolean>('B')
                ? RunState.SUCCESS : RunState.RUNNING;

            return this.state;
        }
    }

    class MoveC extends ActionNode {
        aPoint: Vector = GameObject.findGameObjectById('31BE7B1C').worldTransform.position;

        enter(): void {
            this.blackboard.set('Time', TimeUtil.time());
            this.blackboard.set('C', false);

            Navigation.navigateTo(this.cha, this.aPoint, undefined,
                () => { this.blackboard.set('C', true); },
                () => { });
        }

        exit(): void {
            Navigation.stopNavigateTo(this.cha);
            this.blackboard.set('C', false);
            // console.log('ExitC --- ' + (TimeUtil.time() - this.blackboard.get<number>('Time')));
        }

        execute(): RunState {
            this.state = this.blackboard.get<boolean>('C')
                ? RunState.SUCCESS : RunState.RUNNING;

            return this.state;
        }
    }
    //#endregion
}