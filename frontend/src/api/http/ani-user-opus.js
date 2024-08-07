import {apiPost} from "@/utils/requestUtil";

const aniUserOpusApi = {
    follow: follow,
    updateProgress: updateProgress,
}

export function follow(opusId) {
    return apiPost(`anime/userOpus/${opusId}/follow`);
}

export function updateProgress(data) {
    return apiPost(`anime/userOpus/updateProgress`, data);
}

export default aniUserOpusApi;