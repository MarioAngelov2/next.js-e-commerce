import React from "react";
import { IconType } from "react-icons/lib";

interface StatusProps {
    text: string;
    icon: IconType;
    bgColor: string;
    color: string;
}

const Status: React.FC<StatusProps> = ({
    text,
    icon: Icon,
    bgColor,
    color,
}) => {
    return (
        <div
            className={`${bgColor} ${color} px-1 rounded flex items-center gap-1`}
        >
            {text}
            <Icon size={15} />
        </div>
    );
};

export default Status;
