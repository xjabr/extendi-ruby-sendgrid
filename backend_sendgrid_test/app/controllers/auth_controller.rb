class AuthController < ApplicationController

  def login
    jwt_utils = JwtToken.new
    user = User.find_by_email(params[:email])
    
    logged = nil
    begin
      logged = user&.authenticate(params[:password])
    rescue => exception
      puts exception
    end

    if logged
      token = jwt_utils.encode(
        id: user.id,
        username: user.username,
        email: user.email
      )
      time = Time.now + 24.hours.to_i
      
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M") }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
  
  def signup
    @user = User.new(user_params)

    if @user.save()
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def login_params
      params.permit(:email, :password)
    end

    def user_params
      params.permit(:name, :username, :email, :password, :password_confirmation)
    end
    
end
