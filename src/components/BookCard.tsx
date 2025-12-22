import { type Book } from "../types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/MenuBook";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        {/* Title */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <BookIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            {book.title || "Untitled Book"}
          </Typography>
        </Box>

        {/* Authors */}
        <Typography variant="body1" color="text.secondary">
          <Typography
            component="span"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            Authors:{" "}
          </Typography>
          {book.authors || "Unknown"}
        </Typography>

        {/* Subjects */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, maxHeight: 60, overflow: "hidden" }}
        >
          <Typography
            component="span"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            Subjects:{" "}
          </Typography>
          {book.subjects || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};
