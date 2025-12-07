const BASE_PRICE_PROPER = 50 // per kg
const BASE_PRICE_OUTSIDE = 75 // per kg

const SERVICE_MULTIPLIERS = {
    wash: 1.0,
    dry: 1.5,
    fold: 2.0,
}

const OUTSIDE_LOCATION_SURCHARGE = 1.2 // 20% surcharge

export function calculateFee(weight, serviceType, location) {
    const basePrice = location === "outside" ? BASE_PRICE_OUTSIDE : BASE_PRICE_PROPER
    const multiplier = SERVICE_MULTIPLIERS[serviceType] || 1.0

    let fee = weight * basePrice * multiplier

    if (location === "outside") {
        fee *= OUTSIDE_LOCATION_SURCHARGE
    }

    return Number.parseFloat(fee.toFixed(2))
}

export function getFeeBreakdown(weight, serviceType, location) {
    const basePrice = location === "outside" ? BASE_PRICE_OUTSIDE : BASE_PRICE_PROPER
    const multiplier = SERVICE_MULTIPLIERS[serviceType] || 1.0
    const baseFee = weight * basePrice
    const serviceCharge = baseFee * (multiplier - 1)
    const locationCharge = location === "outside" ? baseFee * 0.2 : 0

    return {
        baseFee: Number.parseFloat(baseFee.toFixed(2)),
        serviceCharge: Number.parseFloat(serviceCharge.toFixed(2)),
        locationCharge: Number.parseFloat(locationCharge.toFixed(2)),
        total: calculateFee(weight, serviceType, location),
    }
}