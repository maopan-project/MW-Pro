/**Item基本约束类型 */
type ItemClass = mw.UIScript & IItemRender<unknown>;

/**Item完全约束体 */
type SuperItem = ItemClass & IItemClick;

/**如果使用List,那么Item必须实现该接口 */
export interface IItemRender<T> {
    /**索引位置 */
    index: number;

    /**设置数据 */
    refreshItem(data: T, ...params: any[]): void;
}

/**如果需要点击选中 需要实现这个选择接口 */
export interface IItemClick {
    /**item按钮 */
    getBtn(): Button | StaleButton;

    /**点击回调 */
    onClickItem(): boolean;

    /**设置选中 (需要实现)*/
    setSelect(isSelect: boolean): void;
}

/**list组件(滑动列表) */
export class List<T extends IItemRender<unknown>> {
    /**脏标记 */
    private _dirtyMark: boolean = false;
    /**滚动框 */
    private _scroll: mw.ScrollBox;
    /**滚动容器 */
    private _content: mw.Canvas
    /**item池 */
    private _pool: SuperItem[] = [];
    /**数据的长度 */
    private _dataLength = 0;
    /**上间距 */
    private _topDis = 0;
    /**下间距 */
    private _bottomDis = 0;
    /**左间距 */
    private _leftDis = 0;
    /**右间距 */
    private _rightDis = 0;
    /**item间隔 */
    private _itemDis = 0;
    /**当前偏移 */
    private _curOffset = -1;
    /**垂直或者水平的大小 */
    private _fixItemSize = 0;
    /**与_fixItemSize相反（如果上面是垂直这个就是水平） */
    private _fixRowOrColSize = 0;
    /**当前行或者列的item数目 */
    private _fixItemCount = 0;
    /**同屏最大的列或者行 */
    private _maxShowRowOrColCount = 0;
    /**当前选择的索引 */
    private _selectIdx = -1;
    /**滑动框大小 */
    private _scrollSize: Vector2 = null;

    /**清空当前所有选项 */
    public clearSelected() {
        if (this._allowMultipleSelection) {
            this._selectIndexes = [];
        } else {
            this._selectIdx = -1;
        }
        this._dirtyMark = true;
    }

    //================================================//
    /**当前多选的索引 */
    private _selectIndexes: number[] = [];
    /**多选索引数组 */
    public get selectIndexes() {
        return this._selectIndexes.map(Number);
    }

    public set selectIndexes(arr: number[]) {
        this._selectIndexes = arr;
    }

    private _allowMultipleSelection = false;
    /**设置多选开启与关闭 */
    public set allowMultipleSelection(v: boolean) {
        if (this._allowMultipleSelection === v) return;
        this._allowMultipleSelection = v;

        if (this._allowMultipleSelection) {
            this._selectIdx = -1;
            this._selectIndexes = [];
            this._dirtyMark = true;
        }
    }

    /**主UI注册可以监听item点击事件 */
    onSelected: Action2<number, T> = new Action2();

    /**主UI注册可以监听刷新事件 */
    onRefresh: Action2<number, T> = new Action2();

    //==================================================//

    /**
     * @param _cls item构造类
     * @param itemSize item大小（选填，不填则以实际item大小写入）
     */
    constructor(private _cls: new () => ItemClass, private _itemSize: Vector2 = null) {
        TimeUtil.onEnterFrame.add(this.update, this);
    }

    /**
     * 设置滚动框（滚动框变化时，需要重新设置一次）
     * @param scroll 滚动框（滚动框下面需要一个content）
     */
    initScroll(scroll: mw.ScrollBox) {
        if (this._scroll === scroll) {
            return;
        }

        if (this._scroll) {
            this._scroll.onUserScrolled.clear();
            this._scroll.onScrollEnd.clear();
        }

        if (this._content) {
            this._pool.forEach(element => {
                element.uiObject.removeObject();
            });
        }

        this._scroll = scroll;
        this._content = scroll.getChildAt(0) as mw.Canvas;
        this._scrollSize = scroll.size.clone();

        scroll.onUserScrolled.add((currentOffset: number) => {
            let oldOffset = this._curOffset;
            this._curOffset = currentOffset;
            if (Math.abs(this._curOffset - oldOffset) < this._fixItemSize * this._maxShowRowOrColCount) {
                this._dirtyMark = true;
            }
        });
        scroll.onScrollEnd.add(() => {
            this._dirtyMark = true;
        });

        this._topDis = this._content.autoLayoutPadding.top;
        this._leftDis = this._content.autoLayoutPadding.left;
        this._bottomDis = this._content.autoLayoutPadding.bottom;
        this._rightDis = this._content.autoLayoutPadding.right;
        this._itemDis = this._content.autoLayoutSpacing;
        this._content.autoLayoutEnable = false;
    }

    /**
     - 设置数量（会刷新列表）--- *调用之前请确认设置过scroll*
     */
    setLength(len: number) {
        this._dataLength = len;
        this._curOffset = 0;
        this._scroll.scrollOffset = 0;
        this._content.position = mw.Vector.zero;
        this.clearSelected();
        this.resetView();
    }

    /**跳转到指定item索引位置的行或者列 */
    scrollToIndex(index: number) {
        // 索引要小于数量才能跳转
        if (index >= 0 && index <= this._dataLength - 1) {
            this.jumpToIndex(index);
        }
    }

    /**
     * 点击Item,会刷新item的选中态
     * @param idx item索引位置
     */
    clickItem(idx: number) {
        if (this._dataLength === 0) {
            return;
        }

        let item: any = this._pool.filter(val => val.index === idx)[0];
        if (item) {
            if (this._allowMultipleSelection) {
                const index = this._selectIndexes.indexOf(idx);
                if (index === -1) {
                    item.setSelect(true);
                    this._selectIndexes.push(idx);
                } else {
                    item.setSelect(false);
                    this._selectIndexes.splice(index, 1);
                }
            } else {
                const lastItem = this._pool.filter(val => val.index === this._selectIdx)[0];
                if (lastItem) {
                    lastItem.setSelect(false);
                }

                item.setSelect(true);
                this._selectIdx = idx;
            }

            this.onSelected.call(idx, item);
        }
    }

    /**
     * 刷新当前视口显示的所有item
     - 注意：这个接口刷新时,数据层不能有变化
     */
    refreshCurrentView() {
        this._dirtyMark = true;
    }

    /**销毁组件 */
    destroyList() {
        for (let i = 0; i < this._pool.length; i++) {
            if (this._pool[i].getBtn()) {
                this._pool[i].getBtn().onClicked.clear();
            }
        }

        this._pool.length = 0;
        this._content.removeAllChildren();
        TimeUtil.onEnterFrame.remove(this.update, this);

        this.onSelected.clear();
        this.onRefresh.clear();

        this._scroll = null!;
        this._content = null!;
        this.onRefresh = null!;
        this.onSelected = null!;
    }

    /**
     * 休眠List 
     * @param destroyItem 是否销毁item(销毁会清空item池)
     */
    asleep(destroyItem: boolean = false) {
        this._pool.forEach(element => {
            element.uiObject.visibility = mw.SlateVisibility.Collapsed;
        });

        if (destroyItem) {
            for (let i = 0; i < this._pool.length; i++) {
                if (this._pool[i].getBtn()) {
                    this._pool[i].getBtn().onClicked.clear();
                }
                this._pool[i].destroy();
            }
            this._pool.length = 0;
        }
    }

    private update(dt) {
        if (!this._scroll) {
            return;
        }

        if (!this.adapt()) {// 滑动窗口发生大小改变
            this.resetView();
            this._scrollSize.set(this._scroll.size);
        }

        if (this._dirtyMark) {
            this.refresh();
            this._dirtyMark = false;
        }
    }

    private setContent() {
        const size = this._content.size;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) {// 垂直
            // 垂直数量
            const cntV = Math.ceil(this._dataLength / this._fixItemCount);
            const h = this._fixItemSize * cntV + this._topDis + this._bottomDis;
            this._content.size = new mw.Vector2(size.x, h);
        } else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {// 水平
            // 水平数量
            const cntV = Math.ceil(this._dataLength / this._fixItemCount);
            const h = this._fixItemSize * cntV + this._leftDis + this._rightDis;
            this._content.size = new mw.Vector2(h, size.y);
        }
    }

    private initItems() {
        // 获取item大小
        if (this._itemSize === null) {
            const ui = this.createItem();
            this._itemSize = ui.uiObject.size;
        }

        const size = this._scroll.size;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) {// 垂直
            this._fixRowOrColSize = this._itemSize.x + this._itemDis;
            // 水平数量
            this._fixItemCount = Math.floor((size.x - this._rightDis - this._leftDis + this._itemDis) / this._fixRowOrColSize);
            this._fixItemSize = this._itemSize.y + this._itemDis;
            // 垂直数量
            this._maxShowRowOrColCount = Math.ceil((size.y - this._topDis) / this._fixItemSize);
        } else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {// 水平
            this._fixRowOrColSize = this._itemSize.y + this._itemDis;
            // 竖直数量
            this._fixItemCount = Math.floor((size.y - this._topDis - this._bottomDis + this._itemDis) / this._fixRowOrColSize);
            this._fixItemSize = this._itemSize.x + this._itemDis;
            // 水平数量
            this._maxShowRowOrColCount = Math.ceil((size.x - this._leftDis) / this._fixItemSize);
        }

        let count = (this._maxShowRowOrColCount + 1) * this._fixItemCount;
        count = (this._dataLength >= count ? count : this._dataLength) - this._pool.length;

        while (count-- > 0) {
            this.createItem();
        }
    }

    private _tempVec2 = new mw.Vector2();

    private refresh() {
        let idx = 0;
        const rowOrColIndex = Math.floor(this._curOffset / this._fixItemSize);
        let dataIndex = rowOrColIndex * this._fixItemCount;
        // 多加一行跟丝滑
        for (let i = rowOrColIndex; i < (rowOrColIndex + this._maxShowRowOrColCount + 1); i++) {
            for (let j = 0; j < this._fixItemCount; j++) {
                if (dataIndex >= this._dataLength) {// 溢出控制   
                    break;
                }

                const item = this._pool[idx++];
                if (item) {
                    if (!item.uiObject.parent) {
                        this._content.addChild(item.uiObject);
                    }

                    const y = this._fixItemSize * i;
                    const x = this._fixRowOrColSize * j;
                    if (this._scroll.orientation === mw.Orientation.OrientVertical) {// 垂直
                        item.uiObject.position = this._tempVec2.set(x + this._leftDis, y + this._topDis);
                    } else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {// 水平
                        item.uiObject.position = this._tempVec2.set(y + this._leftDis, x + this._topDis);
                    }

                    item.uiObject.visibility = mw.SlateVisibility.Visible;
                    this.updateItem(dataIndex++, item);
                }
            }
        }

        this.hideItem(idx);
    }

    private hideItem(idx: number) {
        for (let i = idx; i < this._pool.length; i++) {
            this._pool[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
        }
    }

    private createItem() {
        const uiScript = mw.UIService.create(this._cls) as SuperItem;
        if (uiScript.getBtn()) {
            uiScript.getBtn().touchMethod = mw.ButtonTouchMethod.PreciseTap;
            uiScript.getBtn().onClicked.add(() => {
                if (uiScript.onClickItem()) {
                    this.clickItem(uiScript.index);
                }
            });
        }
        this._pool.push(uiScript);
        return uiScript;
    }

    private updateItem(idx: number, item: any) {
        item.index = idx;
        this.onRefresh.call(idx, item);

        if (item.setSelect) {
            if (this._allowMultipleSelection) {
                item.setSelect(this._selectIndexes.includes(idx));
            } else {
                item.setSelect(idx === this._selectIdx);
            }
        }
    }

    private jumpToIndex(index: number) {
        const rowOrCol = Math.floor(index / this._fixItemCount);
        const offset = rowOrCol * this._fixItemSize;
        let val = 0;
        if (this._scroll.orientation === mw.Orientation.OrientVertical) {
            val = this._content.size.y - (this._scroll.size.y - this._fixItemSize);
        } else if (this._scroll.orientation === mw.Orientation.OrientHorizontal) {
            val = this._content.size.x - (this._scroll.size.x - this._fixItemSize);
        }

        val = val < 0 ? 0 : val;
        val = offset > val ? val : offset;

        this._curOffset = val;
        this._scroll.scrollOffset = val;
    }

    private resetView() {
        this.initItems();
        this.setContent();
        this._dirtyMark = true;
    }

    private adapt() {
        return Vector2.equals(this._scrollSize, this._scroll.size, 0.1);
    }
}