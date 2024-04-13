interface Trip {
    pickupPoints: string[];
    dropPoints: string[];
    viaPoint?: string; 
}

interface Shipment {
    pickupPoints: string[];
    dropPoints: string[];
}

function isValidTrips(trips: Trip[], shipment: Shipment): boolean {
    const remainingPickupPoints = new Set(shipment.pickupPoints);
    const remainingDropPoints = new Set(shipment.dropPoints);

    for (const trip of trips) {
        const missingPickupPoints = trip.pickupPoints.filter(point => !remainingPickupPoints.has(point));
        if (missingPickupPoints.length > 0) {
            return false; 
        }

        const missingDropPoints = trip.dropPoints.filter(point => !remainingDropPoints.has(point));
        if (missingDropPoints.length > 0) {
            return false;
        }

        for (const pickup of trip.pickupPoints) {
            remainingPickupPoints.delete(pickup);
        }
        for (const drop of trip.dropPoints) {
            remainingDropPoints.delete(drop);
        }

        if (trip.viaPoint) {
            if (!remainingPickupPoints.has(trip.viaPoint) && !remainingDropPoints.has(trip.viaPoint)) {
                return false; 
            }
        }
    }

    return remainingPickupPoints.size === 0 && remainingDropPoints.size === 0;
}