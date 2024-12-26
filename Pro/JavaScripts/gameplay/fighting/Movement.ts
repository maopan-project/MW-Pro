export namespace Movement {
    // 属性同步脚本
    export class MotionClip extends mw.Script {
        public get character() {
            return this.gameObject as mw.Character;
        }
    }

    export class MotionClip_HitBack {
        oOverride = false;

        elapseMode: number = 0;

        duration: number = 0;

        goalPosition: Vector = null;

        tickMotion() {

        }

    }


    export class CharacterMovementComponent {

        inputVector: Vector = Vector.zero;

        motion: MotionClip = null;

        playMotionID(motionID: number) {

        }

        update() {
        }


    }
}