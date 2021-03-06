import { FunctionComponent, createElement } from "react";
import classNames from "classnames";

export interface AlertProps {
    message?: string;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";
}

export const Alert: FunctionComponent<AlertProps> = props =>
    props.message ? (
        <div className={classNames(`alert alert-${props.bootstrapStyle}`, props.className)}>{props.message}</div>
    ) : null;

Alert.displayName = "Alert";
