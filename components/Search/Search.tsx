import styles from './Search.module.css'
import { SearchProps } from './Search.props';
import cn from 'classnames'
import {Button, Input} from "@/components";
import {KeyboardEvent, useState} from "react";
import SearchIcon from "./search.svg";
import {useRouter} from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {

    const [search, setSearch] = useState<string>('');

    const router = useRouter()

    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        })
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') goToSearch()
    }


    return (
        <form
            role={'search'}
            {...props}
            className={cn(className, styles.search)}>
            <Input
                className={styles.input}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={'Поиск...'}/>
            <Button
                aria-label={'Искать по сайту'}
                className={styles.button}
                onClick={goToSearch}
                appearance={'primary'} >
                    <SearchIcon/>
            </Button>
        </form >
    );
};
