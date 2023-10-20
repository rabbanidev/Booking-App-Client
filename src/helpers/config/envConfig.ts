const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://booking-app-server-nm4z.onrender.com/api/v1"
  );
};

export default getBaseUrl;
