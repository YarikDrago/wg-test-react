import React from 'react';
import { Route, Routes } from 'react-router';

import { TanksExperienceAsync } from '@/pages/TanksExperience/TanksExperience.async';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<div>Home</div>} />
      <Route path={'/tanks-exp'} element={<TanksExperienceAsync />} />
    </Routes>
  );
};

export default AppRoutes;
