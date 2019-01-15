import url from './url'

const carrierUrl = url + 'Carrier'

export async function getAllCarriers() {
    const response = await fetch(carrierUrl, {
        method: 'GET'
    })
    const parsedRes = await response.json()
    return parsedRes
}

export async function getCarrier(carrierId) {
    const response = await fetch(`${carrierUrl}/${carrierId}`, {
        method: 'GET'
    })
    const parsedRes = await response.json()
    return parsedRes
}

export async function getCarriersWithRides(userId) {
    const response = await fetch(`${carrierUrl}/GetCarriersByUser/${userId}`, {
        method: 'GET'
    })
    const parsedRes = await response.json()
    return parsedRes
}

export async function postCarrier(carrierData) {
    const response = await fetch(carrierUrl, {
            method: 'POST',
            body: JSON.stringify(carrierData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    return parsedRes
}

export async function putCarrier(carrierData, carrierId) {
    const response = await fetch(`${carrierUrl}/${carrierId}`, {
            method: 'PUT',
            body: JSON.stringify(carrierData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    return parsedRes
}
