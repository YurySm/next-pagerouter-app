import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';
import {JSX} from "react";
import cn from "classnames";
import {format} from "date-fns";

export const Footer = ({className,  ...props }: FooterProps): JSX.Element => {

    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <p className={styles.copy}>
                OwlTop © 2020 - { format(new Date(), 'yyyy') } Все права защищены
            </p>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <a href="#">Пользовательское соглашение</a>
                </li>

                <li className={styles.link}>
                    <a href="#">Политика конфиденциальности</a>
                </li>
            </ul>
        </footer >
    );
};
