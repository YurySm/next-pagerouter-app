import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import up from './up.svg'
import menu from './menu.svg'
import close from './close.svg'

export const icons = {
    up,
    menu,
    close
}

export type IconsType = keyof typeof icons

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: IconsType
    appearance: 'primary' | 'white'
}