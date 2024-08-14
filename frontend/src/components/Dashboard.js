import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2"; // Doughnut 차트 임포트
import { Chart, ArcElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import "./Dashboard.css";

Chart.register(ArcElement, Title, Tooltip, Legend); // 필요한 요소 등록

function Dashboard() {
  const [data, setData] = useState({
    cpu: 0,
    hdd: 0,
    mem: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://my-wiki.p-e.kr:20004/api/dashboard"); // 실제 API URL 사용
        console.log(response.data); // 데이터 확인
        setData({
          cpu: response.data.cpu,
          hdd: response.data.hdd,
          mem: response.data.mem,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["CPU", "HDD", "MEM"],
    datasets: [
      {
        label: "Usage (%)",
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
        ],
        data: [data.cpu, data.hdd, data.mem],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>System Dashboard</h1>
      <div className="chart-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Doughnut
            data={chartData} // Doughnut 차트 사용
            options={{
              title: {
                display: true,
                text: "시스템 자원",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
