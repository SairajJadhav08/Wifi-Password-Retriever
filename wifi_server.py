import subprocess
import json
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS) to allow the HTML file to communicate with this server
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

def get_wifi_profiles():
    """
    Executes the 'netsh' command to retrieve and parse all saved Wi-Fi profile names.
    Returns a list of profile names (SSIDs).
    """
    profiles_data = []
    try:
        # Execute the command to show all profiles.
        # The 'creationflags' argument hides the command prompt window that would otherwise pop up.
        command_output = subprocess.check_output(
            ['netsh', 'wlan', 'show', 'profiles'],
            creationflags=subprocess.CREATE_NO_WINDOW
        ).decode('utf-8', errors="ignore")

        # Parse the output to find lines containing profile names
        for line in command_output.split('\n'):
            if "All User Profile" in line:
                # Split the line at the colon and take the second part, stripping whitespace
                ssid = line.split(":")[1].strip()
                profiles_data.append(ssid)

    except subprocess.CalledProcessError:
        # This error occurs if the command fails (e.g., not run as admin)
        return {"error": "Failed to run 'netsh'. Please run this script as an Administrator."}
    except FileNotFoundError:
        # This error occurs if 'netsh' is not found (i.e., not on Windows)
        return {"error": "'netsh' command not found. This tool is for Windows only."}
    
    return profiles_data

def get_profile_password(profile_name):
    """
    Retrieves the cleartext password for a specific Wi-Fi profile.
    """
    try:
        # Execute the command to show a specific profile with the key in cleartext
        profile_info = subprocess.check_output(
            ['netsh', 'wlan', 'show', 'profile', profile_name, 'key=clear'],
            creationflags=subprocess.CREATE_NO_WINDOW
        ).decode('utf-8', errors="ignore")

        # Search for the password line
        for line in profile_info.split('\n'):
            if "Key Content" in line:
                password = line.split(":")[1].strip()
                return password
        return "" # Return empty string if no password is found (e.g., for open networks)
    except subprocess.CalledProcessError:
        # Handle cases where the command fails for a specific profile
        return "Error"

# Define the API endpoint that the frontend will call
@app.route('/api/wifi-passwords')
def api_get_wifi_passwords():
    """
    API endpoint to get all Wi-Fi profiles and their passwords.
    """
    profiles = get_wifi_profiles()
    
    # If there was an error getting profiles, return it immediately
    if isinstance(profiles, dict) and "error" in profiles:
        return jsonify(profiles), 500

    wifi_data = []
    for profile in profiles:
        password = get_profile_password(profile)
        wifi_data.append({"ssid": profile, "password": password})
    
    # Return the collected data as a JSON response
    return jsonify(wifi_data)

if __name__ == '__main__':
    # Run the Flask app on localhost at port 5000
    # host='0.0.0.0' makes it accessible from the network if needed, but 127.0.0.1 is safer.
    app.run(host='127.0.0.1', port=5000, debug=True)