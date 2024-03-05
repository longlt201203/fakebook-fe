import { AccountResponseDto } from "../../accounts/responses/account-response.dto";

export interface PostResponseDto {
    id: number;
    content: string;
    createdAt: Date;
    modifiedAt: Date;
    author: AccountResponseDto;
}