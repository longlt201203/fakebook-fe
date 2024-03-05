import { LocalFileUrlResponseDto } from "../dto/local-files/local-file-url-response.dto";
import { Env } from "../utils/Env";
import { AxiosService } from "./axios.service";

export class LocalFilesService {
    private static readonly BASE_PATH = "/local-files";
    private static readonly UPLOAD_ENDPOINT = "/";

    private static instance: LocalFilesService;
    static getInstance() {
        if (!this.instance) this.instance = new LocalFilesService();
        return this.instance;
    }

    private readonly axiosService: AxiosService;

    private constructor() {
        this.axiosService = new AxiosService(Env.API_URL+LocalFilesService.BASE_PATH);
    }

    async upload(file: File) {
        const formData = new FormData();
        formData.set("file", file);
        const data = await this.axiosService.post<LocalFileUrlResponseDto>(LocalFilesService.UPLOAD_ENDPOINT, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return data;
    }
}