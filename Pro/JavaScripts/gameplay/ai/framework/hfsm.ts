import Blackboard from "../Blackboard";

/**
 * 分层状态机(Hierarchial Finite State Machine)
 */
export namespace HFSM {
    export class Service {
        static createHsm() {
            // init 
            let blackboard = new Blackboard();
            blackboard.write('PhoneRing');
            blackboard.write('Reached');


            let root = new StateMachine(null, blackboard);// 主状态机

            let conversion = new ConversionState(root, blackboard);// 子状态机（也是一个状态）
            let watchBuilding = new WatchBuildState(root, blackboard);

            root.initialState = watchBuilding;
            root.stateList.push(conversion, watchBuilding);

            setInterval(() => {
                root.update();
            }, 0);

            InputUtil.onKeyDown(Keys.One, () => {
                blackboard.set('Reached', true);
            });

            InputUtil.onKeyDown(Keys.Two, () => {
                blackboard.set('Reached', false);
            });

            InputUtil.onKeyDown(Keys.Three, () => {
                blackboard.set('PhoneRing', true);
            });

            InputUtil.onKeyDown(Keys.Four, () => {
                blackboard.set('PhoneRing', false);
            });
        }
    }

    interface IState {
        machine: StateMachine;

        translations: Translation[];

        onEnter(): void;

        onExit(): void;

        onUpdate(): void;
    }

    abstract class BaseState implements IState {

        translations: Translation[] = [];

        constructor(public machine: StateMachine) {
            machine.stateList.push(this);
        }

        abstract onEnter(): void;

        abstract onExit(): void;

        abstract onUpdate(): void;
    }

    abstract class Translation {
        constructor(public fromState: BaseState) { }

        abstract isValid(): boolean;

        abstract getNextState(): IState;

        protected getStateInstance(cls: TClass<IState>) {
            let list = this.fromState.machine.stateList;
            for (let i = 0; i < list.length; i++) {
                if (list[i] instanceof cls)
                    return list[i];
            }

            return null;
        }
    }

    // different(fsm 与 hsm)
    class StateMachine implements IState {
        stateList: IState[] = [];

        initialState: IState = null;

        historyState: IState = null;

        translations: Translation[] = [];

        // ====
        cha: Character = GameObject.findGameObjectById('09EBA62E') as any;
        // ====

        constructor(public machine: StateMachine, public blackboard: Blackboard) { }

        onEnter() {
            if (!this.historyState) {
                this.historyState = this.initialState;
            }

            this.historyState.onEnter();
        }

        onExit(): void {
            if (this.historyState) {
                this.historyState.onExit();
            }
        }

        onUpdate() {
            this.update();
        }

        update() {
            if (!this.historyState) {
                this.historyState = this.initialState;
                this.historyState.onEnter();
            }

            if (this.historyState) {
                let translations = this.historyState.translations;
                for (let i = 0; i < translations.length; i++) {
                    if (translations[i].isValid()) {
                        this.historyState.onExit();
                        this.historyState = translations[i].getNextState();
                        this.historyState.machine = this;
                        this.historyState.onEnter();
                        break;
                    }
                }

                this.historyState.onUpdate();
            }

        }
    }

    // 状态=========================================================================================================
    class PatrolToSafeState extends BaseState {
        safePoint: Vector = new Vector(2384, -808, 7);

        constructor(machine: StateMachine) {
            super(machine);

            this.translations.push(new Safe2Door(this));
        }

        onEnter(): void {
            console.log('进入巡逻到安全地方');
            this.move();
        }

        onExit(): void {
            console.log('退出巡逻到安全地方');
            Navigation.stopNavigateTo(this.machine.cha);
        }

        onUpdate(): void {
        }

        private move() {
            Navigation.navigateTo(this.machine.cha, this.safePoint, undefined,
                () => {
                    console.log('已经到达安全位置');
                },
                () => {
                    console.log('寻路失败');
                });
        }

    }

    class PatrolToDoorState extends BaseState {
        doorPoint: Vector = new Vector(-1000, -949, 0);

        constructor(machine: StateMachine) {
            super(machine);

            this.translations.push(new Door2Safe(this));
        }

        onEnter(): void {
            console.log('进入巡逻到门口');
            this.move();
        }

        onExit(): void {
            console.log('退出巡逻到门口');
            Navigation.stopNavigateTo(this.machine.cha);
        }

        onUpdate(): void {
        }

        private move() {
            Navigation.navigateTo(this.machine.cha, this.doorPoint, undefined,
                () => {
                    console.log('已经到达安全位置');
                },
                () => {
                    console.log('寻路失败');
                });
        }
    }

    class TalkState extends BaseState {

        onEnter(): void {
            console.log('进入对话');
        }

        onExit(): void {
            console.log('退出对话');
        }

        onUpdate(): void {
        }

    }

    class WatchBuildState extends StateMachine {
        constructor(machine: StateMachine, blackboard: Blackboard) {
            super(machine, blackboard);

            let toSafe = new PatrolToSafeState(this);
            let toDoor = new PatrolToDoorState(this);

            this.initialState = toSafe;
            this.stateList.push(toSafe, toDoor);
            this.translations.push(new WatchBuild2Conversion(this));
        }

        onEnter(): void {
            console.log('进入查看建筑');
            super.onEnter();
        }

        onExit(): void {
            console.log('退出查看建筑');
            super.onExit();
        }
    }

    class ConversionState extends StateMachine {
        constructor(machine: StateMachine, blackboard: Blackboard) {
            super(machine, blackboard);

            let talk = new TalkState(this);

            this.initialState = talk;
            this.stateList.push(talk);
            this.translations.push(new Conversion2WatchBuild(this));
        }

        onEnter(): void {
            console.log('进入交流');
            super.onEnter();
        }

        onExit(): void {
            console.log('退出交流');
            super.onExit();
        }
    }

    // 边==========================================================================================================
    class Safe2Door extends Translation {
        readonly Reached: boolean = true;

        isValid(): boolean {
            return this.fromState.machine.blackboard.get<boolean>('Reached') === this.Reached;
        }

        getNextState(): IState {
            return this.getStateInstance(PatrolToDoorState);
        }
    }

    class Door2Safe extends Translation {
        readonly Reached: boolean = false;

        isValid(): boolean {
            return this.fromState.machine.blackboard.get<boolean>('Reached') === this.Reached;
        }

        getNextState(): IState {
            return this.getStateInstance(PatrolToSafeState);
        }
    }

    class WatchBuild2Conversion extends Translation {
        readonly PhoneRing: boolean = true;

        isValid(): boolean {
            return this.fromState.machine.blackboard.get<boolean>('PhoneRing') === this.PhoneRing;
        }

        getNextState(): IState {
            return this.getStateInstance(ConversionState);
        }
    }

    class Conversion2WatchBuild extends Translation {
        readonly PhoneRing: boolean = false;

        isValid(): boolean {
            return this.fromState.machine.blackboard.get<boolean>('PhoneRing') === this.PhoneRing;
        }

        getNextState(): IState {
            return this.getStateInstance(WatchBuildState);
        }
    }
}