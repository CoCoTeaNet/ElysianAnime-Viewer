import {apiPost} from "@/utils/requestUtil";

const aniUserOpusApi = {
    follow: follow,
}

export function follow(opusId) {
    return apiPost(`anime/userOpus/${opusId}/follow`);
}

export default aniUserOpusApi;