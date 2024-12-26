import { RandomUtils } from "../../../utils/RandomUtils";

/**
 * 效用系统（Utility System）
 * Utility Theory https://www.gameaipro.com/GameAIPro/GameAIPro_Chapter09_An_Introduction_to_Utility_Theory.pdf
 */
export namespace US {
    export class Service {
        public static begin() {
            let maker = new DecisionMaker();

            let statistic: IGameStatistics = {
                hp: 100,
                maxHp: 100,
            };

            let cAttack = new AttackCalculator();
            let cTreat = new ThreatCalculator();
            let cHealth = new HealthCalculator();
            // let cRunaway = new RunAwayCalculator();

            let actIdle = new IdleAction(maker, statistic);
            let actFire = new FireAction(maker, statistic);
            let actHeal = new HealAction(maker, statistic);

            actIdle.pushCalculator(cHealth, cTreat);
            actFire.pushCalculator(cAttack, cTreat);
            actHeal.pushCalculator(cHealth);

            maker.actionList.push(actIdle, actFire, actHeal);
            maker.chooseNextAction();

            TimeUtil.onEnterFrame.add((dt: number) => {
                maker.update(dt);
            });
        }
    }

    //#region math
    const max = Math.max;
    const min = Math.min;
    const pow = Math.pow;
    const e = Math.E;
    //#endregion


    //#region statistics
    interface IGameStatistics {
        hp: number;
        maxHp: number;
    }
    //#endregion


    //#region DecisionFactor
    const enum FactorType {
        ATTACK,
        THREAT,
        HEALTH,
        RUNAWAY,
    }

    abstract class ScoringCalculator {
        /**效用类型 */
        abstract type: FactorType;

        /**utility score */
        abstract desire(...params: any[]): number;

        /**因素权重 默认1(可以控制这个影响因素的大小) */
        weight: number = 1;
    }

    class AttackCalculator extends ScoringCalculator {
        type: FactorType = FactorType.ATTACK;

        readonly minDmg: number = 10;

        readonly maxDmg: number = 30;

        readonly a: number = 0.6;

        desire(hp: number): number {
            let v = (hp - this.minDmg) / ((max(this.maxDmg, hp)) - this.minDmg);
            let u = max(min((1 - v) * (1 - this.a) + this.a, 1), 0);
            console.log('攻击效用---' + u);

            return u * this.weight;
        }

    }

    class ThreatCalculator extends ScoringCalculator {
        type: FactorType = FactorType.THREAT;

        readonly maxDmg: number = 30;

        desire(hp: number): number {
            let u = min(min(this.maxDmg, hp) / hp, 1);
            console.log('危险效用---' + u);

            return u * this.weight;
        }
    }

    class HealthCalculator extends ScoringCalculator {
        type: FactorType = FactorType.HEALTH;

        readonly a = 0.68;

        readonly b = 12;

        readonly c = 6;

        desire(hp: number, maxHp: number): number {
            let exp = (-(hp / maxHp * this.b) + this.c);
            let u = 1 - (1 / (1 + pow((e * 0.68), exp)));
            console.log('健康效用---' + u);

            return u * this.weight;
        }
    }

    class RunAwayCalculator extends ScoringCalculator {
        type: FactorType = FactorType.RUNAWAY;

        readonly a: number = 2;

        readonly b: number = 4

        readonly c: number = 0.25;

        desire(hp: number, maxHp: number): number {
            let exp = 1 / pow(this.a + 1, this.b) * 0.25;
            let u = 1 - pow(hp / maxHp, exp);
            console.log('逃跑效用---' + u);

            return u * this.weight;
        }
    }


    //#endregion


    //#region BaseAction
    abstract class BaseAction {
        isEnd: boolean = false;

        maker: DecisionMaker = null;

        gameStatistic: IGameStatistics = null;

        calculator: Map<FactorType, ScoringCalculator> = new Map();

        abstract get score(): number;

        constructor(maker: DecisionMaker, gameStatistic: IGameStatistics) {
            this.maker = maker;
            this.gameStatistic = gameStatistic;
        }

        pushCalculator(...calculators: ScoringCalculator[]) {
            for (let i = 0; i < calculators.length; i++) {
                this.calculator.set(calculators[i].type, calculators[i]);
            }
        }

        getCalculator<T extends ScoringCalculator>(type: FactorType) {
            return this.calculator.get(type) as T;
        }

        onEnter() {

        }

        onUpdate() {

        }

        onExit() {

        }
    }

    class IdleAction extends BaseAction {

        get score(): number {
            let healthScore = this.getCalculator<HealthCalculator>(FactorType.HEALTH)
                .desire(this.gameStatistic.hp, this.gameStatistic.maxHp);

            let threatScore = this.getCalculator<ThreatCalculator>(FactorType.THREAT)
                .desire(this.gameStatistic.hp);

            let u = (1 - healthScore * threatScore);

            return u;
        }


        override onEnter(): void {
            this.isEnd = false;
            console.log('进入闲置');

            // 测试
            setTimeout(() => {
                this.isEnd = true;
            }, 3000);
        }
    }

    class FireAction extends BaseAction {
        get score(): number {
            let attackScore = this.getCalculator<HealthCalculator>(FactorType.ATTACK)
                .desire(this.gameStatistic.hp, this.gameStatistic.maxHp);

            let threatScore = this.getCalculator<ThreatCalculator>(FactorType.THREAT)
                .desire(this.gameStatistic.hp);

            return attackScore * threatScore;
        }

        override onEnter(): void {
            this.isEnd = false;
            console.log('进入开火');

            // 测试
            setTimeout(() => {
                this.isEnd = true;
            }, 1000);
        }
    }


    class HealAction extends BaseAction {
        get score(): number {
            let healthScore = this.getCalculator<HealthCalculator>(FactorType.HEALTH)
                .desire(this.gameStatistic.hp, this.gameStatistic.maxHp);

            return healthScore;
        }


        override onEnter(): void {
            this.isEnd = false;
            console.log('进入治疗');

            // 测试
            setTimeout(() => {
                this.isEnd = true;
            }, 5000);
        }
    }


    //#endregion


    //#region 决策者
    class DecisionMaker {
        time: number = 0;

        actionList: BaseAction[] = [];

        activeActionIndex: number = -1;

        update(dt) {
            this.time += dt;

            // 刷新时间1s 并且动作没有结束久不进入下一个动作（具体策略根据游戏设定，这里只是测试）
            if (this.time > 1 && this.actionList[this.activeActionIndex].isEnd) {
                this.chooseNextAction();
            }
        }

        chooseNextAction() {
            // 有3个策略获取动作（目前使用的是1，需要根据不同的游戏选择策略）
            // 1.random weight
            // 2.the most scoring
            // 3.bucket priority + random weight

            let weights: number[] = [];

            for (let i = 0; i < this.actionList.length; i++) {
                weights.push(this.actionList[i].score);
            }

            let randomIdx = RandomUtils.SeedRandom.weight(weights);
            this.activeActionIndex = randomIdx;
            this.actionList[randomIdx].onEnter();
        }
    }
    //#endregion


    //#region bucket(unnecessary for some game) 
    //this bucket always attempt to solve the most urgent desire
    class Bucket {
        wight: number;
        priorityActions: BaseAction[];
    }

    class HealthBucket {

    }
    //#endregion

}