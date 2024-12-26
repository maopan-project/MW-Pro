import GlobalRankData from "./GlobalRankData";
import GlobalRankModuleS from "./GlobalRankModuleS";

export default class GlobalRankModuleC extends mwext.ModuleC<GlobalRankModuleS, null> implements IGlobalRankModuleC {
    readonly DamageAction: Action1<GlobalRankData[]> = new Action1();

    net_updateDamageRankC(data: GlobalRankData[]) {
        this.DamageAction.call(data);
    }
}