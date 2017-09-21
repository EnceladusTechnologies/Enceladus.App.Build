import { ChartConfig, FieldMaps, stockGraph, panel, chartCursorSettings } from "app/shared.module/models/chart-vm";

export class ChartConfigs {

    static cursorSettings: chartCursorSettings = {
        pan: true,
        valueBalloonsEnabled: true,
        fullWidth: true,
        cursorAlpha: 0.1,
        valueLineBalloonEnabled: true,
        valueLineEnabled: true,
        valueLineAlpha: 0.5
    }

    static chartGraph: stockGraph = {
        type: "candlestick",
        id: "g1",
        openField: "open",
        closeField: "close",
        highField: "high",
        lowField: "low",
        valueField: "close",
        lineColor: "#4C9B3B",
        fillColors: "#4C9B3B",
        negativeLineColor: "#B4444F",
        negativeFillColors: "#B4444F",
        fillAlphas: 1,
        comparedGraphLineThickness: 2,
        columnWidth: 0.7,
        useDataSetColors: false,
        comparable: true,
        compareField: "close",
        showBalloon: true,
        proCandlesticks: true,
        balloonText: "[[close]]"
    };

    static stockPanel: panel = {
        title: "Value",
        percentHeight: 60,
        stockLegend: {
            valueTextRegular: undefined,
            periodValueTextComparing: "[[percents.value.close]]%"
        },
        stockGraphs: [ChartConfigs.chartGraph]
    };
    static signalGraph: stockGraph =
    {
        valueField: "signal",
        balloonText: "[[value]]",
        type: "column",
        showBalloon: true,
        fillAlphas: 1,
        lineColor: "#438bae",
        fillColors: "#438bae",
        negativeLineColor: "#e6c423",
        negativeFillColors: "#e6c423",
        useDataSetColors: false
    };
    static positionGraph: stockGraph =
    {
        valueField: "position",
        balloonText: "[[value]]",
        type: "column",
        showBalloon: true,
        fillAlphas: 1,
        lineColor: "#522d80",
        fillColors: "#522d80",
        negativeLineColor: "#f66733",
        negativeFillColors: "#f66733",
        useDataSetColors: false
    };
    static signalPanel: panel = {

        title: "Signal",
        percentHeight: 20,
        marginTop: 1,
        columnWidth: 0.8,
        showCategoryAxis: false,
        valueAxes: [
            {
                usePrefixes: true
            }
        ],
        stockLegend: {
            markerType: "none",
            markerSize: 0,
            labelText: "",
            periodValueTextRegular: "[[value.close]]"
        },
        stockGraphs: [ChartConfigs.signalGraph]
    }
    static positionPanel: panel = {
        title: "Position",
        percentHeight: 20,
        marginTop: 1,
        columnWidth: 0.8,
        showCategoryAxis: false,
        valueAxes: [
            {
                usePrefixes: true
            }
        ],
        stockLegend: {
            markerType: "none",
            markerSize: 0,
            labelText: "",
            periodValueTextRegular: "[[value.close]]"
        },
        stockGraphs: [ChartConfigs.positionGraph]
    }
    static StockChart: ChartConfig = {
        type: "stock",
        theme: "dark",
        dataDateFormat: "YYYY-MM-DD",        
        chartScrollbarSettings: {
            graph: "g1",
            graphType: "line",
            usePeriod: "WW",
            backgroundColor: "#333",
            graphFillColor: "#777",
            graphFillAlpha: 0.5,
            gridColor: "#555",
            gridAlpha: 1,
            selectedBackgroundColor: "#444",
            selectedGraphFillAlpha: 1
        },
        categoryAxisSettings: {
            equalSpacing: true,
            gridColor: "#555",
            gridAlpha: 1
        },
        valueAxesSettings: {
            gridColor: "#555",
            gridAlpha: 1,
            inside: true,
            showLastLabel: true
        },
        chartCursorSettings: ChartConfigs.cursorSettings,
        dataSets: [],
        panels: [
            ChartConfigs.stockPanel,
            ChartConfigs.positionPanel,
            ChartConfigs.signalPanel
        ]
    }
}
