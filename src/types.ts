
// The interface matches the FastAPI BookSchema
export interface Book {
  id: number;
  title: string | null;
  authors: string | null;
  subjects: string | null;
}

// Backend API base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
