import styles from './Header.module.css'
import { HeaderProps } from './Header.props';
import cn from 'classnames'
import { JSX, useEffect, useState } from "react";
import Logo from '../logo.svg'
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon';
import { Sidebar } from '../Sidebar/Sidebar';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

    const router = useRouter()

    const [isOpened, setIsOpened] = useState<boolean>(false)

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 50
            }
        },
        closed: {
            opacity: 0,
            x: '100%'
        }
    }

    useEffect(() => {
        setIsOpened(false)
    }, [router])

    const [x, setX] = useState(0)

    return (
        <header
            className={cn(className, styles.header)}
            {...props}>
            <Logo />
            <ButtonIcon
                onClick={() => {
                    setIsOpened(true)
                }}
                appearance='white'
                icon='menu' />
            <motion.div
                drag={'x'}
                // onDragStart={
                //     (event, info) => {
                //         console.log(info.point.x)
                //         setX(info.point.x)
                //     }
                // }
                // onDrag={e => {
                //     if (e.clientX < x) {
                //
                //     }
                // }
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={
                    (event, info) => {
                        if (info.offset.x > 40) {
                            setIsOpened(false)
                        }
                    }
                }
                initial={'closed'}
                variants={variants}
                animate={isOpened ? 'opened' : 'closed'}
                className={styles.mobMenu}>
                <Sidebar />
                <ButtonIcon
                    onClick={() => { setIsOpened(false) }}
                    className={styles.menuClose}
                    appearance='white'
                    icon='close' />
            </motion.div>
        </header >
    );
};
