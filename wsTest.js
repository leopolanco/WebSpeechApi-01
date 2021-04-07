window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('button')
  const result = document.getElementById('result')
  let listening = true
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  if (typeof SpeechRecognition !== 'undefined') {
    const recognition = new SpeechRecognition()
     
    const stop = () => {
      recognition.stop()
      button.textContent = 'Add captioning'
      recognition.removeEventListener('end', recognition.start)
    }
    const start = () => {
      recognition.start()
      button.textContent = 'Stop captioning'
      //after 60s webspeech stops, this prevents that
      recognition.addEventListener('end', recognition.start)
    }
    const onResult = event => {
      result.innerHTML = ''
      for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript)
        result.appendChild(text)
      }
    }

    recognition.interimResults = true
    recognition.addEventListener('result', onResult)
    button.addEventListener('click', event => {
      listening ? stop() : start() 
      listening = !listening
    })
    //start on load
    start()
  } else {
    button.remove()
  }
})
