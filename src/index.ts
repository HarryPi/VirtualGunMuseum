import {Museum} from "./Museum";
import {ShowcaseCameras} from "./ShowcaseCameras";
import $ from 'jquery';

declare var x3dom: any;

$(bindFunctions);


function bindFunctions() {
    fetch('http://localhost/home/getAllGuns')
        .then(response => response.text())
        .then(data => {
          //  $('#mainContent').empty().html(data);
        });

    const museum: Museum = new Museum('index');

    $('#toggler').on('click', () => {
        museum.setCamera(ShowcaseCameras.CLOSEUP);
    });
}
