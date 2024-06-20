import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import styles from './TestimonialCard.module.css'

import {useResponsiveValue} from "../../utilities/index.js";
import {Icon } from "../shared";

export const TestimonialCard = ({text, name}) => {

    const widthIcon = useResponsiveValue('768', '40', '60');
    const heightIcon = useResponsiveValue('768', '32', '48');

    return (
        <div className={styles.container}>
            <div className={styles.container_svg} >
                <Icon iconId={'icon-quote'} width={widthIcon} height={heightIcon}/>
            </div>
            <SimpleBar style={{ maxHeight: 121, paddingRight: '10px'}}>
                <p className={styles.tastimonial}>{text}</p>
            </SimpleBar>
            <p className={styles.name}>{name}</p>
        </div>
    )
}