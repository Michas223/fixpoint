import CreateOrder from "./create-order";

export default function AdminDashboard() {
    return (
        <>
            <div className="grow-1 w-full relative p-12">
                <div className="container flex flex-col gap-8">
                    <CreateOrder />
                </div>
            </div>
        </>
    );
}
