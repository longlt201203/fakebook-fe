import { createSearchParams } from "react-router-dom";
import { MessageResponseDto } from "../dto/message-response.dto";
import { Env } from "../utils/Env";
import { AxiosService } from "./axios.service";

export class RelationshipsService {
    private static readonly BASE_PATH = "/relationships";
    private static readonly ADD_FRIEND_ENDPOINT = "/add-friend";

    private static instance: RelationshipsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new RelationshipsService();
        }
        return this.instance;
    }

    private readonly axiosService: AxiosService;
    private constructor() {
        this.axiosService = new AxiosService(Env.API_URL+RelationshipsService.BASE_PATH);
    }

    async addFriend(friendId: string, accessToken: string) {
        const searchParams = createSearchParams();
        searchParams.set("accountId", friendId);
        const data = await this.axiosService.get<MessageResponseDto>(RelationshipsService.ADD_FRIEND_ENDPOINT+"?"+searchParams.toString(), {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }
}