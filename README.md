# Public Domain Library - Frontend

A React-based frontend application for browsing and searching public
domain books. This app is connected to a NestJS backend and provides a
paginated, searchable interface for books.

**Live Demo:** https://public-domain-books-iota.vercel.app

**Backend Repository:**
https://github.com/Cema2019/public-domain-library-api

------------------------------------------------------------------------

## Features

-   Browse public domain books with a clean and responsive UI
-   Search books by title or author
-   Debounced search to reduce unnecessary API calls
-   Paginated results with dynamic range display (e.g., “Showing 1 - 20
    of 236 book(s)”)
-   Cached data fetching for improved performance
-   Loading indicators and error handling for smooth UX
-   Individual book cards displaying title, authors, and subjects

------------------------------------------------------------------------

## Tech Stack

-   Frontend: React, TypeScript, Material-UI (MUI)
-   Data Fetching & Caching: TanStack Query (React Query)
-   Forms & Validation: React Hook Form + Zod
-   HTTP Requests: Axios
-   Debouncing: use-debounce
-   Icons: Material-UI Icons
-   Deployment: Vercel

------------------------------------------------------------------------

## Data Fetching & Caching

The application uses TanStack Query (React Query) to manage server
state.

Key Concepts: - Query Keys drive data fetching ([“books”, search, page])
- Caching avoids unnecessary API calls
- Background Refetching keeps data fresh
- Declarative Data Flow replaces manual fetching

------------------------------------------------------------------------

## Forms & Validation

Search input is managed using React Hook Form and validated with Zod.

------------------------------------------------------------------------

## Debounced Search

Search input is debounced using use-debounce to prevent excessive API
calls.

------------------------------------------------------------------------

## Pagination & Dynamic Range

The app displays a dynamic range like: Showing 1 - 20 of 236 book(s)

------------------------------------------------------------------------

## Architecture Notes

-   Server state is managed with TanStack Query
-   UI state (pagination) is local
-   Query keys control data fetching
-   Data fetching is declarative

------------------------------------------------------------------------

## Getting Started

1.  Clone the repository
2.  Install dependencies
3.  Configure .env
4.  Run dev server

------------------------------------------------------------------------

## Backend Integration

GET /books with: - search - page

------------------------------------------------------------------------

## License

MIT License © 2026
