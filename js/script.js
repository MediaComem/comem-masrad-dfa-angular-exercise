angular.module('DiaLog', []);

/**
 * Controller for the chat panel on the right:
 *
 * * Display the chat username
 * * Display the list of messages
 * * Allow adding/removing messages
 */
angular.module('DiaLog').controller('ChatPanelController', function(DataService) {
  var chatPanelCtrl = this;

  // The name of the person the user is chatting with
  chatPanelCtrl.user = 'Ken Bogard';

  // "Download" messages when the app starts
  DataService.getMessages().then(function(messages) {
    chatPanelCtrl.messages = messages;
  });

  // Function that adds a new message belonging to the user
  // at the end of `chatPanelCtrl.messages`
  //
  // The text is taken from the `chatPanelCtrl.text`,
  // which is cleared afterwards
  chatPanelCtrl.addMessage = function() {
    chatPanelCtrl.messages.push({
      text: chatPanelCtrl.text,
      mine: true,
      time: new Date()
    });

    chatPanelCtrl.text = '';
  };

  // Function that removes a specific message from `chatPanelCtrl.messages`
  chatPanelCtrl.removeMessage = function(message) {
    var messageIndex = chatPanelCtrl.messages.indexOf(message);
    chatPanelCtrl.messages.splice(messageIndex, 1);
  };
});

/**
 * Service that returns chat messages asynchronously
 *
 *     DataService.getMessages().then(function(messages) {
 *       // ...
 *     });
 */
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
