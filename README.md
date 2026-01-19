# EstimateRUL – Frontend

EstimateRUL is a web-based frontend application built with **Next.js** that provides an intuitive interface for predicting the **Remaining Useful Life (RUL)** of industrial engines using uploaded sensor data.  
The platform also includes role-based dashboards for users, organization admins, and system admins.

---

## 🚀 Features

### ✅ Authentication & Authorization
- JWT-based authentication
- Role-based access control:
  - **USER**
  - **ORG ADMIN**
  - **ADMIN**

### ✅ Dashboard
- Organization-level overview:
  - Organization name
  - Total users
  - Org admins
  - Standard users
  - Total predictions made
- Clean and minimal UI for operational clarity

### ✅ Predict RUL (CSV Upload)
- Upload engine sensor data in CSV format
- Backend-powered RUL prediction
- Secure, authenticated requests
- Audit logging handled by backend

### 🚧 Predict with Live Data (Under Development)
- Live sensor-based prediction workflow
- Currently under development
- Will be available in a future release

### ✅ Admin Panel
- Manage organizations (enable / disable)
- View organization users
- Enable / disable users
- View audit logs

### ✅ Responsive UI
- Modern layout with sidebar navigation
- Dark mode support
- Optimized for desktop usage

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **State Management:** React Hooks
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## 🔗 Environment Variables

Create a `.env` file for local development:

```env
NEXT_PUBLIC_API_BASE_URL= http://localhost:8000(fastapi backend)
GEMINI_API_KEY=Your gemini api key
```
 
## Running Locally
- npm install
- npm run dev
## App will be available at:
- http://localhost:9002


