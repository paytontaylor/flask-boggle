let $form = $('form')
let $response = $('#response')
let $showScore = $('#showScore')
let score = 0
let $showTimer = $('#showTimer')
let seconds = 10;
let timesPlayed = 0
let highScore = 0


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
            checkHighScore()
            // getStats()
        }
    }, 1000)
}

$form.submit(async function (evt) {
    evt.preventDefault()
    $guess = $('#guess').val()
    let res = await axios.get('/check-word', { params: { 'guess': $guess } })
    let response = res.data.result
    checkWord(response)
    let data = await axios.post('/check-word', { 'high-score': highScore, 'times-played': timesPlayed })
})


function checkHighScore() {
    if (score > highScore) {
        highScore = score
    }
}
function checkWord(res) {
    if (res === 'ok') {
        $response.text('ok')
        score += $guess.length
        $showScore.text(`Score: ${score}`)
        timesPlayed += 1
    }
    if (res === 'not-on-board') {
        $response.text('not-on-board')
        timesPlayed += 1
    }
    if (res === 'not-word') {
        $response.text('not-word')
        timesPlayed += 1
    }
}

timer()