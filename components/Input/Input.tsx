import styles from './Input.module.css'
import { InputProps } from './Input.props';
import cn from 'classnames'
import {notoSans} from "@/layout/Layout";
import {ForwardedRef, forwardRef, JSX} from "react";

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    return (
        <div className={cn(className, styles.inputWrapp)}>
            <input
                ref={ref}
                className={cn( `${notoSans.className}`,styles.input, {
                    [styles.error]: error
                })}
                {...props}
            />
                {error && <span role={'alert'} className={styles.errorMessage}>{error?.message}</span>}
        </div>

    );
})
