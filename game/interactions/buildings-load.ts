import axios from "axios";
import useMapStore from "@/store/useMapStore";
import useBuildingStore from "@/store/useBuildingStore";

const getColorForBuilding = (ownership: string, forsale: boolean) => {
  if (ownership === "you" && !forsale) return "navy";
  if (ownership === "you" && forsale) return "orange";
  if (ownership === "" && !forsale) return "cyan";
  if (ownership === "" && forsale) return "green";
  return "#dee4f7";
};

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
          const buildingForSaleMap: { [key: number]: boolean } = {};

          buildings.forEach((building) => {
            buildingOwnerMap[building.fid] = building.owner_id === 1;
            buildingForSaleMap[building.fid] = building.forsale;
          });

          data.features.forEach((feature: any) => {
            const fid = feature.properties.fid;
            if (buildingOwnerMap[fid] !== undefined) {
              feature.properties.ownership = buildingOwnerMap[fid] ? "you" : "";
              feature.properties.forsale = buildingForSaleMap[fid];
            } else {
              feature.properties.ownership = "unknown";
              feature.properties.forsale = false;
            }
            feature.properties["fill-color"] = getColorForBuilding(feature.properties.ownership, feature.properties.forsale);
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
              "fill-color": ["case", ["has", "fill-color"], ["get", "fill-color"], "rgba(0, 0, 0, 0.1)"],
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