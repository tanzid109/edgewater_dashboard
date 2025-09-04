export default function Users() {
    return (
        <div>
            <h2>Users Mangement</h2>
            
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <div className="aspect-video rounded-xl bg-muted " />
                <div className="aspect-video rounded-xl bg-muted" />
                <div className="aspect-video rounded-xl bg-muted" />
                <div className="aspect-video rounded-xl bg-muted" />
            </div>
            <div className="min-h-[10vh] rounded-xl bg-muted mt-4"></div>
            <div className="min-h-[50vh] rounded-xl bg-muted mt-4" />
        </div>
    );
}