import { QuestionBase } from '../../main.module/strategy.module/model-config-question/question-types';


export class BotResultVM {
    id: number;
    modelName: string;
    modelDescription: string;
    modelAuthor: string;
    modelInputs: string;
    name: string;
    description: string;
    author: string;
    targetTicker: string;
    orderType: string;
    orderAmount: number;
    startingBank: number;
    timeSlippageSecs: number;
    priceSlippagePct: number;
    commissionPenaltyPerTrade: number;
    startDate: Date;
    tradeBook: TradeBook;
}
export class BotStrategyVm {
    id: string;
    model: TradingModelVm;
    name: string;
    description: string;
    author: string;
    orderType: string;
    orderAmount: string;
}
export class BotListItemVM {
    id: string;
    // model: ITradingModel;
    name: string;
    description: string;
    author: string;
    orderType: string;
    orderAmount: string;
    modelName: string;
    modelInputs: string;
    targetSymbol: string;
}

export class TradeBook {
    id: string;
    tradeEntries: TradeEntry[];
    series: SeriesItem[];
    tradingStats: TradingStats;
}

// https://docs.amcharts.com/3/javascriptstockchart/StockEvent
export class TradeEntry {
    backgroundAlpha: number;
    backgroundColor: string;
    borderAlpha: number;
    borderColor: string;
    color: string;
    date: Date;
    description: string;
    fontSize: number;
    graph: string;
    rollOverColor: string;
    showAt: string; // open/close/low/high
    showBullet: boolean;
    showOnAxis: boolean;
    text: string;
    type: string; // flag, sign, pin, triangleUp, triangleDown, triangleLeft, triangleRight, text, arrowUp, arrowDown
    url: string;
    urlTarget: string;
    value: number;
}
export class SeriesItem {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    signal: number;
    portfolioValue: number;
    position: number;
}

export class TradingStats {
    totalPnL: number;
    averageProfitPerTrade: number;
}


export class TradingModelVm {
    id: string;
    name: string;
    description: string;
    author: string;
    tradingModelInputs: string;
    configurationQuestions: QuestionBase<any>[];
}

export class TradingModelListItemVM {
    id: string;
    name: string;
    description: string;
    author: string;
    modelInputs: string;
}


