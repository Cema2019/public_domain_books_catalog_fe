import { useState, useEffect } from "react";
import axios from "axios";
import { type Book, API_BASE_URL } from "../types";

interface UseBooksResult {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: (searchTerm: string) => Promise<void>;
}

export const useBooks = (): UseBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (searchTerm: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Book[]>(`${API_BASE_URL}/books`, {
        params: { search: searchTerm },
      });
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again.");
      setBooks([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); 

  return { books, loading, error, fetchBooks };
};
