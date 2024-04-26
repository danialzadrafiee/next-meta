import useGameuiStore from "@/store/useGameuiStore"
import { Button } from "../ui/button"

const Options = () => {
  return <div>hello</div>
}
export default function BuildingDrawer() {
  const { buildingDrawerShowing } = useGameuiStore()
  return (
    <>
      {buildingDrawerShowing && (
        <div className="fixed max-w-sm inset-x-0 bottom-0 mx-auto w-full bg-red-400 h-24">
          <div className="flex items-center justify-center">
            <Button variant="outline">Buy</Button>
            <Button variant="outline">Offer</Button>
            <Button variant="outline">Sell</Button>
            <Button variant="outline">Auction</Button>
            <Button variant="outline">Split</Button>
          </div>
        </div>
      )}
    </>
  )
}
