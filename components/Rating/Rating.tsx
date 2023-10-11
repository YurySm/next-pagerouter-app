import styles from './Rating.module.css'
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import {JSX, useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from "react";
import StarIcon from './star.svg';

export const Rating = forwardRef(({error, isEditable = false, rating, setRating, tabIndex,  ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

    const computeFocus = (r: number, i: number): number => {
        if(!isEditable) return -1
        if (!rating && i === 0) return tabIndex ?? 0
        if (r === i + 1) return tabIndex ?? 0
        return -1
    }

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
            <span
                className={cn(styles.star, {
                    [styles.filled]: i < currentRating,
                    [styles.editable]: isEditable
                })}
                onMouseEnter={() => changeDisplay(i + 1)}
                onMouseLeave={() => changeDisplay(rating)}
                tabIndex={computeFocus(rating, i)}
                onKeyDown={(e: KeyboardEvent) => handleKey(e) }
                onClick={() => onClick(i + 1)}
                ref={r => ratingArrayRef.current?.push(r)}
                role={isEditable ? 'slider' : undefined}
                aria-valuenow={rating}
                aria-valuemax={5}
                aria-valuemin={1}
                aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
                aria-invalid={!!error}
            >
                    <StarIcon/>
            </span>

        ))
        setRatingArray(updatedArray)
    }

    useEffect(() => {
        constructRating(rating)
    }, [rating, tabIndex]);

    const changeDisplay = (i: number) => {
        if (!isEditable) return
        constructRating(i)
    }

    const onClick = (i: number) => {
        if (!isEditable || !setRating) return
        setRating(i)
    }

    const handleKey = (e:KeyboardEvent) => {
        if (!isEditable || !setRating) return
        if(e.code === 'ArrowUp' || e.code === 'ArrowRight') {
            e.preventDefault()
            if(!rating) {
                setRating(1)
            } else {
                setRating(rating < 5 ? rating + 1 : 5)
            }
            ratingArrayRef.current[rating]?.focus()
        }
        if(e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
            e.preventDefault()
            setRating(rating === 0 ? 0 : rating - 1)
            ratingArrayRef.current[rating - 2]?.focus()
        }
    }



    return (
        <div
            ref={ref}
            className={cn(styles.ratingWrapp, {
                [styles.error]: error
            })}
            {...props}>
                {
                    ratingArray.map((r: JSX.Element, i: number) => (
                        <span key={i}>{r}</span>
                    ))
                }
            {error && <span role={'alert'} className={styles.errorMessage}>{error?.message}</span>}
        </ div>
    );
})
