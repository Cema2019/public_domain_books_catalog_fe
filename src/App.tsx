import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDebounce } from "use-debounce";

import { useBooks } from "./hooks/useBooks";
import { BookCard } from "./components/BookCard";
import {
  Box,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Pagination,
  Stack,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Analytics } from "@vercel/analytics/react";

// Zod Schema for Search Form
const searchSchema = z.object({
  searchTerm: z.string().max(100, "Search term is too long"),
});

type SearchForm = z.infer<typeof searchSchema>;

function App() {
  const [page, setPage] = useState(1);

  // React Hook Form setup
  const { control, watch } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
    },
    mode: "onChange",
  });

  // Watch the searchTerm value from RHF
  const searchTerm = watch("searchTerm");

  // ✅ Debounced value (clean)
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useBooks(debouncedSearch, page);

  const books = data?.items ?? [];
  const total = data?.total ?? 0;
  const pages = data?.pages ?? 1;
  const size = data?.size ?? 20;

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <LibraryBooksIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Public Domain Library
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Browse Public Domain Books
        </Typography>

        {/* Search Input with RHF + Controller */}
        <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
          <Controller
            name="searchTerm"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Search by Title or Author"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: 600 }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Box>

        {/* Loading */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error */}
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Failed to fetch books.
          </Alert>
        )}

        {/* Results */}
        {!isLoading && !isError && (
          <Box
            sx={{
              maxWidth: 900,
              mx: "auto", // center horizontally
            }}
          >
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              {(() => {
                if (total === 0) {
                  return "Showing 0 of 0 book(s)";
                }
                const start = (page - 1) * size + 1;
                const end = Math.min(page * size, total);
                return `Showing ${start} - ${end} of ${total} book(s)`;
              })()}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}

              {books.length === 0 && debouncedSearch && (
                <Box
                  sx={{
                    maxWidth: 600,
                    mx: "auto",
                  }}
                >
                  <Alert severity="info">
                    No books found matching "{debouncedSearch}".
                  </Alert>
                </Box>
              )}
            </Box>
            {/* Pagination Controls */}
            {pages > 1 && (
              <Stack spacing={2} alignItems="center" sx={{ mt: 4, mb: 2 }}>
                <Pagination
                  count={pages} // Total number of pages
                  page={page} // The current page
                  onChange={handlePageChange}
                  color="primary"
                  disabled={isLoading} // Disable while fetching
                />
              </Stack>
            )}
          </Box>
        )}
      </Container>
      <Analytics />
    </>
  );
}

export default App;

