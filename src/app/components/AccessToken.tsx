'use client'

import Image from 'next/image'

interface AccessTokenProps {
    isGranted: boolean;
}

const AccessToken: React.FC<AccessTokenProps> = ({ isGranted }) => {

    return (
        <div
            className={"flex w-full mt-24 items-center justify-center font-mono text-sm"}
        >
            {isGranted ? (
                <Image
                    src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDhqN3k5ZmI0dHd4ZGFxNnhlNWkzaHZxOWR5ZmFybTB5bWFkMmhreCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IgpsRT6FdinjrDWzNu/giphy.gif"}
                    height={400}
                    width={400}
                    alt={'VIP token'} />
            ) : (
                <Image
                    src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWUweDVkMHp1Zno0MXJvdnpmcnNycTd6bjBmdGxvc21qdGEzMDI4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9EdzfOSgfyueLm/giphy.gif"}
                    height={400}
                    width={400}
                    alt={'Basic User'} />
            )}
        </div>
    )
}

export default AccessToken