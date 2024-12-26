import { RandomUtils } from "../../utils/RandomUtils";

/**
 * 泊松随机采样
 */
export default class PoissonDiskSampling {

    /**
     * 生成点集
     * @param radius 格子半径 
     * @param samplingRegionSize 采样区域大小 
     * @param numSamplingBeforeReject 拒绝前采样次数
     * @returns 点集
     */
    static generatePoints(radius: number, samplingRegionSize: Vector2, numSamplingBeforeReject: number = 30): Vector2[] {
        let cellSize = radius / Math.sqrt(2);
        let width = Math.floor(samplingRegionSize.x / cellSize);
        let hight = Math.floor(samplingRegionSize.y / cellSize);

        let gird: number[][] = new Array(width);
        gird.forEach((item, idx) => {
            gird[idx] = new Array(hight);
            gird[idx].fill(0);
        });

        let points: Vector2[] = [];
        let spawnPoints: Vector2[] = [];

        spawnPoints.push(samplingRegionSize.clone().divide(2));// 默认中点

        do {
            let spawnIndex = RandomUtils.range(0, spawnPoints.length);
            let spawnCenter = spawnPoints[spawnIndex];
            let tempVec = spawnCenter.clone();
            let candidateAccepted = false;

            for (let i = 0; i < numSamplingBeforeReject; i++) {
                let angle = Math.random() * Math.PI * 2;
                let dir = new Vector2(Math.sin(angle), Math.cos(angle));
                let candidate = tempVec.set(spawnCenter.x, spawnCenter.y).add(dir);
                if (this.isValid(candidate, samplingRegionSize, cellSize, radius, points, gird)) {
                    points.push(candidate);
                    spawnCenter.add(candidate);
                    gird[Math.floor(candidate.x / cellSize)][Math.floor(candidate.y / cellSize)] = points.length;
                    candidateAccepted = true;
                    break;
                }
            }

            if (candidateAccepted) {
                spawnPoints.splice(spawnIndex);
            }

        } while (spawnPoints.length > 0);

        return points;
    }

    private static isValid(candidate: Vector2, sampleRegionSize: Vector2, cellSize: number, radius: number, points: Vector2[], grid: number[][]): boolean {
        if (0 <= candidate.x && candidate.x < sampleRegionSize.x
            && 0 <= candidate.y && candidate.y < sampleRegionSize.y) {

            let cellX = Math.floor(candidate.x / cellSize);
            let cellY = Math.floor(candidate.y / cellSize);
            let searchStartX = Math.max(0, cellX - 2);
            let searchEndX = Math.min(cellX + 2, grid.length);
            let searchStartY = Math.max(0, cellY - 2);
            let searchEndY = Math.min(cellY + 2, grid[0].length);
            let tempVec = Vector2.zero;

            for (let i = searchStartX; i < searchEndX; i++) {
                for (let j = searchStartY; j < searchEndY; j++) {
                    let pointIndex = grid[i][j] - 1;
                    if (pointIndex !== -1) {
                        let dst = tempVec.set(candidate).subtract(points[pointIndex]).sqrLength;
                        if (dst < Math.pow(radius, 2)) {
                            return false;
                        }
                    }
                }
            }

            return true;

        }


        return false;
    }
}