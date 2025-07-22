Wi-Fi Password Retriever GUI
A simple and intuitive desktop tool for Windows that retrieves saved Wi-Fi passwords and displays them in a clean, modern web-based graphical user interface. Easily view, manage, and export your network credentials without ever touching the command line again.

This tool is perfect for when you've forgotten a password to a network you've previously connected to, or for system administrators who need to back up network profiles.

✨ Features
User-Friendly GUI: A clean web interface to view network data, accessible from your browser.

Instant Retrieval: Fetches all saved Wi-Fi SSIDs and their passwords from your Windows machine.

Multiple Export Options: Download your saved credentials with a single click in multiple formats.

TXT: Plain text for easy viewing and sharing.

CSV: Comma-separated values, perfect for opening in Excel or Google Sheets.

JSON: Structured data, ideal for developers or for importing into other applications.

Secure & Local: The entire application runs locally on your machine. Your passwords are never sent over the internet.

No Installation Needed: Just a simple Python script and standard web files. No complex setup required.

🚀 Tech Stack
This project leverages a simple but powerful combination of technologies:

Backend:
Frontend:
📋 Prerequisites
Before you begin, ensure you have the following installed on your system:

Python 3: Download Python

pip: Usually comes with Python. Used for installing packages.

⚙️ How to Run
Follow these steps to get the application running:

1. Clone the Repository

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

2. Install Dependencies
This project requires the Flask library to run the local web server. Open your terminal and run:

pip install Flask

(You can also create a requirements.txt file with Flask in it and run pip install -r requirements.txt)

3. Run the Python Server (Important!)
You must run the backend server with administrator privileges to allow it to access the stored Wi-Fi passwords.

Right-click on Command Prompt, PowerShell, or Windows Terminal.

Select "Run as administrator".

Navigate to the project directory:

cd path\to\your\project\folder

Start the Flask server:

python wifi_server.py

You should see a message indicating the server is running on http://127.0.0.1:5000. Keep this terminal window open.

4. Launch the GUI
Navigate to the project folder in your file explorer and double-click the index.html file. It will open in your default web browser, and you can now use the application.

📁 File Structure
.
├── wifi_server.py    # The Python Flask backend that runs the 'netsh' commands.
├── index.html        # The main HTML file for the user interface structure.
├── style.css         # Custom CSS for styling the application.
├── script.js         # JavaScript for frontend logic, API calls, and event handling.
└── README.md         # You are here!
