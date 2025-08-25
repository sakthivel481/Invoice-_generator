import React, { useEffect, useState } from "react";

function InvoiceDashboard() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/a/invoices")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched invoices:", data); // 👀 Check backend response
      if (Array.isArray(data)) {
        setInvoices(data);
      } else if (data.invoices) {
        setInvoices(data.invoices);
      } else {
        console.error("Unexpected data format:", data);
        setInvoices([]);
      }
    })
    .catch((err) => console.error("Error fetching invoices:", err));
}, []);


  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">📑 Invoice List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={invoice.id || index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {invoice.id || index + 1}
                </td>
                <td className="py-3 px-4">{invoice.customer || "N/A"}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    invoice.amount > 50000 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹{invoice.amount?.toLocaleString()}
                </td>
                <td className="py-3 px-4">{invoice.date || "—"}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : invoice.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {invoice.status || "Unknown"}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceDashboard;
