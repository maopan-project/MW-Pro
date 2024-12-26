/**
 * AStar Detail http://theory.stanford.edu/~amitp/GameProgramming/ImplementationNotes.html
 * 目标导向型行动计划（Goal Oriented Action Planner）
 */
export namespace GOAP {
    export class Service {

        static createGoap() {
            let planner = new Planner();

            planner.setPre("scout", "armedwithgun", true);
            planner.setEffect("scout", "enemyvisible", true);

            planner.setPre("approach", "enemyvisible", true);
            planner.setEffect("approach", "nearenemy", true);

            planner.setPre("aim", "enemyvisible", true);
            planner.setPre("aim", "weaponloaded", true);
            planner.setEffect("aim", "enemylinedup", true);

            planner.setPre("shoot", "enemylinedup", true);
            planner.setEffect("shoot", "enemyalive", false);

            planner.setPre("load", "armedwithgun", true);
            planner.setEffect("load", "weaponloaded", true);

            planner.setPre("detonatebomb", "armedwithbomb", true);
            planner.setPre("detonatebomb", "nearenemy", true);
            planner.setEffect("detonatebomb", "alive", false);
            planner.setEffect("detonatebomb", "enemyalive", false);

            planner.setPre("flee", "enemyvisible", true);
            planner.setEffect("flee", "nearenemy", false);

            let fr = new WorldState();

            this.setWorldState(planner, fr, "enemyvisible", false);
            this.setWorldState(planner, fr, "armedwithgun", true);
            this.setWorldState(planner, fr, "weaponloaded", false);
            this.setWorldState(planner, fr, "enemylinedup", false);
            this.setWorldState(planner, fr, "enemyalive", true);
            this.setWorldState(planner, fr, "armedwithbomb", true);
            this.setWorldState(planner, fr, "nearenemy", false);
            this.setWorldState(planner, fr, "alive", true);

            planner.setCost('detonatebomb', 5);

            let goal = new WorldState();
            this.setWorldState(planner, goal, 'enemyalive', false);

            let path = planner.startSearch(fr, goal);

            console.log(JSON.stringify(path));
        }

        static setWorldState(planner: Planner, ws: WorldState, atom: string, value: boolean) {
            const idx = planner.indexForAtomName(atom);
            if (idx === -1) {
                return false;
            }
            let v = 1 << idx;
            ws.value = value ? (ws.value | v) : (ws.value & (~v));
            ws.unCare &= ~v;

            return true;
        }
    }

    const MAX_OFFSET = 31;

    const MAX_CAPACITY = 1024;

    class WorldState {
        value: number = 0;
        unCare: number = -1;

        clone() {
            let ws = new WorldState();
            ws.value = this.value;
            ws.unCare = this.unCare;

            return ws;
        }
    }

    class AStarNode {
        ws: WorldState = null!;
        g: number = 0;
        h: number = 0;
        f: number = 0;
        actionName: string = '';
        parentWs: WorldState = null!;
    }

    class AStar {
        planner: Planner = null!;

        openList: AStarNode[] = [];

        closeList: AStarNode[] = [];

        goal: WorldState = null!;

        path: string[] = [];

        plan(start: WorldState, goal: WorldState) {
            this.openList.length = 0;
            this.closeList.length = 0;
            this.goal = goal;
            this.path = [];

            let node = new AStarNode();
            node.ws = start;
            node.parentWs = start;
            node.g = 0;
            node.h = this.calcH(start, goal);
            node.f = node.g + node.h;
            node.actionName = '';

            this.openList.push(node);
            this.startSearch();

            return this.path;
        }

        private startSearch() {
            do {
                if (this.openList.length === 0) {
                    console.log('Did not find a path');
                    return;
                }

                let node = this.getLowestNode();
                if (this.checkIsFind(node)) {
                    console.log('找到了');
                    this.fillPath(node);
                    return;
                }

                this.closeList.push(node);
                if (this.closeList.length > MAX_CAPACITY) {
                    console.log('已经是最大容量了，还是没找到1');
                    return;
                }

                // core code
                let names: string[] = [];
                let costs: number[] = [];
                let worldStates: WorldState[] = [];
                let cnt = this.getPossibleStateTranslations(node.ws, names, costs, worldStates);

                for (let i = 0; i < cnt; i++) {
                    let aNode = new AStarNode();
                    let cost = node.g + costs[i];

                    let idx_o = this.idxForOpened(worldStates[i]);
                    let idx_c = this.idxForClosed(worldStates[i]);

                    if (idx_o >= 0 && cost < this.openList[idx_o].g) {
                        if (this.openList.length > 0) {
                            this.openList[idx_o] = this.openList[this.openList.length - 1];
                        }

                        this.openList.length -= 1;
                        idx_o = -1;
                    }

                    if (idx_c >= 0 && cost < this.closeList[idx_c].g) {
                        if (this.closeList.length > 0) {
                            this.closeList[idx_c] = this.closeList[this.closeList.length - 1];
                        }

                        this.closeList.length -= 1;
                        idx_c = -1;
                    }

                    if (idx_o === -1 && idx_c === -1) {
                        aNode.ws = worldStates[i];
                        aNode.g = cost;
                        aNode.h = this.calcH(node.ws, worldStates[i]);
                        aNode.f = aNode.g + aNode.h;
                        aNode.actionName = names[i];
                        aNode.parentWs = node.ws;

                        this.openList.push(aNode);
                    }

                    if (this.openList.length > MAX_CAPACITY) {
                        console.log('已经是最大容量了，还是没找到2');
                        return;
                    }
                }
            } while (1)
        }

        private calcH(fr: WorldState, to: WorldState) {
            let care = (to.unCare ^ -1);
            let diff = (fr.value & care) ^ (to.value & care);

            let h = 0;
            for (let i = 0; i < MAX_OFFSET; i++) {
                if (diff & (1 << i)) {
                    h++;
                }
            }

            return h;
        }

        private getLowestNode() {
            // 这里可以使用最小堆优化
            let lowestIdx = -1;
            let lowestVal = Number.MAX_SAFE_INTEGER;

            for (let i = 0; i < this.openList.length; i++) {
                if (this.openList[i].f < lowestVal) {
                    lowestVal = this.openList[i].f;
                    lowestIdx = i;
                }
            }

            let node = this.openList[lowestIdx];
            this.openList[lowestIdx] = this.openList[this.openList.length - 1];
            this.openList.length -= 1;

            return node;
        }

        private checkIsFind(node: AStarNode) {
            let care = (this.goal.unCare ^ -1);
            return (node.ws.value & care) === (this.goal.value & care);
        }

        private getPossibleStateTranslations(fr: WorldState, names: string[], costs: number[], worldStates: WorldState[]) {
            let writer = 0;
            // 遍历整个action
            for (let i = 0; i < this.planner.actionName.length; i++) {
                let pre = this.planner.actPre[i];
                let care = (pre.unCare ^ -1);
                let met = (care & pre.value) === (care & fr.value);

                if (met) {// 找到了满足前置条件的action
                    names[writer] = this.planner.actionName[i];
                    costs[writer] = this.planner.actCost[i];
                    worldStates[writer] = this.doAction(i, fr);
                    writer++;
                }
            }

            return writer;
        }

        private doAction(idx: number, fr: WorldState) {
            let ws = new WorldState();

            let effect = this.planner.actEffect[idx];
            let unCare = effect.unCare;
            let care = (effect.unCare ^ -1);

            ws.value = (fr.value & unCare) | (effect.value & care);
            ws.unCare &= effect.unCare;

            return ws;
        }

        private idxForOpened(ws: WorldState) {
            for (let i = 0; i < this.openList.length; i++) {
                if (this.openList[i].ws.value === ws.value) {
                    return i;
                }
            }

            return -1;
        }

        private idxForClosed(ws: WorldState) {
            for (let i = 0; i < this.closeList.length; i++) {
                if (this.closeList[i].ws.value === ws.value) {
                    return i;
                }
            }

            return -1;
        }

        private fillPath(node: AStarNode) {
            let idx = -1;
            do {
                if (node.actionName === '') {
                    break;
                } else {
                    this.path.push(node.actionName);
                    idx = this.idxForClosed(node.parentWs);

                    if (idx === -1) {
                        break;
                    } else {
                        node = this.closeList[idx];
                    }
                }

            } while (1)
        }
    }

    class Planner {
        actionName: string[] = [];

        atomName: string[] = [];

        actPre: WorldState[] = [];

        actEffect: WorldState[] = [];

        actCost: number[] = [];

        searcher: AStar = null;

        constructor() {
            this.searcher = new AStar();
            this.searcher.planner = this;
        }

        startSearch(fr: WorldState, to: WorldState) {
            return this.searcher.plan(fr.clone(), to.clone());
        }


        setPre(action: string, atom: string, value: boolean) {
            let actionIdx = this.indexForActionName(action);
            let atomIdx = this.indexForAtomName(atom);

            if (actionIdx !== -1 && atomIdx !== -1) {
                Service.setWorldState(this, this.actPre[actionIdx], atom, value);
            }

            return false;
        }

        setEffect(action: string, atom: string, value: boolean) {
            let actionIdx = this.indexForActionName(action);
            let atomIdx = this.indexForAtomName(atom);

            if (actionIdx !== -1 && atomIdx !== -1) {
                Service.setWorldState(this, this.actEffect[actionIdx], atom, value);
            }

            return false;
        }

        setCost(action: string, cost: number) {
            let idx = this.indexForActionName(action);

            if (idx !== -1) {
                this.actCost[idx] = cost;
            }
        }

        indexForActionName(action: string) {
            let i = 0;
            for (; i < this.actionName.length; i++) {
                if (this.actionName[i] === action) {
                    return i;
                }
            }

            if (i < MAX_OFFSET) {
                this.actionName[i] = action;
                this.actPre[i] = new WorldState();
                this.actCost[i] = 1;

                return i;
            }

            return -1;
        }

        indexForAtomName(atom: string) {
            let i = 0;
            for (; i < this.atomName.length; i++) {
                if (this.atomName[i] === atom) {
                    return i;
                }
            }

            if (i < MAX_OFFSET) {
                this.atomName[i] = atom;
                this.actEffect[i] = new WorldState();
                return i;
            }

            return -1;
        }
    }
}