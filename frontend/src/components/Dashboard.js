import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"; // 필요한 요소 임포트
import axios from "axios";
import "./Dashboard.css";

// 스케일 및 요소 등록
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState({
    cpu: 0,
    hdd: 0,
    mem: 0,
  });

  useEffect(() => {
    // 여기에 실제 API URL을 입력하세요.
    const fetchData = async () => {
      try {
        const response = await axios.get("https://my-wiki.p-e.kr:20004/api/dashboard");
        setData({
          cpu: response.data.cpu,
          hdd: response.data.hdd,
          mem: response.data.mem,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["CPU", "HDD", "MEM"],
    datasets: [
      {
        label: "Usage (%)",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [data.cpu, data.hdd, data.mem],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>System Dashboard</h1>
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            title: {
              display: true,
              text: "시스템 자원",
              fontSize: 20, // 제목 크기 조정
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
