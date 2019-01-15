import url from './url'

const cardsUrl = url + 'Card'

export async function getCards(userId) {
    const response = await fetch(`${cardsUrl}/GetCardsByUser/${userId}`, {
        method: 'GET'
    })
    const parsedRes = await response.json()
    return parsedRes
}

export async function postCard(cardData, userId, numberOfSeats) {
    const response = await fetch(`${cardsUrl}/User/${userId}/NumberOfSeats/${numberOfSeats}`, {
            method: 'POST',
            body: JSON.stringify(cardData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    
    return parsedRes
}