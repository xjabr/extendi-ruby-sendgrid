require 'sendgrid-ruby'
require './config.rb'

include SendGrid

class Envelope
  attr_accessor :content, :template_id, :subject
  attr_reader :sg, :from, :mail, :personalizations

  def initialize(subject = "")
    @sg = SendGrid::API.new(api_key: SENDGRID_API_KEY) # inizializzo le API di sendgrid e gli passo l'api key salvata su API_KEY in config.rb
    @from = SendGrid::Email.new(email: FROM_EMAIL) # di default import la email della variabile FROM_EMAIL in config.rb
    @mail = SendGrid::Mail.new
    @personalizations = SendGrid::Personalization.new
    @subject = subject
    @content = ""
    @template_id = nil
  end
  
  def set_from(email)
    @from = SendGrid::Email.new(email: email)
  end

  def add_to(email)
    begin
      @personalizations.add_to(SendGrid::Email.new(email: email))
    rescue => exception
      puts "\n\tException: #{exception}"
    end
  end

  def add_cc(email)
    begin
      @personalizations.add_cc(SendGrid::Email.new(email: email))
    rescue => exception
      puts "\n\tException: #{exception}"
    end
  end

  def add_bcc(email)
    begin
      @personalizations.add_bcc(SendGrid::Email.new(email: email))
    rescue => exception
      puts "\n\tException: #{exception}"
    end
  end
  
  def set_data(data)
    @personalizations.add_dynamic_template_data(data)
  end

  def set_content(content, type = 'text/plain')
    @content = SendGrid::Content.new(type: type, value: content)
  end

  def get_templates
    data = @sg.client.templates.get({ query_params: { generations: 'legacy,dynamic' } })
    return data.parsed_body
  end

  def send_email
    @mail.from = @from
    @personalizations.subject = @subject

    if !self.check_envelope()
      return nil
    end

    if @template_id != nil
      @mail.template_id = @template_id
    else
      @mail.add_content(@content)
    end
    
    @mail.add_personalization(@personalizations)
    response = @sg.client.mail._('send').post(request_body: @mail.to_json)

    puts "\n\nSendGrid Response: \n----------------\n"
    puts response.status_code
    puts response.body
    puts response.headers
  end

  private
    def check_envelope
      if @personalizations.tos.length < 1
        puts "Nessun destinatario"
        return false
      end

      if @template_id == nil && @content == ""
        puts "Nessun template selezionato e contenuto vuoto"
        return false
      end

      return true
    end

end