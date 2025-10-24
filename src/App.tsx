import { useState, useEffect } from "react";
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
  Stack
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function App() {
  const { books, loading, error, page, pages, size, total, fetchBooks } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        fetchBooks(searchTerm, 1);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchBooks]); 

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

        {/* Search Input */}
        <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            label="Search by Title or Author"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 600 }}
          />
        </Box>

        {/* Loading, Error, and Results */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <>
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

              {books.length === 0 && searchTerm && (
                <Alert severity="info">
                  No books found matching "{searchTerm}".
                </Alert>
              )}
            </Box>
            {/* Pagination Controls */}
            {pages > 1 && (
              <Stack spacing={2} alignItems="center" sx={{ mt: 4, mb: 2 }}>
                <Pagination
                  count={pages} // Total number of pages
                  page={page} // The current page
                  onChange={(_, newPage) => fetchBooks(searchTerm, newPage)}
                  color="primary"
                  disabled={loading} // Disable while fetching
                />
              </Stack>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default App;
