let $form = $('form')
let $response = $('#response')
let $showScore = $('#showScore')
let score = 0
let $showTimer = $('#showTimer')
let seconds = 30;
let timesPlayed = 0


function timer() {
    setInterval(() => {
        if (seconds > 0) {
            seconds--
            $showTimer.text(`Time Remaining: ${seconds}`)
        }
        else {
            clearInterval()
            $showTimer.remove()
            $form.remove()
            getHighScore()
            timesPlayed += 1
        }
    }, 1000)
}

$form.submit(async function (evt) {
    evt.preventDefault()
    $guess = $('#guess').val()
    let res = await axios.get('/check-word', { params: { 'guess': $guess } })
    let response = res.data.result
    checkWord(response)
})


function checkWord(res) {
    if (res === 'ok') {
        $response.text('ok')
        score += $guess.length
        $showScore.text(`Score: ${score}`)
        if (score > highScore) {
            highScore = score
        }
    }
    if (res === 'not-on-board') {
        $response.text('not-on-board')
        if (score > highScore) {
            highScore = score
        }
    }
    if (res === 'not-word') {
        $response.text('not-word')
        if (score > highScore) {
            highScore = score
        }
    }
}

async function getScore() {
    await axios.post('/check-stats', {
        params: {
            'score': score
        }
    })
}

timer()