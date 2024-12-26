export namespace MathUtils {
    /**
     * 贝塞尔曲线
     * @param points 点集合 
     * @param t [0,1]
     */
    export function bezierCurve(points: mw.Vector[], t: number) {
        if (points.length < 2) return null;
        if (points.length === 2) return mw.Vector.lerp(points[0], points[1], t);

        const newPoints: mw.Vector[] = [];
        for (let i = 0; i < points.length - 1; i++) {
            const point0 = points[i];
            const point1 = points[i + 1];
            newPoints.push(mw.Vector.lerp(point0, point1, t));
        }

        return bezierCurve(newPoints, t);
    }

    /**
    * 罗德里格旋转 - 罗德里格旋转公式是计算三维空间中，一个向量绕旋转轴旋转给定角度以后得到的新向量的计算公式
    * @param v 一个空间向量
    * @param axis 旋转轴的单位向量
    * @param angle 绕旋转轴旋转角度
    */
    export function rodriguesRotation(v: Vector, axis: Vector, angle: number) {
        let cos_theta = Math.cos(angle * (Math.PI / 180));
        let sin_theta = Math.sin(angle * (Math.PI / 180));
        let first = v.clone().multiply(cos_theta);
        let second = Vector.cross(v, axis).multiply(sin_theta);
        let thirdly = v.multiply(Vector.dot(v, axis) * (1 - cos_theta));
        return first.add(second).add(thirdly);
    }
}