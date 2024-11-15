import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "@mui/material";
import axios from "axios";
import { getToken } from "../../../utils/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const [chartData, setChartData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        fill: true,
        label: "Monthly Orders",
        data: Array(12).fill(0),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          "https://backendgrocery-production.up.railway.app/api/v1/user/order-history-cms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const orders = response.data.data.data;

        // Process the orders to count monthly orders
        const monthlyOrders = Array(12).fill(0);
        orders.forEach((order) => {
          const orderDate = new Date(order.created_at);
          const month = orderDate.getMonth();
          monthlyOrders[month]++;
        });

        setChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: monthlyOrders,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Orders Over Time",
        size: 20,
        align: "start",
      },
    },
  };

  return (
    <Card>
      <Line data={chartData} options={options} />
    </Card>
  );
}

export default LineChart;
