import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type ProfileImageProps = {
  alt: string;
  src: string;
};

export const ProfileImage = ({ alt, src }: ProfileImageProps): JSX.Element => (
  <LazyLoadImage alt={alt} effect="blur" src={src} className="avatar" />
);

export default ProfileImage;
