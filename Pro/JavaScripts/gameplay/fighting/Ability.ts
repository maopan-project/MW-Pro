export namespace Ability {
    /**
     * 技能标记
     */
    export enum AbilityFlag {
        /**被动技能 */
        PASSIVE = 1 << 0,
        /**主动施法技能 */
        GENERAL = 1 << 1,
        /**引导技能 */
        CHANNEL = 1 << 2,
        /**开关技能 */
        TOGGLE = 1 << 3,
        /**激活技能 */
        ACTIVATED = 1 << 4,
    }

    /**
     * 主动技能-选择类型
     */
    export enum SelectType {
        /**不需要目标，立即释放 */
        IMMEDIATELY = 1 << 0,
        /**需要选定目标（小兵，野怪，玩家） */
        TARGET = 1 << 1,
        /**需要一个位置目标点（一个坐标） */
        AOE = 1 << 2,
    }

    export class BaseAbility {
        id: number;
        flag: number;
        parent: any;

        onProjectileHit(projHandle: any, hitTarget: any, hitPoint: any) { }
    }

    /**
     * 被动技能
     */
    export interface IPassive {
        /**技能初始化 */
        onAbilityInit(): void;
    }

    /**
     * 通用技能
     */
    export interface IGeneral {
        /**Spell时间点 */
        castPoint: number;
        /**技能释放开始（前摇之前） */
        onAbilityStart(): void;
        /**技能释放 */
        spell(): void;
    }

    /**
     * 引导技能
     */
    export interface IChannel {
        /**技能释放开始（前摇之前） */
        abilityStart(): void;
        /**引导开始 */
        channelStart(): void;
        /**引导中 */
        channelThink(): void;
        /**引导结束 */
        channelFinish(): void;
    }

    /**
     * 开关技能
     */
    export interface IToggleAbility {
        onAbilityToggleOn(): void;
        onAbilityToggleOff(): void;
    }

    /**
     * 激活技能
     */
    export interface IActivatedAbility {
        onActiveToggleOn(): void;
        onActiveToggleOff(): void;
    }
}