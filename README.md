# Wellness-Tracker


## Project Description

This comprehensive wellness tracking application is a dynamic fusion of technologies, seamlessly combining React, TypeScript, Flask, Python, HTML, CSS, SQL, PostgreSQL, Auth0, and the Nutritionix API. It's designed to empower users in monitoring and managing their health journey through an intuitive and user-friendly interface.

### Key Features:
- **Food & Water Intake Tracking:** Effortlessly log and monitor daily food and water consumption to maintain a healthy lifestyle.
- **Intuitive Autocomplete Search Bar:** Simplify food selection with an intelligent autocomplete feature that enhances user experience.
- **Comprehensive Interface:** A well-organized and easy-to-navigate interface for a seamless tracking experience.

This application merges the power of diverse technologies to create a holistic wellness experience. It empowers users to effortlessly track their dietary intake, facilitating informed decisions towards a healthier lifestyle.


## Installation Instructions

### Backend (Flask):

1. Clone the repository:
https://github.com/Alex-Merkel/Wellness-Tracker.git:
cd Wellness-Tracker/backend

2. Install the required Python libraries:
pip install -r requirements.txt

3. Set up and configure your PostgreSQL database.

### Frontend (React with Vite):

1. Navigate to the frontend directory:
cd Wellness-Tracker/frontend

2. Install necessary Node.js packages:
npm install

3. Start the development server:
npm run dev


## Usage

### Backend (Flask):

**Start the Flask Server within a Virtual Environment:**

   - First, create and activate a virtual environment:
     ```
     python -m venv venv
     source venv/bin/activate   # For Unix/macOS
     .\venv\Scripts\activate    # For Windows
     ```
   
   - Install required dependencies if not installed:
     ```
     pip install -r requirements.txt
     ```
   
   - Start the Flask server:
     ```
     flask run
     ```
     

### Frontend (React with Vite):

1. **Accessing the Frontend:**
   - Open your browser and go to:
     ```
     http://localhost:3000
     ```

2. **Key Features Overview:**
   - **Food Intake Tracking:**
       - Click on "Tracker" on Navbar
       - Click into food searchbar (says "Enter food here...")
       - Start typing food name and select via clicking or by pressing enter once entire food name is entered
       - You will be at the nutrition page for your selected food, if you would like to add it to your food grid, click "Add to Grid"
       - You can now change the quantity of food items in your grid as well as remove individual food items or clear the food list
   - **Water Intake Tracking:** Access the "Water Tracker" and input your water consumption.
   -   - Click on "Tracker" on Navbar
       - Click into water tracker bar (says "0")
       - Click "Add" to add that amount to your total water intake
       - Change measurement option by clicking the bar to the right of the water tracker bar (default says "L")
       - You may reset back to 0 by pressing the "Reset" button


## Configuration

This project doesn't require any specific configuration steps beyond the installation instructions and usage guidelines outlined in the previous sections. Everything needed to run and utilize the application is detailed in the Installation and Usage sections above.


## Contributing

### Bug Reports:

If you stumble upon a bug, I'd love to hear about it! Please open an issue and include detailed steps to help me reproduce the bug. Your input is incredibly valuable in improving this application.

### Feature Suggestions:

Excited about a new feature idea? Don't hesitate to share it with me by opening an issue! Your clear description of the proposed feature helps me understand your needs better.

### Note for Contributors:
I welcome and appreciate your contributions! While this project maintains its codebase, your suggestions and improvements are integral to its growth. Please feel free to suggest enhancements and report issues. However, any code modifications require explicit permission.

Thank you for being a part of this project's journey to improvement and excellence!


## Credits

This project utilizes the [Nutritionix API](https://www.nutritionix.com/) for food and nutrition data, contributing to the comprehensive wellness tracking capabilities. We express our gratitude to the Nutritionix team for providing access to their API.


## License

This project is licensed under the MIT License. While this license allows users to report issues and suggest enhancements, it does not grant permissions to modify or distribute the codebase without explicit permission.


## Documentation

- [Nutritionix API Documentation](https://nutritionix.com/api/docs)


## Contact

For inquiries or suggestions, feel free to reach out:
- **Email:** alexander.j.merkel@gmail.com
- **GitHub:** [GitHub](https://github.com/Alex-Merkel)
- **LinkedIn:** [LinkedIn](https://www.linkedin.com/in/alex-merkel-8750b0274/)
