// components/gameplay/mapbox.tsx
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import useMapStore from "@/store/useMapStore";
import { handleBuildingClick } from "@/game/interactions/buildings-click";
import { loadBuildings } from "@/game/interactions/buildings-load";
interface MapboxProps {}

export default function Mapbox({}: MapboxProps) {
  mapboxgl.accessToken = "pk.eyJ1Ijoic3ViZGFuaWFsIiwiYSI6ImNsNTU3cmcwdjE2cm0zZnFxdm1pemZ3cjQifQ.fLqs4EX703SYVVE0DzknNw";
  const mapContainer = useRef<HTMLDivElement>(null);
  const { mapbox, initializeMapbox } = useMapStore();

  useEffect(() => {
    if (!mapbox && mapContainer.current) {
      while (mapContainer.current.firstChild) {
        mapContainer.current.removeChild(mapContainer.current.firstChild);
      }
      initializeMapbox(mapContainer.current);
      loadBuildings();
      handleBuildingClick();
    }
  }, [mapbox, initializeMapbox]);

  return (
    <div>
      <div ref={mapContainer} className="h-dvh" />
    </div>
  );
}