
export default class DefaultUI extends UIScript {

	static instance: DefaultUI;

	v: Vector = Vector.zero;

	// /** 仅在游戏时间对非模板实例调用一次 */
	// protected onStart() {
	// 	let up = this.uiWidgetBase.findChildByPath('RootCanvas/Button3') as Button;
	// 	let down = this.uiWidgetBase.findChildByPath('RootCanvas/Button4') as Button;

	// 	up.onPressed.add(() => {
	// 		this.v.z = 1;
	// 	});

	// 	up.onReleased.add(() => {
	// 		this.v.z = 0;
	// 	});

	// 	down.onPressed.add(() => {
	// 		this.v.z = -1;
	// 	})

	// 	down.onReleased.add(() => {
	// 		this.v.z = 0;
	// 	});

	// 	let joystick = this.uiWidgetBase.findChildByPath('RootCanvas/VirtualJoystickPanel') as VirtualJoystickPanel;
	// 	joystick.onInputDir.add((v2) => {
	// 		if (Math.abs(v2.x) <= 0.01 && Math.abs(v2.y) <= 0.001) {
	// 			this.v.x = 0;
	// 			this.v.y = 0;
	// 			return;
	// 		}
	// 		let camera = Camera.currentCamera;
	// 		let angle1 = camera.worldTransform.rotation.z;
	// 		let angle2 = -Vector2.signAngle(Vector2.unitY, v2);
	// 		let angle = Math.PI * (angle1 + angle2) / 180;

	// 		this.v.x = Math.cos(angle);
	// 		this.v.y = Math.sin(angle);
	// 	});

	// 	const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack') as Button;
	// 	jumpBtn.onPressed.add(() => {
	// 		Player.localPlayer.character.changeState(CharacterStateType.Flying);
	// 		Player.localPlayer.character.movementDirection = mw.MovementDirection.AxisDirection;
	// 	});
	// }
}
