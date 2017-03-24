/* ---- Events Declaration ---- */

// Feature 4
$("#dialog").on('click', 'button', deleteMessage);

// Feature 3
$("#send-btn").click(addNewMessage);

// Feature 2
$("#align-btns").find("button").click(changeAlignment);

// Feature 1
$("a.list-group-item").click(switchListItem);

/* ---- Functions Declaration ---- */

function deleteMessage(event) {
  $(this).closest("div.col-md-8").remove();
}

function addNewMessage(event) {
  var $message = $("#message");
  var msgValue = $message.val();
  if (msgValue === "") {
    $message.parent().addClass("has-error");
  } else {
    var alignment = getAlignment($message);
    var template = $("#new-sent-message").text();
    var $msgTemplate = $(template);
    $("span.msg-content", $msgTemplate).text(msgValue);
    $("small.text-info", $msgTemplate).text(getCurrentTime());
    console.log(alignment);
    $msgTemplate.addClass(alignment);
    $("#dialog").children("div.row").append($msgTemplate);
    $message.val("");
  }
  event.preventDefault();
}

function getCurrentTime() {
  var date = new Date(Date.now());
  return date.getHours() + ":" + date.getMinutes();
}

function getAlignment($ele) {
  if ($ele.hasClass("text-right")) {
    return "text-right";
  } else if ($ele.hasClass("text-center")) {
    return "text-center";
  } else {
    return null;
  }
}

function changeAlignment(event) {
  $("button.active", $("#align-btns")).removeClass("active");
  $(this).addClass("active").blur();
  var span = $("span.glyphicon", this);
  if (span.hasClass("glyphicon-align-center")) {
    $("#message").removeClass("text-right").addClass("text-center");
  } else if (span.hasClass("glyphicon-align-right")) {
    $("#message").removeClass("text-center").addClass("text-right");
  } else {
    $("#message").removeClass("text-right text-center");
  }
  event.preventDefault();
}

function switchListItem(event) {
  $("a.list-group-item.active").removeClass("active");
  $(this).addClass("active");
  $("span.badge", this).text("");
}