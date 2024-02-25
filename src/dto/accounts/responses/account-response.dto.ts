import { AccountDetailDto } from "../account-detail.dto";

export interface AccountResponseDto {
    id: string;
    username: string;
    password: string;
    detail?: AccountDetailDto;
}