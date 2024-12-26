export namespace CharacterUtils {

    export async function setShape(cha: mw.Character, target: mw.Character, sync = false) {
        await target.asyncReady();

        let body = target.description.advance.bodyFeatures;
        let head = target.description.advance.headFeatures;
        let advance = cha.description.advance;
        cloneProprety(advance.bodyFeatures, body);
        cloneProprety(advance.headFeatures, head);
        sync && cha.syncDescription();
    }

    export function resetRoleDescription(cha: mw.Character, advance: object, sync = false) {
        cha.setDescription(advance);
        sync && cha.syncDescription();
    }

    export let slefAdvance: object = null;
    export function cloneAdvance(cha: mw.Character) {
        return cha.getDescription();
    }

    export function setDescription(cha: mw.Character, guid: string) {
        cha.setDescription([guid]);
    }

    /**
     * 克隆属性
     * @param obj1 被赋值的对象 
     * @param obj2 赋值对象
     */
    function cloneProprety(obj1: object, obj2: object) {
        for (const key in obj2) {
            let v = obj2[key];

            if (typeof v === 'object') {
                cloneProprety(obj1[key], v);
            } else {
                if (typeof v !== 'function') {
                    try {
                        obj1[key] = v;
                    } catch (error) {
                        console.log(key + '\t' + error);
                    }
                }
            }
        }
    }

}