import 'types-wm';
import { FC, useEffect, useState } from 'react';
import styled from  '@emotion/styled';

const Clicker = styled.span`
    cursor: pointer;
    margin: 0;
    font-size: 1rem;
    overflow: hidden;
`;

declare var party: any;

const appendPartyScript = () => {
    if (typeof party !== 'undefined') {
        return;
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '/party.min.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
}

export const MonetizationParty: FC = () => {
    const [isUsingMonetization, setIsUsingMonetization] = useState(false);
    const [msg, setMsg] = useState('👋 Click me!');
    const onClick = () => {
        setMsg('🥳💰 Thanks for supporting me!');
        if (party && party.screen) {
            party.screen();
        } 
    };
    const enableParty = () => {
        appendPartyScript();
        setIsUsingMonetization(true);
    }

    useEffect(() => {
        if (!document.monetization) {
            return
        }
        if (document.monetization.state === 'started') {
            enableParty()
        } else {
            document.monetization.addEventListener('monetizationstart', enableParty);

            return () => {
                document.monetization.removeEventListener('monetizationstart', enableParty);
            }
        }
    }, []);

    return isUsingMonetization ? <Clicker onClick={onClick}>{msg}</Clicker> : null;
};
