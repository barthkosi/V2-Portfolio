import Head from "../components/Head";
import Button from "../components/Button";

export default function NotFound() {


    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-96px)] lg:h-[calc(100vh-166px)] text-center px-4">
            <Head title="barthkosi - 404" description="Page Not Found" />
            <h1 className="text-[120px] md:text-[180px] lg:text-[240px] font-bold leading-none mb-4 text-[var(--content-primary)]">
                404
            </h1>
            <h2 className="mb-4 text-[var(--content-secondary)]">
                Page Not Found
            </h2>
            <p className="body-l mb-8 max-w-md text-[var(--content-secondary)]">
                Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>

            <Button to="/">
                Go to Home
            </Button>
        </div>
    );
}
