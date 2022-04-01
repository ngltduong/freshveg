import styled from "styled-components"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Container, appearObj, rightToLeftObj } from "../styles/Global.style"
import { tablet, desktop} from "../utils/responsive";

import Image from 'next/image'
import Link from 'next/link'

import { useState, useEffect } from 'react'

const Header = styled.div`
    width: 100%;
    border-top: 1px solid grey;
    padding-top: 28px;
    & svg{
        font-size: 3.4rem;
    }
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${desktop({
        flexDirection: "row",
        height: "100%"
    })}
    @media only screen and (min-width: 1023px){
        &.large{
            height: 100%;
            justify-content: space-between;

        }
    }
`

const Description = styled.p`
    font-size: 1rem;
    line-height: 1.4rem;
    text-align: center;
    margin-bottom: 0;
`

const SubFooter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    margin-bottom: 24px;
    /* background-color: #357a38; */
    & a:hover{
        color: #357a38;
    }
`

const InfoWrapper = styled.div`
    width: 100%;
    position: relative;
    left: 0;
    /* transform: translate(-50%, 0); */
    opacity: 1;
    animation: ${rightToLeftObj} 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) ;
    &.moveLeftRight{
        /* transform: translate(-50%, 0); */
        
        left: 50%;
        transform: translate(-50%, 0);
        opacity: 1;
        animation: ${appearObj} 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) ;
        li{
            justify-content: flex-start;
        }
    }
`

const Info = styled.ul`
    margin-bottom: 0;
    padding-top: 18px;
    padding-bottom: 18px;
    & li+li{
        border-top: 1px solid grey;
    }
    & li:last-child{
        border-bottom: 1px solid grey;
    }

    @media only screen and (min-width: 1023px){
        & li+li{
            border-top: none;
        }
        & li:last-child{
            border-bottom: none;
        }
        &{
            height: 100%;
            padding-top: 0px;
        }
    }
   
`

const InfoItem = styled.li`
    font-size: 1rem;
    line-height: 1rem;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & svg {
        font-size: 1rem;
    }
    cursor: pointer; 
    &:hover{
        color: #357a38;
    }
    @media only screen and (min-width: 1023px){
        &:first-child{
            margin-top: 24px;
        }
    }
`

const Title = styled.h6`
    font-size: 1rem;
    font-weight: 600;
`

const SocialNetwork = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${(desktop({
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%"
    }))}
`

const Follow = styled.h6`
    font-size: 1rem;
    line-height: 1rem;
    margin-bottom: 0;
`

const SocialIcon = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    svg{
        font-size: 2rem;
    }
    ${(desktop({
        marginTop: "24px",
        maxWidth: "124px",
        width: "100%"
    }))}
`


const Footer = () => {

    const [toggleInfo, setToggleInfo] = useState('')

    const infoList = ['help', 'shop', 'aboutus', '']

    const [isDesktop, setIsDesktop] = useState(true)


    const handleSetLargeScreen = (window) => {
        if(window.innerWidth > 1023){
            setIsDesktop(true)
        }
        else{
            setIsDesktop(false)
        }
      }
    
    useEffect(() => {
        const offset = window
        handleSetLargeScreen(offset)
      }, [])
    
      useEffect(() => {
        window.addEventListener('resize',() => handleSetLargeScreen(window))
      })


    const handleToggleInfo = (e, infoItem) => {
        setToggleInfo(infoItem)
    }

    const handleContact = (infoItem) => {
        switch(infoItem){
            case"help":
                return(
                    <InfoWrapper className="moveLeftRight">
                        <Info>
                            <InfoItem onClick={(e) => handleToggleInfo(e, '')}><ArrowBackIosIcon/>Back</InfoItem>
                            <InfoItem>Contact us</InfoItem>
                            <InfoItem>Shipping</InfoItem>
                            <InfoItem>Returns & Exchanges</InfoItem>
                            <InfoItem>Customer Service FAQs</InfoItem>
                        </Info>
                    </InfoWrapper>
                )
            case"shop":
                    return(
                        <InfoWrapper className="moveLeftRight">
                            <Info>
                                <InfoItem onClick={(e) => handleToggleInfo(e, '')}><ArrowBackIosIcon/>Back</InfoItem>
                                <InfoItem>Term & Conditions</InfoItem>
                                <InfoItem>Privacy Policy</InfoItem>
                                <InfoItem>Your Privacy Rights</InfoItem>
                            </Info>
                        </InfoWrapper>
                    )
            case"aboutus":
                return(
                    <InfoWrapper className="moveLeftRight">
                        <Info>
                            <InfoItem onClick={(e) => handleToggleInfo(e, '')}><ArrowBackIosIcon/>Back</InfoItem>
                            <InfoItem>About FreshVeg</InfoItem>
                            <InfoItem>Brand FAQs</InfoItem>
                        </Info>
                    </InfoWrapper>
                )
            default: 
                return <></>
        }
    }

    const DesktopFooter = () => {
        return (
            <Container className="col-2-lg">
                <Column className="large">
                    <Column >
                        <Info>
                            <Title>Here to help</Title>
                            <InfoItem>Contact us</InfoItem>
                            <InfoItem>Shipping</InfoItem>
                            <InfoItem>Returns & Exchanges</InfoItem>
                            <InfoItem>Customer Service FAQs</InfoItem>
                        </Info>
                    </Column>
                    <Column>
                        <Info>
                            <Title>Shopping with us</Title>
                            <InfoItem>Term & Conditions</InfoItem>
                            <InfoItem>Privacy Policy</InfoItem>
                            <InfoItem>Your Privacy Rights</InfoItem>
                        </Info>
                    </Column>
                    <Column>
                        <Info>
                            <Title>Get to know us</Title>
                            <InfoItem>About FreshVeg</InfoItem>
                            <InfoItem>Brand FAQs</InfoItem>
                        </Info>
                    </Column>
                </Column>
                <Column>
                    <SocialNetwork>
                        <Follow>Follow FreshVeg</Follow>
                        <SocialIcon>
                            <FacebookIcon/>
                            <InstagramIcon/>
                            <YouTubeIcon/>
                        </SocialIcon>
                    </SocialNetwork>
                </Column>
            </Container>
        )
    }

    return(
        <>
            <Header>
                <Container className="grid row col-2-sm">
                    <Column>
                        <LocalShippingIcon/>
                        <Description>Free shipping on orders over $50</Description>
                    </Column>
                    <Column>
                        <StorefrontIcon/>
                        <Description>Find FreshVeg at a store near you</Description>
                    </Column>
                    <Column>
                        <AttachMoneyIcon/>
                        <Description>Earn point with every purchase</Description>
                    </Column>
                    <Column>
                        <PaymentIcon/>
                        <Description>Payment with Credit</Description>
                    </Column>
                </Container>
            </Header>
            <Container style={{overflow: 'hidden'}}>
        
            { 
                !isDesktop ?
                    toggleInfo === '' ?
                    <InfoWrapper>
                        <Info>
                            <InfoItem onClick={(e) => handleToggleInfo(e, infoList[0])}>Here to help <ArrowForwardIosIcon/></InfoItem>
                            <InfoItem onClick={(e) => handleToggleInfo(e, infoList[1])}>Shopping with us <ArrowForwardIosIcon/></InfoItem>
                            <InfoItem onClick={(e) => handleToggleInfo(e, infoList[2])}>Get to know us <ArrowForwardIosIcon/></InfoItem>
                        </Info>
                    </InfoWrapper>
                    : handleContact(toggleInfo)
                : DesktopFooter()
            }
            {

            }
            {
                !isDesktop &&
                <SocialNetwork>
                    <Follow>Follow FreshVeg</Follow>
                    <SocialIcon>
                        <FacebookIcon/>
                        <InstagramIcon/>
                        <YouTubeIcon/>
                    </SocialIcon>
                </SocialNetwork>
            }
            
            </Container>
            <SubFooter>
                <Link href="/">
                    <a>
                        <copyright>&copy; 2022 FreshVeg</copyright>   
                    </a>
                </Link>
            </SubFooter>
        </>
    )
}

export default Footer