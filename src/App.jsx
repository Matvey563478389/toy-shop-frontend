import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import {HomePage} from "./pages/HomePage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import {CatalogPage} from "./pages/CatalogPage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {AdminUsersPage} from "./pages/admin/AdminUsersPage.jsx";
import {AdminToysPage} from "./pages/admin/AdminToysPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route path="admin/users" element={<AdminUsersPage />} />
          <Route path="admin/toys" element={<AdminToysPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}