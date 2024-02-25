import { AccountDetailDto } from "../account-detail.dto";

export interface CreateAccountRequestDto {
    username: string;
    password: string;
    detail?: AccountDetailDto;
}