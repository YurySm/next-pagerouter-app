import styles from './Product.module.css'
import { ProductProps } from './Product.props';
import cn from 'classnames'
import { Button, Card, Divider, Rating, Review, Tag } from "@/components";
import { declOfNum, editPriceRu } from "@/helpers/helpers";
import React, { ForwardedRef, JSX, forwardRef, useRef, useState } from "react";
import Image from "next/image";
import { ReviewForm } from "@/components/ReviewForm/ReviewForm";
import { motion } from 'framer-motion'

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const [isReviewOpened, setIsReviewOpened] = useState(false);

    const reviewRef = useRef<HTMLDivElement>(null)

    const scrollToReviews = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        reviewRef.current?.focus()
    }

    const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 }
    }

    return (
        <div
            ref={ref}
            className={className}
            {...props}>
            <Card
                className={cn(styles.product, className)}
            >
                <div className={styles.logo}>
                    <Image
                        width={70}
                        height={70}
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                    />
                    {/*<img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title}/>*/}
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span><span className={'visualyHidden'}>цена</span>{editPriceRu(product.price)}</span>
                    {
                        product.oldPrice &&
                        <Tag
                            className={styles.oldPrice}
                            color={'green'}>
                                <span className={'visualyHidden'}>скидка</span>
                                {editPriceRu(product.price - product.oldPrice)}
                        </Tag>
                    }
                </div>
                <div className={styles.credit}>
                    <span className={'visualyHidden'}>кредит</span>
                    {editPriceRu(product.credit)}<span>/мес</span>
                </div>
                <div className={styles.rating}>
                    <span className={'visualyHidden'}>{'рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating} />
                </div>

                <div className={styles.tags}>{product.tags.map(t => (
                    <Tag
                        key={t}
                        className={styles.category}
                        color={'ghost'}>{t}</Tag>
                ))}</div>

                <div className={styles.priceTitle} aria-hidden={true}>цена</div>
                <div className={styles.creditTitle} aria-hidden={true}>в кредит</div>
                <div className={styles.ratingTitle}>
                    <a
                        onClick={scrollToReviews}
                        href="#ref">
                        {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </a>

                </div>

                <Divider className={styles.hr} />

                <div className={styles.descr}>{product.description}</div>

                <div className={styles.feature}>
                    {
                        product.characteristics.map(c => (
                            <div key={c.name} className={styles.characteristic}>
                                <span className={styles.characteristicName}>{c.name}</span>
                                <span className={styles.characteristicDots}></span>
                                <span className={styles.characteristicValue}>{c.value}</span>
                            </div>
                        ))
                    }
                </div>

                <div className={styles.advBlock}>
                    {
                        product.advantages &&
                        <div className={styles.advantages}>
                            <div className={styles.advTitle}>Приемущества</div>
                            <div className={styles.advDescr}>{product.advantages}</div>
                        </div>
                    }
                    {
                        product.disAdvantages &&
                        <div className={styles.disAdvantages}>
                            <div className={styles.advTitle}>Недостатки</div>
                            <div className={styles.advDescr}>{product.disAdvantages}</div>
                        </div>
                    }
                </div>

                <Divider className={cn(styles.hr, styles.hr2)} />

                <div className={styles.actions}>
                    <Button appearance={'primary'}>Узнать подробнее</Button>

                    {/* {
                            product.reviews && product.reviews.length > 0 &&
                            <Button
                                className={styles.reviewsBtn}
                                appearance={'ghost'}
                                arrow={isReviewOpened ? "down" : "right"}
                                onClick={() => { setIsReviewOpened(!isReviewOpened) }}
                            >
                                Читать отзывы
                            </Button>
                        } */}
                    <Button
                        className={styles.reviewsBtn}
                        appearance={'ghost'}
                        arrow={isReviewOpened ? "down" : "right"}
                        onClick={() => { setIsReviewOpened(!isReviewOpened) }}
                        aria-expanded={isReviewOpened}
                    >
                        Читать отзывы
                    </Button>

                </div>

            </Card >
            <motion.div
                className={styles.reviewWrapp}
                animate={isReviewOpened ? 'visible' : 'hidden'}
                initial={'hidden'}
                variants={variants}
            >
                <Card
                    className={styles.reviews}
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                    color={'blue'}>
                    {
                        product.reviews && product.reviews.length > 0 &&
                        product.reviews.map(r => (
                            <Review key={r._id} review={r} />
                        ))
                    }

                    <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
                </Card>
            </motion.div>

        </div>
    );
}))
