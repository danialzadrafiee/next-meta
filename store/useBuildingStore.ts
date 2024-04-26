import { create } from "zustand";
import { MapboxGeoJSONFeature } from "mapbox-gl";

interface Building {
  fid: number;
  owner_id: number;
}

interface BuildingStoreState {
  selectedBuilding: MapboxGeoJSONFeature | null;
  setSelectedBuilding: (building: MapboxGeoJSONFeature) => void;
  buildings: Building[];
}

const buildingFakeDb: Building[] = [
  { fid: 1073, owner_id: 1 },
  { fid: 1040, owner_id: 1 },
];

const useBuildingStore = create<BuildingStoreState>((set) => ({
  buildings: buildingFakeDb,
  selectedBuilding: null,
  setSelectedBuilding: (building) => set({ selectedBuilding: building }),
}));

export default useBuildingStore;