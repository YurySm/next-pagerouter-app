import {  DetailedHTMLProps, HTMLAttributes } from "react";
import {ProductReview} from "@/interfaces/product.interface";

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    productId: string
    isOpened: boolean
}