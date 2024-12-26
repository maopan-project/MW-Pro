export class PlayerData extends Subdata {

}

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerData> {

}

export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerData> {

}
