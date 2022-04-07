import styled from "styled-components"
import { keyframes } from "styled-components"
import {tablet, desktop, largeScreen} from "../utils/responsive"

export const Container = styled.div`
    /* margin-left: 28px;
    margin-right: 28px; */
    /* padding-left: 28px;
    padding-right: 28px; */
    width: 100%;
    margin: 0 auto;
    position:   relative;
    &.flex{
        display: flex;
    }
    &.pl-14.pr-14{
        padding-left: 14px;
        padding-right: 14px;
    }
    &.grid{
        display: grid;
        grid-gap: 28px 20px;
        padding-bottom: 12px;
    }
    &.row{
        grid-template-rows: 1fr 1fr;
        ${(tablet({
            gridTemplateRows: "1fr"
        }))}

    }
    &.col-full-width{
        grid-template-columns: 1fr;
        ${(tablet({
            gridTemplateColumns: "1fr 1fr"
        }))}
    }
    & .col-4-sm{
        grid-template-columns: repeat(10,274px);
    }
    & .grid{
        display: grid;
        grid-gap: 24px 30px;
        padding-bottom: 12px;
    }
    &.col-2-sm{
        grid-template-columns: 1fr 1fr;
        ${(desktop({
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            paddingLeft: "62px",
            paddingRight: "62px"
        }))}
    }
    &.flex.center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    &.col-2-lg{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        padding-left: 0px;
        padding-right: 0px;
        margin-top: 68px;
    }

    &.navPopup{
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 0 28px;
    }

    ${(largeScreen({width: "1248px"}))}
`

export const Wrapper = styled.div`
    padding-top: 100px;
    padding-bottom: 80px;

`

export const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

export const Center = styled.div`
  flex: 3;
  text-align: center;
  display: flex;
  align-items: center;
`;

export const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

`;

export const appearObj = keyframes`
from{
    transform: translate(-100% ,0);
    opacity: 0;
}
to{
    transform: translate(-50%, 0);
    opacity: 1;
}
`

export const rightToLeftObj = keyframes`
from{
    transform: translate(100% ,0);
    opacity: 0;
}
to{
    transform: translate(0, 0);
    opacity: 1;
}
`

export const growth = keyframes`
from{
    opacity: 0;
    transform: scale(0);
}
to{
    opacity: 1;
    transform: scale(1);
}
`


export const BtnLink = styled.a`
    max-width: 180px;
    width: 100%;
    height: 42px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 4px;
    text-align: center;
    display: flex;
    color: ${props => props.color ? props.color : '#357a38'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};
    border: 1px solid #357a38;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.color ? props.color : '1.2rem'};
    margin-left: 12px;
    cursor: pointer;
    transition: all linear 0.2s;

    &:hover{
        background-color: #357a38;
        color: #fff;
        opacity: ${props => props.opacity ? props.opacity : 1};
    }
`
