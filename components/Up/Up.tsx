import { useScrollY } from '@/hooks/useScrollY';
import styles from './Up.module.css'
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = (): JSX.Element => {

    const y = useScrollY()
    const controls = useAnimation()

    useEffect(() => {
        controls.start({ opacity: 3 * y / document.body.scrollHeight }) // ?
    }, [y, controls])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <motion.span
            animate={controls}
            initial={{ opacity: 0 }}
            className={styles.up}>
            <ButtonIcon appearance='primary' icon='up' onClick={scrollToTop} />
        </motion.span>
    );
};