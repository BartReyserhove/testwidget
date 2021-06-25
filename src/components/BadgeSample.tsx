import { Component, ReactNode, createElement } from "react";
import { ReactDiagram } from "./Diagram";
import {
    GraphObject,
    ForceDirectedLayout,
    ObjectData,
    Diagram,
    TextBlock,
    Binding,
    Shape,
    Link,
    Node,
    GraphLinksModel,
    Model,
    Point
} from "gojs";

export interface BadgeSampleProps {
    nodeDataArray: ObjectData[];
    linkDataArray: ObjectData[];
    modelData: ObjectData;
    skipsDiagramUpdate: boolean;
}

export type BootstrapStyle = "default" | "info" | "inverse" | "primary" | "danger" | "success" | "warning";

export class BadgeSample extends Component<BadgeSampleProps> {
    private initDiagram(): Diagram {
        const $ = GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram = $(Diagram, {
            "undoManager.isEnabled": true, // must be set to allow for model change listening
            // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
            "clickCreatingTool.archetypeNodeData": { text: "new node", color: "lightblue" },
            layout: $(ForceDirectedLayout),
            model: $(GraphLinksModel, {
                linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                // positive keys for nodes
                makeUniqueKeyFunction: (m: Model, data: any) => {
                    let k = data.key || 1;
                    while (m.findNodeDataForKey(k)) {
                        k++;
                    }
                    data.key = k;
                    return k;
                },
                // negative keys for links
                makeUniqueLinkKeyFunction: (m: GraphLinksModel, data: any) => {
                    let k = data.key || -1;
                    while (m.findLinkDataForKey(k)) {
                        k--;
                    }
                    data.key = k;
                    return k;
                }
            })
        });
        // define a simple Node template
        diagram.nodeTemplate = $(
            Node,
            "Auto", // the Shape will go around the TextBlock
            new Binding("location", "loc", Point.parse).makeTwoWay(Point.stringify),
            $(
                Shape,
                "RoundedRectangle",
                {
                    name: "SHAPE",
                    fill: "white",
                    strokeWidth: 0,
                    // set the port properties:
                    portId: "",
                    fromLinkable: true,
                    toLinkable: true,
                    cursor: "pointer"
                },
                // Shape.fill is bound to Node.data.color
                new Binding("fill", "color")
            ),
            $(
                TextBlock,
                { margin: 8, editable: true, font: "400 .875rem Roboto, sans-serif" }, // some room around the text
                new Binding("text").makeTwoWay()
            )
        );

        // relinking depends on modelData
        diagram.linkTemplate = $(
            Link,
            new Binding("relinkableFrom", "canRelink").ofModel(),
            new Binding("relinkableTo", "canRelink").ofModel(),
            $(Shape),
            $(Shape, { toArrow: "Standard" })
        );

        return diagram;
    }

    render(): ReactNode {
        return (
            <ReactDiagram
                divClassName="diagram-component"
                initDiagram={this.initDiagram}
                nodeDataArray={this.props.nodeDataArray}
                linkDataArray={this.props.linkDataArray}
                modelData={this.props.modelData}
                skipsDiagramUpdate={this.props.skipsDiagramUpdate}
            />
        );
    }
}
