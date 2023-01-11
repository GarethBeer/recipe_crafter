import style from 'styled-components';

interface Props {
    height?: string;
    width?: string;
}
export const Card = style.div<Props>`
border-radius:25px;
padding:1rem;
background-color:white;
min-width:${(props:Props) => props.width ? props.width : '100%'};
width:${(props:Props) => props.width ? props.width : '100%'};
height: ${(props:Props) => props.height ? props.height : 'fit-content'}
`