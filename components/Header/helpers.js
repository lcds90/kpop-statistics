const welcomeMessage = () => {
  const hour = new Date().getHours();
  const message = {
    afternoon: 'afternoon',
    dawn: 'dawn',
    evening: 'evening',
    morning: 'morning',
  };

  if (hour >= 6 && hour <= 12) return message.morning;
  if (hour >= 12 && hour <= 18) return message.afternoon;
  if (hour >= 6 && hour <= 23) return message.evening;
  return message.dawn;
};

export default welcomeMessage;
