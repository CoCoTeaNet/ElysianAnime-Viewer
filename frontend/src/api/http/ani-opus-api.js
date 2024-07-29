import {apiGet, apiPost} from '@/utils/requestUtil';

const aniOpusApi = {
	listByUser: listByUser,
	getOpusMedia: getOpusMedia,
}

export function listByUser(data) {
	return apiPost('anime/opus/listByUser', data);
}

export function getOpusMedia(id) {
	return apiGet('anime/opus/getOpusMedia/' + id);
}

export default aniOpusApi;