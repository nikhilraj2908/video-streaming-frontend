// src/api/videoApi.ts
import api from '@/lib/axios';

export const getAllVideos = async () => {
  const response = await api.get('/video/all');
//   return response.data;
console.log("fvxvxxvxvxc",response.data);
   return response.data; 
};
