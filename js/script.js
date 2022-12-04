var acc = document.getElementsByClassName("additionalFAQs");
var chatboxLogo = document.querySelector(".chatboxLogo")
var messageContainer = document.querySelector(".messageContainer")
var messageInput = document.querySelector(".messageInput")
var messageForm = document.querySelector(".messageForm")
var messageContent = document.querySelector(".messageContent")
var messageNoMessage = document.querySelector(".messageNoMessage")

//------ACCORDION------
var x;
for (x = 0; x < acc.length; x++) {
  acc[x].addEventListener("click", function() {
    this.classList.toggle("active");
    var accordion = this.nextElementSibling;
    if (accordion.style.maxHeight) {
      accordion.style.maxHeight = null;
    }
    else {
      accordion.style.maxHeight = accordion.scrollHeight + "px";
    } 
  });
}

//------CHATBOX------
chatboxLogo.addEventListener("click", function () {
  messageContainer.classList.toggle('show')
})

//------MESSAGE------
messageInput.addEventListener("input", function () {
  let line = messageInput.value.split("/n").length

  if(messageInput.rows < 6 || line < 6) {
    messageInput.rows = line
  }
  if(messageInput.rows > 1) {
    messageForm.style.alignItems = "flex-end"
  }
  else {
    messageForm.style.alignItems = "center"
  }
})

messageForm.addEventListener("submit", function (x) {
  x.preventDefault()

  if(isValid(messageInput.value)) {
    writeMessage()
    setTimeout(autoReply, 1000)
  }
})

function addZero(num) {
  return num < 10 ? '0'+num : num
}

function writeMessage() {
  const today = new Date()
  let message = `
    <div class="messageText sent">
      <span class="messageTexts">${messageInput.value.trim().replace(/\n/g, "<br>\n")}</span>
      <span class="messageTime">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
    </div>
  `
  messageContent.insertAdjacentHTML("beforeend", message)
  messageForm.style.alignItems = "center"
  messageInput.rows = 1
  messageInput.focus()
  messageInput.value = ""
  messageNoMessage.style.display = "none"
  scrollBottom()
}

function autoReply() {
  const today = new Date()
  let message = `
    <div class="messageText received">
      <span class="messageTexts">We'll get back to you in a minute!</span>
      <span class="messageTime">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
    </div>
  `
  messageContent.insertAdjacentHTML("beforeend", message)
  scrollBottom()
}

function scrollBottom() {
  messageContent.scrollTo(0, messageContent.scrollHeight)
}

function isValid(value) {
  let text = value.replace(/\n/g, "")
  text = text.replace(/\s/g, "")

  return text.length > 0
}