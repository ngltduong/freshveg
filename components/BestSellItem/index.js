import styled from "styled-components"

import Link from 'next/link'
import Image from 'next/image'

const BestSellItemCart = styled.div`
    max-width: 272px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    transition: all linear 0.2s;
    &:hover{
        color: #357a38;
        box-shadow: 1px 1px 3.4px 4.6px rgb(102 97 97 / 12%);
    }
`

const BestSellItemContent = styled.div`
    padding-top: 32px;
    padding-bottom: 26px;
    padding-left: 26px;
    padding-right: 26px;
    margin-left: -14px;
    margin-right: -14px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const BestSellItemName = styled.h2`
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: uppercase;
    
`

const BestSellItemFooter = styled.div`
    margin-top: 14px;
`

const BestSellItemPrice = styled.h6`
    font-size: 1rem;
    font-weight: 400;
    color: rgba(0,0,0,0.8);
`

const BestSellItemSold = styled.h6`
    font-size: 1rem;
    font-weight: 700;
    color: rgba(0,0,0,0.8);
`

const BestSellItem = ({product}) => {
    return(
        <Link href={`products/item/${product.slug}`}>
            <a>
            <BestSellItemCart>
                <Image src={product.images[0].url} alt={product.images[0].url} width={300} height={300} layout="responsive" objectFit="cover"/>
                <BestSellItemContent>
                    <BestSellItemName title={product.title}>{product.title}</BestSellItemName>
                    <BestSellItemFooter>
                        <BestSellItemPrice>${product.price}</BestSellItemPrice>
                        <BestSellItemSold>Sold: {product.sold}</BestSellItemSold>
                    </BestSellItemFooter>
                </BestSellItemContent>
            </BestSellItemCart>
            </a>
        </Link>
    )
}

export default BestSellItem