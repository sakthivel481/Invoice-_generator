import React, { useState } from "react";
import axios from "axios";
import { FaPlane, FaDownload } from "react-icons/fa";
import "./App.css";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState([]);
  const [fetched, setFetched] = useState(false);

  // Fetch invoices
  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/a/invoices")
      .then((res) => {
        setInvoices(res.data);
        setFetched(true);
      })
      .catch((err) => console.error("Error fetching invoices:", err));
  };

  // Toggle selection
  const toggleSelect = (invoice_no) => {
    setSelected((prev) =>
      prev.includes(invoice_no)
        ? prev.filter((i) => i !== invoice_no)
        : [...prev, invoice_no]
    );
  };

  // Download selected invoices
  const downloadSelected = () => {
    if (selected.length === 0) return;

    const selectedData = invoices.filter((inv) =>
      selected.includes(inv.invoice_no)
    );
    const jsonString = JSON.stringify(selectedData, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "selected_invoices.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <FaPlane className="logo" />
        <h1>Airline Invoice Dashboard</h1>
      </header>

      {/* Content Card */}
      <div className="card">
        {/* Fetch Data Button */}
        <button
          className="download-btn fade-in-button"
          style={{ animationDelay: "0.2s" }}
          onClick={fetchData}
          disabled={fetched}
        >
          Fetch Data
        </button>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Airline</th>
              <th>Amount ($)</th>
              <th>GSTIN</th>
            </tr>
          </thead>
          <tbody>
            {fetched &&
              invoices.map((inv, index) => {
                // Amount background
                let bgColor =
                  inv.amount < 10000
                    ? "#1e7e34"
                    : inv.amount <= 20000
                    ? "#ffc107"
                    : "#dc3545";
                let textColor = bgColor === "#ffc107" ? "#000" : "#fff";

                return (
                  <tr
                    key={inv.invoice_no}
                    className={`fade-in-row ${
                      selected.includes(inv.invoice_no) ? "selected" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.05 + 0.3}s` }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(inv.invoice_no)}
                        onChange={() => toggleSelect(inv.invoice_no)}
                      />
                    </td>
                    <td
                      className={selected.includes(inv.invoice_no) ? "selected-cell" : ""}
                    >
                      {inv.invoice_no}
                    </td>
                    <td className={selected.includes(inv.invoice_no) ? "selected-cell" : ""}>
                      {inv.date}
                    </td>
                    <td className={selected.includes(inv.invoice_no) ? "selected-cell" : ""}>
                      {inv.airline}
                    </td>
                    {/* Amount cell always keeps its background */}
                    <td
                      style={{
                        fontWeight: "600",
                        color: textColor,
                        textAlign: "center",
                        borderRadius: "6px",
                        backgroundColor: bgColor,
                        padding: "4px 8px",
                      }}
                    >
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className={selected.includes(inv.invoice_no) ? "selected-cell" : ""}>
                      {inv.gstin}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Download Selected Button */}
        <button
          className="download-btn fade-in-button"
          style={{ animationDelay: "0.4s" }}
          onClick={downloadSelected}
          disabled={selected.length === 0}
        >
          <FaDownload /> Download Selected
        </button>
      </div>
    </div>
  );
}

export default App;
