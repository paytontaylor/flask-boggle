let $form = $('form')
let $response = $('#response')
let $showScore = $('#showScore')
let score = 0
let $showTimer = $('#showTimer')
let seconds = 60;

setInterval(() => {
    if (seconds > 0) {
        seconds--
        $showTimer.text(`Time Remaining: ${seconds}`)
    }
    else {
        clearInterval()
        $showTimer.remove()
        $form.remove()
    }
}, 1000)

$form.submit(async function (evt) {
    evt.preventDefault()
    $guess = $('#guess').val()
    let res = await axios.get('/check-word', { params: { 'guess': $guess } })
    let response = res.data.result
    if (response === 'ok') {
        $response.text('ok')
        score += $guess.length
        $showScore.text(`Score: ${score}`)
    }
    if (response === 'not-on-board') {
        $response.text('not-on-board')
    }
    if (response === 'not-word') {
        $response.text('not-word')
    }
})