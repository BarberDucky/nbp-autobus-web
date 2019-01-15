import url from './url'

const reviewUrl = url + 'Review'

export async function getCarrierReviews(carrierId) {
    const response = await fetch(`${reviewUrl}/GetReviewsForCarrier/${carrierId}`, {
        method: 'GET'
    })
    const parsedRes = await response.json()
    return parsedRes
}

export async function postReview(reviewData) {
    const response = await fetch(reviewUrl, {
            method: 'POST',
            body: JSON.stringify(reviewData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    const parsedRes = await response.json()
    return parsedRes
}