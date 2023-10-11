import styles from './Textarea.module.css'
import { TextareaProps } from './Textarea.props';
import cn from 'classnames'
import {notoSans} from "@/layout/Layout";
import {ForwardedRef, forwardRef, JSX} from "react";

export const Textarea = forwardRef(({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {

    return (
        <div className={cn(className, styles.textareaWrapp)}>
            <textarea
                ref={ref}
                className={cn( `${notoSans.className}`,styles.textarea, {
                    [styles.error]: error
                })}
                rows={4}
                {...props}
            />

            {error && <span role={'alert'} className={styles.errorMessage}>{error?.message}</span>}
        </div>
    );
})
