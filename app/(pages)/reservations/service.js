import AXIOS_API from "@/utils/axiosAPI";

export async function getUserReservations() {
    const { data } = await AXIOS_API.get(`/reservation`)

    return data
}
