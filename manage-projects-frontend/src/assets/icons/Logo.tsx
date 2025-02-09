import type { SVGProps } from "react";
const LogoIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" {...props}>
    <rect width="200" height="200" rx="20" fill="#4A90E2" />
    <g fill="white">
        <rect x="40" y="50" width="40" height="100" rx="8" />
        <rect x="90" y="30" width="40" height="140" rx="8" />
        <rect x="140" y="70" width="40" height="100" rx="8" />
    </g>
    {/* <text x="100" y="190" text-anchor="middle" font-family="'Arial', sans-serif" font-size="20" fill="white" font-weight="bold">
    </text> */}
</svg>;
export default LogoIcon;


