import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { MainLayout } from "./layouts/MainLayout";

const HomePage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Главная страница</Typography>
    <Typography variant="body1">Контент главной страницы подтянулся успешно.</Typography>
  </Box>
);

const AboutPage = () => (
  <Box>
    <Typography variant="h4" gutterBottom>О нас</Typography>
    <Typography variant="body1">Здесь будет информация о проекте.</Typography>
  </Box>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}