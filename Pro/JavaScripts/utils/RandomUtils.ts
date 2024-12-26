export namespace RandomUtils {
    // =================================================normal=======================================================
    /**
     * 获取GUID
     */
    export function getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    /**
     * 范围取值 [min,max)
     * @param min 最小值
     * @param max 最大值
     * @returns int 
     */
    export function range(min: number, max: number) {
        let offset = Math.random() * (max - min);
        return Math.floor(offset + min);
    }

    /**
     * 种子随机，保证各端随机结果的一致性
     */
    export class SeedRandom {

        static randomParams = [233, 255, 100];

        static seed = 8;

        /** 随机数*/
        static random() {
            this.seed = (this.seed * this.randomParams[2] + this.randomParams[1]) % this.randomParams[0];
            let randomNumber = this.seed / this.randomParams[0];

            return randomNumber;
        }

        /**权重随机*/
        static weight(weight: number[]) {
            if (!weight || weight.length === 0) {
                return -1;
            }

            let sum = 0;
            for (let i = 0; i < weight.length; i++) {
                sum += weight[i];
            }

            let chance = this.random() * sum;
            for (let j = 0; j < weight.length; j++) {
                if (chance < weight[j]) {
                    return j;
                }

                chance -= weight[j];
            }
        }

        /**高斯随机数*/
        static randG() {
            let rand = 0;

            for (let i = 0; i < 6; i += 1) {
                rand += this.random();
            }

            return rand / 6;
        }

        /**范围随机（左闭右开）*/
        static range(min: number, max: number) {
            let offset = this.random() * (max - min);
            return Math.floor(offset + min);
        }
    }
}