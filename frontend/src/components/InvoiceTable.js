import React, { useState } from "react";

function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/a/invoices")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        setShowTable(true); // Show table only after button is clicked
      })
      .catch((err) => console.error("Error fetching invoices:", err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">✈ Airline Invoice Dashboard</h2>

      {/* Fetch Data Button */}
      <button
        onClick={fetchData}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-6"
      >
        Fetch Data
      </button>

      {/* Show table only after fetching */}
      {showTable && (
        <div className="bg-white shadow-lg rounded-xl p-4">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-4 py-2">Select</th>
                <th className="px-4 py-2">Invoice No</th>
                <th className="px-4 py-2">Airline</th>
                <th className="px-4 py-2">Amount ($)</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.invoice_no} className="text-center">
                  <td className="px-4 py-2 border">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 border">{inv.invoice_no}</td>
                  <td className="px-4 py-2 border">{inv.airline}</td>
                  <td className="px-4 py-2 border">${inv.amount}</td>
                  <td className="px-4 py-2 border">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Download Button */}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <span className="mr-2">⬇</span> Download Selected
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceTable;
