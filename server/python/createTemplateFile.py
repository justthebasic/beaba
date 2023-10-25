from flask import Flask, get_template_attribute, request, jsonify, send_file
import pandas as pd
import os

app = Flask(__name__)

# @app.route('/api/templates/<templateId>/download/<formato>', methods=['GET'])
# def download_template(templateId, formato):
#     template_data = get_template_attribute(templateId, formato)

#     if not template_data:
#         return jsonify({'error': 'Template não encontrado'}), 404

#     if formato == 'xls':
#         return generate_and_send_xls(template_data)
#     elif formato == 'xlsx':
#         return generate_and_send_xlsx(template_data)
#     elif formato == 'csv':
#         return generate_and_send_csv(template_data)
#     else:
#         return jsonify({'error': 'Formato inválido'}), 400
    
    
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)

# @app.route('/api/templates/<templateId>', methods=['GET'])
# def get_template_data(templateId):
#     # Substitua esta função para obter os dados do template com base no ID
#     # Ela deve retornar os dados no formato adequado para o Pandas
#     # Por exemplo, você pode usar SQLAlchemy para consultar um banco de dados
#     template_data = {"id": templateId, "name": "Template Name"}
#     return jsonify(template_data)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)




@app.route('/api/templates/<templateId>/download/<formato>', methods=['GET'])
def download_template(templateId, formato):
    template_data = get_template_data(templateId, formato)

    if not template_data:
        return jsonify({'error': 'Template não encontrado'}), 404

    if formato == 'xls':
        return generate_and_send_xls(template_data)
    elif formato == 'xlsx':
        return generate_and_send_xlsx(template_data)
    elif formato == 'csv':
        return generate_and_send_csv(template_data)
    else:
        return jsonify({'error': 'Formato inválido'}), 400

def get_template_data(templateId, formato):
    # Create a DataFrame or generate data based on your template and formato
    # Example data:
    template_data = {
        'id': templateId,
        'formato': formato,
        'data': [
            # Your data here
            {"nome": "erick"}
        ],
    }
    return (template_data)

def generate_and_send_xls(template_data):
    df = pd.DataFrame(template_data['data'])
    print(df)
    print(df)
    print(df)
    print(template_data)
    print(template_data)
    print(template_data)
    file_path = 'template.xls'
    df.to_excel(file_path, index=False)
    return send_file(file_path, as_attachment=True, download_name='template.xls', mimetype='application/vnd.ms-excel')

def generate_and_send_xlsx(template_data):
    df = pd.DataFrame(template_data['data'])
    file_path = 'template.xlsx'
    df.to_excel(file_path, index=False)
    return send_file(file_path, as_attachment=True, download_name='template.xlsx', mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

def generate_and_send_csv(template_data):
    df = pd.DataFrame(template_data['data'])
    file_path = 'template.csv'
    df.to_csv(file_path, index=False)
    return send_file(file_path, as_attachment=True, download_name='template.csv', mimetype='text/csv')

if __name__ == '__main__':
    app.run(port=5000, debug=True)