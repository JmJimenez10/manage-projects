import { atom } from "jotai";
import { IUser } from "../models/User";

export const userAtom = atom<IUser | null>(null);
