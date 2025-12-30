import React, { useState } from "react";
import { css, cx } from "@linaria/core";

interface SmartImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  sizes,
  className,
  eager = false,
}) => {
  const [error, setError] = useState(false);

  const handleError = () => setError(true);

  const baseUrl = `${src}?auto=format&fit=crop&q=75`;
  const srcSet = `${baseUrl}&w=500 500w, ${baseUrl}&w=1000 1000w`;

  if (error) {
    return (
      <div
        className={cx(
          css`
            width: 100%;
            height: 100%;
            background-color: #102219;
          `,
          className
        )}
      />
    );
  }

  return (
    <img
      src={`${baseUrl}&w=500`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={handleError}
      className={cx(
        css`
          width: 100%;
          height: 100%;
          object-fit: cover;
        `,
        className
      )}
    />
  );
};
