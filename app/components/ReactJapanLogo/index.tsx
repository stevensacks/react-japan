import type {DetailedHTMLProps, FC, ImgHTMLAttributes} from 'react';
import {twJoin} from 'tailwind-merge';

const ReactJapanLogo: FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({className, ...props}) => (
  <>
    <img
      alt="React Japan"
      className={twJoin('dark:hidden', className)}
      src="/assets/logo-light.png"
      {...props}
    />
    <img
      alt="React Japan"
      className={twJoin('hidden dark:inline', className)}
      src="/assets/logo-dark.png"
      {...props}
    />
  </>
);

export default ReactJapanLogo;
