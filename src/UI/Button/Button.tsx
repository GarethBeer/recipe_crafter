import styled from 'styled-components';

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
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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