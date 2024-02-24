import { AccountResponseDto } from "../dto/accounts/responses/account-response.dto";
import { LoginWithUsernameAndPasswordRequestDto } from "../dto/auth/requests/login-with-username-and-password-request.dto";
import { AccessTokenResponseDto } from "../dto/auth/responses/access-token-response.dto";
import { Env } from "../utils/Env";
import { AxiosService } from "./axios.service";

export class AuthService {
    private static readonly BASE_PATH = "/auth";
    private static readonly LOGIN_WITH_USERNAME_AND_PASSWORD_ENDPOINT = "/login-with-username-and-password";
    private static readonly PROFILE_ENDPOINT = "/profile";

    private static instance: AuthService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }

    private readonly axiosService: AxiosService;
    
    private constructor() {
        this.axiosService = new AxiosService(Env.API_URL+AuthService.BASE_PATH);
    }

    async loginWithUsernameAndPassword(dto: LoginWithUsernameAndPasswordRequestDto) {
        const data = await this.axiosService.post<AccessTokenResponseDto>(AuthService.LOGIN_WITH_USERNAME_AND_PASSWORD_ENDPOINT, dto);
        return data;
    }

    async profile(accessToken: string) {
        const data = await this.axiosService.get<AccountResponseDto>(AuthService.PROFILE_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }
}