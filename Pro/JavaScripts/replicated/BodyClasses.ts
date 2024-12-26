/**数据体的一个标识 */
let flag = 0;

/**循环的最大值 */
let maxVal = 2 ** 16 - 1;

/**
 * 获取Body标识
 */
function getBodyFlag() {
    flag = (flag + 1) % maxVal;
    return flag;
};

export class ReplicateBody {
    /**唯一标识 */
    private flag?: number;
    constructor() {
        this.flag = getBodyFlag();
    }
}

export class AnimationBody extends ReplicateBody {
    /**
     * @param guid 动画资源guid
     * @param loop 循环(0是循环，1是播放一次) 默认 1
     * @param rate 播放速率 默认 1
     */
    constructor(
        public guid: string,
        public loop: number = 1,
        public rate: number = 1,
    ) { super(); }
}

