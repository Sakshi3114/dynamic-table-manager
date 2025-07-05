# 📊 Dynamic Data Table Manager

A dynamic and fully-featured Data Table Manager built with **Next.js 14**, **Redux Toolkit**, **Material UI (MUI)**, and **React Hook Form**. This project showcases real-world frontend development capabilities including dynamic UIs, global state management, CSV import/export, inline editing, and much more.

---

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Redux Toolkit** & Redux Persist
- **Material UI v5+**
- **React Hook Form**
- **PapaParse** for CSV import
- **FileSaver.js** for CSV export
- **LocalStorage** for column visibility persistence

---

## ✅ Features

### 🧩 Core Table Features
- **Display a paginated table** (10 rows per page by default)
- **Default Columns**: Name, Email, Age, Role
- **Client-side Sorting** on column headers (toggle ASC/DESC)
- **Global Search** that filters across all fields
- **Client-side Pagination** with page controls

---

### 🔧 Column Manager
- “Manage Columns” Modal:
  - Add new custom columns (e.g., Department, Location)
  - Show/hide existing columns using checkboxes
- **State Persistence** of column visibility via Redux Persist

---

### 📂 Import & Export
- **CSV Import**:
  - Upload and parse using PapaParse
  - Validate structure and show format errors
- **CSV Export**:
  - Export current view as CSV
  - Only visible columns are exported

---

### ✏️ Inline Row Editing
- Double-click or click "Edit" on any row to make it editable
- Supports both:
  - **Edit All Rows** (batch mode)
  - **Edit Single Row** (with Save/Cancel buttons)
- **Input validation** (e.g., Age must be a number)

---

### ⚙️ Row Actions
- Edit, Save, Cancel for inline editing
- Delete Row with confirmation prompt

---

### 🎨 Theme Toggle
- **Light/Dark Mode switch** powered by Material UI theming
- Theme preference persisted across sessions

---

### 🖱️ Usability & UX
- **Fully Responsive Design**
- Clean, modular component-based architecture
- Tooltip support for buttons
- Visual feedback on actions (e.g., no data found)

---

## 📁 Project Structure (Simplified)

app/
├── layout.js
├── page.js
├── table/
│ └── page.js
├── components/
│ ├── DataTable.js
│ ├── EditableRow.js
│ ├── RowActions.js
│ ├── ColumnManager.js
│ ├── ImportExportControls.js
│ ├── TableToolbar.js
│ └── ThemeToggle.js
├── store/
│ ├── tableSlice.js
│ ├── themeSlice.js
│ └── index.js
---

## 🛠️ How to Run Locally

```bash
git clone https://github.com/yourusername/dynamic-data-table.git
cd dynamic-data-table
npm install
npm run dev

Navigate to: http://localhost:3000