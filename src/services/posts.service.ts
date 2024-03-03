import { createSearchParams } from "react-router-dom";
import { PostFilterDto } from "../dto/posts/requests/post-filter.dto";
import { Env } from "../utils/Env";
import { AxiosService } from "./axios.service";
import { PostResponseDto } from "../dto/posts/responses/post-response.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { UpdatePostDto } from "../dto/posts/requests/update-post.dto";
import { MessageResponseDto } from "../dto/message-response.dto";
import { CreatePostDto } from "../dto/posts/requests/create-post.dto";

export class PostsService {
    private static readonly BASE_PATH = "/posts";
    private static readonly FETCH_POSTS_ENDPOINT = "/";
    private static readonly UPDATE_POST_ENDPOINT = "/";
    private static readonly CREATE_POST_ENDPOINT = "/";
    
    private static instance: PostsService;
    static getInstance() {
        if (!this.instance) this.instance = new PostsService();
        return this.instance;
    }

    private readonly axiosService: AxiosService;
    private constructor() {
        this.axiosService = new AxiosService(Env.API_URL+PostsService.BASE_PATH);
    }

    async fetchPosts(filter: PostFilterDto, accessToken: string) {
        const searchParams = createSearchParams();
        searchParams.set("take", filter.take.toString())
        searchParams.set("page", filter.page.toString());
        const data = await this.axiosService.get<PaginationDto<PostResponseDto>>(PostsService.FETCH_POSTS_ENDPOINT+"?"+searchParams.toString(), {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }

    async updatePost(id: number, dto: UpdatePostDto, accessToken: string) {
        const data = await this.axiosService.put<MessageResponseDto>(PostsService.UPDATE_POST_ENDPOINT+id, dto, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }

    async createPost(dto: CreatePostDto, accessToken: string) {
        const data = await this.axiosService.post<MessageResponseDto>(PostsService.CREATE_POST_ENDPOINT, dto, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }
}