import { createStore } from 'zustand/vanilla'
import { Vehicle } from "@prisma/client"

export type ComperatorState = {
    vehicles: Map<string, Vehicle>
}

export type ComperatorActions = {
    add: (vehicle: Vehicle) => void;
    remove: (vehicleID: string) => void;
    clear: () => void;
}

export type ComperatorStore = ComperatorState & ComperatorActions

export const initComperatorStore = (): ComperatorState => {
    return { vehicles: new Map<string, Vehicle>() }
}

export const defaultInitState: ComperatorState = {
    vehicles: new Map<string, Vehicle>(),
}

export const createComperatorStore = (
    initState: ComperatorState = defaultInitState,
) => {
    return createStore<ComperatorStore>()((set) => ({
        ...initState,
        add: (vehicle) => set((state) => {
            if (state.vehicles.has(vehicle.id)) return state;
            const newVehicles = new Map(state.vehicles)

            if (newVehicles.size === 3) {
                const firstKey = newVehicles.keys().next().value
                if (firstKey)
                    newVehicles.delete(firstKey)
            }

            newVehicles.set(vehicle.id, vehicle)

            return { vehicles: newVehicles }
        }),
        remove: (vehicleID) => set((state) => {
            const updatedVehicles = new Map(state.vehicles)
            updatedVehicles.delete(vehicleID)
            return { vehicles: updatedVehicles }
        }),
        clear: () => set(() => ({
            vehicles: new Map<string, Vehicle>()
        })),
    }))
}
