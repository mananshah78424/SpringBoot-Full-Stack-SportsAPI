// Caching function: Save data to localStorage with an expiry time
export const saveToCache = (key: string, data: any, ttl: number) => {
  const expiry = new Date().getTime() + ttl;
  localStorage.setItem(key, JSON.stringify({ data, expiry }));
};

// Retrieve data from cache if not expired
export const getFromCache = (key: string) => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, expiry } = JSON.parse(cached);
    if (expiry > new Date().getTime()) {
      return data;
    }
  }
  return null;
};
