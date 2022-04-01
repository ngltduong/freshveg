import { css } from 'styled-components'

export const tablet = (props) => {
    return css`
    @media only screen and (min-width: 767px){
        ${props}
    }
    `
}

export const desktop = (props) => {
    return css`
    @media only screen and (min-width: 1023px){
        ${props}
    }
    `
}

export const largeScreen = (props) => {
    return css`
    @media only screen and (min-width: 1339px){
        ${props}
    }
    `
}
 