import { PropsWithChildren, SVGAttributes } from 'react';
import logo from "../../img/ravelogo.png"

export default function ApplicationLogo(props: any) {
    return (
        <img {...props} src={logo} alt="Logo" />
    );
}
