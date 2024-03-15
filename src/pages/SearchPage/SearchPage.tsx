import { Link, useSearchParams } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import "./SearchPage.css";
import { useEffect, useState } from "react";
import { AccountsService } from "../../services/accounts.service";
import { useCheckProfile } from "../../hooks/useCheckProfile";
import { AccountResponseDto } from "../../dto/accounts/responses/account-response.dto";
import { Globals } from "../../utils/Globals";

const SearchPage = () => {
    const [profile, setProfile, accessToken] = useCheckProfile();
    const accountsService = AccountsService.getInstance();

    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("search");

    const [users, setUsers] = useState<AccountResponseDto[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [nextPage, setNextPage] = useState<number | undefined>();

    const searchAccounts = (page: number) => {
        if (searchTerm && page != currentPage) {
            accountsService
                .findAllAccounts({ page: page, take: 10, search: searchTerm }, accessToken)
                .then((data) => {
                    const tmp: AccountResponseDto[] = [];
                    tmp.push(...users);
                    tmp.push(...data.data);
                    setUsers(tmp);
                    setCurrentPage(data.page);
                    setNextPage(data.nextPage);
                })
                .catch((err) => {

                });
        }
    }

    const handleMore = () => {
        if (nextPage) {
            searchAccounts(nextPage);
        }
    }

    useEffect(() => {
        searchAccounts(1);
    }, [searchTerm])

    return (
        <MainLayout>
            <div className="search-page">
                <h1>Search Results</h1>
                {
                    users.length === 0 ? (
                        <p>No results found.</p>
                    ) : (
                        <ul className="friend-list">
                            {users.map((user) => (
                                <li key={user.id}>
                                    <div className="friend-info">
                                        <img src={user.detail?.avt || Globals.DEFAULT_IMAGE} />
                                        <div className="friend-details">
                                            <p><Link to={`/user/${user.id}`}>@{user.username}</Link></p>
                                            <h2>{user.detail?.fname} {user.detail?.fname}</h2>

                                            {/* Add more details as needed (e.g., mutual friends) */}
                                        </div>
                                    </div>
                                    <button className="add-friend-button">Add Friend</button>
                                </li>
                            ))}
                        </ul>
                    )
                }
                {nextPage ? (<button type='button' onClick={() => handleMore()}>More</button>) : ''}
            </div>
        </MainLayout>
    )
}

export default SearchPage;