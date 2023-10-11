import styles from './HhData.module.css'
import {HhDataProps} from './HhData.props';
import cn from 'classnames'
import {Card} from "@/components";
import RateIcon from './star.svg'
import {editPriceRu} from "@/helpers/helpers";

export const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps): JSX.Element => {

    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.statCount}>{count}</div>
            </Card>

            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles.salaryCount}>{editPriceRu(juniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon/>
                        <RateIcon/>
                    </div>
                </div>

                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles.salaryCount}>{editPriceRu(middleSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon/>
                    </div>
                </div>

                <div>
                    <div className={styles.title}>Профессионал</div>
                    <div className={styles.salaryCount}>{editPriceRu(seniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                        <RateIcon className={styles.filled}/>
                    </div>
                </div>
            </Card>
        </div>
    );
};
