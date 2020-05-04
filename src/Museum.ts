import {ShowcaseCameras} from "./ShowcaseCameras";
import $ from 'jquery';

export class Museum {
    private currentView: string;

    constructor(forView: 'index') {
        this.currentView = forView;
    }

    /**
     * Sets the camera position on the x3dom element
     * @param camera Camera must match the id for the camera in the x3dom namespace and must
     * exist in {@link ShowcaseCameras}
     */
    setCamera = (camera: ShowcaseCameras) => {
        console.log($('#Showcase'))
    }
}