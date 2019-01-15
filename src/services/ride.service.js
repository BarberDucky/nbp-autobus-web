import url from './url'

const rideUrl = url + 'Ride'

export async function putRide(rideData, rideId) {
    const response = await fetch(`${rideUrl}/${rideId}`, {
            method: 'PUT',
            body: JSON.stringify(rideData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}

export async function postRide(rideData) {
    const response = await fetch(rideUrl, {
            method: 'POST',
            body: JSON.stringify(rideData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}

export async function deleteRide(rideId) {
    const response = await fetch(`${rideUrl}/${rideId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}

export async function findPaths(pathData) {
    const response = await fetch(`${rideUrl}/FindPath`, {
            method: 'POST',
            body: JSON.stringify(pathData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    return parsedRes
}