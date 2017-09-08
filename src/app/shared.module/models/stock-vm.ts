export class StockSummaryViewModel {
    public symbol: string;
    public name: string;
    public price: number;
}

export class StockDataViewModel {
    public date: string;
    public open: string;
    public high: string;
    public low: string;
    public close: string;
}

export class StockDetailsViewModel {
    constructor(
        public symbol: string,
        public name: string,
        public logo: string,
        public dayPrice: string,
        public dayChangePct: string,
        public dayChangeAmt: string,
        public marketCap: string,
        public yearRange: string
    ) { }
}

