import GlobalRankData from "./GlobalRankData";
import GlobalRankModuleC from "./GlobalRankModuleC";

export default class GlobalRankModuleS extends mwext.ModuleS<GlobalRankModuleC, null> implements IGlobalRankModuleS {
    private readonly GameDamage = "MonsterVerse_Damage";
    private time: number = 0;
    private dataList: GlobalRankData[] = [];
    private handlerRun: boolean = false;
    private setCnt: number = 1;

    protected onUpdate(dt: number): void {
        this.time += dt;
        if (this.time >= 3) {// 3秒做一次更新
            this.updateDamageRank();
            this.time = 0;
        }
    }

    pushDamageData(data: GlobalRankData[]) {
        this.dataList.push(...data);

        if (this.handlerRun) return;
        this.handlerRun = true;
        this.trySaveData(this.GameDamage, (a, b) => b.content - a.content);
    }

    private updateDamageRank() {
        DataStorage.asyncGetData(this.GameDamage).then((value) => {
            if (value.code === mw.DataStorageResultCode.Success) {
                if (value.data) {
                    this.getAllClient().net_updateDamageRankC(value.data);
                }
            } else {
                console.log("更新排行失败--->code:" + value.code);
            }
        });
    }

    private trySaveData(dataTag: string, sort: (a: GlobalRankData, b: GlobalRankData) => number) {
        DataStorage.asyncGetData(dataTag).then((value) => {
            if (value.code === mw.DataStorageResultCode.Success) {
                let successData = value.data as GlobalRankData[] ?? [];
                let totalData = successData.concat(this.dataList);
                let sortData = totalData.sort(sort);

                let saveData = sortData.reduce<GlobalRankData[]>((pre, cur) => {
                    if (pre.length === 8)// 到达最大数量
                        return pre;

                    if (pre.findIndex((item) => { return item.uid === cur.uid }) === -1)// 没有这个玩家
                        pre.push(cur);

                    return pre;
                }, []);

                DataStorage.asyncSetData(dataTag, saveData).then(() => {
                    if (value.code === mw.DataStorageResultCode.Success) {
                        console.log("rank data save success");
                        this.dataList.length = 0;
                        this.handlerRun = false;
                        this.setCnt = 1;
                    } else {
                        console.warn("set custom-data failed--->code:" + value.code);
                        if (this.setCnt > 0) {
                            setTimeout(() => {
                                this.trySaveData(dataTag, sort);
                                this.setCnt--;
                            }, 3000);
                        } else {
                            this.dataList.length = 0;
                            this.handlerRun = false;
                            this.setCnt = 1;
                        }
                    }
                });
            } else {
                console.warn("get custom-data failed--->code:" + value.code);
                this.handlerRun = false;
            }
        });
    }
}