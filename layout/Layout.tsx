import styles from './Layout.module.css'
import { LayoutProps } from './Layout.props';
import cn from 'classnames'
import {FunctionComponent, JSX, KeyboardEvent, useRef, useState} from "react";
import { Sidebar } from "@/layout/Sidebar/Sidebar";
import { Header } from "@/layout/Header/Header";
import { Footer } from "@/layout/Footer/Footer";
import { Noto_Sans } from "next/font/google";
import { AppContextProvider, IAppContext } from "@/context/app.context";
import { Up } from '@/components';


export const notoSans = Noto_Sans({ subsets: ['cyrillic'], weight: ["300", "400", "500", "700"] })
const Layout = ({ children }: LayoutProps): JSX.Element => {

    // console.log('%cTOP', ('color: red;background: white'))

    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false)

    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key: KeyboardEvent) => {
        if (key.code === 'Enter' || key.code === 'Space') {
            key.preventDefault()
            bodyRef.current?.focus()
        }
        setIsSkipLinkDisplayed(false)
    }
    return (
        <div className={cn(`${notoSans.className}`, styles.wrapper)}>
            <a
                onKeyDown={skipContentAction}
                onFocus={() => setIsSkipLinkDisplayed(true) }
                tabIndex={1}
                className={cn(styles.skipLink, {
                    [styles.displayed] : isSkipLinkDisplayed
                })}
                href="#">
                    Перейти к содержанию
            </a>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <main
                role={'main'}
                tabIndex={0}
                ref={bodyRef}
                className={styles.body}>
                    {children}
            </main>
            <Footer className={styles.footer} />
            <Up />
        </div >
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        )
    }
}
