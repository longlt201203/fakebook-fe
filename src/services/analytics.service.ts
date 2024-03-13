import { createSearchParams } from "react-router-dom";
import { Env } from "../utils/Env";
import { AxiosService } from "./axios.service";
import { AccountResponseDto } from "../dto/accounts/responses/account-response.dto";

export class AnalyticsService {
    private static readonly BASE_PATH = "/analytics";
    private static readonly FRIEND_RECOMMENDATION_ENDPOINT = "/friend-recommendation";

    private static instance: AnalyticsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AnalyticsService();
        }
        return this.instance;
    }

    private readonly axiosService: AxiosService;
    
    private constructor() {
        this.axiosService = new AxiosService(Env.API_URL+AnalyticsService.BASE_PATH);
    }

    async getFriendRecommendations(accountId: string) {
        const searchParams = createSearchParams();
        searchParams.set("accountId", accountId);
        const data = await this.axiosService.get<AccountResponseDto[]>(AnalyticsService.FRIEND_RECOMMENDATION_ENDPOINT+"?"+searchParams.toString());
        return data;
    }
}