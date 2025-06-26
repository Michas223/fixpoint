export default function OrderData({
    title,
    data,
}: {
    title: string;
    data: string;
}) {
    return (
        <>
            <div className="text-xs flex flex-col xl:flex-row gap-1">
                <p>{title}:</p>
                <p className="font-bold">{data}</p>
            </div>
        </>
    );
}
