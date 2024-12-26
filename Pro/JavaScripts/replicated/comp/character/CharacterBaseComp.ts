@mw.Component
export default class CharacterBaseComp extends Script {
    /**控制的人型对象 */
    public get character() {
        return this.gameObject as mw.Character;
    }

    protected onStart(): void {
        this.useUpdate = SystemUtil.isClient();
    }
}