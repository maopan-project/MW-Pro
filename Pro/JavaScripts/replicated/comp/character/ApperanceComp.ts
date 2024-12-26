import CharacterBaseComp from "./CharacterBaseComp";

@mw.Component
export default class AppearanceComp extends CharacterBaseComp {
    /**换装数据 */
    @Property({ replicated: true, onChanged: AppearanceComp.prototype.onAppearanceData })
    private appearanceData: string[] = [];
    /**临时的装备数据 */
    private tempAppearanceData: Set<string> = new Set();
    private _dirtyMark: boolean = false;

    /**标记是否有服装变动 */
    public get dirtyMark() {
        return this._dirtyMark;
    }
    public set dirtyMark(v: boolean) {
        this._dirtyMark = v;
        this.useUpdate = v;
    }

    /**
     * 设置一套服装(一般是当玩家确认保存装扮之后调用)
     * @param datas 换装数据
     */
    setSuit(datas: string[]) {
        this.appearanceData = datas;

        if (SystemUtil.isClient()) {
            this.onAppearanceData();
        }
    }

    /**
     * 设置一件服装（尽量不要在服务端频繁调用）
     * @param data 服装\插件数据
     */
    setOnePart(data: string) {
        if (SystemUtil.isServer()) {
            if (!this.appearanceData.includes(data)) {
                this.appearanceData.push(data);
            }
        } else {
            if (!this.tempAppearanceData.has(data)) {
                this.tempAppearanceData.add(data);
                this.dirtyMark = true;
            }
        }
    }

    /**
     * 清除一件服装（尽量不要在服务端频繁调用）
     * @param data 服装\插件数据
     */
    clearOnePart(data: string) {
        if (SystemUtil.isServer()) {
            let idx = this.appearanceData.indexOf(data);
            if (idx !== -1) {
                this.appearanceData.splice(idx, 1);
            }
        } else {
            if (this.tempAppearanceData.has(data)) {
                this.tempAppearanceData.delete(data);
                this.dirtyMark = true;
            }
        }
    }

    protected onUpdate(dt: number): void {
        if (!this.character) return;
        if (!this.character.isReady) return;

        if (this.dirtyMark) {
            this.character.setDescription([...this.tempAppearanceData]);
            this.dirtyMark = false;
        }
    }

    private onAppearanceData() {
        this.dirtyMark = true;
        this.tempAppearanceData.clear();
        this.appearanceData.forEach(elem => {
            this.tempAppearanceData.add(elem);
        });
    }
}