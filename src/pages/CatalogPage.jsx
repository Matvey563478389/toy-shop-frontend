import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Pagination,
  Container,
  CircularProgress
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import api from "../shared/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export const CatalogPage = () => {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const { user } = useAuth();

  useEffect(() => {
    const fetchToys = async () => {
      try {
        const res = await api.get('/toys');
        setToys(res.data);
      } catch (error) {
        console.error("Ошибка загрузки каталога", error);
      } finally {
        setLoading(false);
      }
    };
    fetchToys();
  }, []);

  const pageCount = Math.ceil(toys.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentToys = toys.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
        Каталог товаров
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {currentToys.map((toy) => (
          <Grid item key={toy.id} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: '100%',
                maxWidth: 280,
                height: '440px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 220, objectFit: 'cover' }}
                image={toy.image_url ? `http://localhost:3000${toy.image_url}` : 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={toy.title}
              />

              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    lineHeight: 1.2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '2.4em'
                  }}
                >
                  {toy.title}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {toy.description}
                </Typography>

                <Box sx={{ mt: 'auto', pt: 1 }}>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {toy.price} ₽
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                {user ? (
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => console.log(`Добавлено в корзину: ${toy.id}`)}
                  >
                    В корзину
                  </Button>
                ) : (
                  <Box sx={{ height: '30.75px' }} />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {toys.length === 0 && !loading && (
        <Typography sx={{ textAlign: 'center', mt: 5 }} color="text.secondary">
          Товары пока не добавлены.
        </Typography>
      )}
    </Container>
  );
};