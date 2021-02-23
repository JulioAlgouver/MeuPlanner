import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background: linear-gradient(389.89deg, #DCDCDC 0%, white 100%);
    }

    body, input, button, textarea{
        font-family: 'Nunito', sans-serif;
        outline: none;
    }

    input, textarea, select{
        padding-left: 8px;
        outline: none;
    }

    button{
        cursor:pointer;
    }
`;