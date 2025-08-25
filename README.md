# Airline Invoice Dashboard

A full-stack web application to manage and analyze airline invoices. Built with **React** for the frontend and **FastAPI** for the backend.

---

## Features

- Fetch invoice data from the backend.
- Select invoices and download them in JSON format.
- Amount column highlights high, medium, and low values using color coding:
  - Green: < 10,000
  - Yellow: 10,000–20,000
  - Red: > 20,000
- Responsive UI with smooth animations and hover effects.
- Backend provides airline-wise summaries and high-value invoice suggestions.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Icons
- **Backend:** FastAPI, Python
- **Other Tools:** Axios for HTTP requests, Uvicorn for running FastAPI

---

## Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend
