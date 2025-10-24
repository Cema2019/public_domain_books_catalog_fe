# Public Domain Library - Frontend


A React-based frontend application for browsing and searching public domain books. This app is connected to a FastAPI backend and provides a paginated, searchable interface for books.  

**Live Demo:** [https://public-domain-books-iota.vercel.app](https://public-domain-books-iota.vercel.app)  
**Backend Repository:** [https://github.com/Cema2019/public_domain_books_catalog_be](https://github.com/Cema2019/public_domain_books_catalog_be)  

---

## Features

- Browse public domain books with a clean and responsive UI.  
- Search books by title or author.  
- Debounced search to reduce unnecessary API calls.  
- Paginated results with dynamic range display (e.g., "Showing 1 - 20 of 236 book(s)").  
- Loading indicators and error handling for smooth UX.  
- Individual book cards displaying title, authors, and subjects.  

---

## Tech Stack

- **Frontend:** React, TypeScript, Material-UI (MUI)  
- **HTTP Requests:** Axios  
- **State Management:** React `useState` + custom hook `useBooks`  
- **Icons:** Material-UI Icons  
- **Deployment:** Vercel  

---


### `useBooks` Hook

The `useBooks` hook handles:

- Fetching books from the backend API (`/books`).  
- Pagination state (`page`, `pages`, `size`, `total`).  
- Loading and error states.  
- Dynamic page size support based on backend response.  

```ts
const { books, loading, error, page, pages, size, total, fetchBooks } = useBooks();
```

---

### Pagination & Dynamic Range

The app displays a dynamic range text like:

```
Showing 1 - 20 of 236 book(s)
```

- Calculated using:  
```ts
const start = (page - 1) * size + 1;
const end = Math.min(page * size, total);
```
- Updates automatically when the user changes page or performs a search.  

---

### Debounced Search

To reduce API calls while typing:

```ts
useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    if (searchTerm.length >= 3 || searchTerm.length === 0) {
      fetchBooks(searchTerm, 1);
    }
  }, 500);

  return () => clearTimeout(delayDebounceFn);
}, [searchTerm, fetchBooks]);
```

---

## Getting Started

### Prerequisites

- Node.js >= 18  
- npm or yarn  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Cema2019/public_domain_books_catalog_fe.git
cd public_domain_books_catalog_fe
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

Create a `.env` file at the root:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.  

---


## Backend Integration

This frontend is tightly coupled with the FastAPI backend:

- **Backend Repo:** [public_domain_books_catalog_be](https://github.com/Cema2019/public_domain_books_catalog_be)  
- **API Endpoints Used:**  
  - `GET /books` with optional query parameters:  
    - `search` – filter by title or author  
    - `page` – pagination  

Make sure the backend is running and accessible via the URL configured in `VITE_API_BASE_URL`.  

---

## Contributing

1. Fork the repository  
2. Create a new branch: `git checkout -b feature/my-feature`  
3. Make changes and commit: `git commit -m "feat: add my feature"`  
4. Push: `git push origin feature/my-feature`  
5. Create a Pull Request  

---

## License

MIT License © 2025
