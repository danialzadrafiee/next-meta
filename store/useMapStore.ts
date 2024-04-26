// @ts-ignore
import { Threebox } from "threebox-plugin"
import { create } from "zustand"
import mapboxgl from "mapbox-gl"

interface MapStoreState {
  mapbox: mapboxgl.Map | null
  threebox: Threebox | null
  lng: number
  lat: number
  zoom: number
}

interface MapStoreActions {
  initializeMapbox: (container: HTMLDivElement) => void
  initializeThreebox: () => void
  setLng: (lng: number) => void
  setLat: (lat: number) => void
  setZoom: (zoom: number) => void
}

const useMapStore = create<MapStoreState & MapStoreActions>((set) => ({
  mapbox: null,
  threebox: null,
  lng: 51.42087,
  lat: 35.72043,
  zoom: 17,
  initializeMapbox: (container: HTMLDivElement) => {
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [useMapStore.getState().lng, useMapStore.getState().lat],
      zoom: useMapStore.getState().zoom,
    })
    set({ mapbox: map })
  },
  initializeThreebox: () => {
    const { mapbox } = useMapStore.getState()
    if (mapbox) {
      const threebox = new Threebox(mapbox, mapbox.getCanvas().getContext("webgl"), {
        // Threebox configuration
      })
      set({ threebox })
    }
  },
  setLng: (lng: number) => set({ lng }),
  setLat: (lat: number) => set({ lat }),
  setZoom: (zoom: number) => set({ zoom }),
}))

export default useMapStore
