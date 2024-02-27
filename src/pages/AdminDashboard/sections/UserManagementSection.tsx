// sections/UserManagementSection.tsx
import { PropsWithChildren, useEffect, useState } from 'react';
import { AccountResponseDto } from '../../../dto/accounts/responses/account-response.dto';
import { PaginationDto } from '../../../dto/pagination.dto';
import { AccountsService } from '../../../services/accounts.service';

const itemsPerPage = 10;

export const UserManagementSection = (props: PropsWithChildren<{
    accessToken: string
}>) => {
    const accountsService = AccountsService.getInstance();

    const [usersData, setUsersData] = useState<PaginationDto<AccountResponseDto>>();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        accountsService
            .findAllAccounts({
                page: currentPage,
                take: itemsPerPage
            }, props.accessToken)
            .then((data) => {
                setUsersData(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [currentPage]);

    // Handlers to change page
    const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, usersData?.totalPage ?? 0));
    const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
    const goToPage = (page: number) => setCurrentPage(page);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData?.data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.detail?.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {/* Placeholder for action buttons */}
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className="prev">Prev</button>
                {Array.from({ length: usersData?.totalPage ?? 0 }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        disabled={index + 1 === currentPage}
                        className={`page-number ${index + 1 === currentPage ? 'current-page' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={goToNextPage} disabled={currentPage === usersData?.totalPage ?? 0} className="next">Next</button>
            </div>
        </div>
    );
};
