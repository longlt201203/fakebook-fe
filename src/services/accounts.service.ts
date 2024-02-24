import { CreateAccountRequestDto } from "../dto/accounts/requests/create-account-request.dto";
import { AccountResponseDto } from "../dto/accounts/responses/account-response.dto";
import { Env } from "../utils/Env";
import { AxiosService } from "./axios.service";

export class AccountsService {
    private static readonly BASE_PATH = "/accounts";
    private static readonly CREATE_ACCOUNT_ENDPOINT = "/";

    private static instance: AccountsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AccountsService();
        }
        return this.instance;
    }

    private readonly axiosService: AxiosService;
    
    private constructor() {
        this.axiosService = new AxiosService(Env.API_URL+AccountsService.BASE_PATH);
    }

    async createAccount(dto: CreateAccountRequestDto) {
        const data = await this.axiosService.post<AccountResponseDto>(AccountsService.CREATE_ACCOUNT_ENDPOINT, dto);
        return data;
    }
}