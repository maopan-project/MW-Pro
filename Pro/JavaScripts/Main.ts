import { MWResource } from "./constants/mw-resource";
import { LanguageTypes, i18n, initLanguage } from "./language/i18n";
import { UIType } from "./ui/base/UIConfig";
import { UI } from "./ui/base/UIManager";

@Component
export default class Main extends Script {
    @Property({ tooltip: "多语言", enumType: LanguageTypes })
    language: LanguageTypes = LanguageTypes.CHINESE;

    @Property({ tooltip: "线上存储" })
    online: boolean = false;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.useUpdate = true;
        // initLanguage(this.Lang);

        if (SystemUtil.isClient()) {
            // let af = this.a(10);// 固定x = 10

            // console.log(JSON.stringify(af.next()));

            // console.log(JSON.stringify(af.next(1000)));

            // console.log(JSON.stringify(af.next(50)));

            // console.log(JSON.stringify(af.next(20)));

            // clampText('<u><size=80><color=#red>富文本</color></size>标签</u>');
            // RoomCreator.createRoom();

            // RoomSettings.getMaxPlayers;


            // RouteService;

            // RoomService.kick();

            // QueryUtil.lineTrace();

            // let phy: mw.Impulse;

            // phy

            this.test();
            // UI.show(UIType.MAIN_UI);
            // UI.show(UIType.ABILITY_RELEASE_UI);
            setTimeout(() => { UI.show(UIType.MAIN_UI); }, 0);
        }

        if (SystemUtil.isServer()) {
            Event.addClientListener('aaa', (player: mw.Player) => {

            });

            Event.addClientListener('bbb', (player: mw.Player) => {
                player.character.complexMovementEnabled = true;
                player.character.worldTransform.scale = new Vector(1.8);
            });

            // DataStorage.asyncSetData("789", { bag: {}, });
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        mw.TweenUtil.TWEEN.update();
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }

    private test() {
        let c: mw.Character = GameObject.findGameObjectById("3F2C70A3") as any;

        InputUtil.onKeyDown(Keys.One, () => {
            let pik = GameObject.findGameObjectById("0DD2DB84");
            let anchor = GameObject.spawn(MWResource.ANCHOR);
            let cha = Player.localPlayer.character;
            cha.attachToSlot(anchor, HumanoidSlotType.Root);
            anchor.localTransform.position = new Vector(0, 0, 200);

            // let follower = new PetFlyBehavior(pik, anchor, cha);
            // TimeUtil.onEnterFrame.add(() => {
            //     follower.fly();
            // });
        });

        InputUtil.onKeyDown(Keys.Two, () => {
            let cha = Player.localPlayer.character;
            cha.worldTransform.scale = cha.worldTransform.scale.add(new Vector(1));
        });

        InputUtil.onKeyDown(Keys.Three, () => {
            // Event.dispatchToLocal("TIPS", "你好");
            // UIService.show(MainUI);
            // let a = GameObjPool.spawn("0504D97F", mwext.GameObjPoolSourceType.Scene);
            let a = GameObject.spawn("13596") as Effect;
            // let e = a.getChildByName("爆炸") as Effect;
            a.worldTransform.position = Player.localPlayer.character.worldTransform.position.add(new Vector(0, 0, 200));
            a.loopCount = 0;
            a.play();

            setTimeout(() => {
                a.stop();
            }, 3000);

        });
    }

    private * bb() {
        return 999;
    }


    private * a(x) {
        console.log("x：" + x);

        let a = yield x;// 这里的a是next传入的值
        console.log("x：" + x);
        console.log("a: " + a);

        let b = yield (x + 1) + a;
        yield a + b;

        console.log("a + b = ", a + b);
        // yield this.bb();
        // 【yield* this.bb()】 这是一个表达式 是一个值
        return yield* this.bb();
    }
}

// protected onUpdate(deltaTime: number): void {
//     if (this.currentShopData && this.currentShopData.shopCanBuyCount > 0) {
//         let time = this.currentShopData.lastRefreshTime + this.currentShopData.cycle * 60 * 60 * 1000 - Date.now();
//         if (time > 0) {
//             this.text_time.text = FormatUtils.getRemindTime(time, "{h}:{mm}:{s}");
//             this.img_time.visibility = SlateVisibility.Visible;
//             return;
//         }
//     }

//     this.text_time.text = "";
//     this.img_time.visibility = SlateVisibility.Collapsed;
//     this.canUpdate = false;
// }




