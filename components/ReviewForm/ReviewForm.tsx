import styles from './ReviewForm.module.css'
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames'
import { JSX, useState } from "react";
import { Button, Input, Rating, Textarea } from "@/components";
import CloseIcon from './close.svg'
import { Controller, useForm } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "@/components/ReviewForm/ReviewForm.interface";
import axios from 'axios';
import { API } from '@/helpers/api';

export const ReviewForm = ({ productId, className, isOpened, ...props }: ReviewFormProps): JSX.Element => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const {
        register,
        control,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors } } = useForm<IReviewForm>()



    const onSubmit = async (formData: IReviewForm) => {
        try {
            setIsSuccess(false)
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
                ...formData,
                productId
            })
            if (data.message) {
                setIsSuccess(true)
                reset()
            } else {
                setError('Что-то пошло не так!')
                console.log('sdf');

            }
        } catch (error) {
            setError('Что-то пошло не так!')
            console.log('sdfsdf');

        }

    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} tabIndex={isOpened ? 0 : -1}>
            <div
                className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Заполните имя'
                        }
                    })}
                    error={errors.name}
                    aria-invalid={!!errors.name}
                    placeholder={'Имя'}
                    tabIndex={isOpened ? 0 : -1}/>

                <Input
                    {...register('title', {
                        required: {
                            value: true,
                            message: 'Заполните заголовок'
                        }
                    })}
                    aria-invalid={!!errors.title}
                    error={errors.title}
                    className={styles.title}
                    placeholder={'Заголовок отзыва'}
                    tabIndex={isOpened ? 0 : -1}/>

                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name={'rating'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Укажите рейтинг'
                            }
                        }}
                        render={({ field }) => (
                            <Rating
                                error={errors.rating}
                                isEditable
                                ref={field.ref}
                                setRating={field.onChange}
                                rating={field.value}
                                tabIndex={isOpened ? 0 : -1}/>
                        )}
                    />

                </div>

                <Textarea
                    {...register('description', {
                        required: {
                            value: true,
                            message: 'Заполните описание'
                        }
                    })}
                    aria-label={'Текст отзыва'}
                    error={errors.description}
                    aria-invalid={!!errors.description}
                    placeholder={'Текст отзыва'}
                    className={styles.textarea}
                    tabIndex={isOpened ? 0 : -1}/>

                <div className={styles.send}>
                    <Button
                        onClick={() => clearErrors()}
                        tabIndex={isOpened ? 0 : -1}
                        appearance={'primary'}>Отправить</Button>
                    <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div >

            {isSuccess && <div className={cn(styles.success, styles.label)} role={'alert'}>
                <div className={styles.successTitle}>Ваш отзыв отправлен!</div>
                <div className={styles.successDescr}>
                    Спасибо, Ваш отзыв будет опубликован после проверки
                </div>
                <button
                    aria-label={'Закрыть оповещение'}
                    onClick={() => setIsSuccess(false)}
                    className={styles.close}>
                        <CloseIcon  />
                </button>
            </div>}

            {error && <div className={cn(styles.error, styles.label)} role={'alert'}>
                <div className={styles.successTitle}>Что-то пошло не так!</div>
                <div className={styles.successDescr}>
                    Попробуйте обновить страницу
                </div>
                <button
                    aria-label={'Закрыть оповещение'}
                    onClick={() => setError(undefined)}
                    className={styles.close}>
                        <CloseIcon />
                </button>

            </div>}
        </form>

    );
};
