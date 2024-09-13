import { PropsWithChildren, SVGAttributes } from 'react';
import logo from "../../img/placeholderLogo.png"

export default function ApplicationLogo(props: any) {
    return (
        <img {...props} src={logo} alt="Logo" />
    );
}
