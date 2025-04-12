import { atom } from 'jotai';

import { IUser } from '~/models/user';

export const userAtom = atom<IUser | null>(null);
