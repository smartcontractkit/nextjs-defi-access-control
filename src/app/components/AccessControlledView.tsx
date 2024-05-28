"use client";

import Image from "next/image";
import { BASIC_IMAGE_URL, VIP_IMAGE_URL } from "../constants/images";

interface AccessControlledViewProps {
  isGranted: boolean;
}

const AccessControlledView: React.FC<AccessControlledViewProps> = ({ isGranted }) => {

  return (
    <div className={"flex w-full mt-24 items-center justify-center font-mono text-sm"}>
      {isGranted ? (
        <Image
          src={VIP_IMAGE_URL}
          height={400}
          width={400}
          alt={"VIP token"}
        />
      ) : (
        <Image
          src={BASIC_IMAGE_URL}
          height={400}
          width={400}
          alt={"Basic User"}
        />
      )}
    </div>
  );
};

export default AccessControlledView;
