import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Numb.Design',
    short_name: 'NumbDesign',
    description: 'AI-powered frontend builder — zero bloat, instant setup.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8B5CF6',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  };
}
