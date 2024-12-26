type Language = { key: string, zn: string };

const ZN: { [k: string]: Language } = {
    // lmp 1 - 50
    [1]: { key: 'mainUI_task_1', zn: '找到<color=#008000ff>{0}</color>个' },
    [2]: { key: 'mainUI_time_2', zn: '距离白天结束还有{0}' },
}

export enum LanguageTypes {
    /**英语.*/
    ENGLISH,
    /**中文.*/
    CHINESE,
}

/**
 * 初始化多语言
 * @param languageIndex 索引位置（表中的偏移offset）
 */
export function initLanguage(languageIndex: LanguageTypes) {
    // todo
    // GameConfig.initLanguage(languageIndex, i18n);

    mw.UIScript.addBehavior("lan", (ui: StaleButton | TextBlock) => {
        let key: string = ui.text;
        if (ui) ui.text = i18n(key);
    });
}

export function i18n(seq: number | string, ...args: any[]) {
    // todo
    // let lanConfig = GameConfig.Language;
    let lanConfig = {};
    let obj: Language = ZN[seq];

    try {
        if (obj)
            return StringUtil.format(lanConfig[obj.key] ?
                lanConfig[obj.key].Value.replace(/\\n/g, "\n") : obj.zn, ...args);
        else
            return StringUtil.format(lanConfig[seq] ?
                lanConfig[seq].Value.replace(/\\n/g, "\n") : seq.toString(), ...args);
    } catch (error) {
        console.log("多语言问题 + ", error);
        return "undefined";
    }

}