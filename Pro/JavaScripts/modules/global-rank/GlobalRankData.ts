export default class GlobalRankData implements RankData {
    uid: string = "";
    content: number = 0;

    /**
     * 排行数据
     * @param uid 用户唯一id 
     * @param content 存储内容（伤害值、时间...）
     */
    constructor(uid: string, content: number) {
        if (!uid || !Player.getPlayer(uid)) {
            throw new Error("error uid ---> " + uid);
        }

        if (!content || content <= 0) {
            throw new Error("content must > zero");
        }

        this.uid = uid;
        this.content = content;
    }
}