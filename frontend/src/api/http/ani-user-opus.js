import {apiGet, apiPost} from "@/utils/requestUtil";

const aniUserOpusApi = {
    follow: follow,
    updateProgress: updateProgress,
    share: share,
}

export function follow(opusId) {
    return apiPost(`anime/userOpus/${opusId}/follow`);
}

export function updateProgress(data) {
    return apiPost(`anime/userOpus/updateProgress`, data);
}

export function share(opusId) {
    return apiPost(`anime/userOpus/share/${opusId}`);
}

export default aniUserOpusApi;