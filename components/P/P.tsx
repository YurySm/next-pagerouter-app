import styles from './P.module.css'
import { PProps } from './P.props';
import cn from 'classnames'

export const P = ({ children, className, size = 'normal', ...props }: PProps): JSX.Element => {

    return (
        <p
            className={cn(styles.p, className, {
                [styles.mini]: size === 'mini',
                [styles.normal]: size === 'normal',
                [styles.big]: size === 'big',
            })}
            {...props}
        >
            {children}
        </p >
    );
};
