import { Component, Input, Output, EventEmitter, NgModule } from "@angular/core";  

@Component({  
  moduleId: module.id,  
  selector: 'column-chart',  
  templateUrl: 'charts.component.html'  

})  
export class ChartComponent {  
  private graph: Array<any> = [];  
  private chart: any;  
  private fillColors = ['#1ab394', '#f8ac59', '#e355e8', '#0D8ECF', '#2A0CD0', '#CD0D74', '#CC0000', '#00CC00', '#0000CC', '#DDDDDD', '#999999', '#333333', '#990000'];  
  private textColors = ['#000000', '#0106fc', '#e8c322', '#efdede', '#d0500c', '#CD0D74', '#CC0000', '#00CC00', '#0000CC', '#DDDDDD', '#999999', '#333333', '#990000'];  
  @Input() private graphNo: any;  
  @Input() private graphType: any;  
  @Input() controlId: string;  
  @Input() private categoryField: string;  
  @Input() private title: Array<any> = [];  
  @Input() private valueField: Array<any> = [];  
  @Input() private newStackNo: any;  
  @Input() caption: string = ''  
  @Input() private rotate: boolean  
  @Input("source") private _source: Array<any> = [];  

  @Output() onError: EventEmitter<any> = new EventEmitter<any>();  

  constructor() {  
  }  

  ngOnInit() {  
      debugger;  
      let self = this;  
      this.InitializeData();  
  }  

  InitializeData(): void {  
      if (AmCharts.isReady) {  
          let self = this;  
          this.createChart();  
      }  
  }  

  private createChart(): void {  
      let self = this;  
      this.chart = new AmCharts.AmSerialChart();  
      this.chart.dataProvider = self._source;  
      this.chart.categoryField = self.categoryField;  
      this.chart.plotAreaBorderAlpha = 0;  
      this.chart.rotate = self.rotate;  
      this.chart.columnWidth = 0.5; // Column Width  

      // AXES             
      var categoryAxis = this.chart.categoryAxis;  
      categoryAxis.fillColor = "#FAFAFA";  
      categoryAxis.fillAlpha = 0;  
      categoryAxis.gridColor = "#000000";  
      categoryAxis.gridAlpha = 0;  
      categoryAxis.axisColor = "#f1f1f1";  
      categoryAxis.axisAlpha = 1;  
      categoryAxis.gridPosition = "start";  
      categoryAxis.color = " #959595";  
      categoryAxis.fontSize = 9;  
      categoryAxis.labelRotation = 30;  


      var valueAxis = new AmCharts.ValueAxis();  
      valueAxis.stackType = "regular";  
      valueAxis.fillColor = "#FAFAFA";  
      valueAxis.fillAlpha = 0;  
      valueAxis.gridColor = "#000000";  
      valueAxis.gridAlpha = 0;  
      valueAxis.axisColor = "#f1f1f1";  
      valueAxis.axisAlpha = 1;  
      valueAxis.color = " #959595";  
      valueAxis.fontSize = "9";  
      this.chart.addValueAxis(valueAxis);  

      // GRAPHS  
      for (let i = 0; i < 1; i++) {  
          self.graph[i] = new AmCharts.AmGraph();  
          self.graph[i].type = "column";  
          self.graph[i].valueField = this.valueField[i];  
          self.graph[i].title = this.title[i];  
          self.graph[i].labelText = "[[value]]";  
          if (i == self.newStackNo) {  
              self.graph[i].newStack = true;  
          }  
          self.graph[i].balloonText = self.title[i] + " : [[title]]," + self.categoryField + " : [[category]], " + self.valueField[i] + " : [[value]]";  
          self.graph[i].lineAlpha = 0;  
          self.graph[i].fillAlphas = 1;  
          self.graph[i].color = self.textColors[i];  
          self.graph[i].fontSize = "8";  
          self.graph[i].lineColor = self.fillColors[i];  
          self.chart.addGraph(self.graph[i]);  
      }  

      // LEGEND                    
      var legend = new AmCharts.AmLegend();  
      legend.position = "bottom";  
      legend.equalWidths = false;  
      legend.markerSize = 6;  
      legend.marginBottom = 0;  
      legend.useMarkerColorForLabels = true;  
      legend.equalWidths = false;  
      this.chart.addLegend(legend);  

      // WRITE  
      this.chart.write(this.controlId);  
  }  
}  