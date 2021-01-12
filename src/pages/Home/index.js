import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { RiHandbagLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Home() {
  const product = useSelector((state) => state.products);
  const [totalStok, setTotalStok] = useState(0);

  useEffect(() => {
    if (product.products.length > 0) {
      const i = product.products.reduce((a, c) => a + c.quantity, 0);
      setTotalStok(i);
    }
  }, [product]);

  // const totalStokF = (products) => {
  //   return products.map((item) => item.)
  // };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      Pengunjung: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      Pengunjung: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      Pengunjung: 9800,
      amt: 2290,
    },
    {
      name: "Page B",
      uv: 3000,
      Pengunjung: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      Pengunjung: 9800,
      amt: 2290,
    },
    {
      name: "Page B",
      uv: 3000,
      Pengunjung: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      Pengunjung: 9800,
      amt: 2290,
    },
  ];

  return (
    <>
      <Layout>
        <div className="home">
          <div className="container-card-h">
            <div className="box-card-h">
              <div className="box-card-h-icon h-box-icon-product">
                <RiHandbagLine className="card-h-icon h-icon-product" />
              </div>

              <div className="card-h-info">
                <h6>{totalStok}</h6>
                <p>Total Stok</p>
              </div>
            </div>
            <div className="box-card-h">
              <div className="box-card-h-icon h-box-icon-order">
                <AiOutlineShoppingCart className="card-h-icon h-icon-order" />
              </div>

              <div className="card-h-info">
                <h6>43</h6>
                <p>Total Order</p>
              </div>
            </div>
            <div className="box-card-h">
              <p>Hi</p>
            </div>
            <div className="box-card-h">
              <div style={{ textAlign: "center" }}>
                <LineChart width={170} height={60} data={data}>
                  <Line
                    type="monotone"
                    dataKey="Pengunjung"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Tooltip />
                </LineChart>
                <p className="h-pengunjung">Pengunjung</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
