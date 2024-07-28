import {apiPost} from '@/utils/requestUtil';

const aniOpusApi = {
	listByUser: listByUser
}

export function listByUser(data) {
	return apiPost('anime/opus/listByUser', data);
}

export default aniOpusApi;