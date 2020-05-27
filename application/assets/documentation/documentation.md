### Some extra info about the project

#### Cool fact!
The about page you are viewing is written in markdown! (documentation.md in the root directory). It is rendered into HTML
by making a call to our PHP endpoints and with some helper functions in the HTML side of things using the same
MVP pattern as the rest of the application!

#### Housekeeping Links
You can find the source code for the project at my [GitHub by clicking here!](https://github.com/HarryPi/VirtualGunMuseum)

You can view all the X3D files [here (GitHub)](https://github.com/HarryPi/VirtualGunMuseum/tree/master/application/assets/x3dom/models)

You can find all the models archived in a zip [here (Yes GitHub again)](https://github.com/HarryPi/VirtualGunMuseum/blob/master/arhives.zip)

#### Application flow ( sequence diagram )
Before diving into the explenation of how this site was made lets look at a simple sequence diagram of what happens when 
our page is initially loaded to get a good feel of how things work. ( A pictire is 1000 words! )
![sequence diagram image of the onload operation of our page](__REPLACE_ME_WITH_SEQ_DIAGRAM__)
### View (TypeScript)
Note that all View related code is written in TypeScript a superset of JavaScript.
The TypeScript Code compiles ( builds ) in pure JavaScript via the webpack framework configured at
```webpack.config.js``` All of the following code described rests under ```VirtualGunMuseum/src```
* BootstrapHelpers
    * Column.model.ts <br/>
     A class that is used by the HTML creator class for bootstrap column rendering
     * Constants <br />
     Holds bootstrap constants
* HTML
    * HTMLCreator.ts <br />
    This class abstracts some simple and complex HTML creation functionality in order to avoid re-writing html
    code more than once.
    Additionally, this class allows for events to be attached to the created elements that support them.
    Such as buttons, dropdowns etc. This is done via deferred execution. As an example:
    ```
     prepareButtonDropdown(dropdown: DropdownModel, asList: boolean = false)
    ```
    This function takes a ```DropdownModel``` which in turn takes a list of ```ButtonModel[]```, a ```ButtonModel``` 
    is composed of ```ButtonModel.buttonName: string``` and ```ButtonModel.buttonAction: () => void``` as we can see this
    allows for the consumer to pass a function to be attached to the button. This cant happen when the HTML code for the
    button or dropdown is created as the HTML doesn't exist yet rather is "pending" creation. Thus we store the functions
    in ```private operations = [];```. Then when the html element is created simply we execute the functions in the array.
    ```this.operations.forEach((op) => op());```. All this is abstracted from the consumer, providing an easy to use chain
    function class to quickly create powerfull HTML components.
    <br /> Example quickly create a boostrap hero card aka: Jumbotron in a boostrap column nested in a boostrap column:
    ```
          htmlCreator
              .asNewElement()
              .createBootstrapRow()
              .createBootstrapColumn([
                  {colBreakpoint: "xs", colSize: 12}
              ])
              .preparedJumbotron()
              .injectAtColumn(null, 0)
              .injectCreatedContentAndClear($('#mainContent'));
  ```
    * X3DomRender.ts<br />
    Holds some x3d functionality like ```x3dom.reload()``` to allow for the inline x3dom elements that are attached dynamically
    to be rendered. All classes that have to render some HTML use this class.
* ItemViews
    * ItemCreator.ts <br />
    Using the ```HTMLcreator``` class and ```UrlLoader``` class, this class handles the displaying of a gun 3d model.
    * ShowcaseCreator.ts <br />
    Similar as above but for the showcase model.
* Models<br />
 Not to be confused with models in MVC. this folder holds the data transfer objects (DTO) that are converted from
 the JSON that was received from the API and some HTML representation models such as ```Button```.
    * gun.model.ts
    * button.model.ts
    * dropdown.model.ts
    <br /> All of them are simple POJO (plain old javascript objects) used for typings for TypeScript that is used.
* Loader <br />
    * Loader.ts <br />
    Creates and returns simple loader placeholders that use pure CSS, such as the android spinner or facebook classic defined in
    the same folder as enums:
    ```
    export enum LoaderKind {
           GRID = 'lds-grid',
           FACEBOOK_STYLE = 'lds-facebook',
           ANDROID_LIKE = 'lds-default'
       }
    ```
  * UrlLoader <br />
  Even further abstracts the ajax call from the consumer. This class takes a url and actions to be taken while loading,
  in case of failure success and so on. Uses the Jquery ```$.ajax()``` under the hood as an example.
  ```
          const gunModel: GunModel = await new UrlLoader()
                .urlToCall(`http://users.sussex.ac.uk/~cp464/VirtualGunMuseum/index.php/home/guns/${gunId}`)
                .blockUIOnCall(true) // We block the UI when a request is send the default is block but shown here for demo purposes
                .actionOnsuccess(HttpResponseAction.SILENCE_AFTER_ACTION)
                .actionOnFailure(HttpResponseAction.SHOW_USER_MESSAGE)
                .callUrlAndParseAsJson<GunModel>();
  ```
  Also since all API calls are done via this class, this allows to intercept them and present a backdrop with a spinner,
  thus preventing the user from clicking random buttons while a request is being processed and let the user know that
  something is happening
* Index.ts <br />
Here we simply bind into the jquery on load function, so that we can fire the initial api calls to populate the index.php
document that we receive with dynamic html such as the photo-realistic gallery, the navbar etc.
* PhotoGallery.ts <br />
Uses the ```HTMLCreator``` class to create the weapons gallery seen at home and binds the click img events.
When a user clicks on the gun image shown in the gallery it triggers an event that removes the image from the 
original position and instead presents it in a large bootstrap modal thus giving the feeling that the user has
zoomed in the weapon. 
    
### Controller and model (PHP)
#### Controller
* mvc.php <br />
In this file the PHP framework called Klein is used. It is a very simple routing framework that allows for easier configuration
when it comes to REST api endpoints and php in general.
As an example the endpoint to get all guns: 
```
$klein->respond('GET', $basePath . '/home/guns', function (Request $request, Response $response, $service) {
    try {
        $controller = new HomeController();
        $response->json($controller->apiGetAllGuns());
    } catch (\Exception $e) {
        $response->code(400);
        $response->body($e->getMessage());
    }
});
```
As it can be seen all responses are returned as JSON so that the view can parse them into the correct DTO.
* assets <br />
Under this folder rest all the x3d files and images
* css <br />
All the CSS related files such as bootstrap etc.
#### Model
* db <br />
Under this folder exists the database
* model <br />
    * DAO <br />
        * PDOModel.ts
        <br /> An abstract class that allows for any calss that extends it common PDO functionality such as:
        ```
      getAll();
      get();
      insert();
      ```
      This even further abstracts the data access layer and allows any class that extend it to simply focus
      on model specific functionality i.e ```getByGunName()``` for the gun model .Please note this function does not exist
      as its quicker to get by id, however a ```GunModel.php``` that extends this class exists.
      It also abstracts the concept of connecting to the database by having a constructor that takes a ```$table```. Then
      it connects to the Database and exposes it via a protected property that all subclasses can access. <br />
      ```
       protected $pdoModel;
       public function __construct($table)
      ```
    * GunModel.php <br />
    Extends the ```PDOModel``` class and implements gun specific functionality
    * AboutModel.php
    Extends the ```PDOModel``` class and implements functionality for the about page

* view <br />
    Only used when the user first reaches the page and if the user navigates to a 404.
    * home.php <br />
    The intial index page that is rendered when the user hits the page. Note that this page is extended dynamically upon
    on load, that is most of the HTML is added afterwards dynamically rather than served statically.
  
