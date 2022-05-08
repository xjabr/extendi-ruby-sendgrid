class ApplicationController < ActionController::API
  
  def authorize_request
    jwt_utils = JwtToken.new
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    begin
      decoded = jwt_utils.decode(header)
      current_user = User.find(decoded[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: 'Utente non trovato' }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

end
