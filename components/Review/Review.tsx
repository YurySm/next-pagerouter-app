import styles from './Review.module.css'
import { ReviewProps } from './Review.props';
import cn from 'classnames'
import {JSX} from "react";
import UserIcon from './user.svg'
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Divider, Rating} from "@/components";

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {

    const {name, title, description, createdAt, rating} = review

    return (
        <div
            className={cn(styles.review, className)}
            {...props}
        >
            <UserIcon className={styles.user} />

            <div className={styles.title}>
                <span className={styles.name}>{name}:</span>
                <span>{title}</span>
            </div>

            <div className={styles.date}>
                {format(new Date(createdAt), 'dd MMMM yyyy', {locale: ru})}
            </div>

            <div className={styles.rating}>
                <Rating rating={rating} />
            </div>

            <div className={styles.descr}>{description}</div>

            <Divider className={styles.hr}/>
        </div >
    );
};
