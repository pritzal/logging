from flask import Flask, jsonify
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure logging with different error levels
logging.basicConfig(
    filename='error_logs.log',
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_and_respond(error_type, error_message, status_code):
    """Utility function to log errors and create a JSON response."""
    logging.error(f"Error Type: {error_type}, Message: {error_message}")
    return jsonify({"error": f"Error Type: {error_type}, Message: {error_message}"}), status_code

@app.route('/logs', methods=['GET'])
def get_logs():
    """Endpoint to get logs from the error_logs.log file."""
    try:
        with open('error_logs.log', 'r') as file:
            logs = file.readlines()
        # Remove ANSI escape codes from logs (if any)
        logs = [line.replace('\x1b[0m', '').replace('\x1b[31m', '').replace('\x1b[33m', '') for line in logs]
        return jsonify({"logs": logs})
    except Exception as e:
        return log_and_respond("Exception", "Error retrieving logs", 500)

@app.route('/divide_by_zero')
def divide_by_zero():
    """Endpoint to trigger a divide by zero error."""
    try:
        result = 1 / 0
    except ZeroDivisionError as e:
        return log_and_respond(type(e).__name__, "Attempted to divide by zero, which is not allowed.", 500)

@app.route('/undefined_variable')
def undefined_variable():
    """Endpoint to trigger an undefined variable error."""
    try:
        result = undefined_variable
    except NameError as e:
        return log_and_respond(type(e).__name__, "Tried to use a variable that hasn't been defined.", 500)

@app.route('/type_error')
def type_error():
    """Endpoint to trigger a type error."""
    try:
        result = "5" + 5
    except TypeError as e:
        return log_and_respond(type(e).__name__, "Attempted to add a string and an integer, which is not supported.", 500)

@app.route('/index_error')
def index_error():
    """Endpoint to trigger an index error."""
    try:
        my_list = [1, 2, 3]
        result = my_list[10]
    except IndexError as e:
        return log_and_respond(type(e).__name__, "Attempted to access a list index that doesn't exist.", 500)

@app.route('/file_not_found')
def file_not_found():
    """Endpoint to trigger a file not found error."""
    try:
        with open('nonexistent_file.txt') as f:
            content = f.read()
    except FileNotFoundError as e:
        return log_and_respond(type(e).__name__, "Attempted to open a file that doesn't exist.", 500)

@app.route('/value_error')
def value_error():
    """Endpoint to trigger a value error."""
    try:
        result = int("abc")
    except ValueError as e:
        return log_and_respond(type(e).__name__, "Attempted to convert a non-numeric string to an integer.", 500)

@app.route('/assertion_error')
def assertion_error():
    """Endpoint to trigger an assertion error."""
    try:
        assert False, "Assertion failed"
    except AssertionError as e:
        return log_and_respond(type(e).__name__, "An assertion failed in the code.", 500)

@app.route('/key_error')
def key_error():
    """Endpoint to trigger a key error."""
    try:
        my_dict = {'key': 'value'}
        result = my_dict['nonexistent_key']
    except KeyError as e:
        return log_and_respond(type(e).__name__, "Attempted to access a dictionary key that doesn't exist.", 500)

if __name__ == "__main__":
    app.run(debug=True)
