import {JSX, useContext, KeyboardEvent, useState} from "react";
import { AppContext } from "@/context/app.context";
import styles from './Menu.module.css'
import cn from "classnames";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "@/helpers/helpers";
import {motion, useReducedMotion} from 'framer-motion'

export const Menu = (): JSX.Element => {

    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const [announce, setAnnounce] = useState<'opened' | 'closed' | undefined>(undefined);
    const router = useRouter()

    // уменьшение движений - спец возможности
    const shouldReduceMotion = useReducedMotion()

    const variants = {
        visible: {
            marginBottom: 20,
            transition: !shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: { marginBottom: 0, }
    }

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }

    const openSecondMenu = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory === secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened')
                m.isOpened = !m.isOpened
            }
            return m;
        })
        )
    }

    const openSecondMenuKey = (key: KeyboardEvent, secondCategory: string) => {
      if (key.code === 'Enter' || key.code === 'Space') {
          key.preventDefault()
          openSecondMenu(secondCategory)
      }
    }

    const buildFirstLevel = () => {
        return (
            <ul>
                {
                    firstLevelMenu.map(m => (
                        <li key={m.route} aria-expanded={m.id === firstCategory}>
                            <Link href={`/${m.route}`}>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id === firstCategory
                                })}>
                                    {m.icon}
                                    <span>
                                        {m.name}
                                    </span>
                                </div>
                            </Link>
                            {m.id === firstCategory && buildSecondLevel(m)}
                        </li>
                    ))
                }
            </ul>
        )
    }

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {
                    menu.map(m => {
                        if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                            m.isOpened = true
                        }
                        return (
                            <li  key={m._id.secondCategory}>
                                <button
                                    aria-expanded={m.isOpened}
                                    onKeyDown={(key: KeyboardEvent) => openSecondMenuKey(key, m._id.secondCategory)}
                                    onClick={() => { openSecondMenu(m._id.secondCategory) }}
                                    className={styles.secondLevel}>{m._id.secondCategory}</button>
                                <motion.ul
                                    layout // проверка на изменение размеров родителя
                                    variants={variants}
                                    initial={m.isOpened ? 'visible' : 'hidden'}
                                    animate={m.isOpened ? 'visible' : 'hidden'}
                                    className={cn(styles.secondLevelBlock)}>
                                    {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                                </motion.ul>
                            </li>
                        )
                    }

                    )
                }
            </ul>
        )
    }

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(p => (
                <motion.li
                    variants={variantsChildren}
                    key={p.alias}>
                    <Link
                        tabIndex={isOpened ? 0 : -1}
                        href={`/${route}/${p.alias}`}
                        className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
                        })}
                        aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}
                    >
                        {p.category}
                    </Link>
                </motion.li>
            ))
        )
    }

    return (
        <nav
            role={'navigation'}
            className={styles.menu}>
                {
                    announce &&
                    <span
                        role={'log'}
                        className={'visualyHidden'}>
                        {announce === 'opened' ? 'развернтуто' : 'свернуто'}
                    </span>
                }
                {buildFirstLevel()}
        </nav >
    );
};
