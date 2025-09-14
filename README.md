# Mini Seller Console

[![Author](https://img.shields.io/badge/author-lcsdiniz-6DB33F)](https://www.linkedin.com/in/lcsdiniz/)  
[![Languages](https://img.shields.io/badge/languages-React%2BTypeScript%2BTailwind-6DB33F)](#)  
[![Stars](https://img.shields.io/github/stars/lcsdiniz/mini-seller-console?color=6DB33F)](#)  

---

## ℹ️ Project Overview

**Mini Seller Console** is a lightweight web console built with **React + Tailwind CSS** for managing **Leads** and converting them into **Opportunities**.  
The goal of this project is to provide a clean, responsive, and intuitive interface for triaging leads while demonstrating **high-quality code structure**, **responsiveness**, and **state management**.  

**Key highlights:**
- **Lead Management:** Search, filter, and sort leads efficiently.  
- **Detail Panel:** Inline editing of lead information with validation.  
- **Convert Leads:** Transform leads into opportunities with minimal steps.  
- **Optimistic Updates:** Update UI instantly with rollback on simulated errors.  
- **Responsive Design:** Desktop-first layout with graceful adaptation to mobile screens.  

This project uses **local JSON files** to simulate backend data and **setTimeout** to emulate network latency.  

---

## 🛠 Technologies

- **React 18 + Vite** – modern front-end framework and build tool  
- **TypeScript** – type safety and improved developer experience  
- **Tailwind CSS** – utility-first responsive styling  
- **React Hot Toast** – lightweight notifications for user actions  
- **Local JSON** – simulates backend data for leads and opportunities  
- **Custom Hooks & Contexts** – state and filter management  
- **Responsive Design** – desktop → mobile  
- **Optimistic UI Updates** – with rollback on failure  

---

## 🧩 Features

### 1. Leads List
- Loads from a **local JSON file**.  
- Displays fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`.  
- Functionalities:
  - **Search:** filter by name or company.  
  - **Filter:** by status (e.g., “Open”, “Contacted”).  
  - **Sort:** by score descending.  
- Smooth handling of ~100 leads.

### 2. Lead Detail Panel
- Click on a lead row to open a **slide-over panel**.  
- Inline editing for `status` and `email` (with validation).  
- Save/Cancel actions with basic error handling.

### 3. Convert to Opportunity
- **Convert Lead** button in each row.  
- Creates an opportunity with:
  - `id`, `name`, `stage`, `amount` (optional), `accountName`.  
- Opportunities are displayed in a **simple table**.

### 4. UX & States
- Handles **loading**, **empty**, and **error** states gracefully.  
- **Persisted filters/sorting** using `localStorage`.  
- Optimistic updates with **rollback** on simulated failures.  
- Fully **responsive layout** from desktop to mobile.

---

## 🚀 How to Run

### Requirements
- Node.js v18+  
- Yarn or NPM  

### Steps
```bash
# Clone the repository
git clone https://github.com/lcsdiniz/mini-seller-console.git

# Enter project directory
cd mini-seller-console

# Install dependencies
yarn install
# or
npm install

# Start the development server
yarn dev
# or
npm run dev
```

Open the application in your browser at [http://localhost:5173](http://localhost:5173)  
Leads and Opportunities are loaded from `assets/leads.json`.

---

## 🗂 Project Structure

```text
src/
├─ assets/          # Static JSON data for leads
├─ components/      # Shared UI components (Button, Table, Select)
├─ features/
│  ├─ lead/         # Lead-specific components, services, constants
│  └─ opportunity/  # Opportunity-specific components, services, constants
├─ pages/           # Application pages (HomePage)
├─ routes/          # React Router configuration
├─ types/           # TypeScript types
└─ constants/       # Global constants and storage keys
```

## 🎯 Design Decisions

- **Clean Component Structure:** Leads and Opportunities are organized by feature for scalability.  
- **Absolute Imports (`@/...`):** simplifies imports and avoids long relative paths.  
- **Optimistic UI:** improves perceived performance by updating UI before simulated API response.  
- **Responsive Design:** uses Tailwind’s mobile-first utilities to adjust layout and padding dynamically.  
- **Persisted Filters:** selected filters and sorting are saved in `localStorage` for better UX.

