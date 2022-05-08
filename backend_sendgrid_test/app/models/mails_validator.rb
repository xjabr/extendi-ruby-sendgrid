class MailsContentValidator < ActiveModel::Validator
  def validate(record)
    # check if user wanna use template or content
    # 0 -> content
    # - We need to check if user content isn't empty
    # 1 -> template
    # - We need to check if user have selected a template and wanna put some data
    if record.data[:type] == 0
      if record.data[:content] == nil || record.data[:content] == ""
        record.errors.add(:content, "Contenuto non valido")
      end
    elsif record.data[:type] == 1
      if record.data[:template_id] == nil || record.data[:template_id] == ""
        record.errors.add(:template_id, "Nessun template selezionato")
      end
    else
      record.errors.add(:type, "Opzione non valida")
    end
  end
end

class MailsValidator
  include ActiveModel::Validations

  attr_reader :data

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :from, length: { maximum: 50 }, format: { with: VALID_EMAIL_REGEX }, allow_blank: false, presence: true
  validates :to, presence: true
  validates :cc, presence: false, allow_blank: true
  validates :bcc, presence: false, allow_blank: true
  validates :subject, length: { maximum: 50 }, allow_blank: false, presence: true
  validates :type, allow_blank: false, presence: true
  validates :content, length: { maximum: 500 }, allow_blank: true, presence: false
  validates :template_id, length: { maximum: 36 }, allow_blank: true, presence: false

  validates_with MailsContentValidator, fields: [:type, :content, :template_id]

  def initialize(data)
    @data = data || {}
  end

  def read_attribute_for_validation(key)
    data[key]
  end
end
