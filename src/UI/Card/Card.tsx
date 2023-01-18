import style from 'styled-components';

interface Props {
    height?: string;
    width?: string;
    backgroundColor?:string;
}
export const Card = style.div<Props>`
border-radius:25px;
padding:1rem;
background-color:white;
background-image:${(props:Props) => props.backgroundColor ? props.backgroundColor : 'white'};
min-width:${(props:Props) => props.width ? props.width : '100%'};
width:${(props:Props) => props.width ? props.width : '100%'};
height: ${(props: Props) => props.height ? props.height : 'fit-content'};
max-height: ${(props: Props) => props.height ? props.height : 'fit-content'};
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`