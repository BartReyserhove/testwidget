import { Component, ReactNode, createElement } from "react";
import { TestwidgetContainerProps } from "../typings/TestwidgetProps";
import { BadgeSample } from "./components/BadgeSample";
import "./ui/Testwidget.css";
import { ObjectData } from "gojs";

export default class Testwidget extends Component<TestwidgetContainerProps> {
    nodeDataArray: ObjectData[];
    linkDataArray: ObjectData[];
    modelData: ObjectData;
    selectedData: ObjectData | null;
    skipsDiagramUpdate: boolean;

    constructor(props: TestwidgetContainerProps) {
        super(props);

        this.nodeDataArray = [
            { key: 0, text: "Alpha", color: "lightblue", loc: "0 0" },
            { key: 1, text: "Beta", color: "orange", loc: "150 0" },
            { key: 2, text: "Gamma", color: "lightgreen", loc: "0 150" },
            { key: 3, text: "Delta", color: "pink", loc: "150 150" }
        ];

        this.linkDataArray = [
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
        ];

        this.modelData = { canRelink: true };
        this.selectedData = null;
        this.skipsDiagramUpdate = false;
    }

    render(): ReactNode {
        return (
            <div>
                Trying to render something
                <BadgeSample
                    nodeDataArray={this.nodeDataArray}
                    linkDataArray={this.linkDataArray}
                    modelData={this.modelData}
                    skipsDiagramUpdate={this.skipsDiagramUpdate}
                />
            </div>
        );
    }
}
