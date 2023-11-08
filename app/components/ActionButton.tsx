import React from "react";
import { IconType } from "react-icons/lib";

interface ActionButtonProps {
    icon: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    icon: Icon,
    onClick,
    disabled,
}) => {
    return (
        <button
            className="flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] 
            text-slate-700 border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={onClick}
        >
            <Icon size={18} />
        </button>
    );
};

export default ActionButton;
