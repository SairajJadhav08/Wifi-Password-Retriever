# 🔐 Wi-Fi Password Retriever

A sleek and modern web application that retrieves all saved Wi-Fi passwords from your Windows computer. Built with Python Flask backend and a beautiful, responsive frontend.

![Wi-Fi Password Retriever Demo](wifi%20fetcher.mp4)

## ✨ Features

- 🔍 **Instant Retrieval** - Fetch all saved Wi-Fi network credentials with a single click
- 💾 **Multiple Export Formats** - Download passwords as TXT, CSV, or JSON
- 🎨 **Modern UI** - Clean, responsive interface built with Tailwind CSS
- 🔒 **Local & Secure** - All operations run locally on your machine
- ⚡ **Fast & Lightweight** - Minimal dependencies, maximum performance
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- **Windows OS** (Required - uses Windows `netsh` command)
- **Python 3.7+**
- **Administrator privileges** (Required to access Wi-Fi passwords)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SairajJadhav08/Wifi-Password-Retriever.git
   cd Wifi-Password-Retriever
   ```

2. **Install dependencies**
   ```bash
   pip install flask flask-cors
   ```

### Usage

1. **Run the Flask server as Administrator**
   
   Right-click on Command Prompt or PowerShell and select "Run as Administrator", then:
   ```bash
   python wifi_server.py
   ```

2. **Open the application**
   
   Navigate to `http://127.0.0.1:5000` in your web browser

3. **Fetch passwords**
   
   Click the "Fetch Wi-Fi Passwords" button to retrieve all saved network credentials

4. **Export (Optional)**
   
   Download the results in your preferred format: TXT, CSV, or JSON

## 📁 Project Structure

```
Wifi-Password-Retriever/
├── wifi_server.py      # Flask backend server
├── index.html          # Main HTML interface
├── script.js           # Frontend JavaScript logic
├── style.css           # Custom styling
└── README.md           # Project documentation
```

## 🛠️ How It Works

1. **Backend (Python Flask)**
   - Uses Windows `netsh wlan show profiles` to list all saved Wi-Fi networks
   - Retrieves passwords using `netsh wlan show profile [name] key=clear`
   - Exposes a REST API endpoint at `/api/wifi-passwords`

2. **Frontend (HTML/CSS/JS)**
   - Modern, responsive interface built with Tailwind CSS
   - Fetches data from the Flask API
   - Displays results in an organized table
   - Provides export functionality in multiple formats

## 🔒 Security & Privacy

- ✅ All operations run **locally** on your machine
- ✅ No data is sent to external servers
- ✅ Requires **administrator privileges** to access passwords
- ✅ Open-source code - fully transparent and auditable

## 🎯 Use Cases

- 📝 Backup your Wi-Fi passwords before reformatting
- 🔄 Transfer network credentials to a new device
- 📊 Audit saved networks on your system
- 🔍 Recover forgotten Wi-Fi passwords

## 🖥️ System Requirements

- **Operating System**: Windows 7/8/10/11
- **Python**: 3.7 or higher
- **Browser**: Any modern web browser (Chrome, Firefox, Edge, Safari)
- **Privileges**: Administrator access required

## 📦 Dependencies

### Python
- `flask` - Web framework for the backend server
- `flask-cors` - Enable Cross-Origin Resource Sharing

### Frontend
- `Tailwind CSS` - Utility-first CSS framework (loaded via CDN)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This tool is intended for **personal use only** to retrieve passwords from your own computer. Always ensure you have proper authorization before accessing any system or network credentials. The developers are not responsible for any misuse of this tool.

## 🐛 Known Issues

- Only works on Windows systems (uses Windows-specific `netsh` command)
- Requires administrator privileges to access password information
- Some enterprise networks may not store passwords locally

## 🔮 Future Enhancements

- [ ] Add support for Linux and macOS
- [ ] Implement password strength indicator
- [ ] Add search/filter functionality
- [ ] Dark mode toggle
- [ ] Export to Excel format
- [ ] Password encryption for exports

## 👨‍💻 Author

**Sairaj Jadhav**

- GitHub: [@SairajJadhav08](https://github.com/SairajJadhav08)

## 🌟 Show Your Support

If you find this project useful, please consider giving it a ⭐ on GitHub!

## 📧 Contact

For questions, suggestions, or issues, please open an issue on GitHub or reach out through the repository.

---

<div align="center">
  Made with ❤️ by Sairaj Jadhav
</div>
