from flask import Flask

from router.api import api


app = Flask(__name__)

app.register_blueprint(api)