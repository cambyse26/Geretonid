# Clone the project
git clone https://...

cd /path/to/the/project

# Install a virtualenv
python -m venv ./

# Install the dependencies
pip3 install -r requirements.txt

# Configure the database connection 
Change SQLALCHEMY_DATABASE_URI in config.py

# Set default app file
export FLASK_APP=run.py

# Activate debug mode 
export FLASK_ENV=development

# Database initialisation
flask init_db

# Run the application on default port 5000
flask run

# Run the application on custom port 
flask run --port=XXXX