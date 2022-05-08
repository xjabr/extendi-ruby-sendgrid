class MailsController < ApplicationController

  before_action :authorize_request
  before_action :validate_params, only: :send_mail

  def initialize
    @mailer = NotifierMailer.new
  end
  
  def send_mail
    @mailer.subject = params[:subject]

    # append to, cc and bcc emails
    params[:to].each do |item|
      @mailer.add_to(item)
    end

    params[:cc].each do |item|
      @mailer.add_cc(item)
    end

    params[:bcc].each do |item|
      @mailer.add_bcc(item)
    end

    if params[:type] == 0
      @mailer.set_content(params[:content])
    else
      @mailer.template_id = params[:template_id]
      @mailer.set_data(params[:template_data].to_unsafe_h || {})
    end
    
    @mailer.send()
    render json: { ok: true, message: "Email inviata con successo" }
  end

  def templates
    @data = @mailer.get_templates
    render json: { ok: true, result: @data["templates"] }
  end

  private
    def validate_params
      validator = MailsValidator.new(params)

      if !validator.valid?
        render json: { ok: false, errors: validator.errors }, status: 400
      end

      return true
    end

end