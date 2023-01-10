import styled, { css } from 'styled-components';

interface Props {
    backgroundColor: string;
    border?: string;

}

const Button = styled.button<Props>`
border-radius: 20px;
background-color:${(props:Props) => props.backgroundColor};
color:white;
padding:1rem 3rem;
border:${(props:Props) => props.border ? props.border : 'none'};
width:80%;
margin:auto;
display:flex;
justify-content:space-between;
align-items:center;
&:hover {
    cursor:pointer;
}
`


export default Button