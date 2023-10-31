import Image from "next/image";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return (
            <Image
                src={src}
                alt="avatar image"
                className="rounded-full"
                height={30}
                width={30}
            />
        );
    }

    return <FaCircleUser size={24} />;
};

export default Avatar;
