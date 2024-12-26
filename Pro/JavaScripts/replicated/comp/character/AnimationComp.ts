import { AnimationBody } from "../../BodyClasses";
import CharacterBaseComp from "./CharacterBaseComp";

@mw.Component
export default class AnimationComp extends CharacterBaseComp {
    /**当前动画信息 */
    @mw.Property({ replicated: true, onChanged: AnimationComp.prototype.onAnimationBody })
    private _animationBody: AnimationBody = null;
    /**动画 */
    private animator: mw.Animation = null;
    /**动画播放时间 */
    private _time: number = 0;

    //#region getter/setter
    /**是否完成 */
    public get isFinish() {
        return this.animator == null;
    }

    /**动画信息体 */
    public set animationBody(body: AnimationBody) {
        if (SystemUtil.isClient()) {
            this.onAnimationBody();
        }

        this._animationBody = body;
    }

    /**当前动画时间 */
    public get time() {
        return this._time;
    }

    //#endregion

    //#region 生命周期函数
    protected onUpdate(dt: number): void {
        if (!this.character) return;
        if (!this.character.isReady) return;
        if (!this._animationBody) return;

        if (!this.animator) {
            this.animator = this.character.loadAnimation(this._animationBody.guid);
            this.animator.speed = this._animationBody.rate;
            this.animator.loop = this._animationBody.loop ? 1 : 9999;
            this.animator.play();
            this._time = 0;
        }

        if (this._animationBody.loop === 0) {
            return;
        }

        this._time += dt;
        if (this._time >= this.animator.length) {
            this.stop();
            this._animationBody = null;
        }
    }

    /**
     * 动画状态机销毁，结束动画
     */
    onDestroy() {
        this.stop();
    }
    //#endregion

    private stop() {
        if (this.animator) {
            this.animator.stop();
            this.animator = null;
        }
    }

    private onAnimationBody() {
        this.stop();
    }
}