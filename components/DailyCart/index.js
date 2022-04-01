import styled from "styled-components"
import Image from 'next/image'

const Wrapper = styled.div`
    height: 440px;
    width: 100%;
    transition: all linear 0.2s;
    &:hover{
        color: #357a38;
        box-shadow: 1px 1px 3.4px 4.6px rgb(102 97 97 / 12%);
    }
` 

const Content = styled.div`
    padding: 32px 12px;
    /* padding-top: 32px;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 18px; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h2`
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    text-transform: uppercase;
`

const Footer = styled.div`
    margin-top: 14px;
    width: 100%;
`

const Price = styled.h6`
    font-size: 1rem;
    font-weight: 400;
    color: rgba(0,0,0,0.8);

`
const Sold = styled.h6`
    font-size: 1rem;
    font-weight: 700;
    color: rgba(0,0,0,0.8);

`

const DailyCart = ({dailyProduct}) => {
    return(
        <Wrapper>
            <Image width={100} height={100} layout="responsive" src={dailyProduct.images[0].url}/>
            <Content>
                <Title>
                    {
                        dailyProduct.title
                    }
                </Title>
                <Footer>
                    <Price>${dailyProduct.price}</Price>
                    <Sold>Sold: {dailyProduct.sold}</Sold>
                </Footer>
            </Content>
        </Wrapper>
    )
}

export default DailyCart;