/**
 * This file was generated from Testwidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type BootstrapStyleEnum = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";

export type TestwidgetTypeEnum = "badge" | "label";

export interface TestwidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueAttribute?: EditableValue<string | Big>;
    testwidgetValue: string;
    bootstrapStyle: BootstrapStyleEnum;
    testwidgetType: TestwidgetTypeEnum;
    onClickAction?: ActionValue;
}

export interface TestwidgetPreviewProps {
    class: string;
    style: string;
    valueAttribute: string;
    testwidgetValue: string;
    bootstrapStyle: BootstrapStyleEnum;
    testwidgetType: TestwidgetTypeEnum;
    onClickAction: {} | null;
}
