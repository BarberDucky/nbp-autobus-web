import url from './url'

const userUrl = url + 'User'

export async function registerUser(userData) {
    const response = await fetch(userUrl, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}

export async function loginUser(userData) {
    const response = await fetch(`${userUrl}/Login`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}

export async function getUser(userId) {
    const response = await fetch(`${userUrl}/${userId}`, {
        method: 'GET'
    })
const parsedRes = await response.json()

return parsedRes
}

export async function updateUser(updateData, userId) {
    const response = await fetch(`${userUrl}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}