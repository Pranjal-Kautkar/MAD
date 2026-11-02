# React Native Practical Record Suite (Expo SDK 54)

An all-in-one interactive web application that implements and runs **all 8 React Native practicals** from the Expo SDK 54 practical lab manual, complete with a realistic mobile phone simulator, live API connections, dual-mode Supabase database (real cloud or instant local mock storage), algorithm reference, and printable lab record book generator.

---

## 📱 Practicals Included

| # | Practical Project | Category | Key Features |
|---|-------------------|----------|--------------|
| **1** | **Weather App** | API & Async | Open-Meteo Geocoding & Forecast API, temperature (°C), wind speed (km/h) |
| **2** | **Calculator App** | Math & State | Addition, subtraction, multiplication (`*`), division (`/`) with division-by-zero check |
| **3** | **Todo App** | State & Lists | Task addition, dynamic list, tap to strikethrough (toggle done), delete button |
| **4** | **Camera & Image Picker** | Media & Hardware | Real gallery upload/picker, live webcam photo capture, 250×250 preview |
| **5** | **Product List with Add to Cart** | E-Commerce & REST | DummyJSON API fetch, product list, cart management, total calculation |
| **6** | **Lost and Found (CRUD)** | Cloud Database | Supabase/Mock items CRUD, type selection (Lost/Found), place, phone |
| **7** | **Login and Signup** | Cloud Auth | Supabase/Mock authentication, session persistence, user welcome screen |
| **8** | **Student Management System** | Analytics & CRUD | Supabase/Mock students CRUD, live name search, student count & average marks |

---

## 🚀 Key Application Features

1. **Dual Viewing Modes**:
   - **📱 Phone Simulator Mode**: High-fidelity mobile simulator replicating Expo Go on mobile with status bar, notch/dynamic island, and realistic touch interactions.
   - **💻 Expanded Fullscreen Mode**: Wide-screen desktop layout for easier testing and editing.

2. **Algorithm & Lab Record Book Companion**:
   - For every practical, toggle between the **Interactive App** and the **Algorithm & Code** tab.
   - Displays the **Aim**, **Step 1 (CLI Commands)**, **Step 2 (Packages)**, **Step 3 (Algorithm)**, and full copyable `app/index.tsx` and `lib/supabase.ts` code.
   - **Print Lab Record** button to generate a clean PDF or printout for college assignment submission.

3. **Hybrid Supabase Engine**:
   - **Zero-Setup Local Mock DB**: Works right away without needing any Supabase account.
   - **Live Supabase Cloud**: Click the **Supabase Config** button in the sidebar or mobile header to plug in your Project URL and Publishable Anon Key (`sb_publishable_...`).
   - Built-in SQL table creation scripts with one-click copy.

4. **Common Troubleshooting Guide**:
   - Built-in answers to PowerShell `npx` execution policy blocks, Expo Go version compatibility, cache clearing (`npx expo start -c`), and tunnel options.

---

## 🛠️ Running Locally

The app dev server is already running! If you restart it in the future:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your web browser.
