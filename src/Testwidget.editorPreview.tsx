import { Component } from "react";

import { TestwidgetPreviewProps } from "../typings/TestwidgetProps";

declare function require(name: string): string;

export class preview extends Component<TestwidgetPreviewProps> {
    /*  render(): ReactNode {
        return (
            <div ref={this.parentInline}>
                <BadgeSample {...this.transformProps(this.props)}></BadgeSample>
            </div>
        );
    }

    private parentInline(node?: HTMLElement | null): void {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: TestwidgetPreviewProps): BadgeSampleProps {
        return {
            type: props.testwidgetType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: parseInlineStyle(props.style),
            defaultValue: props.testwidgetValue ? props.testwidgetValue : "",
            value: props.valueAttribute
        };
    } */
}

export function getPreviewCss(): string {
    return require("./ui/Testwidget.css");
}
