from flask import Flask, render_template, session
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)

boggle_game = Boggle()

app.config['SECRET_KEY'] = 'secret'
app.config['TB_DEBUG_INTERPECT_REDIRECTS'] = False

@app.route('/', methods=['GET','POST'])
def show_game():
    board = boggle_game.make_board()
    session['board'] = board

    return render_template('boggle.html',board=board)
