import { useState, useEffect } from "react";
import axios from "axios";
import { type Book, API_BASE_URL } from "../types";

interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
  page: number;
  pages: number;
  size: number;
  total: number;
  fetchBooks: (searchTerm?: string, page?: number) => Promise<void>;
}

interface PaginatedResponse {
  items: Book[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const useBooks = (): UseBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // --- Pagination State ---
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);

  const fetchBooks = async (searchTerm: string = "", pageNum: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<PaginatedResponse>(
        `${API_BASE_URL}/books`,
        {
          params: { search: searchTerm, page: pageNum },
        }
      );
      setBooks(response.data.items);
      setPage(response.data.page);
      setPages(response.data.pages);
      setSize(response.data.size);
      setTotal(response.data.total);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again.");
      setBooks([]);
      setPage(1);
      setPages(1);
      setTotal(0);
      setSize(20);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error, page, pages, size, total, fetchBooks };
};
