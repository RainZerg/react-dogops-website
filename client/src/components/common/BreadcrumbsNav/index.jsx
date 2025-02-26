import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export function BreadcrumbsNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const pathSegments = location.pathname.split('/')
    .filter(segment => segment !== '');

    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

        const displayText = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        return {
            text: displayText,
            path: path
        };
    });

    return (
        <div className="m-4 sm:m-6 md:m-8">
            <Breadcrumbs>
                <BreadcrumbItem
                    onClick={() => navigate('/')}
                >
                    Home
                </BreadcrumbItem>

                {breadcrumbItems.map((item, index) => (
                    <BreadcrumbItem 
                        key={item.path}
                        isActive={index === breadcrumbItems.length - 1}
                        onClick={() => {
                            if (index !== breadcrumbItems.length - 1) {
                                navigate(item.path);
                            }
                        }}
                    >
                        {item.text}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
        </div>
    );
}
