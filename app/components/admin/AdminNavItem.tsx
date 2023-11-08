import React from "react";
import { IconType } from "react-icons/lib";

interface AdminNavItemProps {
    selected?: boolean;
    icon: IconType;
    label: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
    selected,
    icon: Icon,
    label,
}) => {

    return (
        <div
            className={`flex flex-wrap items-center justify-center text-center gap-1
            p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
    ${
        selected
            ? "border-b-slate-800 text-slate-800"
            : "border-transparent text-slate-500"
    }`}
        >
            <Icon size={24} />
            <div className="font-medium text-xs md:text-sm text-center break-normal">
                {label}
            </div>
        </div>
    );
};

export default AdminNavItem;
