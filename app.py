from flask import Flask, render_template, session, request, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)

boggle_game = Boggle()

app.config['SECRET_KEY'] = 'secret'
app.config['TB_DEBUG_INTERCEPT_REDIRECTS'] = False

@app.route('/', methods=['GET'])
def show_game():
    board = boggle_game.make_board()
    session['board'] = board

    return render_template('boggle.html',board=board)

@app.route('/check-word', methods=['GET'])
def check_word():
    board = session['board']
    word = request.form['guess']
    res = boggle_game.check_valid_word(board,word)
    return jsonify(result=res)

@app.route('/check-stats', methods=['POST'])
def check_stats():
 hs = request.json()['high-score']
 return hs

