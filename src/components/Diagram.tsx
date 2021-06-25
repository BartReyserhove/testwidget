/*
 *  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
 */

import { Diagram, ObjectData, IncrementalData, ChangedEvent, Model, GraphLinksModel } from "gojs";
import { createElement, Component, RefObject, createRef } from "react";

/**
 * Properties passed to the Diagram component.
 */
export interface DiagramProps {
    initDiagram: () => Diagram;
    divClassName: string;
    nodeDataArray: ObjectData[];
    linkDataArray?: ObjectData[];
    modelData?: ObjectData;
    skipsDiagramUpdate: boolean;
    onModelChange?: (e: IncrementalData) => void;
}

/**
 * A Diagram component to allow a GoJS diagram to be used within a React app.
 *
 * Data arrays passed to this component will be deep cloned before usage in a GoJS model, preserving immutability.
 */
export class ReactDiagram extends Component<DiagramProps, {}> {
    /** @internal */
    private divRef: RefObject<HTMLDivElement>;
    /** @internal */
    private modelChangedListener: ((e: ChangedEvent) => void) | null = null;

    /** @internal */
    constructor(props: DiagramProps) {
        super(props);
        this.divRef = createRef();
    }

    /**
     * Returns a reference to the GoJS diagram instance for this component.
     */
    getDiagram(): Diagram | null {
        if (this.divRef.current === null) {
            return null;
        }
        return Diagram.fromDiv(this.divRef.current);
    }

    /**
     * @internal
     * Initialize the diagram and add the required listeners.
     */
    componentDidMount() {
        if (this.divRef.current === null) {
            return;
        }
        const diagram = this.props.initDiagram();

        diagram.div = this.divRef.current;

        // initialize data change listener
        this.modelChangedListener = (e: ChangedEvent) => {
            if (e.isTransactionFinished && e.model && !e.model.isReadOnly && this.props.onModelChange) {
                const dataChanges = e.model.toIncrementalData(e);
                if (dataChanges !== null) {
                    this.props.onModelChange(dataChanges);
                }
            }
        };
        diagram.addModelChangedListener(this.modelChangedListener);

        diagram.delayInitialization(() => {
            const model = diagram.model;
            model.commit((m: Model) => {
                if (this.props.modelData !== undefined) {
                    m.assignAllDataProperties(m.modelData, this.props.modelData);
                }
                m.mergeNodeDataArray(this.props.nodeDataArray);
                if (this.props.linkDataArray !== undefined && m instanceof GraphLinksModel) {
                    m.mergeLinkDataArray(this.props.linkDataArray);
                }
            }, "gojs-react init merge");
        });
    }

    /**
     * @internal
     * Disassociate the diagram from the div and remove listeners.
     */
    componentWillUnmount() {
        const diagram = this.getDiagram();
        if (diagram !== null) {
            diagram.div = null;
            if (this.modelChangedListener !== null) {
                diagram.removeModelChangedListener(this.modelChangedListener);
                this.modelChangedListener = null;
            }
        }
    }

    /**
     * @internal
     * Determines whether component needs to update by checking the skips flag and doing a shallow compare on props.
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: DiagramProps) {
        if (nextProps.skipsDiagramUpdate) {
            return false;
        }
        // quick shallow compare
        if (
            nextProps.nodeDataArray === this.props.nodeDataArray &&
            nextProps.linkDataArray === this.props.linkDataArray &&
            nextProps.modelData === this.props.modelData
        ) {
            return false;
        }
        return true;
    }

    /**
     * @internal
     * When the component updates, merge all data changes into the GoJS model to ensure everything stays in sync.
     * @param _prevProps
     * @param _prevState
     */
    componentDidUpdate() {
        const diagram = this.getDiagram();
        if (diagram !== null) {
            const model = diagram.model;
            model.startTransaction("update data");
            if (this.props.modelData !== undefined) {
                model.assignAllDataProperties(model.modelData, this.props.modelData);
            }
            model.mergeNodeDataArray(this.props.nodeDataArray);
            if (this.props.linkDataArray !== undefined && model instanceof GraphLinksModel) {
                model.mergeLinkDataArray(this.props.linkDataArray);
            }
            model.commitTransaction("update data");
        }
    }

    /** @internal */
    render() {
        return <div ref={this.divRef} className={this.props.divClassName}></div>;
    }
}
