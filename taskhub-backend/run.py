from app import create_app, db
from app.models import User, Task  # Importa os modelos para que o SQLAlchemy os "veja"

# Cria a instância do aplicativo usando a "fábrica"
app = create_app()

# Este bloco é executado quando você roda 'python run.py'
if __name__ == '__main__':
    
    with app.app_context():
        # Cria todas as tabelas definidas em models.py
        # (Isso deve ser feito antes de iniciar o servidor)
        db.create_all()
    
    # 📌 CORREÇÃO: Removida a duplicação e adicionado host='0.0.0.0'
    # 'host=0.0.0.0' garante que o Flask responda ao 'localhost' e resolva net::ERR_FAILED.
    app.run(debug=True, port=5000, host='0.0.0.0')