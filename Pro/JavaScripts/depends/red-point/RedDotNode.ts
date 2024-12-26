export class RedDotNode {
    private _name: string = "";
    private _parent: RedDotNode = null;
    private _children: Map<string, RedDotNode> = new Map();

    constructor(name: string, parent: RedDotNode = null) {
        this._name = name;
        this._parent = parent;
    }

    public get name(): string {
        return this._name;
    }

    public get parent(): RedDotNode {
        return this._parent;
    }

    public get children(): Map<string, RedDotNode> {
        return this._children;
    }

    public getChild(name: string): RedDotNode {
        return this._children.get(name);
    }
}