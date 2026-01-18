import Head from "../components/Head";
import Button from "../components/Button";

export default function NotFound() {


    return (
        <div className="w-fill flex flex-col lg:flex-row gap-8 lg:gap-0 items-center justify-center h-[calc(100vh-96px)] lg:h-[calc(100vh-166px)] px-4 text-[var(--content-primary)]">
            <Head title="barthkosi - 404" description="Page Not Found" />
            <img src="https://res.cloudinary.com/barthkosi/image/upload/portfolio-404.webp" alt="404" className="w-ful lg:w-2/3 h-auto -ml-[64px] lg:-ml-[96px]" />
            <div className="w-full lg:w-1/3 flex flex-col items-start">
            <h2 className="mb-4">
                Page Not Found
            </h2>
            <p className="body-l mb-8 max-w-md">
                Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <Button to="/">
                Go to Home
            </Button>
            </div>
        </div>
    );
}
