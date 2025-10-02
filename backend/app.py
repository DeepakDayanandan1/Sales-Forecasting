from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

# Load persisted artifacts
model = pickle.load(open("../lr_model.pkl", "rb"))
scaler = pickle.load(open("../scaler.pkl", "rb"))
with open("../feature_columns.pkl", "rb") as f:
    feature_columns = pickle.load(f)

# Constants copied from Streamlit implementation
ITEM_VISIBILITY_MEAN = 0.06613202877895127
IQR_BOUNDS = {
    'Item_Weight': (4.28725, 16.71275),
    'Item_Visibility': (-0.0520, 0.2039),
    'Item_MRP': (93.8265, 310.8625)
}

def clip_iqr(val, lower, upper):
    return max(min(val, upper), lower)

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/predict', methods=['POST'])
def predict():
    payload = request.get_json(force=True)

    # Extract inputs with defaults/validation
    item_weight = float(payload.get('Item_Weight'))
    item_visibility = float(payload.get('Item_Visibility'))
    item_mrp = float(payload.get('Item_MRP'))
    item_fat = payload.get('Item_Fat_Content')
    outlet_size = payload.get('Outlet_Size')
    outlet_loc = payload.get('Outlet_Location_Type')
    outlet_type = payload.get('Outlet_Type')
    new_item_type = payload.get('New_Item_Type')

    # Replace visibility 0 with mean
    if item_visibility == 0:
        item_visibility = ITEM_VISIBILITY_MEAN

    # Outlier clipping
    item_weight = clip_iqr(item_weight, *IQR_BOUNDS['Item_Weight'])
    item_visibility = clip_iqr(item_visibility, *IQR_BOUNDS['Item_Visibility'])
    item_mrp = clip_iqr(item_mrp, *IQR_BOUNDS['Item_MRP'])

    input_data = {
        'Item_Weight': item_weight,
        'Item_Visibility': item_visibility,
        'Item_MRP': item_mrp,
        f'Item_Fat_Content_{item_fat}': 1,
        f'Outlet_Size_{outlet_size}': 1,
        f'Outlet_Location_Type_{outlet_loc}': 1,
        f'Outlet_Type_{outlet_type}': 1,
        f'New_Item_Type_{new_item_type}': 1
    }

    full_input = pd.DataFrame([input_data])
    full_input = full_input.reindex(columns=feature_columns, fill_value=0)

    if hasattr(scaler, 'feature_names_in_'):
        num_cols = list(scaler.feature_names_in_)
    else:
        num_cols = ['Item_Weight', 'Item_Visibility', 'Item_MRP']
    full_input[num_cols] = scaler.transform(full_input[num_cols])

    prediction = float(model.predict(full_input)[0])
    return jsonify({
        'prediction': prediction
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)


