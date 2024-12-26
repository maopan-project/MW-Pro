export namespace Projectile {
    export class ProjectileManager {
        static createTrackingProjectile(owner, ability, fromPosition, target, speed): TrackingProjectile {
            let projectile = new TrackingProjectile();
            return projectile;
        }

        static createLinearProjectile(owner, ability, fromPosition, velocity, distance, collisionBox, filterTargetInfo): LinearProjectile {
            let projectile = new LinearProjectile();
            return projectile;
        }
    }

    /**
     * 这是个梯形碰撞盒
     */
    export class CollisionBox {
        /**开始宽度 */
        startWidth: number = 0;
        /**结束宽度 */
        endWidth: number = 0;
    }

    export class BaseProjectile {
        owner: any = null;
        ability: any = null;
        fromPosition: any = null;

        execute(dt: number) {

        }
    }

    export class TrackingProjectile extends BaseProjectile {
        target: any = null;
        speed: number = 0;
    }

    export class LinearProjectile extends BaseProjectile {
        velocity: number = 0;
        distance: number = 0;
        collisionBox: CollisionBox = null;
        filterTargetInfo: any = null;
    }
}