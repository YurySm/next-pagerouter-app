
export interface ProductModel {
    _id: string
    categories: string[]
    tags: string[]
    title: string
    image: string
    description: string
    link: string
    price: number
    credit: number
    oldPrice: number
    characteristics: ProductCharacteristic[]
    advantages?: string
    disAdvantages?: string
    initialRating: number
    createdAt: string
    updatedAt: string
    __v: number
    html: string
    blog: ProductBlog
    companyId: string
    clicks: number
    reviews: ProductReview[]
    reviewCount: number
    reviewAvg?: number
}

export interface ProductCharacteristic {
    name: string
    value: string
}

export interface ProductBlog {
    text: string
    _id: string
    bigImage?: string
}

export interface ProductReview {
    _id: string
    name: string
    title: string
    description: string
    rating: number
    productId: string
    createdAt: Date
    updatedAt: string
    __v: number
}
