import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

// Aasra office, 80 Nargis Block, Allama Iqbal Town, Lahore (from the Google Maps listing).
const OFFICE: [number, number] = [31.5171859, 74.2840278];

const markerHtml = `
  <div class="office-pin">
    <span class="office-pin__pulse"></span>
    <span class="office-pin__badge"><img src="/images/branding/logo.webp" alt="" /></span>
  </div>`;

interface OfficeMapProps {
  title: string;
  label: string;
  address: string;
}

const OfficeMap: React.FC<OfficeMapProps> = ({ title, label, address }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import('leaflet').Map | undefined;
    let cancelled = false;

    import('leaflet').then((L) => {
      if (cancelled || !container.current) return;
      map = L.map(container.current, {
        center: OFFICE,
        zoom: 16,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        html: markerHtml,
        className: 'office-pin-wrap',
        iconSize: [56, 68],
        iconAnchor: [28, 66],
        popupAnchor: [0, -62],
      });

      const popup = document.createElement('div');
      popup.className = 'office-popup';
      const strong = document.createElement('strong');
      strong.textContent = label;
      const addr = document.createElement('span');
      addr.textContent = address;
      popup.append(strong, addr);

      L.marker(OFFICE, { icon, title, keyboard: true }).addTo(map).bindPopup(popup);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [title, label, address]);

  return <div ref={container} role="region" aria-label={title} className="w-full h-full z-0" />;
};

export default OfficeMap;
