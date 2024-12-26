import { PlayerData, PlayerModuleC, PlayerModuleS } from "./player/PlayerModule";

export default class Modules {
    /**初始化所有模块 */
    static initModules() {
        // add moduel
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
    }

    static get cPlayer() {
        return ModuleService.getModule(PlayerModuleC);
    }

    static get sPlayer() {
        return ModuleService.getModule(PlayerModuleS);
    }
}