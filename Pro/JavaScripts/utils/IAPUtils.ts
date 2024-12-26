class IAP {
    /**乐币数量 */
    private _arkNum: number = 0;
    public get arkNum() {
        return this._arkNum;
    }

    /**乐币数量监听回调 */
    public readonly onArkCoinChange: Action1<number> = new Action1();

    constructor() {
        PurchaseService.onArkBalanceUpdated.add((amount: number) => {
            this._arkNum = amount;
            this.onArkCoinChange.call(amount);
        });

        this.reqRefreshCoin();
    }

    /**
     * 发起购买
     * @param commodityId 商品Code
     * @returns 
     */
    public reqBuyGoods(commodityId: string) {
        return new Promise((result: (success: boolean) => void) => {
            console.log("发起购买的code", commodityId)
            PurchaseService.placeOrder(commodityId, 1, (status: number, msg: string) => {
                console.log(`IAP_BuyCallback__,status:${status},msg:${msg},id:${commodityId}`);
                if (status == 200) {
                    result(true);
                    console.log("订单支付成功!," + commodityId);
                    this.reqRefreshCoin();
                } else {
                    result(false);
                    console.log(`订单支付失败, id:${commodityId},msg:${msg}`);
                }
            })
        });
    }

    /**
     * 乐币是否足够
     * @param cost 花费金额
     * @returns 
     */
    public isArkCoinEnough(cost: number) {
        return this.arkNum >= cost;
    }

    /**
     * 发起刷新乐币
     */
    public reqRefreshCoin() {
        PurchaseService.getArkBalance();
    }
}

/**iap 客户端服务类 */
export const IAPClientService = function getIAPServive() {
    if (SystemUtil.isServer()) return null;
    return new IAP();
}();

/**iap 服务器订单购买成功的代理 */
export const IAPServerAction = SystemUtil.isServer() ? mw.PurchaseService.onOrderDelivered : null;