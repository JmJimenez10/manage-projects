import { Link } from "react-router-dom"

export const GeneralLink = ({ path, text }: { path: string, text: string }) => {
    return <Link to={path} className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-500 px-6 font-medium text-neutral-200 transition hover:scale-105">
        <span>{text}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div className="relative h-full w-8 bg-white/20"></div>
        </div>
    </Link>
}