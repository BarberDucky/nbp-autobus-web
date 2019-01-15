import url from './url'

const stationsUrl = url + 'Station'

export async function getAllStations() {
    const response = await fetch(stationsUrl, {
        method: 'GET'
    })
    const parsedRes = await response.json()
    
    return parsedRes
}

export async function postStation(stationData) {
    const response = await fetch(stationsUrl, {
            method: 'POST',
            body: JSON.stringify(stationData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}