import React from "react";
import Image from "next/image";

interface EmptyProps {}

const Empty: React.FC<EmptyProps> = ({}) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col justify-center items-center">
      <div className="empty__image ">
        <Image className="" src="/empty-box.svg" alt="Empty box" width={150} height={150} />
      </div>
      <h4 className="mt-1 font-mono font-bold text-lg">Trống rỗng...</h4>
    </div>
  );
};

export default Empty;
