import { Role } from "../../../utils/Role";
import { AccountDetailDto } from "../account-detail.dto";

export interface AccountResponseDto {
    id: string;
    role: Role;
    username: string;
    detail?: AccountDetailDto;
}