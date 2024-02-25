import { useNavigate } from "react-router-dom";
import { AccountResponseDto } from "../dto/accounts/responses/account-response.dto";
import { AuthService } from "../services/auth.service";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export interface CheckProfileOptions {
    reverse?: boolean;
    redirect?: string;
}

export const useCheckProfile = (otps: CheckProfileOptions) => {
    const navigate = useNavigate();
    const authService = AuthService.getInstance();

    const [userData, setUserData] = useState<AccountResponseDto>({
        id: "",
        username: "",
        password: "",
        detail: undefined
    });

    useEffect(() => {
        const accessToken = window.localStorage.getItem("accessToken");
        if (!accessToken) {
            if (!otps?.reverse) {
                navigate("/");
            }
        } else {
            authService.profile(accessToken)
                .then((data) => {
                    setUserData(data);
                })
                .catch((err) => {
                    if (!otps?.reverse) {
                        let message = 'Unkown error';
                        if (err instanceof AxiosError) {
                            message = err.response?.data.message;
                        } else {
                            console.log(err);
                        }
                        alert(message);
                        navigate('/');
                    }
                })
        }
    }, []);
    return userData;
}