import styles from './Advantages.module.css'
import { AdvantagesProps } from './Advantages.props';
import CheckIcon from './check.svg'
import cn from 'classnames'
import {Card} from "@/components";
import {editPriceRu} from "@/helpers/helpers";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {

    return (
        <>
            {
                advantages.map(a => (
                    <div
                        className={styles.advantage}
                        key={a._id}>
                            <CheckIcon/>
                            <div className={styles.title}>{a.title}</div>
                            <hr className={styles.vline}/>
                            <div className={styles.descr}>{a.description}</div>
                    </div>
                ))
            }
        </>
    );
};
