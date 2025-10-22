import { type Book } from "../types";
import { Card, CardContent, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/MenuBook";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <BookIcon color="primary" sx={{ mb: 1 }} />
        <Typography variant="h6" component="div" gutterBottom>
          {book.title || "Untitled Book"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Authors: {book.authors || "Unknown"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, maxHeight: 60, overflow: "hidden" }}
        >
          Subjects: {book.subjects || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};
