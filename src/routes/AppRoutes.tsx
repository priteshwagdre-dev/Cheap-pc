import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useScrollToTop } from '../hooks/useScrollToTop';
import {
  HomePage,
  DiscoverPage,
  GamesPage,
  GameDetailsPage,
  CategoriesPage,
  NewReleasesPage,
  PreOrdersPage,
  BundlesPage,
  DealsPage,
  WishlistPage,
  CartPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  NotFoundPage
} from '../pages';

export const AppRoutes: React.FC = () => {
  useScrollToTop();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/new-releases" element={<NewReleasesPage />} />
        <Route path="/pre-orders" element={<PreOrdersPage />} />
        <Route path="/bundles" element={<BundlesPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
