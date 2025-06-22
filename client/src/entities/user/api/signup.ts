import type { User } from "../../../shared/types/user";

export const apiSignup = ({ email, password, name }: User): string => {
    return `Signing up ${email} with password ${password} & ${name}`;
};
