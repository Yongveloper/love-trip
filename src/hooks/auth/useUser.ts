import { useAtomValue } from 'jotai';

import { userAtom } from '~/store/user';

export const useUser = () => {
	return useAtomValue(userAtom);
};
