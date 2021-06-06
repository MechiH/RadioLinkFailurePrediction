// ====================MyScript=========================
$("#switchView").on("click", function (e) {
  e.preventDefault();
  $(".FirstRow").toggleClass("none");
  $("#SecondRow").toggleClass("none");
});
var xData= JSON.parse(data)
var x = 0;
var len = xData["severaly_error_second"].length
while(x < len){ 
  xData["severaly_error_second"][x] = xData["severaly_error_second"][x].toFixed(2); 
    x++
}
var months=[]
var percentage=[]
xData['months'].forEach(function (item, index) {
  months.push(item[0])
  percentage.push(item[1]*100)
})
// ==================DisplayData========================
var severalyErrorSecondData = xData["severaly_error_second"];
var ErrorSecondsData = xData["error_second"];
var UnavailableSecondsData =xData["unavail_second"];
var AvailableTimeData = xData["avail_time"];
var BbeData =xData["bbe"];
var rlfData = xData['rlfPerDat'];
//-------------WeatherData---------------------
var humidityData = xData['humidity']
var temperatureData = xData['temperature']
var WindSpeedData = xData['windSpeed']
// ------------RlfData-------------------
var rlfSeriesData = percentage;
var rlfBarPerDayData =  xData['rlfPerDat'];
// -------------------Sparks------------------
var spark1Data = [25, 66, 41, 59, 25, 44, 12, 36, 9, 21];
var spark2Data = [12, 14, 2, 47, 32, 44, 14, 55, 41, 69];
var spark3Data = [47, 45, 74, 32, 56, 31, 44, 33, 45, 19];
var spark4Data = [15, 75, 47, 65, 14, 32, 19, 54, 44, 61];
// -----------------DateData------------------
var rlfSeriesDateData = months;
var WeatherDateData = xData['date']
var dateRlfBarPerDay = xData['date']
var kpisDateData = xData['date']
// ======================RLFTable=======================
for (let i = 0; i < xData['output'].length; i=i+2) {

  $("tBody").append('<tr class="row100 body">'+
  '<td class="cell100 column1">'+xData['output'][i]+'</td>'+
  '<td class="cell100 column2">'+xData['output'][i+1]+'</td> '+
'</tr>');
}
$('#sites').text(xData['Counters'][0])
$('#rlf').text(xData['Counters'][3])
$('#weather').text(xData['Counters'][1])
$('#kpis').text(xData['Counters'][2])   
// =======================APEX==========================
window.Apex = {
  chart: {
    foreColor: "#ccc",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
  },
  grid: {
    borderColor: "#535A6C",
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
};

var spark1 = {
  chart: {
    id: "spark1",
    group: "sparks",
    type: "line",
    height: 80,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  series: [
    {
      data: spark1Data,
    },
  ],
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 0,
  },
  grid: {
    padding: {
      top: 20,
      bottom: 10,
      left: 110,
    },
  },
  colors: ["#fff"],
  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return "";
        },
      },
    },
  },
};

var spark2 = {
  chart: {
    id: "spark2",
    group: "sparks",
    type: "line",
    height: 80,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  series: [
    {
      data: spark2Data,
    },
  ],
  stroke: {
    curve: "smooth",
  },
  grid: {
    padding: {
      top: 20,
      bottom: 10,
      left: 110,
    },
  },
  markers: {
    size: 0,
  },
  colors: ["#fff"],
  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return "";
        },
      },
    },
  },
};

var spark3 = {
  chart: {
    id: "spark3",
    group: "sparks",
    type: "line",
    height: 80,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  series: [
    {
      data: spark3Data,
    },
  ],
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 0,
  },
  grid: {
    padding: {
      top: 20,
      bottom: 10,
      left: 110,
    },
  },
  colors: ["#fff"],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return "";
        },
      },
    },
  },
};

var spark4 = {
  chart: {
    id: "spark4",
    group: "sparks",
    type: "line",
    height: 80,
    sparkline: {
      enabled: true,
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    },
  },
  series: [
    {
      data: spark4Data,
    },
  ],
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 0,
  },
  grid: {
    padding: {
      top: 20,
      bottom: 10,
      left: 110,
    },
  },
  colors: ["#fff"],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return "";
        },
      },
    },
  },
};

new ApexCharts(document.querySelector("#spark1"), spark1).render();
new ApexCharts(document.querySelector("#spark2"), spark2).render();
new ApexCharts(document.querySelector("#spark3"), spark3).render();
new ApexCharts(document.querySelector("#spark4"), spark4).render();
var optionsLine = {
  chart: {
    height: 328,
    type: "line",
    zoom: {
      enabled: false,
    },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 2,
      blur: 4,
      opacity: 1,
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  //colors: ["#3F51B5", '#2196F3'],
  series: [
    {
      name: "Humidity",
      data: humidityData,
    },
    {
      name: "Temperature",
      data: temperatureData,
    },
    {
      name: "Wind Speed",
      data: WindSpeedData,
    },
    {
      name: "Radio Link Failure",
      data: rlfData,
    },
  ],
  title: {
    text: "Weather affect",
    align: "left",
    offsetY: 25,
    offsetX: 20,
  },
  subtitle: {
    text: "Statistics",
    offsetY: 55,
    offsetX: 20,
  },
  markers: {
    size: 6,
    strokeWidth: 0,
    hover: {
      size: 9,
    },
  },
  grid: {
    show: true,
    padding: {
      bottom: 0,
    },
  },
  labels: WeatherDateData,
  xaxis: {
    tooltip: {
      enabled: false,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    offsetY: -20,
  },
};

var chartLine = new ApexCharts(
  document.querySelector("#line-adwords"),
  optionsLine
);
chartLine.render();

var optionsCircle4 = {
  chart: {
    type: "radialBar",
    height: 350,
    width: 380,
  },
  plotOptions: {
    radialBar: {
      size: undefined,
      inverseOrder: true,
      hollow: {
        margin: 5,
        size: "48%",
        background: "transparent",
      },
      track: {
        show: false,
      },
      startAngle: -180,
      endAngle: 180,
    },
  },
  title: {
    text: "Radio Link Failure Per Month",
    align: "left",
    offsetY: 5,
    offsetX: 60,
  },
  stroke: {
    lineCap: "round",
  },
  series: rlfSeriesData,
  labels: rlfSeriesDateData,
  legend: {
    show: true,
    floating: true,
    position: "right",
    offsetX: 90,
    offsetY: 340,
  },
};

var chartCircle4 = new ApexCharts(
  document.querySelector("#radialBarBottom"),
  optionsCircle4
);
chartCircle4.render();

var optionsBar = {
  chart: {
    height: 350,
    type: "bar",
    stacked: true,
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
      horizontal: false,
    },
  },
  series: [
    {
      name: "Raido Link Failure",
      data: rlfBarPerDayData,
    },
  ],
  title: {
    text: "Radio Link Failure Per Day",
    align: "left",
    offsetY: 5,
    offsetX: 60,
  },
  xaxis: {
    categories: dateRlfBarPerDay,
  },
  fill: {
    opacity: 1,
  },
};

var chartBar = new ApexCharts(document.querySelector("#barchart"), optionsBar);
chartBar.render();

var optionsArea = {
  chart: {
    height: 350,
    type: "area",
    stacked: false,
  },
  stroke: {
    curve: "straight",
  },
  series: [
    {
      name: "Severaly Error Second",
      data: severalyErrorSecondData,
    },
    {
      name: "Error Seconds",
      data: ErrorSecondsData,
    },
    {
      name: "Unavailable Seconds",
      data: UnavailableSecondsData,
    },
    {
      name: "Available Time",
      data: AvailableTimeData,
    },
    {
      name: "BBE",
      data: BbeData,
    },
    {
      name: "Radio Link Failure",
      data: rlfData,
    },
  ],
  title: {
    text: "Kpis affect",
    align: "left",
    offsetY: 5,
    offsetX: 20,
  },
  subtitle: {
    text: "Statistics",
    offsetY: 35,
    offsetX: 20,
  },
  xaxis: {
    categories: kpisDateData,
  },
  tooltip: {
    followCursor: true,
  },
  fill: {
    opacity: 1,
  },
};

var chartArea = new ApexCharts(
  document.querySelector("#areachart"),
  optionsArea
);


chartArea.render();
var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#fusionexport-btn').click(function () {

    doc.addHTML($('#DownloadPdf')[0], function () {
        doc.save('Report.pdf');
    });
});