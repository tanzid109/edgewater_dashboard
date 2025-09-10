import { UserCard } from "@/components/users/UserCard";
import UsersTable from "@/components/users/UsersTable";

export default function Users() {
    return (
        <div>
            <h2 className="text-2xl font-bold px-1 py-3">Users Mangement</h2>

            <div>
                <UserCard/>
            </div>
            <div>
                <UsersTable />
            </div>
        </div>
    );
}