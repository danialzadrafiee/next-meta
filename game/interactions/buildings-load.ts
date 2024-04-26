// game\interactions\buildings-load.ts

import axios from "axios";
import useMapStore from "@/store/useMapStore";
import useBuildingStore from "@/store/useBuildingStore";

export const loadBuildings = () => {
  const { mapbox } = useMapStore.getState();
  const { buildings } = useBuildingStore.getState();

  if (mapbox) {
    mapbox.on("load", () => {
      axios
        .get("/assets/geojson/karimkhan.geojson")
        .then((response) => {
          const data = response.data;
          const buildingOwnerMap: { [key: number]: boolean } = {};

          buildings.forEach((building) => {
            buildingOwnerMap[building.fid] = building.owner_id === 1;
          });

          data.features.forEach((feature: any) => {
            const fid = feature.properties.fid;
            if (buildingOwnerMap[fid]) {
              feature.properties.isOwned = true;
            } else {
              feature.properties.isOwned = false;
            }
          });

          mapbox.addSource("karimkhan", {
            type: "geojson",
            data: data,
          });

          mapbox.addLayer({
            id: "karimkhan",
            type: "fill",
            source: "karimkhan",
            paint: {
              "fill-color": ["case", ["get", "isOwned"], "green", "rgba(0, 0, 0, 0.1)"],
              "fill-outline-color": "rgba(0, 0, 0, 0.5)",
            },
          });
        })
        .catch((error) => {
          console.error("Error loading karimkhan.geojson:", error);
        });
    });
  }
};