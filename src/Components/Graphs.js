import React, { useContext } from "react";
// import ThemeContext from "../../themeContext/ThemeContext";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import { Divider, Box, CardHeader, Card, CardContent } from "@mui/material";

export default function Graphs() {
  const option = {
    series: [2, 4, 5],
    labels: ["Apple", "Banana", "Grapes"],
  };
  const series = [2, 4, 5];

  // const theme = useContext(ThemeContext);
  const data2 = {
    labels: ["Red", "Green"],
    datasets: [
      {
        data: [300, 200],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const seriesd = [
    {
      name: "Cases",
      data: [
        3845718, 222038, 3845718, 88369, 167466, 932638, 2055423, 3343777,
        3845718,
      ],
    },
    {
      name: "Recovered",
      data: [28, 284, 9394, 42710, 76026, 191853, 501538, 1029651, 1255481],
    },
    {
      name: "Deaths",
      data: [17, 259, 1666, 2996, 6472, 49675, 140658, 238619, 269567],
    },
  ];
  const optionsd = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      color: "black",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/22/20",
        "2/1/20",
        "2/15/20",
        "3/1/20",
        "3/15/20",
        "4/1/20",
        "4/15/20",
        "5/1/20",
        "5/7/20",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  // const option = {
  //   plugins: {
  //     tooltip: {
  //       callbacks: {
  //         title: function () {
  //           return "my tittle";
  //         }
  //       }
  //     },
  //     legend: { display: false },
  //     title: {
  //       display: true,
  //       text: "Test chart",
  //       position: "top"
  //     }
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true
  //     }
  //   }
  // };
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <Box
        style={{
          color: "#fff",
          width: "70vw",
          marginLeft: "21px",
        }}
      >
        <Card
          style={{
            margin: "20px 20px",
            width: "75vw",
            background: "#2A2D3E",
            color: "#fff",
          }}
        >
          <CardHeader
            title="Earnings"
            style={{ color: "#fff", opacity: "0.8" }}
          />
          <Divider />
          <CardContent>
            <Box
              style={{ padding: "3px" }}
              sx={{
                // height: 400,
                position: "relative",
                padding: "3px",
              }}
            >
              <ReactApexChart
                options={optionsd}
                series={seriesd}
                type="area"
                height={350}
                color={"#fff"}
              />
            </Box>
          </CardContent>

          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          ></Box>
        </Card>
      </Box>

      <Card
        style={{
          margin: "20px 37px",
          width: "40vw",
          background: "#2A2D3E",
          color: "#fff",
        }}
      >
        <CardHeader
          title="Students"
          style={{ color: "#fff", opacity: "0.8" }}
        />
        <Divider />
        <CardContent>
          {/* <Box
          style={{ padding: "3px" }}
          sx={{
            // height: 400,
            position: "relative",
            padding: "3px",
          }}
        > */}
          <div
            id="chart"
            // style={{width:'70vw'}}
          >
            <Chart
              options={option}
              series={series}
              type="donut"
              width={"95%"}
            />
          </div>

          {/* </Box> */}
        </CardContent>

        <Divider />
      </Card>
    </>
  );
}
