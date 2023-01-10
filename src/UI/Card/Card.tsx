import style from 'styled-components';

interface Props {
    height?: string
}
export const Card = style.div<Props>`
border-radius:10px;
padding:1rem;
background-color:white;
width:100%;
height: ${(props:Props) => props.height ? props.height : 'fit-content'}
`