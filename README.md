
# Klasifikasi Tingkat Ketergantung Impor Bahan Baku Petrokimia dengan XGBoost

This project aims to develop a machine learning–based classification system using the **XGBoost** algorithm to predict the level of dependency on imported petrochemical raw materials in Indonesia. Import dependency is a strategic issue that directly affects industrial resilience, production costs, and the sustainability of the national petrochemical industry.

The system utilizes historical data consisting of variables such as import value, import volume, price per unit, time-based trends, and other relevant economic indicators. The data undergoes preprocessing stages including data cleaning, exploratory data analysis, and feature engineering before being used to train the XGBoost classification model. The model categorizes import dependency levels into classes such as low, medium, and high.

The application provides key features, including **single data classification** for quick individual predictions, and **batch data classification** that allows users to upload multiple records and obtain the results in a structured output table. Additionally, users can **download the prediction results in CSV format**, enabling further analysis and reporting.

Model performance is evaluated using standard classification metrics such as **accuracy, precision, recall, and F1-score**, along with feature importance analysis to identify the most influential factors contributing to import dependency.

This project demonstrates the practical application of machine learning in industrial and economic analysis, offering a decision-support tool for policymakers and industry stakeholders to formulate strategies for import substitution, capacity expansion, and more sustainable supply chain planning.


## Installation General

Install our-project with cmd

For the first step, you need to clone this repository.
```bash
git clone https://github.com/senoo12/Klasifikasi-Tingkat-Ketergantung-Impor-Bahan-Baku-Petrokimia-Dengan-XGBoost.git
cd Klasifikasi-Tingkat-Ketergantung-Impor-Bahan-Baku-Petrokimia-Dengan-XGBoost
```

## Installation Backend
Change your directory to folder backend:
```python
cd backend
```
Install the library (install to local). 
```python
pip install -r requirements.txt
```

You can also install with Venv. First step with Venv:
```python
// windows
python -m venv venv

// macOs/Linux
python3 -m venv venv
```

Activited your Venv.
```bash
// windows
venv\Scripts\activate

// macOs/Linux
source venv/bin/activate
```

Install the library.
```bash
pip install -r requirements.txt
```

## Installation Frontend
Change your directory to folder frontend:
```bash
cd frontend
```

Install dependency
```bash
npm install
```

## Usage/Examples 

Run backend server:
```python
uvicorn app.main:app --reload
```

Run frontend server:
```bash
npm start
```
## Authors

- [@senoo12](https://www.github.com/senoo12)
- [@Justme-dev-lab](https://www.github.com/Justme-dev-lab)
- [@HaikalFrds](https://www.github.com/HaikalFrds)
- [@hamzhh28](https://github.com/hamzhh28)
- [@MynamesMatcha](https://github.com/MynamesMatcha)

## Screnshoot Apps
Single Data:
<img width="1916" height="889" alt="image" src="https://github.com/user-attachments/assets/fee8c05d-c04e-4a72-b6ea-de0421530b18" />

Multi Data:
Table Ouput:
<img width="1918" height="616" alt="image" src="https://github.com/user-attachments/assets/6fd47d64-e963-4345-8483-49bdd593d98c" />

Download CSV Output:
<img width="1914" height="468" alt="image" src="https://github.com/user-attachments/assets/f5b8338c-bb18-4aaa-888f-343a2c56bc73" />
<img width="1893" height="621" alt="image" src="https://github.com/user-attachments/assets/0002f2f4-0296-4128-8747-46d743d3639b" />

API Docs:
<img width="1903" height="776" alt="image" src="https://github.com/user-attachments/assets/fbb6721a-a8ce-457c-9b92-9a925eb17502" />
