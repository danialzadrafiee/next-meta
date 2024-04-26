"use client";
import Mapbox from "@/components/gameplay/mapbox";
import BuildingDrawer from "@/components/gameui/building-drawer";
import { useEffect, useState } from "react";

export default function Main() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <div>
          <Mapbox />
          <BuildingDrawer />
        </div>
      )}
    </>
  );
}
