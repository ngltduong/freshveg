import styled from "styled-components"

import Link from 'next/link'
import Image from 'next/image'

const NavBestSellItemCart = styled.div`
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

const NavBestSellItemContent = styled.div`
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

const NavBestSellItemName = styled.h2`
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: uppercase;
    
`

const NavBestSellItemFooter = styled.div`
    margin-top: 14px;
`

const NavBestSellItemPrice = styled.h6`
    font-size: 1rem;
    font-weight: 400;
    color: rgba(0,0,0,0.8);
`

const NavBestSellItemSold = styled.h6`
    font-size: 1rem;
    font-weight: 700;
    color: rgba(0,0,0,0.8);
`

const NavBestSellItem = ({product}) => {
    return(
        <Link href={`/products/item/${product.slug}`} prefetch>
            <a>
            <NavBestSellItemCart>
                <Image src={product.images[0].url} alt={product.images[0].url} width={300} height={300} layout="responsive" objectFit="cover"/>
                <NavBestSellItemContent>
                    <NavBestSellItemName title={product.title}>{product.title}</NavBestSellItemName>
                    <NavBestSellItemFooter>
                        <NavBestSellItemPrice>${product.price}</NavBestSellItemPrice>
                    </NavBestSellItemFooter>
                </NavBestSellItemContent>
            </NavBestSellItemCart>
            </a>
        </Link>
    )
}

export default NavBestSellItem