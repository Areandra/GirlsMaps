# 💄 Girls Map - Skincare & Makeup Digital Map System

**Girls Map** is a web-based Geographic Information System (GIS) specifically designed to help women locate cosmetic, skincare, and makeup stores accurately. This project is a Software Engineering (RPL) implementation utilizing a user-centered design approach to provide an integrated solution for beauty product discovery.

---

![React](https://img.shields.io/badge/React-19.1.1-61DAFB)
![ReactDOM](https://img.shields.io/badge/ReactDOM-19.1.1-61DAFB)
![React-Router-Dom](https://img.shields.io/badge/React--Router--Dom-7.8.2-CA4242)
![React-Icons](https://img.shields.io/badge/React--Icons-5.5.0-61DAFB)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-4ABF4F)
![React-Leaflet](https://img.shields.io/badge/React--Leaflet-5.0.0-4ABF4F)
![Mapbox-GL](https://img.shields.io/badge/Mapbox--GL-3.14.0-0099FF)
![Firebase](https://img.shields.io/badge/Firebase-12.2.1-FFCA28)
![Fuse.js](https://img.shields.io/badge/Fuse.js-7.1.0-FF6F61)
![Vite](https://img.shields.io/badge/Vite-7.1.2-yellow)
![ESLint](https://img.shields.io/badge/ESLint-9.33.0-orange)
![@vitejs/plugin-react](https://img.shields.io/badge/@vitejs--plugin--react-5.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-red)

---

## 🎯 Quick Info

| Aspect | Detail |
| --- | --- |
| **Framework** | React.js |
| **Bundler** | Vite |
| **Database** | Firebase Realtime Database |
| **Map Library** | Leaflet.js |
| **Data Processing** | QGIS & ArcGIS |
| **Development Method** | Waterfall |
| **Target Location** | Palu City, Indonesia |

---

## 📖 Table of Contents

* [Overview](https://www.google.com/search?q=%23overview)
* [Use Case & Target Audience](https://www.google.com/search?q=%23use-case--target-audience)
* [Key Features](https://www.google.com/search?q=%23key-features)
* [System Requirements](https://www.google.com/search?q=%23system-requirements)
* [Development Methodology](https://www.google.com/search?q=%23development-methodology)
* [Usage Flow](https://www.google.com/search?q=%23usage-flow)
* [Project Structure](https://www.google.com/search?q=%23project-structure)
* [Contribution & License](https://www.google.com/search?q=%23contribution--license)

---

## 📋 Overview

Girls Map addresses the challenges consumers face when searching for trusted cosmetic stores, which are often scattered inconsistently across social media. This platform provides:

* ✅ **Interactive Digital Map:** Visualizes store locations using markers on a map.
* ✅ **Product Directory:** Comprehensive information regarding the product catalog for each store.
* ✅ **Operational Info:** Detailed opening and closing hours.
* ✅ **Personal Recommendations:** Assistance in choosing products based on skin type (*planned feature*).

---

## 🏫 Use Case & Target Audience

* **Female Consumers:**
Search for the nearest stores, compare products, view reviews, and receive recommendations.
* **Store Owners:**
Increase business exposure and showcase product catalogs to local customers.

---

## ⭐ Key Features

### 1. Interactive Map System

* Visualization of Palu City using Leaflet.js.
* Store location markers with links to detailed information.

### 2. Search & Filter

* Search for stores by name or product type.
* Filter by product category (*Skincare / Makeup*).

### 3. Data Management (Admin)

* CRUD (Create, Read, Update, Delete) for store data and locations.
* Real-time product and operational hour updates via Firebase.

### 4. User Experience (UX)

* Responsive interface optimized for both desktop and mobile.
* Displays ratings and reviews from other users.

---

## ⚙️ System Requirements

### Software

* **Operating System:** Windows / Linux / MacOS
* **Browser:** Google Chrome, Mozilla Firefox, Safari (Latest versions)
* **Development Tools:** VS Code, Git, QGIS (for spatial data processing)

---

## 🔄 Development Methodology

This project was developed using the **Waterfall Method**:

1. **Requirements Analysis:** Direct observation in Palu City to identify core problems.
2. **Design:** Creation of Flowcharts, DFD, ERD, and Use Case Diagrams.
3. **Implementation:** Coding using React.js and Firebase.
4. **Testing:** Blackbox Testing to ensure map markers, search functions, and CRUD operations function correctly.

---

## 🚦 Usage Flow

### For Users

1. Open the application in a web browser.
2. Explore the digital map of Palu City.
3. Click on a **marker** at the desired store location.
4. View detailed information: operational hours, store photos, and product lists.

### For Admins

1. Log in to the management system.
2. Add new coordinates or edit existing store information.
3. Save changes to the database for instant updates on the map.

---

## 📂 Project Structure

```text
GirlsMap/
├── src/
│   ├── components/      # UI Components (Map, Navbar, Sidebar)
│   ├── pages/           # Main Pages (Home, Admin Dashboard)
│   ├── services/        # Firebase & Leaflet logic
│   └── assets/          # Images & Icons
├── database/            # Spatial & non-spatial data (JSON/Firebase)
├── public/              # Static files
├── vite.config.ts       # Vite configuration
├── package.json         # Project dependencies
└── README.md

```

---

## 📜 Contribution & License

* Contributions are welcome via Pull Requests.
* Use the `main` branch for stable versions.
* This project is distributed under the MIT License.

---

<div align="center">

**⭐ Support us by giving a STAR if you find this useful! ⭐**

</div>

---

Would you like me to add a specific **Installation & Quick Start** section with the terminal commands (e.g., `npm install`, `npm run dev`) to make it even more developer-friendly?
