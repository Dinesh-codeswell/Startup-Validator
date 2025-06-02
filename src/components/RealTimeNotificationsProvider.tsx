
import React from 'react';
import AchievementToast from '@/components/AchievementToast';
import { useRealTimeNotifications } from '@/hooks/useRealTimeNotifications';

const RealTimeNotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { newAchievement, clearAchievement } = useRealTimeNotifications();

  return (
    <>
      {children}
      {newAchievement && (
        <AchievementToast 
          achievement={newAchievement}
          show={!!newAchievement}
          onClose={clearAchievement}
        />
      )}
    </>
  );
};

export default RealTimeNotificationsProvider;
