# Comem+ MAS-RAD DFA Angular Exercise

This repository contains a starter project for an Angular exercise in the MAS-RAD DFA course.

## Exercise

The following step describes what you need to do to have a functional chat panel (on the right of the interface) with which you can add and remove messages.
The rest of the interface will be implemented in future exercises.

### Basic module and controller

* Create an Angular module named `DiaLog` and add an `ng-app` attribute on the body to use it
* Create an Angular controller named `ChatPanelController`:
  * The controller should be a named controller (it should store `this` in a variable, e.g. `var chatPanelCtrl = this;`)
  * You should attach the controller to the `<div class="panel ...">` tag by adding the attribute `ng-controller="ChatPanelController as chatPanelCtrl"`
* Add a `chatPanelCtrl.user` variable to your controller containing the name of the person with whom you are chatting, e.g. `Ken Bogard`
* Use Angular's double braces to insert this variable into the `<strong><!-- TODO: insert user name here --></strong>` tag in the view

### Get and display the list of messages

* Add the [`DataService`](#data-service) service to your script file (find code below)
* Inject `DataService` into the controller
* Add a call to retrieve the messages and attach them to the controller:

  ```js
  DataService.getMessages().then(function(messages) {
    chatPanelCtrl.messages = messages;
  });
  ```
* Add an `ng-repeat` attribute to the `<div class="col-md-8">` tag to repeat it for each message in the `chatPanelCtrl.messages` variable we just created
* Insert the message's text into the template
* Insert the message's time into the template, use the `date` filter to display a human-friendly version (e.g. with the format string `dd.MM.yyyy HH:mm`)
* On the same tag as the `ng-repeat`, add an `ng-class` attribute to conditionally apply the `col-md-offset-4` class for your messages (when `message.mine` is true)
* On the `<div class="alert ...">` tag, remove the hardcoded `alert-success` class and add an `ng-class` attribute to conditionally apply the `alert-warning` and `alert-success` classes for messages based on whether they are yours (you can use `message.mine` or `!message.mine` as conditions)

### Adding messages

* Add an `ng-model` attribute to the `<textarea ...>` tag to attach its value to the controller
* Add an `chatPanelCtrl.addMessage` function to your controller:
  * It should push a new message object into `chatPanelCtrl.messages`
  * It should also set the `ng-model` variable to an empty string (to clear the form after submitting a new message)
* Add an `ng-submit` attribute to the `<form>` tag to trigger your `chatPanelCtrl.addMessage` function when the form is submitted

### Removing messages

* Add a `chatPanelCtrl.removeMessage` function to your controller:
  * It should take the message object to remove as an argument
  * It should remove that message from `chatPanelCtrl.messages`
  * Add an `ng-click` attribute to the `<button ...>` tag with the trash icon to call your `chatPanelCtrl.removeMessage` function with the current message

**Tip:** how to remove an element from an array in JavaScript

```js
var array = [ 'a', 'b', 'c' ];

function removeFromArray(element) {
  var indexOfElement = array.indexOf(element);
  array.splice(indexOfElement, 1);
}

removeFromArray('b');
console.log(array); // [ 'a', 'c' ]
```

### Validating the message form

* Add a name to the `<form>` and `<textarea>`
* Add a `required` attribute to the `<textarea>` to mark this field as required
* Add an `ng-disabled` attribute to the last `<button>` in the form to disable it if the form is invalid

## Data service

```js
angular.module('DiaLog').factory('DataService', function($q) {

  var service = {};

  service.getMessages = function() {
    return $q.when([
      {
        text: 'Hi there!',
        time: moment().hour(12).minute(40).toDate()
      },
      {
        text: 'Hey, hello you!\nWhat\'s up?',
        time: moment().hour(12).minute(50).toDate(),
        mine: true
      },
      {
        text: 'Same old, same old.\nWanna come\'n play some SFV?!',
        time: moment().hour(13).minute(16).toDate()
      }
    ]);
  };

  return service;
});
```
