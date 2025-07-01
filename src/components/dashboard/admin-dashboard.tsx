import OrdersTable from "./admin/admin/table";
import UsersTable from "./admin/users/table";
import CreateOrder from "./create-order";

export default function AdminDashboard() {
    return (
        <>
            <div className="grow-1 w-full relative p-12">
                <div className="container flex flex-col gap-8">
                    <CreateOrder isAdressExist={true} />
                </div>
                <UsersTable />
                <OrdersTable />
            </div>
        </>
    );
}
