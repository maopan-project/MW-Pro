class RankData {
    constructor(public uid: string, public content: number | string) { }
}

interface IGlobalRankModuleC {
    /**
     * 伤害更新 
     */
    DamageAction: Action1<RankData[]>;
    /**
     * S2C_更新伤害排行榜
     * @param data 排行数据
     */
    net_updateDamageRankC(data: RankData[]);
}

interface IGlobalRankModuleS {
    /**
     * 更新伤害排行数据
     * @param data 排行数据
     */
    pushDamageData(data: RankData[]): void;
}

declare var GlobalRankModule: { C: IGlobalRankModuleC, S: IGlobalRankModuleS };