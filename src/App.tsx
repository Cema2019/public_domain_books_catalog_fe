import { useState, useEffect } from "react";
import { useBooks } from "./hooks/useBooks";
import { BookCard } from "./components/BookCard";
import {
  Container,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

function App() {
  const { books, loading, error, fetchBooks } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        fetchBooks(searchTerm);
      }
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]); 

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
            label="Search by Title, Author, or Subject"
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
              Showing {books.length} book(s)
            </Typography>
            <Grid container spacing={3}>
              {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <BookCard book={book} />
                </Grid>
              ))}
              {books.length === 0 && searchTerm && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    No books found matching **"{searchTerm}"**.
                  </Alert>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
