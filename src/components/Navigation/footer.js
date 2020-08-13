import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import logo from '../../images/logodreamcatcher.jpg'

const FooterContainer = styled.div`
grid-template-rows: 1;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
justify-items: center;
grid-column-gap: 2em;
/*background-color: rgb(182, 110, 186, 0.1);*/
padding: 2em;
`

const FooterItem = styled.div`
align-self: stretch;
`
const FooterLink = styled.a`
    &:hover {
     color: #e768b5;
     cursor: pointer;
    }
`

const Footer = () => {
    return (
        <div>
            <hr />
            <FooterContainer>
                <FooterItem>
                    Address Address, Gothenburg <br />
                    Phone +46111111111
                </FooterItem>
                <FooterItem>
                    Powered by Gatsby.js
                </FooterItem>
                <FooterItem>
                    <FooterLink>Privacy</FooterLink> <br />
                    <FooterLink>Contact us</FooterLink><br />

                </FooterItem>

            </FooterContainer>
        </div>
    )
}

export default Footer;