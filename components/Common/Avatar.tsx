import React from "react";

interface AvatarProps {
  className: string;
}

const Avatar: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" id="avatar">
        <g data-name="Layer 2">
          <g data-name="—ÎÓÈ 1">
            <circle cx="30.9" cy="30.9" r="30.9" fill="#e9573e"></circle>
            <path
              fill="#f9dca4"
              fill-rule="evenodd"
              d="m23.366 38.578 15.796.223v12.918l-15.907-.121.111-13.02z"
            ></path>
            <path
              fill="#58b0e0"
              fill-rule="evenodd"
              d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.226 31.226 0 0 1-3.837-.237A34.069 34.069 0 0 1 15.9 57.919a31.032 31.032 0 0 1-7.856-6.225l1.283-3.1 13.925-6.212c.625 3.723 7.814 8.175 7.814 8.175s7.22-3.412 8.096-8.211l12.79 6.281z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M39.165 38.778v3.58c-.043.139-.074.324-.135.546a6.177 6.177 0 0 1-.243.687c-.17.409-1.345.063-1.568.415-5.375 4.164-11.988.868-13.855-5.245z"
              opacity=".11"
            ></path>
            <path
              fill="#ffe8be"
              fill-rule="evenodd"
              d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z"
            ></path>
            <path
              fill="#f9dca4"
              fill-rule="evenodd"
              d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.974 31.974 0 0 1-1.472-7.658zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 0 0 1.471-7.658z"
            ></path>
            <path
              fill="#969696"
              fill-rule="evenodd"
              d="M18.7 26.997s-3.28-1.756-2.342-8.006 6.113-9.439 8.025-8.97A31.11 31.11 0 0 0 18.7 26.998zM43.84 26.997s3.28-1.756 2.343-8.006-6.122-9.3-8.034-8.83a30.517 30.517 0 0 1 5.692 16.836z"
            ></path>
            <path
              fill="#434955"
              fill-rule="evenodd"
              d="m23.255 41.241 7.811 9.316-6.312 3.553-4.828-10.591 3.329-2.278zM39.162 41.421l-8.096 9.136 6.524 3.553 4.782-10.719-3.21-1.97z"
            ></path>
            <path
              fill="#969696"
              fill-rule="evenodd"
              d="M31.128 35.672c-1.61 2.027-7.667 2.777-7.885-.859 1.412.65 2.595.497 4.694-1.183 2.1-1.679 3.21.305 3.21.305s1.183-1.984 3.283-.305c2.099 1.68 3.282 1.832 4.694 1.183-.218 3.636-6.386 2.886-7.996.859z"
            ></path>
            <circle cx="26.199" cy="27.557" r="3.187" fill="#e6e6e6"></circle>
            <path
              fill="#434955"
              fill-rule="evenodd"
              d="M36.293 30.297c1.682-.548 1.382-.346 1.048-.208-1.418.208-1.773.133-2.096 0a2.746 2.746 0 0 0 1.048.208zm1.047-5.272h-2.094a2.734 2.734 0 0 1 1.047-.207 2.734 2.734 0 0 0-1.047.208h2.094zm6.478 1.21L40 26.998l-.11.025-.02-.11a3.62 3.62 0 0 0-.355-1.037 3.657 3.657 0 0 0-.653-.888l-.077-.076a3.65 3.65 0 0 0-1.103-.715 3.656 3.656 0 0 0-2.78 0 3.637 3.637 0 0 0-2.212 2.86l-.013.093h-2.865l-.012-.093a3.607 3.607 0 0 0-.346-1.116 3.653 3.653 0 0 0-.686-.953l-.076-.076a3.644 3.644 0 0 0-3.884-.715 3.637 3.637 0 0 0-2.187 2.705l-.02.111-.11-.025-3.773-.758-.038.757 3.878 1.19.06.02.012.06a3.626 3.626 0 0 0 .932 1.805l.066.066a3.658 3.658 0 0 0 1.182.79 3.64 3.64 0 0 0 2.776.001 3.657 3.657 0 0 0 1.181-.79l.001-.001.001-.001a3.626 3.626 0 0 0 1.023-2.018l.014-.092h2.878l.014.092a3.608 3.608 0 0 0 .348 1.09 3.652 3.652 0 0 0 .608.86l.068.069a3.657 3.657 0 0 0 1.182.79 3.64 3.64 0 0 0 2.776.001 3.657 3.657 0 0 0 1.18-.79l.002-.001v-.001a3.663 3.663 0 0 0 .636-.856 3.61 3.61 0 0 0 .359-.997l.012-.061.06-.02 3.91-1.195-.022-.761zm-16.571-1.21a2.745 2.745 0 0 1 .857.564h.002l.032.031a2.74 2.74 0 0 1 0 3.874l-.002.002a2.74 2.74 0 0 1-3.873 0l-.032-.032v-.002a2.745 2.745 0 0 1-.563-.858 2.741 2.741 0 0 1 0-2.094 2.743 2.743 0 0 1 1.484-1.484 2.742 2.742 0 0 1 2.095 0zm10.907.672a2.651 2.651 0 0 0-.492-.387 2.633 2.633 0 0 0-2.658-.047 2.656 2.656 0 0 0-.492.357 2.48 2.48 0 0 0-.247.26 2.64 2.64 0 0 0-.387.63 2.511 2.511 0 0 0-.098.262 2.62 2.62 0 0 0-.119.785c0 .086.005.172.013.257a2.615 2.615 0 0 0 .204.79 2.534 2.534 0 0 0 .118.239 2.64 2.64 0 0 0 .436.575v.002l.043.042.02.018.017.016a2.641 2.641 0 0 0 .26.21 2.598 2.598 0 0 0 .69.35 2.642 2.642 0 0 0 2.691-.636l.003-.002.05-.052a2.636 2.636 0 0 0-.05-3.67z"
            ></path>
            <circle cx="36.293" cy="27.557" r="2.755" fill="#e6e6e6"></circle>
            <circle cx="26.199" cy="27.557" r="2.755" fill="#e6e6e6"></circle>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Avatar;
