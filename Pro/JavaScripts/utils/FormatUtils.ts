
export namespace FormatUtils {
    /** 
     * 获取剩余时间 (毫秒)
     * @param time 时间差(毫秒)
     * @param type 显示类型
     * @param isMile 是否为毫秒
     * */
    export function getRemindTime(time: number, format: string = '{d}:{h}:{mm}:{s}:{ms}'): string {
        if (time < 0 || !time) {
            time = 0;
        }
        const milliSecond = Number((time / 1000).toString().split('.')[1]);
        time = Math.round(time / 1000);
        const day = Math.floor(time / 86400);   // 天
        time = time - (day * 86400);
        const hour = Math.floor(time / 3600);   // 时
        time = time - (hour * 3600);
        const minute = Math.floor(time / 60);   // 分
        const second = Math.floor(time - (minute * 60)); // 秒

        const dayStr = toFitZero(day, 2);
        const hourStr = toFitZero(hour, 2);
        const minuteStr = toFitZero(minute, 2);
        const secondStr = toFitZero(second, 2);
        let milliSecondStr = milliSecond.toString();
        while (milliSecondStr.length < 3) {
            milliSecondStr += '0';
        }
        const longHourStr = toFitZero(hour + day * 24, 2); //把天数合并进小时内显示


        const args = { d: dayStr, h: hourStr, mm: minuteStr, s: secondStr, ms: milliSecondStr, lh: longHourStr }
        return factionLog(format, args);
    }

    function toFitZero(number: number, num: number): string {
        let s = number.toString();
        const sLength = num - s.length;
        if (s.length < num) {
            let plusZero = '';
            for (let i = 0; i < sLength; i++) {
                plusZero = '0' + plusZero;
            }
            s = plusZero + s;
        }
        return s;
    }

    function factionLog(str: string, args: Record<string, unknown>) {

        const keys = Object.keys(args);
        if (keys.length === 0) {
            return str;
        }

        for (const key of keys) {
            const re = new RegExp('\\{' + (key) + '\\}', 'gm');
            str = str.replace(re, String(args[key]));
        }
        return str;
    }
}
