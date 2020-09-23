import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        &:active,&:focus,&:visited{
            color:inherit;
        }
    }
    button{
        background-color:transparent;
        border:none;
        cursor: pointer;

        &:active,&:focus{
            outline:none;
            color:inherit;
        }
    }
    pre{
        white-space: pre-line;
    }
`;

export default GlobalStyles;
