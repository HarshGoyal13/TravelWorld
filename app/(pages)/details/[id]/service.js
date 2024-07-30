import AXIOS_API from "@/utils/axiosAPI";

export async function getListingById(id) {
    try {
        const { data } = await AXIOS_API.get(`/listing/details/${id}`);

        if (data) {
            const { data: base64 } = await AXIOS_API.get(`/base64?url=${data.imageUrls[0]}`);
            data.blurredImage = base64;
        }

        return data;
    } catch (error) {
        console.error("Error fetching listing by ID:", error);
        throw error; // Ensure the error is thrown so it can be caught by useQuery
    }
}

export async function postReview(id, body) {
    const { data } = await AXIOS_API.post(`/review?id=${id}`, body)
    return data
}


export async function getReviewsByListing(id) {
    try {
        const { data } = await AXIOS_API.get(`/review/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}
