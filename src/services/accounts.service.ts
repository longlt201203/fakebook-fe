import { createSearchParams } from "react-router-dom";
import { AccountDetailDto } from "../dto/accounts/account-detail.dto";
import { AccountFilterDto } from "../dto/accounts/requests/account-filter.dto";
import { CreateAccountRequestDto } from "../dto/accounts/requests/create-account-request.dto";
import { AccountResponseDto } from "../dto/accounts/responses/account-response.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { Env } from "../utils/Env";
import { AxiosService } from "./axios.service";

export class AccountsService {
    private static readonly BASE_PATH = "/accounts";
    private static readonly CREATE_ACCOUNT_ENDPOINT = "/";
    private static readonly UPDATE_ACCOUNT_DETAIL_ENDPOINT = "/detail";
    private static readonly FIND_ALL_ACCOUNT_ENDPOINT = "/";

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

    async updateAccountDetail(id: string, dto: AccountDetailDto, accessToken: string) {
        const data = await this.axiosService.put<AccountResponseDto>(AccountsService.UPDATE_ACCOUNT_DETAIL_ENDPOINT, dto, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }

    async findAllAccounts(dto: AccountFilterDto, accessToken: string) {
        const searchParams = createSearchParams();
        searchParams.set("take", dto.take.toString())
        searchParams.set("page", dto.page.toString());
        const data = await this.axiosService.get<PaginationDto<AccountResponseDto>>(AccountsService.FIND_ALL_ACCOUNT_ENDPOINT + "?" + searchParams.toString(), {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }
}