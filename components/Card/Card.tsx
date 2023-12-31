import styles from './Card.module.css'
import { CardProps } from './Card.props';
import cn from 'classnames'
import { ForwardedRef, JSX, forwardRef } from "react";

export const Card = forwardRef(({ children, className, color = 'white', ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    return (
        <div
            className={cn(styles.card, className, {
                [styles.blue]: color === 'blue',
            })}
            ref={ref}
            {...props}
        >
            <>
                {children}
            </>
        </div >
    );
})
