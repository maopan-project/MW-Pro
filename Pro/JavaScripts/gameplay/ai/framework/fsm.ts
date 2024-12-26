import Blackboard from "../Blackboard";
/**
 * 有限状态机(Finite State Machine)
 */
export namespace FSM {
    export class Service {
        static createFsm() {
            // init 
            let blackboard = new Blackboard();
            blackboard.write('GameStart');
            blackboard.write('HasEnemy');


            let machine = new StateMachine(blackboard);
            let idle = new IdleState(machine);
            let patrol = new PatrolState(machine);
            let investigate = new InvestigateState(machine);
            let attack = new AttackState(machine);
            let flee = new FleeState(machine);

            machine.initialState = idle;

            setInterval(() => {
                machine.update();
            }, 0);

            InputUtil.onKeyDown(Keys.One, () => {
                blackboard.set('GameStart', true);
            });

            InputUtil.onKeyDown(Keys.Two, () => {
                blackboard.set('HasEnemy', true);
            });

            InputUtil.onKeyDown(Keys.Three, () => {
                blackboard.set('HasEnemy', false);
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
            this.translations.sort((a, b) => b.weight - a.weight);
        }

        abstract onEnter(): void;

        abstract onUpdate(): void;

        abstract onExit(): void;
    }

    abstract class Translation {
        constructor(public fromState: IState, public weight = 1) { }

        abstract isValid(): boolean;

        abstract getNextState(): IState;

        protected getStateInstance(cls: TClass<IState>) {
            let list = this.fromState.machine.stateList;
            for (let i = 0; i < list.length; i++) {
                if (list[i] instanceof cls)
                    return list[i];
            }
        }
    }

    class StateMachine {
        stateList: IState[] = [];

        initialState: IState = null;

        activeState: IState = null;

        // ====
        cha: Character = GameObject.findGameObjectById('09EBA62E') as any;
        // ====

        constructor(public blackboard: Blackboard) { }

        update() {
            if (!this.activeState) {
                this.activeState = this.initialState;
                this.activeState.onEnter();
            }

            if (this.activeState) {
                let translations = this.activeState.translations;
                for (let i = 0; i < translations.length; i++) {
                    if (translations[i].isValid()) {
                        this.activeState.onExit();
                        this.activeState = translations[i].getNextState();
                        this.activeState.machine = this;
                        this.activeState.onEnter();
                        break;
                    }
                }

                this.activeState.onUpdate();
            }
        }
    }

    // 状态=========================================================================================================================================================
    class IdleState extends BaseState {

        constructor(machine: StateMachine) {
            super(machine);

            this.translations.push(new Idle2Patrol(this));
        }

        onEnter(): void {
            console.log('enter IdleState');
        }

        onUpdate(): void {
        }

        onExit(): void {
            console.log('exit IdleState');
        }
    }

    class PatrolState extends BaseState {
        points: Vector[] = [new Vector(1200, 0, 0), new Vector(1200, 1700, 0), new Vector(-126, 1000, 0)];

        index: number = 0;

        constructor(machine: StateMachine) {
            super(machine);

            this.translations.push(new Any2Idle(this));
            this.translations.push(new Patrol2Investigate(this));
        }

        onEnter(): void {
            console.log('enter PatrolState');
            this.move();
        }

        onUpdate(): void {
        }

        onExit(): void {
            console.log('exit PatrolState');
            Navigation.stopNavigateTo(this.machine.cha);
        }

        private move() {
            Navigation.navigateTo(this.machine.cha, this.points[this.index], undefined,
                () => {
                    this.index = (this.index + 1) % this.points.length;
                    this.move();
                },
                () => {
                    console.log('寻路失败');
                });
        }

    }

    class InvestigateState extends BaseState {
        constructor(machine: StateMachine) {
            super(machine);

            this.translations.push(new Any2Idle(this));
            this.translations.push(new Investigate2Patrol(this));
        }


        onEnter(): void {
            console.log('enter InvestigateState');
            let enemy = Player.localPlayer.character;
            enemy.collisionWithOtherCharacterEnabled = false;

            Navigation.follow(this.machine.cha, enemy, undefined);
        }

        onUpdate(): void {
        }

        onExit(): void {
            console.log('exit InvestigateState');

            Navigation.stopFollow(this.machine.cha);
        }
    }

    class AttackState extends BaseState {
        constructor(machine: StateMachine) {
            super(machine);

            this.translations.push(new Any2Idle(this));
        }

        onEnter(): void {
            console.log('enter AttackState');
        }

        onUpdate(): void {
        }

        onExit(): void {
            console.log('exit AttackState');

        }
    }

    class FleeState extends BaseState {
        constructor(machine: StateMachine) {
            super(machine);

            this.translations.push(new Any2Idle(this));
        }

        onEnter(): void {
            console.log('enter FleeState');
        }

        onUpdate(): void {
        }

        onExit(): void {
            console.log('exit FleeState');
        }
    }

    // 边=========================================================================================================================================================
    class Idle2Patrol extends Translation {
        readonly GameStart: boolean = true;

        isValid(): boolean {
            let bool = this.fromState.machine.blackboard.get('GameStart');
            return bool === this.GameStart;
        }

        getNextState(): IState {
            return this.getStateInstance(PatrolState);
        }
    }

    class Any2Idle extends Translation {
        readonly GameStart: boolean = false;

        isValid(): boolean {
            let bool = this.fromState.machine.blackboard.get('GameStart');
            return bool === this.GameStart;
        }

        getNextState(): IState {
            return this.getStateInstance(IdleState);
        }

    }

    class Patrol2Investigate extends Translation {
        readonly HasEnemy: boolean = true;

        isValid(): boolean {
            let bool = this.fromState.machine.blackboard.get('HasEnemy');
            return bool === this.HasEnemy;
        }

        getNextState(): IState {
            return this.getStateInstance(InvestigateState);
        }

    }

    class Investigate2Patrol extends Translation {
        readonly HasEnemy: boolean = false;

        isValid(): boolean {
            let bool = this.fromState.machine.blackboard.get('HasEnemy');
            return bool === this.HasEnemy;
        }

        getNextState(): IState {
            return this.getStateInstance(PatrolState);
        }

    }
}