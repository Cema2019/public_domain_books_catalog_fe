import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Book, API_BASE_URL } from "../types";

interface PaginatedResponse {
  items: Book[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

const fetchBooks = async (
  search: string,
  page: number,
): Promise<PaginatedResponse> => {
  const { data } = await axios.get<PaginatedResponse>(`${API_BASE_URL}/books`, {
    params: { search, page },
  });
  return data;
};

export const useBooks = (search: string, page: number) => {
  return useQuery({
    queryKey: ["books", search, page],
    queryFn: () => fetchBooks(search, page),
    staleTime: 1000 * 60 * 5, // 5 min cache
    placeholderData: (prev) => prev, // smooth pagination
  });
};
