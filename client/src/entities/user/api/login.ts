import type { LoginProps } from "../../../shared/types/auth";

export const apiLogin = ({ email, password }: LoginProps): string => {
    return `Logging in ${email} with password ${password}`;
};
