import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const timestampsById = timestamps.results.reduce((acc, curr) => {
  acc[curr["&id"]] = curr.timestamps;
  return acc;
}, {});

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const filteredRows = mockData.results.filter((row) =>
    row["&id"].toLowerCase().includes(searchText.toLowerCase())
  );
  const handleRowClick = (row, index, timestamps) => {
    setSelectedOrderDetails({
      buySellIndicator: row.executionDetails.buySellIndicator,
      orderStatus: row.executionDetails.orderStatus,
      orderType: row.executionDetails.orderType,
    });
    setSelectedOrderTimeStamps({
      orderReceived: timestamps[index].timestamps.orderReceived,
      orderStatusUpdated: timestamps[index].timestamps.orderStatusUpdated,
      orderSubmitted: timestamps[index].timestamps.orderSubmitted,
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={mockData.results.length}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        {/* <List rows={mockData.results} /> */}
        {/* <List rows={mockData.results} timestampsById={timestampsById} /> */}
        {/* <List
          rows={filteredRows}
          timestampsById={timestampsById}
          currency={currency}
        /> */}
        {/* <List
          rows={filteredRows}
          timestampsById={timestampsById}
          currency={currency}
          onOrderSelect={handleOrderSelect}
        /> */}

        <List
          rows={filteredRows}
          timestamps={timestamps.results}
          currency={currency}
          onRowClick={handleRowClick}
        />

        {/* <List
          rows={mockData.results}
          timestampsById={timestampsById}
          currency={currency}
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
