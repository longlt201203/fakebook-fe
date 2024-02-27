import { useNavigate } from "react-router-dom";
import { AccountResponseDto } from "../dto/accounts/responses/account-response.dto";
import { AuthService } from "../services/auth.service";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Role } from "../utils/Role";

export interface CheckProfileOptions {
    reverse: boolean;
    redirect: string;
    noRedirect: boolean;
    roles?: Role[];
}

const defaultOtps: CheckProfileOptions = {
    reverse: false,
    redirect: "/",
    noRedirect: false
}

export const useCheckProfile = (otps?: Partial<CheckProfileOptions>): [AccountResponseDto, React.Dispatch<React.SetStateAction<AccountResponseDto>>, string] => {
    const accessToken = window.localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const authService = AuthService.getInstance();

    const [userData, setUserData] = useState<AccountResponseDto>({
        id: "",
        username: "",
        role: Role.USER,
        detail: null
    });

    useEffect(() => {
        if (!accessToken) {
            if (!otps?.reverse && !otps?.noRedirect) {
                navigate(otps?.redirect || defaultOtps.redirect);
            }
        } else {
            authService.profile(accessToken)
                .then((data) => {
                    setUserData(data);
                    if ((otps?.reverse || (otps?.roles && !otps.roles.includes(data.role))) && !otps?.noRedirect) {
                        navigate(otps?.redirect || defaultOtps.redirect);
                    }
                })
                .catch((err) => {
                    if (!otps?.reverse) {
                        let message = 'Unkown error';
                        if (err instanceof AxiosError) {
                            message = err.response?.data.message;
                        } else {
                            console.log(err);
                        }
                        console.log(message);
                        // alert(message);
                        if (!otps?.noRedirect) navigate(otps?.redirect || defaultOtps.redirect);
                    }
                })
        }
    }, []);
    return [userData, setUserData, accessToken ?? ''];
}